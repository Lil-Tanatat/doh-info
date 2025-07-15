import { Layout } from "@/components/layout";
import Image from "next/image";
import EmployeeDetailTable from "@/components/whp/healthreport/EmployeeDetailTable";
import { IconUser } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useHealthCheckReport } from "@/hooks/employees/useEmployee";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/select";

import dateOptionsJson from "@/data/dateOptions.json";

interface HealthParameter {
  id: string;
  unit: string;
  parameter_name: string;
  parameter_name_th: string;
}

interface HealthParameterCriteria {
  id: string;
  max_value: number | null;
  min_value: number | null;
  description: string;
  normal_criteria: string;
}

interface HealthCheckResult {
  id: string;
  status: string;
  result_value: number;
  recommendation: string;
  health_parameters: HealthParameter;
  health_parameter_criteria: HealthParameterCriteria;
}

const RECOMMENDATION_TITLES = [
  "ระยะสั้น (1-3 เดือน)",
  "ระยะกลาง (4-6 เดือน)",
  "ระยะยาว (7-12 เดือน)",
];

// Function to map API status to component status
const mapStatusToComponentStatus = (
  status: string
): "SICK" | "RISK" | "GOOD" => {
  const statusLower = status.toLowerCase();
  if (statusLower.includes("normal") || statusLower.includes("good")) {
    return "GOOD";
  } else if (
    statusLower.includes("borderline") ||
    statusLower.includes("risk")
  ) {
    return "RISK";
  } else {
    return "SICK";
  }
};

export default function EmployeeDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: healthReport,
    isLoading,
    error,
  } = useHealthCheckReport(id as string);

  // Transform API data for the table
  const healthMetricsData =
    healthReport?.health_check_results?.map((result: HealthCheckResult) => ({
      title: result.health_parameters.parameter_name_th,
      result: result.result_value,
      standard: result.health_parameter_criteria.normal_criteria,
      status: mapStatusToComponentStatus(result.status),
      recommendation: result.recommendation,
    })) || [];

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.64))] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">กำลังโหลดข้อมูล...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Check for error or no data
  const hasError = error || !healthReport;

  const { monthOptions, yearOptions } = dateOptionsJson;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.64))] ">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center mx-20">
            <div className="mx-20 w-full">
              {/* Bread Crumb */}
              <div
                className="flex flex-row gap-4 justify-center text-primary-foreground py-10 rounded-b-3xl mb-5 "
                style={{
                  backgroundImage: "url('/images/header-bg.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="flex flex-col items-center text-center min-h-24">
                  <h1 className="text-4xl font-semibold flex flex-row gap-2 items-center justify-center my-auto">
                    <IconUser className="w-10 h-auto" /> รายละเอียดสุขภาพพนักงาน
                  </h1>
                </div>
              </div>
              <div className="text-xs mb-2">
                ระบบสุขภาวะ (WHP) {">"}
                <span className="text-primary">
                  {" "}
                  {healthReport?.employees?.first_name || "-"}{" "}
                  {healthReport?.employees?.last_name || "-"}
                </span>
              </div>
              {/* Detail */}
              <div>
                <div className="text-2xl font-bold mt-4">
                  รายละเอียดสุขภาพพนักงาน
                </div>
                <div className=" mb-5 mt-5 text-5xl font-semibold text-highlight">
                  {healthReport?.employees?.first_name || "-"}{" "}
                  {healthReport?.employees?.last_name || "-"}
                </div>
              </div>
              {/* Header */}

              <div className=" gap-5 mb-5 flex flex-row justify-between">
                <div className="flex flex-row gap-20">
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-bold">เลขประจำตัว (ID) : </span>
                      {healthReport?.employees?.employee_code || "-"}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-bold">อายุ : </span>
                      {healthReport?.age || "-"}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-bold">ตำแหน่ง : </span>
                      {healthReport?.employees?.job_position || "-"}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-bold">สถานภาพสมรส : </span>
                      {healthReport?.employees?.marital_status || "-"}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-bold">สัญชาติ : </span>
                      {healthReport?.employees?.nationality || "-"}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 ">
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-bold">น้ำหนัก : </span>
                      {healthReport?.weight_kg
                        ? `${healthReport.weight_kg} กก.`
                        : "-"}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-bold">ส่วนสูง : </span>
                      {healthReport?.height_cm
                        ? `${healthReport.height_cm} ซม.`
                        : "-"}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-bold">รอบเอว : </span>
                      {healthReport?.waist_cm
                        ? `${healthReport.waist_cm} ซม.`
                        : "-"}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="font-bold">โรคประจำตัว : </span>
                      {healthReport?.underlying_disease || "ไม่มี"}
                    </div>
                  </div>
                </div>
                <Image
                  src="/images/health-detail.png"
                  alt="logo"
                  width={200}
                  height={100}
                  className="col-span-1 w-40 h-auto object-contain self-start"
                />
              </div>

              {/* Table */}
              <div className="grid grid-cols-12 gap-8 items-center mb-5">
                <div className="col-span-5 flex flex-row gap-2 relative items-center"></div>
                <div className="col-span-3 flex flex-row gap-2 relative items-center">
                  <div className="text-lg font-semibold items-center w-full max-w-16">
                    เดือน :
                  </div>
                  <Select
                    options={monthOptions.map((option) => option.label)}
                    placeholder="เลือกเดือน"
                    className=" border-gray-200 border-2 rounded-md w-full focus:outline-none h-10"
                  />
                </div>
                <div className="col-span-3 flex flex-row gap-2 relative items-center">
                  <div className="text-lg font-semibold items-center w-full max-w-28">
                    ปี{" "}
                    <span className="text-sm text-muted-foreground">
                      (ย้อนหลัง 3 ปี)
                    </span>
                    :
                  </div>
                  <Select
                    options={yearOptions.map((option) => option.label)}
                    placeholder="เลือกปี"
                    className=" border-gray-200 border-2 rounded-md w-full focus:outline-none h-10"
                  />
                </div>
                <div className="col-span-1 flex flex-row gap-2 relative items-center justify-end">
                  <Button className="bg-white text-highlight w-full border-2 border-highlight hover:bg-highlight hover:text-white transition-all duration-300 rounded-md flex justify-center items-center gap-2 ">
                    ล้างค่า
                  </Button>
                </div>
              </div>
              <EmployeeDetailTable data={healthMetricsData} itemsPerPage={10} />
              <div className="flex flex-col gap-4 mt-10">
                <div className="text-2xl font-semibold mb-5">
                  คำแนะนำด้านสุขภาพ
                </div>
                {!hasError ? (
                  <div className="grid grid-cols-3 gap-5">
                    {RECOMMENDATION_TITLES.map((title, index) => (
                      <div
                        key={index}
                        className="shadow-md rounded-lg p-8 border border-gray-200"
                      >
                        <div className="text-lg font-semibold text-highlight mb-4">
                          {title}
                        </div>
                        <div className="text-md">
                          <ul className="list-disc list-inside space-y-2">
                            <li>ไม่มีข้อมูลคำแนะนำ</li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="shadow-md rounded-lg p-8 border border-gray-200 bg-gray-50">
                    <div className="text-center">
                      <p className="text-gray-600">ไม่สามารถแสดงคำแนะนำได้</p>
                      <p className="text-gray-500 text-sm mt-2">
                        เนื่องจากไม่พบข้อมูลรายงานสุขภาพ
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
