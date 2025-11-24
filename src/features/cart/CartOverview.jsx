import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { formatCurrency } from '@/utils/helpers';
import { getTotalPrice } from '@/stores/cartReducer';
import { useLocation } from 'react-router';
function CartOverview() {
  const totalPrice = useSelector(getTotalPrice);
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';

  return (
    <div className='flex items-center justify-center space-x-6 bg-stone-800 p-4 text-sm text-stone-200 uppercase sm:justify-end sm:space-x-6 sm:px-6 md:text-base'>
      <p className='space-x-4 font-semibold text-stone-300 sm:space-x-6'>
        <span>Total</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <div>{!isCartPage && <Link to='/cart'>Open cart &rarr;</Link>}</div>
    </div>
  );
}

export default CartOverview;
