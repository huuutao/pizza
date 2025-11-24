import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, redirect, useNavigation, useActionData } from 'react-router';

import Button from '@features/ui/Button';

import { createOrder } from '@/servers/apiRestaurant.js';
import fetchAddress from '@/servers/userSlice';

import { getTotalPrice } from '@/stores/cartReducer';
import { formatCurrency } from '@/utils/helpers';

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const actionData = useActionData();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');
  const [withPriority, setWithPriority] = useState(false);

  const isSubbmitting = navigation.state === 'submitting';
  const name = useSelector((state) => state.user.name);
  const cart = useSelector((state) => state.cart);
  const totalPrice = useSelector(getTotalPrice);
  const totalwithPriority = totalPrice * 1.02;
  const total = formatCurrency(withPriority ? totalwithPriority : totalPrice);

  console.log(withPriority);

  function handleChange(e) {
    setError('');
    setInput(e.target.value);
  }
  useEffect(() => {
    setError(actionData?.phone);
  }, [actionData]);

  async function handleAddress(e) {
    e.preventDefault();
    const { address } = await fetchAddress();
    setAddress(address);
  }

  return (
    <div>
      <h2 className='py-6 text-xl font-semibold italic'>
        Ready to order? Let's go!
      </h2>

      <Form method='POST' className='px-2'>
        <div className='input_container'>
          <label htmlFor='customer'>First Name</label>
          <div className='flex-1 sm:max-w-6/12'>
            <input
              type='text'
              name='customer'
              id='customer'
              required
              className='input'
              defaultValue={name}
            />
          </div>
        </div>

        <div className='input_container'>
          <label htmlFor='phone'>Phone number</label>
          <div className='flex-1 sm:max-w-6/12'>
            <input
              type='tel'
              name='phone'
              id='phone'
              required
              className='input'
              onChange={handleChange}
              value={input}
            />
            <p className='mt-1 rounded-lg bg-red-100 text-center font-medium text-red-500'>
              {error}
            </p>
          </div>
        </div>

        <div className='input_container relative'>
          <label htmlFor='address'>Address</label>
          <div className='flex-1 sm:max-w-6/12'>
            <input
              type='text'
              name='address'
              id='address'
              required
              className='input'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className='absolute top-0.5 right-3'>
            <Button onClick={handleAddress}>定位</Button>
          </div>
        </div>
        <div className='flex items-center justify-center gap-2 sm:justify-end'>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            className='-amber-300 h-5 w-5 accent-yellow-400'
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority'>想优先配送吗？</label>
        </div>

        <div className='flex items-center justify-center gap-6 py-5 sm:justify-end'>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <div>
            <span>{total}</span>
          </div>
          <Button disabled={isSubbmitting}>
            {isSubbmitting ? '提交中...' : '订餐'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const err = {};
  if (isValidPhone(formData.get('phone'))) {
    err.phone = '请输入合法的手机号码';
    // return err;
  }
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
  };

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
};
