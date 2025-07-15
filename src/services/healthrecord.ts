import api from "../configuration/axios";

export interface HealthCheckReportData {
  employee_code: string;
  tax_id: string;
  first_name: string;
  last_name: string;
  job_position: string;
  birth_date: string;
  gender: string;
  age: number;
  nationality: string;
  marital_status: string;
  weight_kg: number;
  height_cm: number;
  waist_cm: number;
  underlying_disease: string;
  blood_pressure_systolic: number;
  blood_pressure_diastolic: number;
  blood_sugar: number;
  cholesterol: number;
  triglyceride: number;
  health_behavior: string;
}

export const getHealthCheckReport = async (id: string) => {
  const response = await api.get(`/healthcheck-report/${id}`);
  return response.data.data;
};

export const getAllHealthCheckReports = async (round_year_month?: string) => {
  const queryParam = round_year_month
    ? `?round_year_month=${round_year_month}`
    : "";
  const response = await api.get(`/healthcheck-report${queryParam}`);
  return response.data.data;
};

export const uploadHealthCheckBatch = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(
    "/healthcheck-report/upload-batch",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const confirmHealthCheckBatch = async (batch_uuid: string) => {
  const response = await api.post("/healthcheck-report/confirm-batch", {
    batch_uuid: batch_uuid,
  });
  return response.data;
};

export const createHealthCheckReport = async (data: HealthCheckReportData) => {
  const response = await api.post("/healthcheck-report", data);
  return response.data;
};

export const getMonthFilterMD = async () => {
  const response = await api.get("/health_checks_grouped");
  return response.data.data;
};
