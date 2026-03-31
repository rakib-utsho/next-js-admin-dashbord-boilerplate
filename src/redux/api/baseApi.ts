/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is not set");
}

/**
 * Custom fetch base query with error handling
 */
const baseQueryWithErrorHandling: BaseQueryFn = async (
  args,
  api,
  extraOptions,
) => {
  const result = await fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state?.auth?.token;

      if (token) {
        headers.set("Authorization", `${token}`);
      }

      return headers;
    },
  })(args, api, extraOptions);

  // Handle error responses
  if (result.error) {
    const status = result.error.status;

    // Handle 401 Unauthorized - logout user
    if (status === 401) {
      // Dispatch logout action here if needed
      console.warn("Unauthorized - Token may be expired");
    }

    // Handle 403 Forbidden
    if (status === 403) {
      console.warn("Access Forbidden");
    }

    // Handle 404 Not Found
    if (status === 404) {
      console.warn("Resource not found");
    }

    // Handle 500 Server Error
    if (status === 500) {
      console.error("Server Error");
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithErrorHandling,

  tagTypes: [
    "User",
    "Event",
    "Video",
    "Competitions",
    "Content",
    "Tasks",
    "Challenges",
    "BoostedCampaigns",
    "Settings",
    "Dashboard",
  ],

  endpoints: (builder) => ({}),
});

export default baseApi;
