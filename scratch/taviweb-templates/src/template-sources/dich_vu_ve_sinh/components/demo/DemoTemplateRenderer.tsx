import { DemoPageData } from "../../types/demo";
import { CleaningServiceTemplate } from "./templates/CleaningServiceTemplate";

interface DemoTemplateRendererProps {
  data: DemoPageData;
}

export function DemoTemplateRenderer({ data }: DemoTemplateRendererProps) {
  const templateKey = data.template.key;

  switch (templateKey) {
    case "cleaning-service":
      return <CleaningServiceTemplate data={data} />;
    default:
      // Unknown template fallback: safely fall back to CleaningServiceTemplate
      return <CleaningServiceTemplate data={data} />;
  }
}
