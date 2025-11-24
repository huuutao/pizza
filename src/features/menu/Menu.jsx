import { useLoaderData } from 'react-router';
import MenuItem from './MenuItem';
import { getMenu } from '@/servers/apiRestaurant';
import {
  addToCart,
  removeFromCart,
  reduceQuantity,
  addQuantity,
  clearCart,
} from '@/stores/cartReducer';
import { useSelector, useDispatch } from 'react-redux';

function Menu() {
  const menuData = useLoaderData();
  const dispatch = useDispatch();

  return (
    <ul className='divide-y divide-stone-400 px-2'>
      {menuData.map((item) => (
        <MenuItem key={item.id} pizza={item} />
      ))}
    </ul>
  );
}

async function loader() {
  const menuData = await getMenu();
  return menuData;
}

export default Menu;

export { loader };
