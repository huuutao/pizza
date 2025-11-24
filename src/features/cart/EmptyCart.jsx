import { Link } from 'react-router';
import LinkButton from '@features/ui/LinkButton';
import cart from '@/assets/cart.svg';
function EmptyCart() {
  return (
    <div className='flex h-full flex-col items-stretch justify-center space-y-8'>
      <div className='bg-cart'></div>
      <div className='text-center'>
        <LinkButton to='/menu'> Back to menu</LinkButton>
      </div>
    </div>
  );
}

export default EmptyCart;
