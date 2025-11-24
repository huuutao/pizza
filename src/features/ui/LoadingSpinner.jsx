export default function LoadingSpinner() {
  return (
    <div
      className='absolute bg-slate-200/20 inset-0 backdrop-blur-xs flex
        items-center justify-center'
    >
      <div className='loader'></div>
    </div>
  );
}
