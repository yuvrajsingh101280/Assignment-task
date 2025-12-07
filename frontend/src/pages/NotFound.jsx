import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-50">
      <h1 className="text-4xl font-semibold tracking-tight mb-2">404</h1>
      <p className="text-sm text-slate-400 mb-4">
        The page you are looking for doesn&apos;t exist.
      </p>
      <Link to="/login" className="text-sm text-blue-400 hover:text-blue-300">
        Go back to Login
      </Link>
    </div>
  );
};

export default NotFound;
