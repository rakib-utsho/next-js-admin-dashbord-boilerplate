import { toast } from "sonner";
import Swal, { SweetAlertOptions } from "sweetalert2";

/**
 * Alert Service - Provides unified alert/notification system using SweetAlert2 and Sonner
 * Use SweetAlert2 for important confirmations and modal alerts
 * Use Sonner for quick notifications and toasts
 */

// SweetAlert2 Configurations
export const alertSuccess = (
  title: string,
  message?: string,
  options?: SweetAlertOptions
) => {
  return Swal.fire({
    icon: "success",
    title,
    text: message,
    confirmButtonColor: "#10b981",
    allowOutsideClick: false,
    ...options,
  });
};

export const alertError = (
  title: string,
  message?: string,
  options?: SweetAlertOptions
) => {
  return Swal.fire({
    icon: "error",
    title,
    text: message,
    confirmButtonColor: "#ef4444",
    allowOutsideClick: false,
    ...options,
  });
};

export const alertWarning = (
  title: string,
  message?: string,
  options?: SweetAlertOptions
) => {
  return Swal.fire({
    icon: "warning",
    title,
    text: message,
    confirmButtonColor: "#f59e0b",
    allowOutsideClick: false,
    ...options,
  });
};

export const alertInfo = (
  title: string,
  message?: string,
  options?: SweetAlertOptions
) => {
  return Swal.fire({
    icon: "info",
    title,
    text: message,
    confirmButtonColor: "#3b82f6",
    allowOutsideClick: false,
    ...options,
  });
};

/**
 * Confirmation Alert - Used for deletions, critical actions, etc.
 */
export const confirmAlert = (
  title: string,
  message?: string,
  options?: SweetAlertOptions
) => {
  return Swal.fire({
    icon: "question",
    title,
    text: message,
    showCancelButton: true,
    confirmButtonColor: "#3b82f6",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Confirm",
    cancelButtonText: "Cancel",
    allowOutsideClick: false,
    ...options,
  });
};

/**
 * Delete Confirmation - Specialized for delete operations
 */
export const confirmDelete = (
  itemName: string = "this item",
  options?: SweetAlertOptions
) => {
  return Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    text: `You are about to delete ${itemName}. This action cannot be undone.`,
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
    allowOutsideClick: false,
    ...options,
  });
};

/**
 * Loading Alert - Shows loading state
 */
export const showLoading = (title: string = "Loading...") => {
  Swal.fire({
    title,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: async () => {
      await Swal.showLoading();
    },
  });
};

/**
 * Close Alert
 */
export const closeAlert = () => {
  Swal.close();
};

// Sonner Toast Notifications - For quick, non-blocking notifications
export const toastSuccess = (message: string) => {
  toast.success(message, {
    position: "top-center",
    duration: 3000,
  });
};

export const toastError = (message: string) => {
  toast.error(message, {
    position: "top-center",
    duration: 3000,
  });
};

export const toastWarning = (message: string) => {
  toast.warning(message, {
    position: "top-center",
    duration: 3000,
  });
};

export const toastInfo = (message: string) => {
  toast.info(message, {
    position: "top-center",
    duration: 3000,
  });
};

/**
 * Quick notification helper
 */
export const notify = {
  success: toastSuccess,
  error: toastError,
  warning: toastWarning,
  info: toastInfo,
};
