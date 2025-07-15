import { RegisterForm } from "@/components/register-form";
import { Layout } from "@/components/layout";
import * as React from "react";
import Swal from "sweetalert2";
import router from "next/router";
import { IconUserPlus } from "@tabler/icons-react";
import { useRegister } from "@/hooks/auths/useAuth";
import { AxiosError } from "axios";
import { PageHeader } from "@/components/PageHeader";
import { UserPlus } from "lucide-react";

interface FormData {
  [key: string]: string | string[];
}

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const registerMutation = useRegister();

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      const registrationData = {
        username: formData.username as string,
        password: formData.password as string,
        first_name: formData.first_name as string,
        last_name: formData.last_name as string,
        tax_id: formData.citizen_id as string,
        company: {
          name: formData.org_name as string,
          company_code: formData.org_code as string,
          employee_count: parseInt(formData.employee_total as string),
          organization_size: formData.org_size as string,
          address: formData.org_address as string,
          subdistrict_nm: formData.org_district as string,
          district_nm: formData.org_area as string,
          province_nm: formData.org_province as string,
          zipcode: formData.org_zipcode as string,
          contact_phone: formData.org_phone as string,
          email: formData.org_email as string,
          health_activities: formData.org_activities as string[],
          subdistrict_code: "",
          district_code: "",
          province_code: "",
        },
      };

      console.log("Sending registration data:", registrationData);

      const result = await registerMutation.mutateAsync(registrationData);

      if (result.success) {
        console.log("Registration successful:", result.data);
        Swal.fire({
          title: "สำเร็จ",
          text: "ลงทะเบียนสำเร็จ",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/login");
      } else {
        Swal.fire({
          title: "ลงทะเบียนไม่สำเร็จ",
          text: result.data as string,
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      Swal.fire({
        title: "ลงทะเบียนไม่สำเร็จ",
        text:
          axiosError.response?.data?.message || "เกิดข้อผิดพลาดในการลงทะเบียน",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.64))]">
        <div className="flex flex-col gap-4 p-2 lg:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full mx-3 lg:mx-25">
              {/* Bread Crumb */}
              {/* <div className="text-xs mb-2">
                หน้าแรก {">"} <span className="text-primary"> ลงทะเบียน</span>
              </div> */}
              {/* Header */}
              <PageHeader
                title="สมัครใช้งานระบบข้อมูลสุขภาพวัยทำงาน"
                subtitle="การลงทะเบียนไม่มีค่าใช้จ่าย และสามารถเข้าระบบเพื่อเริ่มต้นใช้งานได้ทันทีหลังการยืนยันอีเมล"
                icon={UserPlus}
              />
              {/* Form */}
              <RegisterForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
