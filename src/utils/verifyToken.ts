import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export type TDecodedToken = {
  email: string;
  id: string;
  role: string;
  iat: number;
  exp: number;
};

/**
 * Decodes and validates JWT token
 * @param token - JWT token string
 * @returns Decoded token or null if invalid
 */
export const verifyToken = (
  token: string | null | undefined,
): TDecodedToken | null => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<TDecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

// Deprecated - kept for backward compatibility
export const varifyToken = (token: string) => {
  return jwtDecode(token);
};

/**
 * Checks if token is expired
 * @param token - JWT token string
 * @returns true if expired, false otherwise
 */
export const isTokenExpired = (token: string | null | undefined): boolean => {
  if (!token) {
    return true;
  }

  try {
    const decoded = jwtDecode<TDecodedToken>(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Failed to check token expiration:", error);
    return true;
  }
};

/**
 * Gets time remaining until token expires (in seconds)
 * @param token - JWT token string
 * @returns Remaining time in seconds or 0 if already expired
 */
export const getTokenTimeRemaining = (
  token: string | null | undefined,
): number => {
  if (!token) {
    return 0;
  }

  try {
    const decoded = jwtDecode<TDecodedToken>(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    const timeRemaining = decoded.exp - currentTime;
    return Math.max(0, timeRemaining);
  } catch (error) {
    console.error("Failed to get token time remaining:", error);
    return 0;
  }
};

/**
 * Saves token to cookies
 * @param token - JWT token to save
 * @param expirationDays - Number of days before expiration (default: 7)
 */
export const saveTokenToCookie = (
  token: string,
  expirationDays: number = 7,
) => {
  try {
    Cookies.set("authToken", token, {
      expires: expirationDays,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
  } catch (error) {
    console.error("Failed to save token to cookie:", error);
  }
};

/**
 * Gets token from cookies
 * @returns Token string or null
 */
export const getTokenFromCookie = (): string | null => {
  try {
    return Cookies.get("authToken") || null;
  } catch (error) {
    console.error("Failed to get token from cookie:", error);
    return null;
  }
};

/**
 * Removes token from cookies
 */
export const removeTokenFromCookie = () => {
  try {
    Cookies.remove("authToken");
  } catch (error) {
    console.error("Failed to remove token from cookie:", error);
  }
};

/**
 * Checks if user is authenticated
 * @returns true if valid token exists and not expired
 */
export const isAuthenticated = (): boolean => {
  const token = getTokenFromCookie();
  return !isTokenExpired(token);
};

/**
 * Gets token expiration time as date
 * @param token - JWT token string
 * @returns Date object or null
 */
export const getTokenExpirationDate = (
  token: string | null | undefined,
): Date | null => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<TDecodedToken>(token);
    return new Date(decoded.exp * 1000); // Convert from seconds to milliseconds
  } catch (error) {
    console.error("Failed to get token expiration date:", error);
    return null;
  }
};

/**
 * Formats token expiration time in human-readable format
 * @param token - JWT token string
 * @returns Formatted string like "expires in 2 hours"
 */
export const formatTokenExpiration = (
  token: string | null | undefined,
): string => {
  const timeRemaining = getTokenTimeRemaining(token);

  if (timeRemaining <= 0) {
    return "expired";
  }

  if (timeRemaining < 60) {
    return `expires in ${Math.floor(timeRemaining)} seconds`;
  }

  if (timeRemaining < 3600) {
    return `expires in ${Math.floor(timeRemaining / 60)} minutes`;
  }

  if (timeRemaining < 86400) {
    return `expires in ${Math.floor(timeRemaining / 3600)} hours`;
  }

  return `expires in ${Math.floor(timeRemaining / 86400)} days`;
};

/**
 * Validates token structure and content
 * @param token - JWT token string
 * @returns Object with validation result and error message if invalid
 */
export const validateToken = (
  token: string | null | undefined,
): { isValid: boolean; error?: string } => {
  if (!token) {
    return { isValid: false, error: "Token is missing" };
  }

  if (typeof token !== "string") {
    return { isValid: false, error: "Token must be a string" };
  }

  if (token.split(".").length !== 3) {
    return { isValid: false, error: "Invalid token format" };
  }

  if (isTokenExpired(token)) {
    return { isValid: false, error: "Token is expired" };
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return { isValid: false, error: "Failed to decode token" };
  }

  // Check if required fields exist
  if (!decoded.id || !decoded.email || !decoded.role) {
    return {
      isValid: false,
      error: "Token missing required fields",
    };
  }

  return { isValid: true };
};
