import { ecommerceApiSlice } from '@/services/ecommerce-api/redux/ecommerceApiSlice';
import { setIsPendingAuthAction } from '@/shared/redux/slices/auth.slice';
import type { AppData, ResponceOk } from '@/shared/types/types';
import type { BodyUserCredentials } from '@/shared/zod/ecommerce/user.schemas';

const authPath = '/session';

export const authApi = ecommerceApiSlice.injectEndpoints({
  endpoints: (build) => ({
    startSession: build.query<AppData, void>({
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
    //  TODO Set Cart
    signUpUser: build.mutation<void, BodyUserCredentials>({
      query: (body) => ({
        url: authPath,
        method: 'POST',
        body
      })
    }),
    loginUser: build.mutation<void, { email: string; password: string }>({
      query: (body) => ({
        url: authPath,
        method: 'PUT',
        body
      })
    }),
    logoutUser: build.mutation<ResponceOk, void>({
      query: () => ({
        url: authPath,
        method: 'DELETE'
      })
    }),
    restoreUserWithRefreshToken: build.mutation<ResponceOk, void>({
      query: () => ({
        url: authPath,
        method: 'PATCH'
      })
    }),
    checkLoginStatus: build.mutation<ResponceOk, void>({
      query: () => authPath
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
