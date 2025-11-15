/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserStatistics: builder.query<any, void>({
      query: () => ({
        url: "/users/statistics",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserStatisticsQuery } = userApi;
