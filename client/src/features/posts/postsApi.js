import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/posts`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getFeedPosts: builder.query({
      query: () => "/",
      providesTags: ["Post"],
    }),
    getUserPosts: builder.query({
      query: (userId) => `/${userId}/posts`,
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Post"],
    }),
    likePost: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `/${postId}/like`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: { userId },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetFeedPostsQuery,
  useGetUserPostsQuery,
  useCreatePostMutation,
  useLikePostMutation,
} = postsApi;
