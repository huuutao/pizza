import { formatCurrency } from '@/utils/helpers';

function OrderItem({ item, isLoadingIngredients = true, ingredients = [] }) {
  const { quantity, name, totalPrice } = item;
  console.log(ingredients);
  return (
    <li className='py-3'>
      <div className='flex items-center justify-between'>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
      <p className='to-stone-500 text-sm capitalize italic'>
        {!isLoadingIngredients && ingredients.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;
