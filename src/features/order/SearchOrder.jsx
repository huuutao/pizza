import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function SearchOrder() {
  const [orderNo, setOrderNo] = useState('');
  const navgate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navgate(`/order/${orderNo}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='请输入订单号'
        value={orderNo}
        onChange={(event) => setOrderNo(event.target.value)}
        className='rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all
          w-30 placeholder:text-stone-400 focus:w-40 sm:w-64 focus:outline-none
          focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:focus:w-72'
      />
    </form>
  );
}
