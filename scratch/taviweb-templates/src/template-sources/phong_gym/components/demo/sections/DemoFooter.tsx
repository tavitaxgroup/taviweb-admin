import React from "react";
import { DemoPageData } from "../../../types/demo";

interface DemoFooterProps {
  data: DemoPageData;
}

export default function DemoFooter({ data }: DemoFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111827] border-t-2 border-[#45464c] py-12 px-6 text-white" id="footer-section">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand */}
        <div className="text-center md:text-left">
          <span className="font-archivo text-2xl tracking-normal !text-[#A3E635] block mb-2 font-black">
            {data.business.name}
          </span>
          <p className="font-archivo text-xs !text-zinc-400 max-w-xs leading-relaxed">
            {data.business.address || "Hệ thống phòng tập thể hình chất lượng cao."}
          </p>
        </div>

        {/* Action and Legal Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8" id="footer-links">
          {data.business.MessageCircle && (
            <a
              href={data.business.MessageCircle}
              target="_blank"
              rel="noreferrer"
              className="font-archivo text-xs !text-zinc-400 hover:!text-[#A3E635] transition-colors"
            >
              Facebook
            </a>
          )}
          <a
            href="#"
            className="font-archivo text-xs !text-zinc-400 hover:!text-[#A3E635] transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="font-archivo text-xs !text-zinc-400 hover:!text-[#A3E635] transition-colors"
          >
            Terms of Service
          </a>
          {data.business.mapUrl && (
            <a
              href={data.business.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="font-archivo text-xs !text-zinc-400 hover:!text-[#A3E635] transition-colors"
            >
              Location
            </a>
          )}
        </div>

        {/* Copyright label */}
        <div className="text-center md:text-right">
          <p className="font-archivo text-xs !text-zinc-500 uppercase tracking-wide">
            © {currentYear} {data.business.name}. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
