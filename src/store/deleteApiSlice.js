// Rtk -> Slices

// apiSlice -> ek module k api endpoints kko
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import axios from 'axios'


// 

import apiSlice from './apiSlice';

const deleteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteTodo: builder.mutation({
        query: (id) => ({
          url: `/todos/${id}`,
          method: 'DELETE',
          headers: {}, // Ensure no headers are added
        }),
      }),
      onQueryStarted: function(id,{dispatch,queryFulfilled}){
        const action = dispatch(
        apiSlice.util.updateQueryData('getAllTodos',undefined,function(todos){
                console.log(todos);
                const newtodos=todos.filter((todo)=>todo.id !== id);
                console.log(todos);
                return newtodos
        }));

        queryFulfilled.catch(()=>{
            action.undo();
        })
      }      
  }),
});

// export default deleteApiSlice;
// export const { useDeleteTodoMutation } = deleteApiSlice;

// this is not the correct way we should not use this createApi again instead we should reuse the already api
// slice Created
// const deleteApiSlice = createApi({
//     reducerPath:'todoDelete',
//     baseQuery: fetchBaseQuery({baseUrl: 'http://dummyjson.com'}),
//     endpoints: function(builder){
//         return {
//             deleteTodo: builder.mutation({
//                 query: (id) =>{
//                         return {
//                             url:`/todos/${id}`,
//                             method: 'DELETE'
//                         }
                        
//                 },
//                 transformResponse: function(data){
//                     return data?.todos || [];
//                 }
//             }),
//         }
//     }
// })

// rtk query in react gives 5 main hooks
// useQuery -> ek yaisa hook deta hai , jisko jab tum call karoge , tumhe data , loading aur error state mil jayegi

// use*Your functionName*Query
// usegetAllTodosQuery -> this works everytime the function is mounted

// but if u want that apiCall should be in your control then u can use useLazyQuery

export default deleteApiSlice;
export const {useDeleteTodoMutation} = deleteApiSlice;