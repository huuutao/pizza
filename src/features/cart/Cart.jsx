import { Link, redirect } from 'react-router';
import LinkButton from '@features/ui/LinkButton';
import Button from '@features/ui/Button';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  reduceQuantity,
  addQuantity,
  clearCart,
} from '@/stores/cartReducer.js';
import EmptyCart from './EmptyCart';

function Cart() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  if (!cart.length) {
    return <EmptyCart />;
  }
  return (
    <div>
      <LinkButton to={'/menu'}>菜单</LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {user.name}</h2>
      <ul className='divide-y divide-gray-300 border-b'>
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className='mt-6 space-x-6'>
        <Button to='/order'>Order pizzas</Button>
        {Boolean(cart.length) && (
          <Button onClick={() => dispatch(clearCart())}>clear cart</Button>
        )}
      </div>
    </div>
  );
}

export default Cart;
