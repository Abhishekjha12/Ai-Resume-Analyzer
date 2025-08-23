import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "ResumeAi | Auth" },
  { name: "description", content: "Log into your account" },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();

  // ✅ Only call hooks on client
  if (typeof window === "undefined") {
    return null; // or a loading fallback
  }

  const navigate = useNavigate();
  const location = useLocation();

  const next = new URLSearchParams(location.search).get("next") || "/";

  // ✅ Handle sign in and then navigate
  const handleLogin = async () => {
    await auth.signIn();
    navigate(next, { replace: true });
  };

  useEffect(() => {
    if (!isLoading && auth.isAuthenticated) {
      navigate(next, { replace: true });
    }
  }, [auth.isAuthenticated, isLoading, next, navigate]);

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log in to continue your journey</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing you in...</p>
              </button>
            ) : auth.isAuthenticated ? (
              <button className="auth-button" onClick={auth.signOut}>
                <p>Log out</p>
              </button>
            ) : (
              <button className="auth-button" onClick={handleLogin}>
                <p>Log In</p>
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
