// Test ID: IIDSAT
import { useLoaderData } from 'react-router';
import SearchOrder from './SearchOrder';
import OrderItemtem from './OrderItem.jsx';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '@/utils/helpers';
import { getOrder } from '@/servers/apiRestaurant';

function Order() {
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = useLoaderData();

  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  return (
    <div className='space-y-2 mt-4 px-2'>
      <div className='flex sm:flex-row sm:justify-between flex-col gap-2'>
        <h2 className='text-xl font-semibold'>{id} Status</h2>

        <div className='flex sm:justify-center justify-start items-center gap-2'>
          {priority && (
            <span className='bg-green-400 rounded-full px-2 py-1'>
              Priority
            </span>
          )}
          <span className='bg-yellow-300 rounded-full px-2 py-1'>
            {status} order
          </span>
        </div>
      </div>

      <div
        className='bg-stone-300 text-md px-2 py-6 font-semibold sm:flex
          sm:justify-between sm:items-center'
      >
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className='divide-y divide-zinc-400'>
        {cart.map((item) => (
          <OrderItemtem item={item} />
        ))}
      </ul>
      <div
        className='bg-stone-300 text-md px-2 py-6 sm:flex sm:justify-left
          sm:justify-start sm:flex-col'
      >
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className='font-semibold'>
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export default Order;

export async function loader({ params }) {
  const { orderId: id } = params;
  const order = await getOrder(id);
  return order;
}
