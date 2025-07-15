import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import formConfig from "@/form/health-form.json";
import { HealthAssessmentModal } from "./modal";
import resultData from "@/data/result.json";
import { FormField } from "@/components/form-field";
import { useCreateHealthCheckReport } from "@/hooks/employees/useCreateEmployee";
import { HealthCheckReportData } from "@/services/healthrecord";
import { useRouter } from "next/navigation";

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "select" | "multiselect" | "textarea" | "date";
  required: boolean;
  colSpan: number;
  options?: { title: string; value: string }[];
  placeholder?: string;
  unit?: string;
}

interface FormSection {
  title: string;
  fields: FormField[];
}

interface FormData {
  [key: string]: string | string[];
}

interface FormErrors {
  [key: string]: string;
}

interface HealthAssessmentResult {
  employeeName: string;
  employeeId: string;
  employeePosition: string;
  result: Array<{
    bmi: number;
    cholesterol: number;
    triglyceride: number;
    bloodSugar: number;
    bloodPressure: number;
    waistCircumference: number;
  }>;
  warning: Array<{
    title: string;
    reccomendation: string;
  }>;
}



const INITIAL_FORM_DATA: FormData = {
  employee_code: "",
  tax_id: "",
  first_name: "",
  last_name: "",
  birth_date: "",
  age: "",
  nationality: "",
  marital_status: "",
  gender: "",
  phone_number: "",
  email: "",
  address: "",
  job_position: "",
  weight_kg: "",
  height_cm: "",
  bmi: "",
  blood_sugar: "",
  cholesterol: "",
  triglyceride: "",
  blood_pressure_systolic: "",
  blood_pressure_diastolic: "",
  waist_cm: "",
  health_behavior: "",
  underlying_disease: "",
};

const formSections: FormSection[] = formConfig.formSections as FormSection[];

export function HealthForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [formData, setFormData] = React.useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [assessmentData, setAssessmentData] =
    React.useState<HealthAssessmentResult | null>(null);

  const createHealthCheckMutation = useCreateHealthCheckReport();
  const router = useRouter();

  const onCloseModal = () => {
    // setShowModal(false);
    setAssessmentData(null);
    router.push("/whp/list");
  };

  const validateField = (field: FormField, value: string | string[]) => {
    if (field.required) {
      if (field.type === "multiselect") {
        return Array.isArray(value) && value.length > 0
          ? ""
          : `${field.label} จำเป็นต้องเลือก`;
      } else {
        return value && value.toString().trim() !== ""
          ? ""
          : `${field.label} จำเป็นต้องกรอก`;
      }
    }
    return "";
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        const value = formData[field.name];
        const error = validateField(field, value);
        if (error) {
          newErrors[field.name] = error;
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Auto-calculate BMI when weight_kg and height_cm are entered
    if (name === "weight_kg" || name === "height_cm") {
      const weight =
        name === "weight_kg"
          ? parseFloat(value as string)
          : parseFloat((formData.weight_kg as string) || "0");
      const height =
        name === "height_cm"
          ? parseFloat(value as string)
          : parseFloat((formData.height_cm as string) || "0");

      if (weight > 0 && height > 0) {
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        setFormData((prev) => ({ ...prev, bmi }));
      }
    }

    // Check if all required fields are now filled and clear all errors if so
    const updatedFormData = { ...formData, [name]: value };

    // If BMI was auto-calculated, include it in the validation
    if (name === "weight_kg" || name === "height_cm") {
      const weight =
        name === "weight_kg"
          ? parseFloat(value as string)
          : parseFloat((formData.weight_kg as string) || "0");
      const height =
        name === "height_cm"
          ? parseFloat(value as string)
          : parseFloat((formData.height_cm as string) || "0");

      if (weight > 0 && height > 0) {
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        updatedFormData.bmi = bmi;
      }
    }

    const newErrors: FormErrors = {};

    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        const fieldValue = updatedFormData[field.name];
        const error = validateField(field, fieldValue);
        if (error) {
          newErrors[field.name] = error;
        }
      });
    });

    // If no validation errors, clear the errors state
    if (Object.keys(newErrors).length === 0) {
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Transform form data to match API structure
      const apiData: HealthCheckReportData = {
        employee_code: formData.employee_code as string,
        tax_id: formData.tax_id as string,
        first_name: formData.first_name as string,
        last_name: formData.last_name as string,
        job_position: formData.job_position as string,
        birth_date: formData.birth_date as string,
        gender: formData.gender as string,
        age: parseInt(formData.age as string) || 0,
        nationality: formData.nationality as string,
        marital_status: formData.marital_status as string,
        weight_kg: parseFloat(formData.weight_kg as string) || 0,
        height_cm: parseFloat(formData.height_cm as string) || 0,
        waist_cm: parseFloat(formData.waist_cm as string) || 0,
        underlying_disease: formData.underlying_disease as string,
        blood_pressure_systolic:
          parseInt(formData.blood_pressure_systolic as string) || 0,
        blood_pressure_diastolic:
          parseInt(formData.blood_pressure_diastolic as string) || 0,
        blood_sugar: parseFloat(formData.blood_sugar as string) || 0,
        cholesterol: parseFloat(formData.cholesterol as string) || 0,
        triglyceride: parseFloat(formData.triglyceride as string) || 0,
        health_behavior: formData.health_behavior as string,
      };

      // Send data to API
      const result = await createHealthCheckMutation.mutateAsync(apiData);

      console.log("Health check report created:", result);

      // Use data from result.json for the modal (keeping existing behavior)
      const jsonData = resultData[0];
      const transformedData = {
        employeeName: jsonData.employeeName,
        employeeId: jsonData.employeeId,
        employeePosition: jsonData.employeePosition,
        result: [jsonData.result],
        warning: jsonData.warning,
      };

      setAssessmentData(transformedData);
      setShowModal(true);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        className={cn("space-y-8", className)}
        onSubmit={handleSubmit}
        {...props}
      >
        <Card className=" w-full p-0">
          {formSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <CardHeader className="mb-3 p-0">
                <CardTitle className="text-2xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-12 gap-4">
                  {section.fields.map((field) => (
                    <FormField
                      key={field.name}
                      {...field}
                      value={
                        formData[field.name] ||
                        (field.type === "multiselect" ? [] : "")
                      }
                      error={errors[field.name]}
                      onChange={handleInputChange}
                    />
                  ))}
                </div>
              </CardContent>
            </div>
          ))}

          <div className="flex flex-row justify-between pt-6 mb-10 mx-5">
            <div>
              {Object.keys(errors).length > 0 && (
                <span className="text-destructive">
                  * กรุณากรอกแบบฟอร์มให้ครบ
                </span>
              )}
            </div>
            <div className="flex flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                className="bg-white max-w-xs rounded-full"
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="max-w-xs bg-highlight text-white rounded-full"
              >
                {isSubmitting ? "กำลังบันทึก..." : "บันทึกและประมวลผล"}
              </Button>
            </div>
          </div>
        </Card>
      </form>

      {assessmentData && (
        <HealthAssessmentModal
          isOpen={showModal}
          onClose={onCloseModal}
          data={assessmentData}
        />
      )}
    </>
  );
}
