import { EditUserForm } from "@/components/user/edit-form";
import { Layout } from "@/components/layout";
import * as React from "react";
import Swal from "sweetalert2";
import router, { useRouter } from "next/router";
import { useOneUser } from "@/hooks/users/useUser";
import { updateUser } from "@/services/user";

interface FormData {
  [key: string]: string | string[];
}

export default function EditUserPage() {
  const routerQuery = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [userData, setUserData] = React.useState<FormData>({});
  const userId = routerQuery.query.id as string;

  // Use the hook to fetch user data
  const { data: userResponse, isLoading, error } = useOneUser(userId);

  // Process the user data when it's loaded
  React.useEffect(() => {
    if (userResponse) {
      setUserData({
        first_name: userResponse.first_name || "",
        last_name: userResponse.last_name || "",
        username: userResponse.username || "",
        email: userResponse.email || "",
        phone: userResponse.phone || "",
        job_position: userResponse.job_position || "",
        tax_id: userResponse.tax_id || "",
        role: userResponse.role || "",
        company_id: userResponse.company_id || "",
      });
    }
  }, [userResponse]);

  // Handle error state
  React.useEffect(() => {
    if (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถโหลดข้อมูลผู้ใช้งานได้",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [error]);

  // Check for missing userId
  React.useEffect(() => {
    if (!routerQuery.isReady) return;

    if (!userId) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่พบรหัสผู้ใช้งาน",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [routerQuery.isReady, userId]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      // Prepare the updated user data
      const updatedUserData = {
        first_name: String(formData.first_name),
        last_name: String(formData.last_name),
        phone: String(formData.phone),
        role: String(formData.role),
        // Keep the disabled fields as they are
        username: String(formData.username),
        email: String(formData.email),
        tax_id: String(formData.tax_id),
        job_position: String(formData.job_position),
      };

      console.log("Sending updated user data:", updatedUserData);

      // Call the actual API
      const result = await updateUser(userId, updatedUserData);

      console.log("User update successful:", result);
      Swal.fire({
        title: "สำเร็จ",
        text: "แก้ไขผู้ใช้งานสำเร็จ",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/user/list");
    } catch (error: any) {
      Swal.fire({
        title: "แก้ไขผู้ใช้งานไม่สำเร็จ",
        text:
          error.response.data.error.message ||
          error.response.data.message ||
          "เกิดข้อผิดพลาดในการแก้ไขผู้ใช้งาน",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.64))] bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">กำลังโหลดข้อมูลผู้ใช้งาน...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.64))] bg-white">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-6xl">
              {/* Bread Crumb */}
              <div className="text-xs mb-2">
                หน้าแรก {">"} ผู้ใช้งาน {">"}{" "}
                <span className="text-primary"> แก้ไขผู้ใช้งาน</span>
              </div>
              {/* Header */}

              <div className="flex flex-col justify-center items-center mb-5">
                <h1 className="text-3xl font-semibold text-highlight">
                  แก้ไขผู้ใช้งาน
                </h1>
              </div>
              {/* Form */}
              <EditUserForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                initialData={userData}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
