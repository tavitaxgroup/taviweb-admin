export const extractCityDistrict = (address: string) => {
  if (!address) return { city: '', district: '', street: '' };
  
  // Loại bỏ các đoạn chữ rác ở cuối địa chỉ
  let addr = address.replace(/\(Nguồn:\s*Facebook\)/i, '');
  addr = addr.replace(/,?\s*(Việt Nam|Vietnam)\s*$/i, '');
  addr = addr.replace(/\s+\d{5,6}$/, '');
  
  const parts = addr.split(',').map(p => p.trim()).filter(Boolean);
  
  let city = '';
  let district = '';
  let streetParts: string[] = [];
  if (parts.length >= 2) {
    city = parts[parts.length - 1];
    district = parts[parts.length - 2];
    streetParts = parts.slice(0, parts.length - 2);
  } else if (parts.length === 1) {
    city = parts[0];
  }
  
  // Chuẩn hóa Tỉnh/Thành
  if (city) {
    city = city.replace(/\s+\d{5,6}$/, '').trim(); // Xóa mã bưu điện lần nữa
    city = city.replace(/^(Thành phố|TP\.|TP\s+|Tỉnh\s+)/i, '').replace(/\s+City$/i, '').trim();
    // Quy chuẩn một số tên phổ biến
    if (/hcm|ho chi minh/i.test(city)) city = 'Hồ Chí Minh';
    if (/ha noi/i.test(city)) city = 'Hà Nội';
    if (/da nang/i.test(city)) city = 'Đà Nẵng';
  }
  
  // Chuẩn hóa Quận/Huyện
  if (district) {
    district = district.replace(/^(Quận|Huyện|Thị xã|TX\.|Thành phố|TP\.|TP\s+)\s+/i, '').trim();
  }
  
  return { city, district, street: streetParts.join(', ') || '-' };
};
