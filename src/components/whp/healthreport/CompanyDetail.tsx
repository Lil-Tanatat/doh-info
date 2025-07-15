import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DownloadIcon, FileDown } from "lucide-react";
import { IconUserPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { Company } from "@/stores/companystore";

interface CompanyDetailProps {
  employeeCount: number;
  companyData?: Company;
  isLoading?: boolean;
}

export default function CompanyDetail({
  employeeCount,
  companyData,
  isLoading = false,
}: CompanyDetailProps) {
  const router = useRouter();

  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/DOH_แบบฟอร์มคัดกรองสุขภาวะ.xlsx";
    link.download = "DOH_แบบฟอร์มคัดกรองสุขภาวะ.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper function to get organization size label
  const getOrganizationSizeLabel = (size?: string) => {
    switch (size) {
      case "SMALL":
        return "ขนาดเล็ก";
      case "MEDIUM":
        return "ขนาดกลาง";
      case "LARGE":
        return "ขนาดใหญ่";
      default:
        return "ไม่ระบุ";
    }
  };

  // Helper function to format address
  const formatAddress = (company?: Company) => {
    if (!company) return "ไม่ระบุที่อยู่";

    const parts = [
      company.address,
      company.subdistrict_nm ? `แขวง${company.subdistrict_nm}` : null,
      company.district_nm ? `เขต${company.district_nm}` : null,
      company.province_nm ? `จ.${company.province_nm}` : null,
      company.zipcode,
    ].filter(Boolean);

    return parts.join(" ");
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-12 gap-4 mb-5">
        <div className="col-span-2 w-full max-w-50 h-24 bg-gray-200 animate-pulse rounded"></div>
        <div className="flex flex-col gap-3 col-span-7 text-lg">
          <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="col-span-1"></div>
        <div className="flex flex-col gap-2 col-span-2">
          <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4 mb-5">
      <div className="col-span-12 lg:col-span-2">
        <Image
          src="/images/img-placeholder.png"
          alt="logo"
          width={200}
          height={100}
          className=" w-full max-w-50 h-auto mx-auto"
        />
      </div>
      <div className="flex flex-col gap-3 col-span-12 lg:col-span-7 text-lg">
        <div>
          <span className="font-bold">ชื่อสถานประกอบการ : </span>
          {companyData?.name || "ไม่ระบุชื่อบริษัท"}
        </div>
        <div>
          <span className="font-bold">ประเภทสถานประกอบการ : </span>
          {companyData?.organization_type || "-"}
        </div>
        <div>
          <span className="font-bold">จำนวนพนักงานทั้งหมด : </span>
          {employeeCount} คน
        </div>
        <div>
          <span className="font-bold">ขนาดองค์กร : </span>
          {getOrganizationSizeLabel(companyData?.organization_size)}
        </div>
        <div>
          <span className="font-bold">ที่อยู่สถานประกอบการ : </span>
          {formatAddress(companyData)}
        </div>
        <div className="flex flex-row gap-2">
          <span className="font-bold">กิจกรรมประเมินสุขภาวะองค์กร : </span>
          <div className="flex flex-row gap-2 flex-wrap">
            {companyData?.health_activities &&
            companyData.health_activities.length > 0 ? (
              companyData.health_activities.map((activity, index) => (
                <div key={index} className="bg-gray-200 rounded-full px-4 py-1">
                  {activity}
                </div>
              ))
            ) : (
              <div className="text-gray-500">ไม่มีกิจกรรม</div>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-1"></div>
      <div className="flex flex-col gap-2 col-span-12 lg:col-span-2">
        <Button
          className="bg-highlight text-white px-4 py-2 rounded-md flex justify-center items-center gap-2 "
          onClick={() => router.push("/whp/form")}
        >
          <IconUserPlus className="w-4 h-4" />
          เพิ่มพนักงาน
        </Button>
        <Button
          className="bg-white text-highlight border-2 border-highlight px-4 py-2 rounded-md flex justify-center items-center gap-2"
          onClick={() => router.push("/whp/import")}
        >
          <DownloadIcon className="w-4 h-4" />
          นำเข้าข้อมูลพนักงาน
        </Button>
        <Button
          className="bg-white text-highlight border-2 border-highlight px-4 py-2 rounded-md flex justify-center items-center gap-2 "
          onClick={handleDownloadTemplate}
        >
          <FileDown className="w-4 h-4" />
          ดาวน์โหลดเทมเพลต
        </Button>
      </div>
    </div>
  );
}
