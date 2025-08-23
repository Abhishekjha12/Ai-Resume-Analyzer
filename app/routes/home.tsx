import { resumes } from "~/constants";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePuterStore } from "../lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeAi" },
    { name: "description", content: "Fix your chances with Ai" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();

  // ✅ Prevent SSR crash by checking for window (runs only on client)
  if (typeof window === "undefined") {
    return null; // Or a loading skeleton if you prefer
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section px-6">
        <div className="page-heading py-16">
          <h1>Your Application & Resume Rating</h1>
          <h2>Review your submission and check AI-powered feedback.</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resume-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
