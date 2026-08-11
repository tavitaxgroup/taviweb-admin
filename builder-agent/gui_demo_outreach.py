"""
Semi-automation outreach: tu dong dien tin nhan Messenger, NGUOI DUNG tu bam Gui.

CACH HOAT DONG:
  1. Doc danh sach leads tu file Excel/CSV
  2. Voi moi lead, tu tao link demo theo pattern URL co dinh
  3. Soan tin nhan ca nhan hoa
  4. Mo trang Facebook cua page do, tu dong click nut Message va GO san tin nhan
     vao khung chat (KHONG tu dong bam Gui)
  5. Ban tu review tin nhan -> tu tay bam nut Gui tren trinh duyet
  6. Quay lai terminal, nhan Enter de chuyen sang lead tiep theo

CAI DAT LAN DAU:
  pip install selenium pandas openpyxl --break-system-packages

  Tai chromedriver phu hop voi phien ban Chrome cua ban:
  https://googlechromelabs.github.io/chrome-for-testing/

LUU Y QUAN TRONG:
  - Dang nhap Facebook THU CONG trong cua so Chrome duoc mo ra o lan chay dau tien.
    Script dung mot Chrome profile rieng (CHROME_PROFILE_DIR) de LUU phien dang nhap,
    nen cac lan chay sau khong can dang nhap lai.
  - Script chi go chu vao o input, hanh dong GUI la do ban thuc hien.
  - Nen de thoi gian nghi hop ly giua cac lan gui (script da tam dung cho ban doc/gui,
    nhung dung dung lien tuc hang tram lead trong 1-2 tieng - Facebook van co the
    danh gia la hoat dong bat thuong du ban bam gui thu cong).
"""

import argparse
import time
from pathlib import Path

import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException, NoSuchElementException


# ==================== CAU HINH ====================
CHROME_PROFILE_DIR = str(Path.home() / "fb_outreach_chrome_profile")
DEMO_URL_PATTERN = "https://taviweb.vercel.app/{slug}"  # doi thanh domain that cua ban

MESSAGE_TEMPLATE = (
    "Chào {ten_page}, mình vừa dựng thử một bản Demo Website Tặng Miễn Phí cho {ten_page} "
    "dựa trên thông tin fanpage, bạn xem thử tại đây nhé: {demo_link}\n"
    "Nếu cần chỉnh sửa gì mình hỗ trợ liền nha!\n"
)
# ====================================================


def load_leads(file_path: str) -> pd.DataFrame:
    path = Path(file_path)
    if path.suffix.lower() == ".csv":
        df = pd.read_csv(path)
    else:
        df = pd.read_excel(path)

    # Convert column names to lower case for case-insensitive matching
    df.columns = [str(c).lower().strip() for c in df.columns]

    # Map the Excel columns from your DB output to the required format
    col_mapping = {
        'tên doanh nghiệp': 'ten_page',
        'fanpage': 'link_fanpage',
        'link demo của mình': 'link_demo_full'
    }
    
    for old_col, new_col in col_mapping.items():
        if old_col in df.columns and new_col not in df.columns:
            df = df.rename(columns={old_col: new_col})

    # If the file doesn't have slug_demo but has the full link, extract the slug
    if 'slug_demo' not in df.columns and 'link_demo_full' in df.columns:
        df['slug_demo'] = df['link_demo_full'].apply(lambda x: str(x).split('/')[-1] if pd.notna(x) else '')

    required_cols = {"ten_page", "link_fanpage", "slug_demo"}
    missing = required_cols - set(df.columns)
    if missing:
        raise ValueError(
            f"File leads thieu cot: {missing}. "
            f"Can co cac cot: {required_cols}"
        )
    
    # Filter out rows that don't have a fanpage link
    df = df.dropna(subset=['link_fanpage'])
    df = df[df['link_fanpage'].str.contains('facebook.com', na=False, case=False)]
    
    return df


def build_message(row: pd.Series) -> str:
    demo_link = DEMO_URL_PATTERN.format(slug=row["slug_demo"])
    return MESSAGE_TEMPLATE.format(ten_page=row["ten_page"], demo_link=demo_link)


def start_browser() -> webdriver.Chrome:
    options = Options()
    options.add_argument(f"--user-data-dir={CHROME_PROFILE_DIR}")
    options.add_argument("--start-maximized")
    # KHONG dung headless: ban can nhin thay va tu bam gui
    driver = webdriver.Chrome(options=options)
    return driver


def ensure_logged_in(driver: webdriver.Chrome):
    driver.get("https://www.facebook.com")
    print("\nNeu day la lan dau chay script, hay DANG NHAP Facebook thu cong")
    print("trong cua so Chrome vua mo. Sau khi dang nhap xong, quay lai day va nhan Enter.")
    input("Nhan Enter khi da dang nhap xong (hoac da dang nhap tu truoc)... ")


