import { NavLink, Link } from 'react-router';
import SearchOrder from '@features/order/SearchOrder';
import { useSelector } from 'react-redux';
export default function Header() {
  const { name } = useSelector((state) => state.user);
  return (
    <header className='flex items-center justify-between border-b border-stone-500 bg-yellow-400 px-4 py-3 uppercase sm:px-6'>
      <Link to='/' className='font-black tracking-widest uppercase'>
        Fast Pizza .co
      </Link>
      <SearchOrder />
      <div className='hidden text-sm font-bold md:block'>
        {name || '.zhang'}
      </div>
    </header>
  );
}
