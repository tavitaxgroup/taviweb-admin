import { useEffect, useState } from "react";
import { getMockBusinessByPlaceId } from "../../../lib/demo/mockDemoData";
import { buildDemoPageData } from "../../../lib/demo/buildDemoPageData";
import DemoTemplateRenderer from "../../../components/demo/DemoTemplateRenderer";
import Loading from "./loading";
import NotFound from "./not-found";

interface PageProps {
  placeId: string;
}

export default function DemoPage({ placeId }: PageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading state (mocking Supabase API response delay)
    const timer = setTimeout(() => {
      const rawBusiness = getMockBusinessByPlaceId(placeId);
      if (rawBusiness) {
        const pageData = buildDemoPageData(rawBusiness);
        setData(pageData);
      } else {
        setData(null);
      }
      setIsLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [placeId]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <NotFound />;
  }

  return <DemoTemplateRenderer data={data} />;
}
