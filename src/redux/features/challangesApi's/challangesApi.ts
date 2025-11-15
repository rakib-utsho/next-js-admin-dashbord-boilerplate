import baseApi from "@/redux/api/baseApi";

export const challengesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Create a new challenge
    createChallenge: builder.mutation({
      query: (challengeData) => ({
        url: "/challenges",
        method: "POST",
        body: challengeData,
      }),
      invalidatesTags: ["Challenges"],
    }),
    // 2. Get all challenges
    getChallenges: builder.query({
      query: () => ({
        url: "/challenges",
        method: "GET",
      }),
      providesTags: ["Challenges"],
    }),
    // 3. Get a single challenge by ID
    getChallengesById: builder.query({
      query: (id) => ({
        url: `/challenges/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Challenges", id }],
    }),
    // 4. Delete a challenge list by ID
    deleteChallengeList: builder.mutation({
      query: (id: string) => ({
        url: `/challenges/list/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Challenges"],
    }),
    // 5. Update a challenge by ID
    updateChallenge: builder.mutation({
      query: ({ id, challengeName, points }) => ({
        url: `/challenges/${id}`,
        method: "PUT",
        body: { challengeName, points },
      }),
      invalidatesTags: ["Challenges"],
    }),
    // 6. Update a challenge list item by ID
    updateChallengeListItem: builder.mutation({
      query: ({ id, title }) => ({
        url: `/challenges/list/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["Challenges"],
    }),
    // 7. Create a new challenge list item
    createChallengeListItem: builder.mutation({
      query: ({ challengesId, title }) => ({
        url: `/challenges/list`,
        method: "POST",
        body: { challengesId, title },
      }),
      invalidatesTags: ["Challenges"],
    }),
    // 8. Delete a challenge list item by ID
    deleteChallenge: builder.mutation({
      query: (id: string) => ({
        url: `/challenges/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Challenges"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateChallengeMutation,
  useGetChallengesQuery,
  useGetChallengesByIdQuery,
  useUpdateChallengeListItemMutation,
  useCreateChallengeListItemMutation,
  useDeleteChallengeListMutation,
  useDeleteChallengeMutation,
  useUpdateChallengeMutation,
} = challengesApi;
