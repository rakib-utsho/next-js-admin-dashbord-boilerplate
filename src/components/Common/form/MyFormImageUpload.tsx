"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { AiOutlineDelete, AiOutlineUpload } from "react-icons/ai";

export interface MyFormImageUploadProps {
  name: string;
  label?: string;
  required?: boolean;
  multiple?: boolean;
  acceptType?: string;
  maxFileSize?: number; // in MB
  uploadPlaceholder?: string;
  onValueChange?: (files: File | File[] | null) => void;
  className?: string;
  labelClassName?: string;
  containerClassName?: string;
  disabled?: boolean;
}

const MyFormImageUpload = ({
  name,
  label,
  required = false,
  multiple = false,
  acceptType = "image/*",
  maxFileSize = 5, // 5MB default
  uploadPlaceholder = "Click to upload image",
  onValueChange,
  className,
  labelClassName,
  containerClassName,
  disabled = false,
}: MyFormImageUploadProps) => {
  const { control, getValues, setValue } = useFormContext();
  const fileValue = useWatch({ control, name });
  const [previews, setPreviews] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (onValueChange) {
      onValueChange(fileValue ?? null);
    }
  }, [fileValue, onValueChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setErrorMessage("");

    if (!files || files.length === 0) {
      return;
    }

    // Validate file size
    const maxSizeBytes = maxFileSize * 1024 * 1024;
    for (const file of Array.from(files)) {
      if (file.size > maxSizeBytes) {
        setErrorMessage(`File size must be less than ${maxFileSize}MB`);
        return;
      }
    }

    // Handle multiple or single file
    if (multiple) {
      setValue(name, Array.from(files));
      const newPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(newPreviews);
    } else {
      const file = files[0];
      setValue(name, file);
      setPreviews([URL.createObjectURL(file)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    if (multiple) {
      const currentFiles = fileValue as File[];
      const updatedFiles = currentFiles.filter((_, i) => i !== index);
      setValue(name, updatedFiles);
      setPreviews(previews.filter((_, i) => i !== index));
    } else {
      setValue(name, null);
      setPreviews([]);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label
          htmlFor={name}
          className={cn("font-medium text-sm", labelClassName)}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={getValues(name) ?? (multiple ? [] : null)}
        rules={
          required
            ? {
                required: `${label || "Image"} is required`,
              }
            : {}
        }
        render={({ field, fieldState: { error } }) => (
          <div className="relative">
            {/* Upload Area */}
            {previews.length === 0 ? (
              <label
                htmlFor={name}
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer",
                  "transition-colors duration-200 hover:border-blue-500 hover:bg-blue-50",
                  error
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-gray-50",
                  disabled && "opacity-50 cursor-not-allowed",
                  containerClassName
                )}
              >
                <AiOutlineUpload size={32} className="text-gray-400 mb-2" />
                <p className="text-center text-gray-600 font-medium">
                  {uploadPlaceholder}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Max file size: {maxFileSize}MB
                </p>
                <input
                  {...field}
                  type="file"
                  id={name}
                  accept={acceptType}
                  multiple={multiple}
                  onChange={handleFileChange}
                  disabled={disabled}
                  className="hidden"
                />
              </label>
            ) : (
              <>
                {/* Preview Images */}
                <div className={cn(
                  "grid gap-4",
                  multiple ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4" : "grid-cols-1"
                )}>
                  {previews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative group rounded-lg overflow-hidden border border-gray-200"
                    >
                      <div className="relative w-full h-32">
                        <Image
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        disabled={disabled}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <AiOutlineDelete size={16} />
                      </button>
                    </div>
                  ))}

                  {/* Add More (only if multiple) */}
                  {multiple && (
                    <label
                      htmlFor={name}
                      className={cn(
                        "border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer",
                        "transition-colors hover:border-blue-500 hover:bg-blue-50 h-32",
                        disabled && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <AiOutlineUpload size={24} className="text-gray-400" />
                      <p className="text-xs text-gray-500 mt-1">Add more</p>
                      <input
                        type="file"
                        id={name}
                        accept={acceptType}
                        multiple
                        onChange={handleFileChange}
                        disabled={disabled}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Re-upload Option */}
                {!multiple && (
                  <label
                    htmlFor={name}
                    className="mt-4 text-sm text-blue-500 cursor-pointer hover:underline"
                  >
                    Change image
                    <input
                      type="file"
                      id={name}
                      accept={acceptType}
                      onChange={handleFileChange}
                      disabled={disabled}
                      className="hidden"
                    />
                  </label>
                )}
              </>
            )}

            {/* Error Messages */}
            {error && (
              <small className="text-red-500 text-xs mt-2 block">
                {error.message}
              </small>
            )}
            {errorMessage && (
              <small className="text-red-500 text-xs mt-2 block">
                {errorMessage}
              </small>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default MyFormImageUpload;
