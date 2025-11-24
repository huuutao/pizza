import { Link, useNavigate } from 'react-router';

export default function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className = 'text-sm text-blue-500 hover:text-blue-600 hover:underline';
  const i = Number(to);
  if (!Number.isNaN(i)) {
    console.log('i', i);
    return (
      <button onClick={() => navigate(i)} className={className}>
        &larr; {children}
      </button>
    );
  }
  return (
    <Link to={to} className={className}>
      &larr; {children}
    </Link>
  );
}
