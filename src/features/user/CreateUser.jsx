import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Button from '@features/ui/Button';
import { setUser } from '@/stores/userReducer';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.name);
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setUser(username));

    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className='mb-4 text-sm text-stone-600 md:text-base'>
        👋 请输入你的名字:
      </p>

      <input
        type='text'
        placeholder='Your full name'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='input mb-8 w-md'
      />

      <div>
        <Button>Start</Button>
      </div>
    </form>
  );
}

export default CreateUser;
