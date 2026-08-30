import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/auth` }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (formData) => ({
        url: "/register",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
