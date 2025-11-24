import Header from './Header';
import CartOverview from '@features/cart/CartOverview';

import { Outlet, useNavigation, useRouteError } from 'react-router';
import LoadingSpinner from '@features/ui/LoadingSpinner';

export default function AppLayout() {
  const navigation = useNavigation();

  const isPending = navigation.state === 'loading';

  return (
    <>
      <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
        {isPending && <LoadingSpinner />}
        <Header />
        <main className='overflow-y-auto'>
          <div className='mx-auto h-full max-w-3xl'>
            <Outlet />
          </div>
        </main>
        <CartOverview />
      </div>
    </>
  );
}
