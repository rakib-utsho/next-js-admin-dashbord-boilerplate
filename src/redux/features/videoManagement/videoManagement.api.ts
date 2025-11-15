import baseApi from "@/redux/api/baseApi";
import { TQueryParams } from "@/types/glovalType";

export const videoManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    allVideos: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/posts/getAllPostsForAdmin",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["video"],
    }),
    singleVideos: builder.query({
      query: (id) => {
        return {
          url: `/posts/getSinglePost/${id}`,
          method: "GET"
        };
      },
      providesTags: ['video'],
    }),
    allReportedVideos: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/reports/getAllReports",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Event"],
    }),

    singleReportedVideos: builder.query({
      query: (id) => {
        return {
          url: `/reports/getReport/${id}`,
          method: "GET"
        };
      },
      providesTags: ['video'],
    }),
    removeVideo: builder.mutation({
      query: (data) => ({
        url: `/reports/takeAction/${data.postId}/action`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["video"],
    }),
    banUser: builder.mutation({
      query: (data) => ({
        url: `/dashboard/users/suspend/${data.userId}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["video"],
    }),
  }),
});

export const { useAllVideosQuery, useSingleVideosQuery, useAllReportedVideosQuery, useSingleReportedVideosQuery, useRemoveVideoMutation, useBanUserMutation } = videoManagementApi;
