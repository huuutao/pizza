import { Link } from 'react-router';

export default function Button({
  children = '',
  disabled = false,
  to = '',
  type = 'medium',
  uppercase = false,
  onClick = () => {},
}) {
  const size = {
    small: 'px-2 py-1 font-medium',

    medium: 'px-4 py-2 font-semibold',

    large: 'px-6 py-2 font-semibold',
  };
  const className = `inline-block rounded-full bg-yellow-400 ${size[type]} ${uppercase ? 'uppercase' : ''}
        tracking-wide text-stone-800  transition-colors duration-300
        hover:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2
        focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-500`;

  if (to) {
    return (
      <Link to={to} disabled={disabled} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {children}
    </button>
  );
}
