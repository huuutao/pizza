import { createBrowserRouter } from 'react-router';
import Home from '@features/ui/Home';
import Menu, { loader as menuLoader } from '@features/menu/Menu';
import Cart from '@features/cart/Cart';
import Order, { loader as orderLoader } from '@features/order/Order';
import CreateUser from '@features/user/CreateUser';
import CreateOrder, {
  action as createOrderAction,
} from '@features/order/CreateOrder';
import AppLayout from '@features/ui/AppLayout';
import Error from '@features/ui/Error';

const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    ErrorBoundary: Error,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'menu',
        Component: Menu,
        loader: menuLoader,
        ErrorBoundary: Error,
      },
      {
        path: 'cart',
        Component: Cart,
      },
      {
        path: 'order',
        children: [
          {
            path: ':orderId',
            Component: Order,
            loader: orderLoader,
            ErrorBoundary: Error,
          },
          {
            index: true,
            Component: CreateOrder,
            action: createOrderAction,
          },
        ],
      },
      {
        path: 'user',
        Component: CreateUser,
      },
      {
        path: '*',
        Component: Error,
      },
    ],
  },
]);

export default router;
