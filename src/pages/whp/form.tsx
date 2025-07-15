import { HealthForm } from "@/components/whp/form";
import { Layout } from "@/components/layout";
import Image from "next/image";
import { IconUserPlus } from "@tabler/icons-react";

export default function HealthEditPage() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.64))] ">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full mx-20">
              {" "}
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
                    <IconUserPlus className="w-10 h-auto" /> เพิ่มพนักงาน
                  </h1>
                </div>
              </div>
              <div className="text-xs mb-2">
                ระบบสุขภาวะ (WHP) {">"}
                <span className="text-primary"> เพิ่มพนักงาน</span>
              </div>
              {/* Header */}
              <div className="mx-26 mt-10">
                <div className="flex flex-row gap-4 mb-5 justify-between">
                  <div className="flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl">ระบบการดำเนินงานสุขภาวะองค์กร</h2>
                      <h1 className="text-4xl text-highlight font-semibold">
                        ระบบคัดกรองสุขภาวะ
                      </h1>
                    </div>
                  </div>

                  <Image
                    src="/images/add-employee.png"
                    alt="logo"
                    width={200}
                    height={300}
                  />
                </div>
                {/* Form */}
                <HealthForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
