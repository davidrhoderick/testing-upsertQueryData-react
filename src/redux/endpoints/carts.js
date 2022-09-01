import { api } from '../api';

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    carts: builder.query({
      query: ({cart_token}) => ({
        url: `airlines/${cart_token}`,
        method: 'GET'
      }),
      // queryFn: async ({cart_token}) => {
      //   console.log(`calling with ${cart_token}`)

      //   await new Promise((resolve) => setTimeout(resolve, 1500))

      //   return {
      //     data: {cart_token: 'cartToken'}
      //   }
      // },

      transformResponse: (response) => ({
        ...response,
        cart_token: '3'
      }),
      async onQueryStarted({ cart_token }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.cart_token !== cart_token) {
            dispatch(
              api.util.upsertQueryData(
                'carts',
                { cart_token: data.cart_token },
                data
              )
            );
          }
        } catch {}
      },
    }),
  }),
  overrideExisting: true,
});

export const { useCartsQuery, useLazyCartsQuery } = extendedApi;
