import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { IconSearch } from "@tabler/icons-react";
import { UserPlus } from "lucide-react";
import EmployeesTable from "@/components/whp/healthreport/EmployeesTable";
import CompanyDetail from "@/components/whp/healthreport/CompanyDetail";
import CompanyStatus from "@/components/whp/healthreport/CompanyStatus";
// import dateOptionsJson from "@/data/dateOptions.json";
import { Select } from "@/components/select";
import {
  useAllHealthCheckReports,
  useMonthFilterMD,
} from "@/hooks/employees/useEmployee";
import { useCompany } from "@/hooks/company/useCompany";
import { useMemo, useState, useEffect, useCallback } from "react";
import PageHeader from "@/components/PageHeader";

// Month and year options from JSON file
// const { monthOptions, yearOptions } = dateOptionsJson; // Replaced with API data

export default function WHPListPage() {
  const [selectedMonthYear, setSelectedMonthYear] = useState<string>("");
  const { data: monthFilterData, isLoading: isLoadingMonthFilter } =
    useMonthFilterMD();
  const {
    data: employeeData = [],
    error,
    isLoading: isLoadingEmployees,
  } = useAllHealthCheckReports(selectedMonthYear || undefined);

  const {
    getOwnedCompany,
    fetchAllCompanies,
    loading: companyLoading,
  } = useCompany();

  useEffect(() => {
    if (monthFilterData && monthFilterData.length > 0 && !selectedMonthYear) {
      const latestMonthYear = monthFilterData[0]?.round_year_month;
      if (latestMonthYear) {
        setSelectedMonthYear(latestMonthYear);
      }
    }
  }, [monthFilterData, selectedMonthYear]);

  useEffect(() => {
    fetchAllCompanies();
  }, [fetchAllCompanies]);

  // Get owned company data
  const ownedCompany = getOwnedCompany();

  // Map month filter data to select options
  const monthYearOptions = useMemo(() => {
    if (!monthFilterData) return [];
    return monthFilterData.map(
      (item: { round_year_month: string; total: number }) => ({
        value: item.round_year_month,
        label: `${item.round_year_month}`, // (${item.total} คน)
      })
    );
  }, [monthFilterData]);

  const monthYearLabels = useMemo(() => {
    return monthYearOptions.map(
      (option: { value: string; label: string }) => option.label
    );
  }, [monthYearOptions]);

  // Memoize selected option for Select value
  const selectedOption = useMemo(() => {
    return monthYearOptions.find(
      (option: { value: string; label: string }) =>
        option.value === selectedMonthYear
    );
  }, [monthYearOptions, selectedMonthYear]);

  // Memoize change handler
  const handleMonthYearChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedLabel = e.target.value;
      const selectedOption = monthYearOptions.find(
        (option: { value: string; label: string }) =>
          option.label === selectedLabel
      );
      setSelectedMonthYear(selectedOption?.value || "");
    },
    [monthYearOptions]
  );

  if (error) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.64))]">
          <div className="flex flex-col gap-4 p-6 lg:p-10">
            <div className="flex flex-1 items-center justify-center">
              <div className="text-lg text-red-500">
                เกิดข้อผิดพลาดในการโหลดข้อมูล
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.64))]">
        <div className="flex flex-col gap-4 p-6 lg:p-10">
          <div className="flex flex-1 items-center justify-center sm:mx-16 lg:mx-32">
            <div className="w-full">
              {" "}
              {/* Bread Crumb */}
              {/* <div className="text-xs mb-8">
                หน้าแรก {">"}
                <span className="text-primary"> ระบบสุขภาวะ (WHP)</span>
              </div> */}
              <PageHeader
                title="ระบบการดำเนินงานสุขภาวะองค์กร"
                subtitle="ส่งเสริมการทำงานอย่างมีสุขภาพดี ครอบคลุมทุกมิติของการดูแลพนักงานเพื่อสร้างองค์กรที่เข้มแข็งและยั่งยืน"
                icon={UserPlus}
              />
              <div className="lg:mx-10">
                {/* CompanyStatus */}
                <CompanyStatus />
                {/* Company Detail */}
                <CompanyDetail
                  employeeCount={isLoadingEmployees ? 0 : employeeData.length}
                  companyData={ownedCompany}
                  isLoading={companyLoading}
                />

                {/* Table */}
                <div className="text-2xl font-semibold mb-2 mt-5">
                  รายชื่อพนักงาน
                </div>
                <div className="mb-5 flex flex-row flex-wrap justify-center gap-x-4 gap-y-2 lg:justify-end">
                  <div className="flex flex-row gap-2">
                    <div className="h-5 w-5 rounded-full border-2 border-white bg-red-500 shadow-sm"></div>
                    <div className="text-sm font-semibold">ป่วย</div>
                  </div>
                  <div className="flex flex-row gap-2">
                    <div className="h-5 w-5 rounded-full border-2 border-white bg-yellow-500 shadow-sm"></div>
                    <div className="text-sm font-semibold">เสี่ยง</div>
                  </div>
                  <div className="flex flex-row gap-2">
                    <div className="h-5 w-5 rounded-full border-2 border-white bg-green-500 shadow-sm"></div>
                    <div className="text-sm font-semibold">ดี</div>
                  </div>
                </div>
                <div className="mb-5 grid grid-cols-1 items-center gap-4 lg:grid-cols-12 lg:gap-8">
                  <div className="hidden lg:col-span-3 lg:block"></div>
                  <div className="relative col-span-1 flex flex-row items-center gap-2 lg:col-span-4">
                    <div className="w-full max-w-16 items-center text-lg font-semibold">
                      ค้นหา :
                    </div>
                    <input
                      type="text"
                      className=" h-10 w-full rounded-md border-2 border-gray-200 px-4 py-2 focus:outline-none"
                      placeholder="ID หรือ ชื่อ-นามสกุล"
                    />
                    <IconSearch className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 text-black" />
                  </div>

                  <div className="relative col-span-1 flex flex-row items-center gap-2 lg:col-span-4">
                    <div className="w-full max-w-44 items-center text-lg font-semibold">
                      เดือน/ปี{" "}
                      <span className="text-sm text-muted-foreground">
                        (ย้อนหลัง 3 ปี)
                      </span>
                      :
                    </div>
                    <Select
                      options={monthYearLabels}
                      value={selectedOption?.label || ""}
                      onChange={handleMonthYearChange}
                      placeholder="MM/YYYY"
                      className=" h-10 w-full rounded-md border-2 border-gray-200 focus:outline-none"
                    />
                  </div>
                  <div className="relative col-span-1 flex flex-row items-center justify-end gap-2 lg:col-span-1">
                    <Button className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-highlight bg-white text-highlight transition-all duration-300 hover:bg-highlight hover:text-white ">
                      ล้างค่า
                    </Button>
                  </div>
                </div>
                <EmployeesTable
                  data={employeeData}
                  itemsPerPage={10}
                  isLoading={isLoadingEmployees || isLoadingMonthFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
