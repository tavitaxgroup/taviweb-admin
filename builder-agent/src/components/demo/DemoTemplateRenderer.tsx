import type { DemoTemplateProps } from "@/types/demo";
import { StudioTemplateRenderer } from "./StudioTemplateRenderer";

export function DemoTemplateRenderer({ data }: DemoTemplateProps) {
  return <StudioTemplateRenderer data={data} />;
}
