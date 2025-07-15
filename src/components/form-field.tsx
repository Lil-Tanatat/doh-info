import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/select";
import { MultiSelect } from "@/components/multiselect";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/datepicker";

export interface FormFieldProps {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "select"
    | "multiselect"
    | "textarea"
    | "date";
  required: boolean;
  colSpan: number;
  mobileColSpan?: number;
  options?: { title: string; value: string }[];
  placeholder?: string;
  unit?: string;
  disabled?: boolean;
  value: string | string[];
  error?: string;
  onChange: (name: string, value: string | string[]) => void;
  className?: string;
  autoComplete?: string;
  description?: string;
}

export function FormField({
  name,
  label,
  type,
  required,
  colSpan,
  mobileColSpan,
  options = [],
  placeholder,
  unit,
  disabled = false,
  value,
  error,
  onChange,
  className,
  autoComplete,
  description,
}: FormFieldProps) {
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | string
      | string[]
  ) => {
    if (typeof e === "string" || Array.isArray(e)) {
      onChange(name, e);
    } else {
      onChange(name, e.target.value);
    }
  };

  return (
    <div className={`col-span-${mobileColSpan || 12} lg:col-span-${colSpan}`}>
      <div className="grid gap-2 mt-auto">
        {label && (
          <Label htmlFor={name}>
            {label}
            {required && !disabled && (
              <span className="text-destructive ml-1">*</span>
            )}
            {unit && (
              <span className="text-muted-foreground ml-1">({unit})</span>
            )}
          </Label>
        )}

        {type === "select" ? (
          <Select
            id={name}
            options={options.map((option) => option.title)}
            value={value as string}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder || `เลือก${label}`}
            className={
              error ? "border-destructive cursor-pointer" : "cursor-pointer"
            }
            disabled={disabled}
          />
        ) : type === "multiselect" ? (
          <MultiSelect
            options={options.map((option) => option.title)}
            value={value as string[]}
            onChange={(newValue) => handleChange(newValue)}
            placeholder={placeholder || `เลือก${label}`}
            className={
              error ? "border-destructive cursor-pointer" : "cursor-pointer"
            }
          />
        ) : type === "textarea" ? (
          <Textarea
            id={name}
            value={value as string}
            onChange={handleChange}
            placeholder={placeholder || label}
            className={cn("min-h-[120px]", error ? "border-destructive" : "")}
            rows={6}
            disabled={disabled}
          />
        ) : type === "date" ? (
          <DatePicker
            id={name}
            value={value as string}
            onChange={(newValue) => handleChange(newValue)}
            placeholder={placeholder || label}
            className={error ? "border-destructive" : ""}
          />
        ) : (
          <Input
            id={name}
            type={type}
            value={value as string}
            onChange={handleChange}
            placeholder={placeholder || label}
            className={cn(
              error ? "border-destructive" : "",
              disabled ? "bg-gray-100 cursor-not-allowed" : ""
            )}
            disabled={disabled}
            readOnly={disabled}
            autoComplete={autoComplete}
          />
        )}
        <div
          className={`text-sm text-muted-foreground ${
            description ? "h-8 lg:h-4" : "h-2"
          }`}
        >
          {description && (
            <span className="text-muted-foreground">{description}</span>
          )}
          {/* {error ? <span className="text-destructive">{error}</span> : "\u00A0"} */}
        </div>
      </div>
    </div>
  );
}
