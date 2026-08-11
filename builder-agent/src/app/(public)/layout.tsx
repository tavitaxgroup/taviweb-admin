import type { Metadata } from "next";
import "./public.css";

export const metadata: Metadata = {
  title: "TaviWeb - Thiết kế website chuyên nghiệp",
  description: "Dynamic demo website renderer for local businesses."
};

export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="taviweb-public-root">
      {children}
    </div>
  );
}
