import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseURI = "https://8a25a073-81cd-4b28-9354-ae40e8367f6b-00-1j10cifngbdtv.pike.replit.dev/";

export const apiSlice = createApi({
    baseQuery : fetchBaseQuery({}),
    endpoints : builder => ({
        // get categories
        getCategories : builder.query({
            // get: 'http://localhost:8080/api/categories'
            query: () => '/api/categories',
            providesTags: ['categories']
        }),

        // get labels
        getLabels : builder.query({
            // get: 'http://localhost:8080/api/labels'
            query : () => '/api/labels',
            providesTags: ['transaction']
        }),

        // add new Transaction
        addTransaction : builder.mutation({
            query : (initialTransaction) => ({
                  // post: 'http://localhost:8080/api/transaction'
                url: '/api/transaction',
                method: "POST",
                body: initialTransaction
            }),
            invalidatesTags: ['transaction']
        }),

        // delete record
        deleteTransaction : builder.mutation({
            query : recordId => ({
                // delete: 'http://localhost:8080/api/transaction'
                url : '/api/transaction',
                method : "DELETE",
                body : recordId
            }),
            invalidatesTags: ['transaction']
        })

    })
})

export default apiSlice;