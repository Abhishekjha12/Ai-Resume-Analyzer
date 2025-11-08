import { useEffect, useState } from "react";
import ResumeCards from "~/components/ResumeCards";
import { resumes } from "../constants";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router"; // ✅ correct import

export default function Home() {
  const { auth, puterReady, init,fs} = usePuterStore();
  const navigate = useNavigate();
  
  // ✅ initialize Puter once after mount
  useEffect(() => {
    if (!puterReady) init();
  }, [puterReady, init]);

  // ✅ redirect unauthenticated users to login page
  useEffect(() => {
    if (puterReady && !auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [puterReady, auth.isAuthenticated, navigate]);
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-12">
          <h1>Track your applications & Resume Ratings.</h1>
          <h2>Review your submission and AI-Powered feedback.</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resume-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
            {resumes.map((resume) => (
              <ResumeCards key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
