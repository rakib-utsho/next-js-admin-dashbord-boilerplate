/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Validation utilities for form fields
 * Common validators for email, password, phone, etc.
 */

import { z } from "zod";

// Regex patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
  PASSWORD: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  URL: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
};

// Zod schemas for reusable validation
export const emailSchema = z
  .string()
  .email("Invalid email address")
  .min(5, "Email must be at least 5 characters");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character");

export const phoneSchema = z
  .string()
  .regex(PATTERNS.PHONE, "Invalid phone number");

export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must not exceed 20 characters")
  .regex(PATTERNS.USERNAME, "Username can only contain letters, numbers, and underscores");

export const urlSchema = z
  .string()
  .regex(PATTERNS.URL, "Invalid URL");

// Validator functions
export const validators = {
  // Email validation
  isValidEmail: (email: string): boolean => {
    return PATTERNS.EMAIL.test(email);
  },

  // Password validation
  isValidPassword: (password: string): boolean => {
    return PATTERNS.PASSWORD.test(password);
  },

  // Phone validation
  isValidPhone: (phone: string): boolean => {
    return PATTERNS.PHONE.test(phone);
  },

  // Username validation
  isValidUsername: (username: string): boolean => {
    return PATTERNS.USERNAME.test(username);
  },

  // URL validation
  isValidUrl: (url: string): boolean => {
    return PATTERNS.URL.test(url);
  },

  // ZIP code validation
  isValidZipCode: (zipCode: string): boolean => {
    return PATTERNS.ZIP_CODE.test(zipCode);
  },

  // Strong password check
  isStrongPassword: (password: string): {
    isStrong: boolean;
    feedback: string[];
  } => {
    const feedback: string[] = [];

    if (password.length < 8) {
      feedback.push("At least 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
      feedback.push("At least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      feedback.push("At least one lowercase letter");
    }
    if (!/\d/.test(password)) {
      feedback.push("At least one number");
    }
    if (!/[@$!%*?&]/.test(password)) {
      feedback.push("At least one special character");
    }

    return {
      isStrong: feedback.length === 0,
      feedback,
    };
  },

  // Confirm password match
  passwordsMatch: (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  },

  // String length validation
  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },

  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  },

  // Number range validation
  isInRange: (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
  },

  // File size validation (in MB)
  isValidFileSize: (fileSizeMB: number, maxSizeMB: number): boolean => {
    return fileSizeMB <= maxSizeMB;
  },

  // File type validation
  isValidFileType: (file: File, allowedTypes: string[]): boolean => {
    return allowedTypes.includes(file.type);
  },

  // Image file validation
  isValidImage: (file: File, maxSizeMB: number = 5): {
    isValid: boolean;
    error?: string;
  } => {
    const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!validImageTypes.includes(file.type)) {
      return {
        isValid: false,
        error: "Invalid image format. Allowed formats: JPEG, PNG, GIF, WebP",
      };
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      return {
        isValid: false,
        error: `File size exceeds ${maxSizeMB}MB limit`,
      };
    }

    return { isValid: true };
  },

  // Required field validation
  isRequired: (value: any): boolean => {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
  },

  // Number only validation
  isNumberOnly: (value: string): boolean => {
    return /^\d+$/.test(value);
  },

  // Alphanumeric validation
  isAlphanumeric: (value: string): boolean => {
    return /^[a-zA-Z0-9]*$/.test(value);
  },

  // No special characters
  noSpecialCharacters: (value: string): boolean => {
    return /^[a-zA-Z0-9\s]*$/.test(value);
  },

  // Slug validation (for URLs)
  isValidSlug: (value: string): boolean => {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
  },

  // Date in future
  isFutureDate: (date: Date): boolean => {
    return date > new Date();
  },

  // Date in past
  isPastDate: (date: Date): boolean => {
    return date < new Date();
  },

  // Age validation
  isValidAge: (age: number, minAge: number = 18): boolean => {
    return age >= minAge;
  },

  // Credit card validation (Luhn algorithm)
  isValidCreditCard: (cardNumber: string): boolean => {
    const digits = cardNumber.replace(/\D/g, "");
    if (digits.length < 13 || digits.length > 19) return false;

    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i], 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  },
};

// Zod schemas for common forms
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: emailSchema,
  phone: phoneSchema.optional(),
  bio: z.string().max(500, "Bio must not exceed 500 characters").optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });
