import { ecommerceApiSlice } from '@/services/ecommerceApi';
import { setIsPendingAuthAction } from '@/shared/slices/auth.slice';
import type { IAppData, IBodyUserCredentials, ResponceOk } from '@/shared/types/types';

export const authApi = ecommerceApiSlice.injectEndpoints({
  endpoints: (build) => ({
    startSession: build.query<IAppData, void>({
      query: () => '/',

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setIsPendingAuthAction({ isPending: false }));
        } catch (error) {
          // * Handled by baseQueryExtended
        }
      }
    }),
    // * Mutations
    signUpUser: build.mutation<void, IBodyUserCredentials>({
      query: (body) => ({
        url: '/session',
        method: 'POST',
        body
      })
    }),
    loginUser: build.mutation<void, { email: string; password: string }>({
      query: (body) => ({
        url: '/session',
        method: 'PUT',
        body
      })
    }),
    logoutUser: build.mutation<ResponceOk, void>({
      query: () => ({
        url: '/session',
        method: 'DELETE'
      })
    }),
    checkLoginStatus: build.mutation<ResponceOk, void>({
      query: () => ({
        url: '/session',
        method: 'GET'
      })
    }),
    restoreUserWithRefreshToken: build.mutation<ResponceOk, void>({
      query: () => ({
        url: '/session',
        method: 'PATCH'
      })
    }),
    //  FIXME delete
    someStuff: build.mutation<{ data: string }, void>({
      queryFn: (_arg, queryApi, _extraOptions, _baseQuery) => {
        console.log(queryApi);
        return { data: { data: 'some data' } };
      }
    })
  }),
  overrideExisting: 'throw'
});

export const { useSomeStuffMutation, useRestoreUserWithRefreshTokenMutation } = authApi;
