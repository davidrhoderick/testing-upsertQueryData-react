import {store} from './redux/store'
import { Provider as ReduxProvider } from 'react-redux';
import { useCartsQuery } from './redux/endpoints/carts';
import { useEffect, useState } from 'react';

const ChildQuery = ({cart_token}) => {
  const {data: cart} = useCartsQuery({cart_token});

  return <>{cart?.cart_token ? cart.cart_token : 'Loading...'}</>
}

const Queries = ({cart_token}) => {
  const {data:cart} = useCartsQuery({cart_token})

  const [queryAgain, setQueryAgain] = useState(false)

  useEffect(() => {
    const queryTimeout = setTimeout(() => setQueryAgain(true), 5000);

    return () => clearTimeout(queryTimeout)
  }, [])

  return <ol><li>Provided cart_token: {cart_token}</li>
  <li>Returned cart_token from initial query: {cart?.cart_token ? cart.cart_token : 'Loading...'}</li>
  <li>Query of the returned cart_token (should be instant and not result in another API call): {cart?.cart_token ? <ChildQuery cart_token={cart.cart_token} /> : 'Loading...'}</li>
  <li>5s delayed query of the provided cart_token (should be 5s after page load & not result in another API call): {queryAgain ? <ChildQuery cart_token={cart_token} /> : 'Loading...'}</li></ol>
}

function App() {
  return (
    <ReduxProvider store={store}>
      <Queries cart_token="2" />
    </ReduxProvider>
  )
}

export default App;
