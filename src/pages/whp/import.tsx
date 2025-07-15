import { Layout } from "@/components/layout";
import Image from "next/image";
import {
  IconUserPlus,
  IconUpload,
  IconFileSpreadsheet,
  IconCheck,
  IconX,
  IconChecklist,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import ImportPreviewTable from "@/components/whp/ImportPreviewTable";
import {
  useUploadHealthCheckBatch,
  useConfirmHealthCheckBatch,
} from "@/hooks/employees/useCreateEmployee";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { FileCheck2 } from "lucide-react";

interface ImportedEmployeeData {
  row_number: number;
  employee_code: string;
  tax_id: string;
  first_name: string;
  last_name: string;
  job_position: string;
  birth_date: string;
  gender: string;
  age: string | number;
  nationality: string;
  marital_status: string;
  weight_kg: number | string;
  height_cm: number | string;
  waist_cm: number | string;
  underlying_disease: string;
  bmi: number | string;
  blood_pressure_systolic: number | string;
  blood_pressure_diastolic: number | string;
  blood_sugar: number | string;
  cholesterol: number | string;
  triglyceride: string;
  health_behavior?: string | null;
  status: string;
  remark?: string | null;
}

interface ValidationResponse {
  statusCode: number;
  message: string;
  data: {
    batch_uuid: string;
    total_rows: number;
    rows: Array<{
      row_number: number;
      data: ImportedEmployeeData;
      status: string;
      remark?: string | null;
    }>;
  };
  error: string | null;
}

export default function WHPImportPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<ImportedEmployeeData[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [validationResponse, setValidationResponse] =
    useState<ValidationResponse | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useUploadHealthCheckBatch();
  const confirmMutation = useConfirmHealthCheckBatch();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      parseExcelFile(file);
    }
  };

  const parseExcelFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Skip header row and convert to our format
        const formattedData: ImportedEmployeeData[] = (jsonData as any[])
          .slice(1) // Skip header
          .map((row, index) => ({
            row_number: index + 2, // Excel row number (starting from 2 since 1 is header)
            employee_code: String(row[0] || ""),
            tax_id: String(row[1] || ""),
            first_name: String(row[2] || ""),
            last_name: String(row[3] || ""),
            job_position: String(row[4] || ""),
            birth_date: String(row[5] || ""),
            gender: String(row[6] || ""),
            age: String(row[7] || ""),
            nationality: String(row[8] || ""),
            marital_status: String(row[9] || ""),
            weight_kg: row[10] || "",
            height_cm: row[11] || "",
            waist_cm: row[12] || "",
            underlying_disease: String(row[13] || ""),
            bmi: row[14] || "",
            blood_pressure_systolic: row[15] || "",
            blood_pressure_diastolic: row[16] || "",
            blood_sugar: row[17] || "",
            cholesterol: row[18] || "",
            triglyceride: String(row[19] || ""),
            health_behavior: row[20] ? String(row[20]) : null,
            status: "PENDING",
            remark: null,
          }))
          .filter((row) => row.employee_code); // Filter out empty rows

        setPreviewData(formattedData);
        setIsPreviewMode(true);
        setValidationResponse(null);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text:
            error.response.data.error.message ||
            error.response.data.message ||
            "เกิดข้อผิดพลาดในการอ่านไฟล์ Excel กรุณาตรวจสอบรูปแบบไฟล์",
        });
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      Swal.fire({
        icon: "warning",
        title: "โปรดเลือกไฟล์",
        text: "กรุณาเลือกไฟล์ Excel",
      });
      return;
    }

    setIsUploading(true);

    try {
      const response = await uploadMutation.mutateAsync(selectedFile);
      setValidationResponse(response);

      // Update preview data with validation results
      if (response.data?.rows) {
        const updatedData = response.data.rows.map(
          (row: {
            row_number: number;
            data: ImportedEmployeeData;
            status: string;
            remark?: string | null;
          }) => ({
            ...row.data,
            row_number: row.row_number,
            status: row.status,
            remark: row.remark,
          })
        );
        setPreviewData(updatedData);
      }
    } catch (_error: any) {
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewData([]);
    setIsPreviewMode(false);
    setValidationResponse(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleBackToList = () => {
    router.push("/whp/list");
  };

  const handleConfirmBatch = async () => {
    if (!validationResponse?.data?.batch_uuid) {
      Swal.fire({
        icon: "error",
        title: "ข้อมูลไม่ครบถ้วน",
        text: "ไม่พบ Batch UUID",
      });
      return;
    }

    try {
      await confirmMutation.mutateAsync(validationResponse.data.batch_uuid);
      Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ยืนยันการนำเข้าข้อมูลสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/whp/list");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text:
          error.response.data.error.message ||
          error.response.data.message ||
          "เกิดข้อผิดพลาดในการยืนยันข้อมูล",
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.64))] ">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full mx-20">
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
                    <IconUserPlus className="w-10 h-auto" /> นำเข้าข้อมูลพนักงาน
                  </h1>
                </div>
              </div>
              <div className="text-xs mb-2">
                ระบบสุขภาวะ (WHP) {">"}
                <span className="text-primary"> นำเข้าข้อมูลพนักงาน</span>
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

                {/* Import Excel Section */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <div className="flex flex-col gap-6">
                    {/* Step 1: File Upload */}
                    <div className="border-b pb-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <IconFileSpreadsheet className="w-6 h-6 text-highlight" />
                        ขั้นตอนที่ 1: เลือกไฟล์ Excel
                      </h3>

                      <div className="flex flex-col gap-4">
                        {selectedFile ? (
                          <></>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-highlight transition-colors">
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept=".xlsx,.xls"
                              onChange={handleFileSelect}
                              className="hidden"
                              id="excel-file-input"
                            />
                            <label
                              htmlFor="excel-file-input"
                              className="cursor-pointer"
                            >
                              <IconUpload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                              <p className="text-lg font-semibold text-gray-700 mb-2">
                                คลิกเพื่อเลือกไฟล์ Excel หรือลากไฟล์มาวางที่นี่
                              </p>
                              <p className="text-sm text-gray-500">
                                รองรับไฟล์ .xlsx และ .xls เท่านั้น
                              </p>
                            </label>
                          </div>
                        )}

                        {selectedFile && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              <FileCheck2 className="w-6 h-6 text-green-600" />
                              <div className="flex-1">
                                <p className="font-semibold text-green-800">
                                  {selectedFile.name}
                                </p>
                                <p className="text-sm text-green-600">
                                  ขนาดไฟล์:{" "}
                                  {(selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                                  MB
                                </p>
                              </div>
                              {!validationResponse && (
                                <Button
                                  onClick={handleReset}
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 border-red-600 hover:bg-red-50"
                                >
                                  ลบไฟล์
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Step 2: Preview Data */}
                    {/* {isPreviewMode && (
                      <div className="border-b pb-6">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <IconCheck className="w-6 h-6 text-highlight" />
                          ขั้นตอนที่ 2: ตรวจสอบข้อมูล
                        </h3>

                        <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-blue-800">
                            พบข้อมูลทั้งหมด{" "}
                            <span className="font-bold">
                              {previewData.length}
                            </span>{" "}
                            รายการ กรุณาตรวจสอบข้อมูลก่อนอัพโหลด
                          </p>
                        </div>

                        <ImportPreviewTable
                          data={previewData}
                          itemsPerPage={5}
                        />
                      </div>
                    )} */}

                    {/* Step 3: Upload & Validation Results */}
                    {validationResponse && (
                      <div className="border-b pb-6">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <IconCheck className="w-6 h-6 text-highlight" />
                          ผลการตรวจสอบข้อมูล
                        </h3>

                        <div
                          className={`mb-4 rounded-lg p-4 ${
                            validationResponse.statusCode === 200
                              ? "bg-green-50 border border-green-200"
                              : "bg-red-50 border border-red-200"
                          }`}
                        >
                          <div className="flex flex-row gap-3 items-center">
                            {validationResponse.statusCode === 200 ? (
                              <IconChecklist className="w-6 h-6 text-green-600" />
                            ) : (
                              <IconX className="w-6 h-6 text-red-600" />
                            )}
                            <div className="flex flex-col w-full">
                              <div className="flex flex-row items-center justify-between gap-4">
                                <p
                                  className={`font-semibold ${
                                    validationResponse.statusCode === 200
                                      ? "text-green-800"
                                      : "text-red-800"
                                  }`}
                                >
                                  {validationResponse.message}
                                </p>
                                <p
                                  className={`text-sm ${
                                    validationResponse.statusCode === 200
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {/* Batch UUID:{" "}
                                  {validationResponse.data?.batch_uuid} */}
                                </p>
                              </div>
                              <p
                                className={`text-sm ${
                                  validationResponse.statusCode === 200
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                จำนวนรายการทั้งหมด:{" "}
                                {validationResponse.data?.total_rows}
                              </p>
                            </div>
                          </div>
                        </div>

                        <ImportPreviewTable
                          data={previewData}
                          itemsPerPage={10}
                        />
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-end">
                      <Button
                        onClick={handleBackToList}
                        variant="outline"
                        className="px-6 py-2 bg-white"
                      >
                        ยกเลิกการนำเข้าข้อมูล
                      </Button>

                      {isPreviewMode && !validationResponse && (
                        <Button
                          onClick={handleUpload}
                          disabled={isUploading || !selectedFile}
                          className="bg-highlight text-white px-6 py-2 flex items-center gap-2"
                        >
                          {isUploading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              กำลังอัพโหลด...
                            </>
                          ) : (
                            <>
                              <IconUpload className="w-4 h-4" />
                              อัพโหลดและตรวจสอบข้อมูล
                            </>
                          )}
                        </Button>
                      )}

                      {validationResponse && (
                        <Button
                          onClick={handleConfirmBatch}
                          disabled={confirmMutation.isPending}
                          className="bg-highlight text-white px-6 py-2 flex items-center gap-2"
                        >
                          {confirmMutation.isPending ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              กำลังยืนยัน...
                            </>
                          ) : (
                            <>
                              <IconCheck className="w-5 h-5" />
                              ยืนยันการนำเข้าข้อมูล
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
