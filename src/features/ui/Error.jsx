import { useRouteError } from 'react-router';
import LinkButton from '@features/ui/LinkButton';
function NotFound() {
  const error = useRouteError();

  console.dir(error);
  return (
    <div
      className='flex justify-center items-center h-full flex-col gap-2
        font-bold text-xl'
    >
      <h1>Something went wrong 😢</h1>
      <p>{error.statusText || error.message}</p>
      <LinkButton to='-1'>返回</LinkButton>
    </div>
  );
}

export default NotFound;
