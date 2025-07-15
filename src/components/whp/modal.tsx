import * as React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CircleX } from "lucide-react";
import { IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HealthAssessmentResult {
  employeeName: string;
  employeeId: string;
  employeePosition: string;
  result: {
    bmi: number;
    cholesterol: number;
    triglyceride: number;
    bloodSugar: number;
    bloodPressure: number;
    waistCircumference: number;
  }[];
  warning: {
    title: string;
    reccomendation: string;
  }[];
}

interface HealthAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: HealthAssessmentResult;
}

export function HealthAssessmentModal({
  isOpen,
  onClose,
  data,
}: HealthAssessmentModalProps) {
  const router = useRouter();
  // Add event listener for Escape key
  React.useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 opacity-80 bg-black z-40"
        onClick={onClose}
      />
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 max-h-[70vh] w-full max-w-2xl rounded-lg bg-[#015C4B] text-white p-8 shadow-lg overflow-y-auto">
        <div className="grid grid-cols-12 gap-4 items-start">
          <div className="col-span-12 flex justify-end">
            <CircleX
              className="w-8 h-8 cursor-pointer hover:opacity-80"
              onClick={onClose}
            />
          </div>
          <div className="col-span-12 flex flex-row gap-4 items-center justify-center">
            <Image
              src="/images/health-modal-img.png"
              alt="logo"
              width={152}
              height={152}
              className="w-38 h-38"
            />
            <div>
              <h2 className="text-2xl  mb-4">สรุปผลประเมินสุขภาพพนักงาน</h2>

              <div className="space-y-4 mb-6">
                <div className="flex">
                  <span className="w-32 font-semibold">ชื่อพนักงาน :</span>
                  <span>{data.employeeName}</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-semibold">
                    เลขประจำตัวพนักงาน :
                  </span>
                  <span className="">{data.employeeId}</span>
                </div>
                <div className="flex">
                  <span className="w-32 font-semibold">ตำแหน่ง :</span>
                  <span>{data.employeePosition}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white rounded-lg text-black col-span-12 ">
            <div className="flex flex-col items-center justify-center bg-secondary py-4 rounded-t-lg">
              <span className="font-semibold text-white">ผลการประเมิน</span>
            </div>
            <div className="bg-[#ffeec9] py-2">
              {data.warning.map((warning, index) => (
                <div key={index} className="mb-6 mx-auto ">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 justify-center text-red-600">
                    <AlertCircle className="w-7 h-7" /> {warning.title}
                  </h3>
                  <div className="text-sm text-center px-4">
                    {warning.reccomendation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Button */}
        <div className="flex justify-center mt-4">
          <Button
            onClick={() => router.push(`/whp/detail/${data.employeeId}`)}
            className="bg-transparent text-white border-2 border-white hover:bg-white/90 hover:text-highlight px-8 rounded-lg"
          >
            <IconSearch className="w-4 h-4 mr-2" />
            ดูรายละเอียดเพิ่มเติม
          </Button>
        </div>
      </div>
    </>
  );
}
