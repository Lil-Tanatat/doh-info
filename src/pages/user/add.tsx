import { AddUserForm } from "@/components/user/form";
import { Layout } from "@/components/layout";
import * as React from "react";
import Swal from "sweetalert2";
import router from "next/router";
import { UserPlus } from "lucide-react";
import { useCreateUser } from "@/hooks/users/useCreateUser";

interface FormData {
  [key: string]: string | string[];
}

export default function AddUserPage() {
  const createUserMutation = useCreateUser();

  const handleSubmit = async (formData: FormData) => {
    try {
      // Prepare the user data according to API requirements
      const userData = {
        username: formData.username as string,
        password: formData.password as string,
        first_name: formData.first_name as string,
        last_name: formData.last_name as string,
        tax_id: formData.tax_id as string,
        phone: formData.phone as string,
        job_position: formData.job_position as string,
      };

      console.log("Sending user data:", userData);

      // Call the API
      await createUserMutation.mutateAsync(userData);

      console.log("User creation successful:", userData);
      Swal.fire({
        title: "สำเร็จ",
        text: "เพิ่มผู้ใช้งานสำเร็จ",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/user/list"); // Redirect to user list page
    } catch (error: any) {
      Swal.fire({
        title: "เพิ่มผู้ใช้งานไม่สำเร็จ",
        text:
          error.response.data.error.message ||
          error.response.data.message ||
          "เกิดข้อผิดพลาดในการเพิ่มผู้ใช้งาน",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.64))] ">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full mx-25">
              {/* Bread Crumb */}
              <div
                className="flex flex-row gap-4 justify-center text-primary-foreground py-10 rounded-b-3xl mb-5"
                style={{
                  backgroundImage: "url('/images/header-bg.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="flex flex-col items-center text-center min-h-24">
                  <h1 className="text-4xl font-semibold flex flex-row gap-2 items-center justify-center my-auto">
                    <UserPlus className="w-10 h-auto" /> เพิ่มผู้ใช้งานใหม่
                  </h1>
                </div>
              </div>
              <div className="text-xs mb-2">
                User Setting {">"}
                <span className="text-primary"> เพิ่มผู้ใช้งาน</span>
              </div>

              {/* Form */}
              <AddUserForm
                onSubmit={handleSubmit}
                isSubmitting={createUserMutation.isPending}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
