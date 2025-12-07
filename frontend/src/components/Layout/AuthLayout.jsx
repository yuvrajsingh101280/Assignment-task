/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";

const AuthLayout = ({ children, title, subtitle }) => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden">
      {/* gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* logo / heading */}
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900/90 border border-slate-700 shadow-lg">
            <span className="text-lg font-semibold text-blue-400">HC</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.25em] text-slate-400">
              HubCredo
            </span>
            <span className="text-xs text-slate-500">
              Internship Assignment
            </span>
          </div>
        </div>

        {/* auth card */}
        <div className="w-full max-w-md rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6 sm:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.75)] backdrop-blur-2xl">
          <div className="mb-6 space-y-2 text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
              {title}
            </h1>
            <p className="text-sm text-slate-400">{subtitle}</p>
          </div>

          {children}
        </div>

        {/* switch link */}
        <div className="mt-4 text-xs text-slate-500">
          {isLogin ? (
            <>
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
