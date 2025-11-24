// Test ID: IIDSAT
import { useLoaderData } from 'react-router';
import SearchOrder from './SearchOrder';
import OrderItemtem from './OrderItem.jsx';
import { calcMinutesLeft, formatCurrency, formatDate } from '@/utils/helpers';
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
    <div className='mt-4 space-y-2 px-2'>
      <div className='flex flex-col gap-2 sm:flex-row sm:justify-between'>
        <h2 className='text-xl font-semibold'>{id} Status</h2>

        <div className='flex items-center justify-start gap-2 sm:justify-center'>
          {priority && (
            <span className='rounded-full bg-green-400 px-2 py-1'>
              Priority
            </span>
          )}
          <span className='rounded-full bg-yellow-300 px-2 py-1'>
            {status} order
          </span>
        </div>
      </div>

      <div className='text-md bg-stone-300 px-2 py-6 font-semibold sm:flex sm:items-center sm:justify-between'>
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
      <div className='text-md sm:justify-left bg-stone-300 px-2 py-6 sm:flex sm:flex-col sm:justify-start'>
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
  console.log(order);
  return order;
}
