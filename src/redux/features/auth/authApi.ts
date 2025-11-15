import baseApi from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    //register
    register: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    //social login
    socialAuth: builder.mutation({
      query: (data) => ({
        url: "/auth/social-login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    // Forgot Password
    forgotPassword: builder.mutation({
      query: (body: { email: string }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    //send otp
    sendOtp: builder.mutation({
      query: (body: { email: string }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: body,
      }),
    }),
    //getMe
    getMe: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    //verify token
    verifyOtp: builder.mutation({
      query: (data: { email: string; otp: number }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    //resend otp
    resendOtp: builder.mutation({
      query: (body: { email: string }) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),
    //resetPassword
    resetPassword: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    //update user
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/users/update-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    //change password
    changePassword: builder.mutation({
      query: (data: { oldPassword: string; newPassword: string }) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
  useSocialAuthMutation,
  useChangePasswordMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
} = authApi;
