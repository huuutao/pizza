import Button from '@/features/ui/Button';
import { formatCurrency } from '@/utils/helpers';
import add from '@/assets/add.svg';
import minus from '@/assets/minus.svg';
import {
  addToCart,
  removeFromCart,
  reduceQuantity,
  addQuantity,
  clearCart,
} from '@/stores/cartReducer';
import { useDispatch, useSelector } from 'react-redux';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className='flex gap-4 py-2'>
      <img
        src={imageUrl}
        alt={name}
        className={`${soldOut ? 'greycale opacity-50 ' : ''}h-25 w-25`}
      />
      <div className='flex flex-1 flex-col'>
        <p className='font-medium'>{name}</p>
        <p className='text-sm text-stone-500 capitalize italic'>
          {ingredients.join(', ')}
        </p>
        <div className='mt-auto flex items-center justify-between'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm font-medium text-stone-500 uppercase'>
              Sold out
            </p>
          )}

          <AddButton disabled={soldOut} pizza={pizza} />
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

const className = 'flex items-center justify-center w-5 h-5';
function AddButton({ disabled, pizza }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const cartItem = cart.find((item) => item.pizzaId === pizza.id);

  function handleAddCart() {
    const i = {
      ...pizza,
      pizzaId: pizza.id,
    };

    dispatch(addToCart(i));
  }
  if (disabled) {
    return null;
  }

  if (cartItem) {
    return (
      <div>
        <Button
          type='small'
          onClick={() => dispatch(reduceQuantity({ ...cartItem, quantity: 1 }))}
        >
          <span className={className}>
            <img src={minus} />
          </span>
        </Button>
        <span className='px-3'>{cartItem.quantity}</span>
        <Button
          type='small'
          onClick={() => dispatch(addQuantity({ ...cartItem, quantity: 1 }))}
        >
          <span className={className}>
            <img src={add} />
          </span>
        </Button>
      </div>
    );
  } else {
    return (
      <Button type='small' onClick={handleAddCart}>
        Add
      </Button>
    );
  }
}