def open_page_messenger(driver: webdriver.Chrome, fanpage_url: str, wait_sec: int = 20):
    driver.get(fanpage_url)
    wait = WebDriverWait(driver, wait_sec)

    # Facebook hay doi cau truc DOM/class ngau nhien nen ta thu nhieu selector kha nang
    message_button_selectors = [
        (By.XPATH, "//div[@aria-label='Message' or @aria-label='Nhan tin' or @aria-label='Nhắn tin']"),
        (By.XPATH, "//span[text()='Message' or text()='Nhan tin' or text()='Nhắn tin']"),
    ]

    clicked = False
    for by, sel in message_button_selectors:
        try:
            btn = wait.until(EC.element_to_be_clickable((by, sel)))
            btn.click()
            clicked = True
            break
        except TimeoutException:
            continue

    if not clicked:
        print(f"  [!] Khong tim thay nut Message tren {fanpage_url}.")
        print("      Page nay co the da tat tinh nang nhan tin tu nguoi la.")
        return False

    return True


def type_message_into_chatbox(driver: webdriver.Chrome, message: str, wait_sec: int = 15) -> bool:
    wait = WebDriverWait(driver, wait_sec)
    chatbox_selectors = [
        (By.XPATH, "//div[@aria-label='Message' or @aria-label='Tin nhan' or @aria-label='Tin nhắn' or @aria-label='Aa'][@contenteditable='true']"),
        # Loại trừ các ô nhập bình luận hoặc ô tìm kiếm
        (By.XPATH, "//div[@role='textbox'][@contenteditable='true'][not(contains(translate(@aria-label, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'comment')) and not(contains(translate(@aria-label, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'bình luận')) and not(contains(translate(@aria-label, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'tìm kiếm')) and not(contains(translate(@aria-label, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'search'))]")
    ]

    for by, sel in chatbox_selectors:
        try:
            box = wait.until(EC.presence_of_element_located((by, sel)))
            box.click()
            # go tung dong de giu dung xuong dong trong tin nhan
            for line in message.split("\n"):
                if line.strip():  # Chỉ gõ những dòng không trống
                    box.send_keys(line)
                    box.send_keys(Keys.SHIFT, Keys.ENTER)
            
            # Thêm lệnh tự động nhấn phím Enter để Gửi luôn
            time.sleep(1) # Nghỉ một nhịp nhỏ cho giống người thật trước khi gửi
            box.send_keys(Keys.ENTER)
            
            return True
        except TimeoutException:
            continue

    print("  [!] Khong tim thay khung nhap tin nhan.")
    return False


def run(leads_file: str, limit: int, start_from: int, dry_run: bool):
    try:
        df = load_leads(leads_file)
    except Exception as e:
        print(f"Loi doc file: {e}")
        return
        
    if limit:
        df = df.iloc[start_from:start_from + limit]
    else:
        df = df.iloc[start_from:]

    print(f"Tong so lead Fanpage se xu ly: {len(df)}")

    if dry_run:
        print("\n=== DRY RUN: chi in tin nhan, KHONG mo trinh duyet ===\n")
        for idx, row in df.iterrows():
            msg = build_message(row)
            print(f"--- Lead #{idx}: {row['ten_page']} ({row['link_fanpage']}) ---")
            print(msg)
            print()
        return

    driver = start_browser()
    ensure_logged_in(driver)

    for idx, row in df.iterrows():
        print(f"\n[{idx}] Dang xu ly: {row['ten_page']} - {row['link_fanpage']}")
        message = build_message(row)

        opened = open_page_messenger(driver, row["link_fanpage"])
        if not opened:
            action = input("  Bo qua lead nay va tiep tuc? (Enter=co / s=dung script): ")
            if action.strip().lower() == "s":
                break
            continue

        time.sleep(2)  # cho khung chat load xong
        typed = type_message_into_chatbox(driver, message)
        if not typed:
            action = input("  Bo qua lead nay va tiep tuc? (Enter=co / s=dung script): ")
            if action.strip().lower() == "s":
                break
            continue

        print("  --> Đã tự động điền và GỬI tin nhắn thành công!")
        action = input("  Nhấn Enter để tự động gửi cho khách tiếp theo (hoặc gõ s rồi Enter để Dừng): ")
        if action.strip().lower() == "s":
            break

    print("\nHoan tat phien lam viec.")
    input("Nhan Enter de dong trinh duyet... ")
    driver.quit()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Semi-automation gui demo qua Messenger")
    parser.add_argument("leads_file", help="Duong dan file leads (.csv hoac .xlsx)")
    parser.add_argument("--limit", type=int, default=0, help="Chi xu ly N lead dau tien (0 = tat ca)")
    parser.add_argument("--start-from", type=int, default=0, help="Bat dau tu vi tri thu may trong file")
    parser.add_argument("--dry-run", action="store_true", help="Chi in thu tin nhan, khong mo trinh duyet")
    args = parser.parse_args()

    run(args.leads_file, args.limit, args.start_from, args.dry_run)
