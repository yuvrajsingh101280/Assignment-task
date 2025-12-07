import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "User";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden">
      {/* gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 border border-slate-700 shadow">
              <span className="text-lg font-semibold text-blue-400">HC</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                HubCredo
              </span>
              <span className="text-xs text-slate-500">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right text-xs sm:block">
              <p className="font-medium text-slate-200">
                {user?.name || "User"}
              </p>
              <p className="text-slate-400">{user?.email}</p>
            </div>
            <Button onClick={logout} className="text-xs px-3 py-1.5 rounded-lg">
              Logout
            </Button>
          </div>
        </header>

        {/* main */}
        <main className="flex flex-1 items-center justify-center px-4 py-10">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.75)] backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-3 text-xs text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Signed in</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                {firstName}
              </span>
            </h1>

            <p className="mt-3 text-sm text-slate-400 max-w-md">
              This is your personal dashboard. From here you can manage your
              account and keep track of your activity.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3 text-sm">
              {/* card 1 */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition-transform duration-200 hover:-translate-y-1 hover:border-blue-500/70">
                <p className="text-xs text-slate-400 mb-1">Profile</p>
                <p className="font-semibold text-slate-50 truncate">
                  {user?.name || "Not available"}
                </p>
                <p className="mt-1 text-xs text-slate-500 break-all">
                  {user?.email || "No email"}
                </p>
              </div>

              {/* card 2 */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition-transform duration-200 hover:-translate-y-1 hover:border-blue-500/70">
                <p className="text-xs text-slate-400 mb-1">Session</p>
                <p className="font-semibold text-slate-50">Active</p>
                <p className="mt-1 text-xs text-slate-500">
                  You&apos;re securely logged in with a JWT-based auth flow.
                </p>
              </div>

              {/* card 3 */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition-transform duration-200 hover:-translate-y-1 hover:border-blue-500/70">
                <p className="text-xs text-slate-400 mb-1">Project</p>
                <p className="font-semibold text-slate-50">Auth Dashboard</p>
                <p className="mt-1 text-xs text-slate-500">
                  Includes signup, login, protected routes and an n8n workflow
                  on new users.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
