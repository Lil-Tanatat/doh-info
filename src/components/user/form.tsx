import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import formConfig from "@/form/add-user.json";
import { FormField } from "@/components/form-field";
import {
  numberOnly,
  phoneNumberOnly,
  taxIdOnly,
  usernameOnly,
  validatePassword,
  validateUsername,
  validatePhoneNumber,
  validateTaxId,
  // thaiOnly
} from "@/utils/formValidation";

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "select";
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

interface AddUserFormProps {
  className?: string;
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
}

export function AddUserForm({
  className,
  onSubmit,
  isSubmitting,
}: AddUserFormProps) {
  const [formData, setFormData] = React.useState<FormData>({});
  const [errors, setErrors] = React.useState<FormErrors>({});

  const validateField = (field: FormField, value: string | string[]) => {
    if (field.required) {
      if (Array.isArray(value)) {
        return value.length > 0 ? "" : `${field.label} จำเป็นต้องกรอก`;
      }
      if (!value || value.toString().trim() === "") {
        return `${field.label} จำเป็นต้องกรอก`;
      }
    }

    // Additional field-specific validation
    if (typeof value === "string" && value.trim() !== "") {
      switch (field.name) {
        case "password":
          return validatePassword(value);
        case "username":
          return validateUsername(value);
        case "phone":
          return validatePhoneNumber(value);
        case "tax_id":
          return validateTaxId(value);
        default:
          return "";
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
    // Apply validation based on field type
    let processedValue = value;
    if (typeof value === "string") {
      if (name === "tax_id") {
        processedValue = taxIdOnly(value);
      } else if (name === "phone") {
        processedValue = phoneNumberOnly(value);
      } else if (name === "username") {
        processedValue = usernameOnly(value);
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

    // Validate the field immediately after input change
    const field = formSections
      .flatMap((section) => section.fields)
      .find((f) => f.name === name);

    if (field) {
      const fieldError = validateField(field, processedValue);
      if (fieldError) {
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
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
      <Card className="max-w-7xl mx-auto">
        {formSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <CardHeader className="mb-3">
              <div className="text-2xl font-semibold text-gray-800">
                {section.title}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-12 gap-4">
                {section.fields.map((field) => (
                  <FormField
                    key={field.name}
                    {...field}
                    value={formData[field.name] || ""}
                    error={errors[field.name]}
                    onChange={handleInputChange}
                  />
                ))}
              </div>
            </CardContent>
          </div>
        ))}
        <div className="flex justify-center pb-4">
          {Object.keys(errors).length > 0 && (
            <span className="text-destructive text-sm">
              * กรุณากรอกแบบฟอร์มให้ครบ
            </span>
          )}
        </div>
        <div className="flex justify-center pt-6 mb-10">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full max-w-xs bg-highlight text-white rounded-full text-lg"
          >
            {isSubmitting ? "กำลังเพิ่มผู้ใช้งาน..." : "เพิ่มผู้ใช้งาน"}
          </Button>
        </div>
      </Card>
    </form>
  );
}
