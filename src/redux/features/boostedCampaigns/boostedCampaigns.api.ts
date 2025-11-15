import baseApi from "@/redux/api/baseApi";
import { TQueryParams } from "@/types/glovalType";

export const boostedCampaignsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    demo: builder.mutation({
      query: (credentials) => ({
        url: "/demo",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    allDemo: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/all-damo",
          method: "GET",
          params: params,
        };
      },
      providesTags: [],
    }),
  }),
});

export const { useAllDemoQuery } = boostedCampaignsApi;
