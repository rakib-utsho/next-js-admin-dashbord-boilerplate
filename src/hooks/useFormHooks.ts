/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Custom hooks for form handling and validation
 * Provides reusable logic for common form operations
 */

import { useCallback, useState } from "react";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";

/**
 * Hook for handling form submission state
 */
export const useFormSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startSubmit = useCallback(() => {
    setIsSubmitting(true);
  }, []);

  const endSubmit = useCallback(() => {
    setIsSubmitting(false);
  }, []);

  return { isSubmitting, startSubmit, endSubmit };
};

/**
 * Hook for handling API response errors and setting form errors
 */
export const useFormError = <TFieldValues extends FieldValues>(
  setError: UseFormSetError<TFieldValues>
) => {
  const handleApiError = useCallback(
    (error: any, defaultMessage: string = "An error occurred") => {
      if (error?.data?.message) {
        // Handle RTK Query error
        if (error.data.errors && typeof error.data.errors === "object") {
          // Multiple field errors
          Object.entries(error.data.errors).forEach(([field, message]) => {
            setError(field as Path<TFieldValues>, {
              type: "manual",
              message: String(message),
            });
          });
        } else {
          // Single error message
          setError("root" as Path<TFieldValues>, {
            type: "manual",
            message: error.data.message,
          });
        }
      } else if (error?.message) {
        setError("root" as Path<TFieldValues>, {
          type: "manual",
          message: error.message,
        });
      } else {
        setError("root" as Path<TFieldValues>, {
          type: "manual",
          message: defaultMessage,
        });
      }
    },
    [setError]
  );

  return { handleApiError };
};

/**
 * Hook for form state persistence
 */
export const useFormPersist = (key: string) => {
  const saveFormState = useCallback((data: any) => {
    try {
      localStorage.setItem(`form_${key}`, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save form state:", error);
    }
  }, [key]);

  const getFormState = useCallback(() => {
    try {
      const data = localStorage.getItem(`form_${key}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Failed to get form state:", error);
      return null;
    }
  }, [key]);

  const clearFormState = useCallback(() => {
    try {
      localStorage.removeItem(`form_${key}`);
    } catch (error) {
      console.error("Failed to clear form state:", error);
    }
  }, [key]);

  return { saveFormState, getFormState, clearFormState };
};

/**
 * Hook for handling file uploads
 */
export const useFileUpload = (maxSizeMB: number = 5) => {
  const [errors, setErrors] = useState<string[]>([]);

  const validateFile = useCallback(
    (file: File, allowedTypes: string[] = ["image/jpeg", "image/png", "image/gif"]): boolean => {
      const newErrors: string[] = [];

      if (!allowedTypes.includes(file.type)) {
        newErrors.push(
          `File type not allowed. Allowed types: ${allowedTypes.join(", ")}`
        );
      }

      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        newErrors.push(`File size must be less than ${maxSizeMB}MB`);
      }

      setErrors(newErrors);
      return newErrors.length === 0;
    },
    [maxSizeMB]
  );

  const getFilePreview = useCallback((file: File): string => {
    return URL.createObjectURL(file);
  }, []);

  return { validateFile, getFilePreview, errors, setErrors };
};

/**
 * Hook for debounced form field watch
 */
export const useDebouncedFormWatch = (
  callback: (value: any) => void,
  delay: number = 500
) => {
  const [debouncedValue, setDebouncedValue] = useState(null);

  const handleDebouncedChange = useCallback(
    (value: any) => {
      const timeoutId = setTimeout(() => {
        setDebouncedValue(value);
        callback(value);
      }, delay);

      return () => clearTimeout(timeoutId);
    },
    [delay, callback]
  );

  return { debouncedValue, handleDebouncedChange };
};

/**
 * Hook for form validation state
 */
export const useFormValidationState = () => {
  const [validatedFields, setValidatedFields] = useState<Set<string>>(
    new Set()
  );

  const markFieldAsValidated = useCallback((fieldName: string) => {
    setValidatedFields((prev) => new Set(prev).add(fieldName));
  }, []);

  const isFieldValidated = useCallback(
    (fieldName: string) => validatedFields.has(fieldName),
    [validatedFields]
  );

  const clearValidation = useCallback(() => {
    setValidatedFields(new Set());
  }, []);

  return {
    validatedFields,
    markFieldAsValidated,
    isFieldValidated,
    clearValidation,
  };
};
