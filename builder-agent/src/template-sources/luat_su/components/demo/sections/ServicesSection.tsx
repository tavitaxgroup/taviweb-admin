import { Briefcase, FileText, Gavel, Users, User, ArrowRight } from "lucide-react";
import { DemoPageData } from "../../../types/demo";

interface SectionProps {
  data: DemoPageData;
}

export default function ServicesSection({ data }: SectionProps) {
  const { services } = data;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "business":
        return <Briefcase className="w-8 h-8 text-blue-900 group-hover:text-amber-700 transition-colors" />;
      case "description":
        return <FileText className="w-8 h-8 text-blue-900 group-hover:text-amber-700 transition-colors" />;
      case "gavel":
        return <Gavel className="w-8 h-8 text-blue-900 group-hover:text-amber-700 transition-colors" />;
      case "groups":
        return <Users className="w-8 h-8 text-blue-900 group-hover:text-amber-700 transition-colors" />;
      case "person":
        return <User className="w-8 h-8 text-blue-900 group-hover:text-amber-700 transition-colors" />;
      default:
        return <Gavel className="w-8 h-8 text-blue-900 group-hover:text-amber-700 transition-colors" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-headline-md font-bold text-blue-950 text-3xl sm:text-4xl mb-4">
            Lĩnh Vực Hoạt Động
          </h2>
          <div className="h-[3px] w-16 bg-amber-600 mx-auto rounded"></div>
        </div>

        {/* Dynamic Service Grid (Replicating the custom Stitch design layout exactly) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const isLastOddItem = index === services.length - 1 && index % 3 === 2; // checks if we should do lg:col-span-2
            const isIndividualService = service.icon === "person" || isLastOddItem;

            if (isIndividualService) {
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group lg:col-span-2"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-8">
                    <div className="md:w-1/3">
                      <div className="bg-amber-50 p-4 rounded-xl w-fit mb-6">
                        {getIcon(service.icon)}
                      </div>
                      <h3 className="font-sans font-bold text-xl text-blue-950 mb-2">
                        {service.title}
                      </h3>
                    </div>
                    <div className="md:w-2/3">
                      <p className="font-sans text-gray-600 text-base leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <a
                        href={service.href || "#contact"}
                        className="inline-flex items-center text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors group/link"
                      >
                        Tìm hiểu thêm
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="bg-amber-50 p-4 rounded-xl w-fit mb-6">
                  {getIcon(service.icon)}
                </div>
                <h3 className="font-sans font-bold text-xl text-blue-950 mb-4">
                  {service.title}
                </h3>
                <p className="font-sans text-gray-600 text-base leading-relaxed mb-6">
                  {service.description}
                </p>
                <a
                  href={service.href || "#contact"}
                  className="inline-flex items-center text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors group/link"
                >
                  Tìm hiểu thêm
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1.5 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
