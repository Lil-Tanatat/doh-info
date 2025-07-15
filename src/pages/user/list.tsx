import { Layout } from "@/components/layout";
import UserTable from "@/components/user/UserTable";
import { IconSearch, IconUserPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { UserCog } from "lucide-react";
import { useAllUsers } from "@/hooks/users/useUser";
import { useMemo } from "react";
import PageHeader from "@/components/PageHeader";

// Interface for API response data
interface ApiUserData {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  username?: string;
  tax_id?: string;
  phone?: string;
  is_verified?: boolean;
  company_id?: string;
  created_at?: string;
  job_position?: string | null;
  role?: string;
  role_thai?: string;
}

export default function UserList() {
  const router = useRouter();
  const { data: apiData, isLoading, error } = useAllUsers();

  // Map API data to table format
  const userData = useMemo(() => {
    if (!apiData) return [];
    return mapApiDataToTableFormat(apiData);
  }, [apiData]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.64))]">
          <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex flex-1 items-center justify-center">
              <div className="text-lg">กำลังโหลดข้อมูล...</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.64))]">
          <div className="flex flex-col gap-4 p-6 md:p-10">
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
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center mx-32">
            <div className="w-full">
              {" "}
              {/* Bread Crumb */}
              {/* <div className="text-xs mb-8">
                หน้าแรก {">"}
                <span className="text-primary"> ระบบสุขภาวะ (WHP)</span>
              </div> */}
              {/* Header */}
              <PageHeader
                title="User Setting"
                subtitle="จัดการผู้ใช้งานระบบสุขภาวะองค์กร"
                icon={UserCog}
              />
              <div className="flex flex-row justify-between mb-4 mt-10">
                <div className="text-40 text-highlight font-semibold">
                  User Setting
                </div>
                <div
                  onClick={() => {
                    router.push("/user/add");
                  }}
                  className="text-white flex flex-row gap-2 items-center bg-highlight rounded-xl px-8 cursor-pointer"
                >
                  <IconUserPlus className="w-6 h-6" />
                  <div className="text-sm font-semibold">เพิ่มผู้ใช้งาน</div>
                </div>
              </div>
              {/* Table */}
              {/* Filter */}
              <div className="flex flex-row gap-8 justify-between items-center mb-5">
                <div className="flex flex-row gap-2 relative w-1/3 items-center">
                  <div className="text-lg font-semibold items-center w-full max-w-16">
                    ค้นหา :
                  </div>
                  <input
                    type="text"
                    className=" !bg-transparent border-2 border-gray-200 rounded-md px-4 py-2 w-full focus:outline-none"
                    placeholder="ชื่อ-นามสกุล หรือ อีเมล"
                  />
                  <IconSearch className="w-6 h-6 text-black absolute right-4 top-1/2 -translate-y-1/2" />
                </div>
                {/* <div className="flex flex-row gap-2 text-sm font-semibold text-primary">
                  <div className="cursor-pointer text-black border-r-2 border-black pr-4">
                    ทั้งหมด (28)
                  </div>
                  <div className="cursor-pointer border-r-2 border-black pr-4">
                    ผู้ดูแลระบบ (10)
                  </div>
                  <div className="cursor-pointer">ผู้จัดการระบบ (18)</div>
                </div> */}
              </div>
              <UserTable data={userData} itemsPerPage={15} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Helper function to map API data to table format
const mapApiDataToTableFormat = (apiData: ApiUserData[]) => {
  return apiData.map((item: ApiUserData) => {
    const fullName =
      item?.first_name && item?.last_name
        ? `${item.first_name} ${item.last_name}`
        : "-";

    return {
      id: item?.id || "-",
      name: fullName,
      email: item?.email || "-",
      username: item?.username || "-",
      nationalId: item?.tax_id || "-",
      job_position: item?.job_position || "-",
      role: item?.role_thai || item?.role || "-",
    };
  });
};
