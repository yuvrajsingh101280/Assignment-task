/* eslint-disable react/prop-types */
const Input = ({ label, error, className = "", ...props }) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-200">
          {label}
        </label>
      )}
      <input
        className={`w-full rounded-xl border bg-slate-900/70 px-3 py-2.5 text-sm text-slate-50
        shadow-inner outline-none transition-all
        placeholder:text-slate-500
        focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40
        ${
          error
            ? "border-red-500/80 focus:ring-red-500/40"
            : "border-slate-700/70"
        }
        ${className}`}
        {...props}
      />
      {error && <p className="text-xs font-medium text-red-400">{error}</p>}
    </div>
  );
};

export default Input;
