import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminlogin: builder.mutation({
      query: (data) => ({
        url: `admin/login`,
        method: "POST",
        body: data,
      }),
    }),
    adminlogout: builder.mutation({
      query: () => ({
        url: `admin/logout`,
        method: "POST",
      }),
    }),
    adminFetchData:builder.mutation({
      query:()=>({
        url:'admin/getdata',
        method:"get",

      })
    })
  }),
});

export const {
  useAdminloginMutation,
  useAdminlogoutMutation,
  useAdminFetchDataMutation
} = adminApiSlice;
