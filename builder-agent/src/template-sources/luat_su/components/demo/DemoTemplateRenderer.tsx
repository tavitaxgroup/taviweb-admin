import { DemoPageData } from "../../types/demo";
import LawFirmTemplate from "./templates/LawFirmTemplate";

interface RendererProps {
  data: DemoPageData;
}

export default function DemoTemplateRenderer({ data }: RendererProps) {
  // DemoTemplateRenderer chọn template theo data.template.key.
  // Nếu unknown template_key thì fallback an toàn.
  switch (data.template.key) {
    case "law-firm":
      return <LawFirmTemplate data={data} />;
    default:
      // Fallback an toàn sang LawFirmTemplate
      return <LawFirmTemplate data={data} />;
  }
}
