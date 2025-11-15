import baseApi from "@/redux/api/baseApi";

export const competitionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    demo: builder.mutation({
      query: (credentials) => ({
        url: "/demo",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Competitives"],
    }),

    getAllCompetitive: builder.query({
      query: (params) => ({
        url: "/competitives/getAllCompetitive",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...(params.searchTerm && { searchTerm: params.searchTerm }),
        },
      }),

      providesTags: ["Competitives"],
      // Important: This ensures the cache updates when parameters change
      // providesTags: (result, error, arg) => [
      //   { type: "Competition", id: "LIST" },
      // ],
    }),
    getAllFreeStyle: builder.query({
      query: (params) => ({
        url: "/freeStyle/getBattles",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...(params.searchTerm && { searchTerm: params.searchTerm }),
        },
      }),

      providesTags: ["Competitives"],
    }),

    getGetWinner: builder.query({
      query: (competitiveId) => {
        return {
          url: `/competitives/${competitiveId}`,
          method: "GET",
        };
      },
      providesTags: ["Competitives"],
    }),
    getBattle: builder.query({
      query: (competitiveId) => {
        return {
          url: `/freeStyle/getBattle/${competitiveId}`,
          method: "GET",
        };
      },
      providesTags: (result, error, competitiveId) => [
        { type: "Competitives", id: competitiveId },
      ],
    }),
    deleteCompetition: builder.mutation({
      query: (competitiveId) => ({
        url: `/competitives/delete/${competitiveId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Competitives"],
    }),
    hideFreestyleOne: builder.mutation({
      query: (competitiveId) => ({
        url: `/dashboard/users/hideFreestyle/${competitiveId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Competitives"],
    }),

    createCompetition: builder.mutation({
      query: (credentials) => ({
        url: "/competitives/createCompetitive",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Competitives"],
    }),
    updateCompetition: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/competitives/updateCompetitive/${id}`,
        method: "PATCH",
        body: credentials,
      }),
      invalidatesTags: ["Competitives"],
    }),
  }),
});

export const {
  useDemoMutation,
  useGetAllCompetitiveQuery,
  useGetGetWinnerQuery,
  useDeleteCompetitionMutation,
  useCreateCompetitionMutation,
  useUpdateCompetitionMutation,
  useGetAllFreeStyleQuery,
  useGetBattleQuery,
  useHideFreestyleOneMutation,
} = competitionsApi;
