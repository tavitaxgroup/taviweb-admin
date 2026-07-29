import type { Metadata } from "next";
import { CompanyHome } from "@/components/company/CompanyHome";

export const metadata: Metadata = {
  title: "TAVIWEB - Thiết kế website và demo tự động",
  description:
    "TAVIWEB thiết kế website, landing page và hệ thống demo website tự động cho doanh nghiệp."
};

export default function HomePage() {
  return <CompanyHome />;
}
