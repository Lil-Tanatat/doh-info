import { Layout } from "@/components/layout";
import * as React from "react";
import { Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResetPassword } from "@/hooks/auths/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resetPasswordMutation = useResetPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        title: "ข้อมูลไม่ครบถ้วน",
        text: "กรุณากรอกอีเมลของคุณ",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await resetPasswordMutation.mutateAsync({ email });

      if (result.success) {
        Swal.fire({
          title: "ส่งอีเมลสำเร็จ",
          text: "เราได้ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        setEmail(""); // Clear the form
      } else {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: result.data as string,
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    } catch {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถส่งอีเมลรีเซ็ตรหัสผ่านได้",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    } finally {
      setIsSubmitting(false);
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
                    <Lock className="w-10 h-auto" /> ลืมรหัสผ่าน
                  </h1>
                </div>
              </div>
              {/* <div className="text-xs mb-2">
                User Setting {">"}
                <span className="text-primary"> ลืมรหัสผ่าน</span>
              </div> */}

              {/* Form */}
              <Card className="max-w-7xl mx-auto">
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className="mb-3 flex flex-col gap-2 items-center justify-center">
                      <div className="text-2xl font-semibold text-gray-800">
                        ลืมรหัสผ่านของคุณใช่ไหม?
                      </div>
                      <div>
                        โปรดกรอกอีเมลของคุณ
                        แล้วเราจะส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปให้
                      </div>
                      <div className=" text-secondary">
                        กรณีผู้ดูแลระบบลืมรหัสผ่าน
                        กรุณาติดต่อผู้จัดการระบบของสถานประกอบการของท่าน
                      </div>
                    </div>
                    <CardContent>
                      <div className="flex flex-col gap-2 items-center justify-center">
                        <div className="w-3/4">
                          <label htmlFor="email" className="">
                            อีเมล
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="อีเมล"
                            className=""
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />{" "}
                          <div className=" text-sm text-muted-foreground mt-2">
                            กรอกอีเมลสำหรับสิทธิ์ผู้จัดการระบบเท่านั้น
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>

                  <div className="flex justify-center pb-0">
                    {/* <span className="text-destructive text-sm">
                        * กรุณากรอกแบบฟอร์มให้ครบ
                      </span> */}
                  </div>
                  <div className="flex justify-center pt-2 my-10">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className=" max-w-xs px-3 py-2 bg-highlight text-white rounded-xl text-lg"
                    >
                      {isSubmitting
                        ? "กำลังส่งคำขอรีเซ็ตรหัสผ่าน..."
                        : "ส่งคำขอรีเซ็ตรหัสผ่าน"}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
