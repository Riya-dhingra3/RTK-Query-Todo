// Rtk -> Slices

// apiSlice -> ek module k api endpoints kko
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const apiSlice = createApi({
  reducerPath: "todos",
//   Data dubara fetch hoga after 4 seconds yahan app apne time specify kar sakte ho jitne time bad app api call lagana chahte ho
  keepUnusedDataFor:4,
  refetchOnFocus:true,
  refetchOnReconnect:true,
  tagTypes: ["GetAllTodoTag"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
    // here to add headers we can do the following 
    // prepareHeaders: (header) => {
        // header.set("Key","Value");
        // header.set("2","value")
        // }
  }),
  endpoints: function (builder) {
    return {
      getAllTodos: builder.query({
        query: () => {
          return "/todos";
        },
        providesTags: ['GetAllTodoTag'],
        transformResponse: function (data) {
          return data?.todos || [];
        },
      }),
      getTodo: builder.query({
        query: (id) => {
          return `/todos/${id}`;
        },
      }),
      addTodo: builder.mutation({
        query: (params) => {
          return {
            url: "/todos/add",
            method: "POST",
            body: params,
          };
        },
        invalidatesTags: ['GetAllTodoTag']
      }),
      // addTodo: builder.mutation({
      //     query: (params) => {
      //       return {
      //         url: '/todos/add',
      //         method: 'POST',
      //         body: params,
      //       };
      //     },
      //   }),
    };
  },
});

// rtk query in react gives 5 main hooks
// useQuery -> ek yaisa hook deta hai , jisko jab tum call karoge , tumhe data , loading aur error state mil jayegi

// use*Your functionName*Query
// usegetAllTodosQuery -> this works everytime the function is mounted

// but if u want that apiCall should be in your control then u can use useLazyQuery

export default apiSlice;
export const { useGetAllTodosQuery, useLazyGetTodoQuery, useAddTodoMutation } =
  apiSlice;
