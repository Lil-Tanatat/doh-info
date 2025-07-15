import { Layout } from "@/components/layout";
import * as React from "react";
import { Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSetNewPassword } from "@/hooks/auths/useAuth";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ForgotPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setNewPasswordMutation = useSetNewPassword();
  const router = useRouter();

  // Extract access token from URL hash fragment
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1)); // Remove the # symbol
      const token = params.get("access_token");
      if (token) {
        setAccessToken(token);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      Swal.fire({
        title: "ข้อมูลไม่ครบถ้วน",
        text: "กรุณากรอกรหัสผ่านของคุณ",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    if (!confirmPassword) {
      Swal.fire({
        title: "ข้อมูลไม่ครบถ้วน",
        text: "กรุณายืนยันรหัสผ่านของคุณ",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        title: "รหัสผ่านไม่ตรงกัน",
        text: "โปรดใส่รหัสผ่านให้ตรงกัน",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    if (!accessToken) {
      Swal.fire({
        title: "ข้อผิดพลาด",
        text: "ไม่พบ access token กรุณาตรวจสอบลิงก์ที่คุณคลิก",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await setNewPasswordMutation.mutateAsync({
        password,
        accessToken,
      });

      if (result.success) {
        Swal.fire({
          title: "เปลี่ยนรหัสผ่านสำเร็จ",
          text: "รหัสผ่านของคุณได้ถูกเปลี่ยนเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        setPassword(""); // Clear the form
        setConfirmPassword("");
        router.push("/login");
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
        text: "ไม่สามารถเปลี่ยนรหัสผ่านได้",
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
                    <Lock className="w-10 h-auto" /> เปลี่ยนรหัสผ่าน
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
                    <div className="mb-3 flex flex-col gap-2 items-center justify-center"></div>
                    <CardContent>
                      <div className="flex flex-col gap-6 items-center justify-center">
                        <div className="w-1/2">
                          <label htmlFor="password" className="">
                            รหัสผ่าน
                          </label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="รหัสผ่าน"
                            className=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />{" "}
                        </div>
                        <div className="w-1/2">
                          <label htmlFor="confirmPassword" className="">
                            ยืนยันรหัสผ่าน
                          </label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="ยืนยันรหัสผ่าน"
                            className=""
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />{" "}
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
                      {isSubmitting ? "กำลังเปลี่ยนรหัสผ่าน..." : "ยืนยัน"}
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
