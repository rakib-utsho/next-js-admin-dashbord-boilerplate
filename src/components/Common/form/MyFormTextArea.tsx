
"use client";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

export interface MyFormTextAreaProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  onValueChange?: (value: string) => void;
  className?: string;
  labelClassName?: string;
  textareaClassName?: string;
  disabled?: boolean;
  hint?: string;
}

const MyFormTextArea = ({
  name,
  label,
  placeholder = "",
  required = false,
  rows = 4,
  maxLength,
  minLength,
  onValueChange,
  className,
  labelClassName,
  textareaClassName,
  disabled = false,
  hint,
}: MyFormTextAreaProps) => {
  const { control, getValues } = useFormContext();
  const inputValue = useWatch({ control, name }) ?? "";

  useEffect(() => {
    if (onValueChange) {
      onValueChange(inputValue);
    }
  }, [inputValue, onValueChange]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={name} className={cn("font-medium text-sm", labelClassName)}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={getValues(name) ?? ""}
        rules={
          required
            ? {
                required: `${label || "This field"} is required`,
                minLength: minLength
                  ? {
                      value: minLength,
                      message: `Minimum ${minLength} characters required`,
                    }
                  : undefined,
              }
            : {}
        }
        render={({ field, fieldState: { error } }) => (
          <div className="relative">
            <textarea
              {...field}
              id={name}
              placeholder={placeholder}
              rows={rows}
              maxLength={maxLength}
              disabled={disabled}
              className={cn(
                "w-full px-4 py-3 font-normal rounded-md focus:outline-none focus:ring-2 border resize-none",
                "transition-colors duration-200",
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
                disabled && "opacity-50 cursor-not-allowed bg-gray-100",
                textareaClassName
              )}
              value={field.value ?? ""}
            />

            {/* Character Count */}
            {maxLength && (
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                {inputValue.length ?? 0} / {maxLength}
              </div>
            )}

            {/* Hint Text */}
            {hint && !error && (
              <small className="text-gray-500 text-xs mt-1 block">{hint}</small>
            )}

            {/* Error Message */}
            {error && (
              <small className="text-red-500 text-xs mt-1 block">
                {error.message}
              </small>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default MyFormTextArea;
