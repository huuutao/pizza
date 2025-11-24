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
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type='text'
        placeholder='Your full name'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='input mb-8 w-md'
      />

      <div>
        <Button>Start ordering</Button>
      </div>
    </form>
  );
}

export default CreateUser;
