import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import formConfig from "@/form/register.json";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { FormField } from "@/components/form-field";
import {
  numberOnly,
  // thaiOnly
} from "@/utils/formValidation";

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "select" | "multiselect";
  required: boolean;
  colSpan: number;
  options?: { title: string; value: string }[];
}

interface FormSection {
  title: string;
  fields: FormField[];
}

const formSections: FormSection[] = formConfig.formSections as FormSection[];

interface FormData {
  [key: string]: string | string[];
}

interface FormErrors {
  [key: string]: string;
}

interface RegisterFormProps {
  className?: string;
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
}

export function RegisterForm({
  className,
  onSubmit,
  isSubmitting,
}: RegisterFormProps) {
  const [formData, setFormData] = React.useState<FormData>({});
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [termsError, setTermsError] = React.useState("");

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

    // Validate terms acceptance
    if (!termsAccepted) {
      setTermsError("กรุณายอมรับเงื่อนไขและบริการ");
    } else {
      setTermsError("");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && termsAccepted;
  };

  const handleInputChange = (name: string, value: string | string[]) => {
    // Apply validation based on field type
    let processedValue = value;
    if (typeof value === "string") {
      if (
        name === "org_phone" ||
        name === "org_zipcode" ||
        name === "citizen_id"
      ) {
        processedValue = numberOnly(value);
      }
      // else if (name === "first_name" || name === "last_name") {
      //   processedValue = thaiOnly(value);
      // }
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Check if all required fields are now filled and clear all errors if so
    const updatedFormData = { ...formData, [name]: processedValue };
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

  const handleTermsChange = (checked: boolean) => {
    setTermsAccepted(checked);
    if (checked && termsError) {
      setTermsError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form className={cn("space-y-8", className)} onSubmit={handleSubmit}>
      <Card className=" mx-auto">
        {formSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <CardHeader className="mb-3">
              <div className="text-xl font-bold text-gray-800">
                {section.title}
              </div>
            </CardHeader>
            <CardContent>
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
        <div className="flex justify-center pb-4">
          {(Object.keys(errors).length > 0 || termsError) && (
            <span className="text-destructive text-sm">
              * กรุณากรอกแบบฟอร์มให้ครบถ้วน
            </span>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4 lg:gap-2">
            <Checkbox
              className={cn(
                "w-5 h-5 bg-white",
                termsError &&
                  "border-red-500 data-[state=unchecked]:border-red-500"
              )}
              checked={termsAccepted}
              onCheckedChange={handleTermsChange}
            />
            <div className="text-sm lg:text-md flex flex-col lg:flex-row gap-2">
              ฉันยอมรับ ข้อกำหนดเงื่อนไขและบริการ
              <Link
                className="text-primary cursor-pointer underline underline-offset-2"
                href="https://anamai.moph.go.th/th/privacy-policy"
                target="_blank"
              >
                ดูรายละเอียดเพิ่มเติมได้ที่
              </Link>
            </div>
          </div>
          {termsError && (
            <span className="text-red-500 text-sm">{termsError}</span>
          )}
        </div>
        <div className="flex justify-center pt-6 mb-10">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full max-w-xs bg-secondary text-white rounded-full text-lg"
          >
            {isSubmitting ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
          </Button>
        </div>
      </Card>
    </form>
  );
}
