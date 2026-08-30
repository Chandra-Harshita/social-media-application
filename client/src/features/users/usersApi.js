import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/users`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["User", "Friends"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => `/${userId}`,
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),
    getUserFriends: builder.query({
      query: (userId) => `/${userId}/friends`,
      providesTags: (result, error, userId) => [
        { type: "Friends", id: userId },
      ],
    }),
    addRemoveFriend: builder.mutation({
      query: ({ userId, friendId }) => ({
        url: `/${userId}/${friendId}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { userId, friendId }) => [
        { type: "Friends", id: userId },
        { type: "Friends", id: friendId },
      ],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserFriendsQuery,
  useAddRemoveFriendMutation,
} = usersApi;
