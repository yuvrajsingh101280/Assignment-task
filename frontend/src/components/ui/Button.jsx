/* eslint-disable react/prop-types */
const Button = ({ children, className = "", loading, ...props }) => {
  return (
    <button
      disabled={loading || props.disabled}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium
      bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-[0_18px_45px_rgba(15,23,42,0.65)]
      hover:from-blue-600 hover:to-blue-800 disabled:opacity-60 disabled:cursor-not-allowed
      transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 
      focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
      ${className}`}
      {...props}
    >
      {loading && (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-transparent" />
      )}
      {children}
    </button>
  );
};

export default Button;
