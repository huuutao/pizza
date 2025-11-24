import { formatCurrency } from '@/utils/helpers';
import Button from '@features/ui/Button';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '@/stores/cartReducer';
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();
  return (
    <li className='px-2 pt-2 pb-2 sm:flex sm:items-center sm:justify-between'>
      <p className='text-lg'>
        {quantity}&times; {name}
      </p>
      <div className='flex items-end justify-between sm:items-center sm:gap-2'>
        <p className='text-sm font-semibold'>{formatCurrency(totalPrice)}</p>
        <Button
          type='medium'
          onClick={() => {
            dispatch(removeFromCart({ pizzaId }));
          }}
        >
          取消
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
