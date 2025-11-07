import ScoreBadge from "./ScoreBadge";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

const ATS = ({
  score,
  suggestion,
}: {
  score: number;
  suggestion: Suggestion[];
}) => {
  // Background gradient based on score
  const bgClass =
    score > 69
      ? "from-green-100"
      : score > 49
      ? "from-yellow-100"
      : "from-red-100";

  // Icon based on score
  const icon = score > 69 ? "/icons/ats-good.svg" : "/icons/ats-bad.svg";

  return (
    <div className={`p-6 rounded-2xl bg-gradient-to-br ${bgClass} to-white shadow-md`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <img src={icon} alt="ATS Status" className="w-8 h-8" />
        <h2 className="text-xl font-bold">ATS Score – {score}/100</h2>
      </div>

      {/* Badge */}
      <ScoreBadge score={score} />

      {/* Description */}
      <div className="mt-4">
        <h3 className="text-md font-semibold text-gray-800">ATS Compatibility Check</h3>
        <p className="text-sm text-gray-500 mt-1">
          Your resume was evaluated for Applicant Tracking System compatibility. Improving
          keyword usage, formatting, and clarity can boost your chances of passing filters.
        </p>
      </div>

      {/* Suggestions */}
      <ul className="mt-4 space-y-2">
        {suggestion.map((s, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <img
              src={s.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
              alt=""
              className="w-4 h-4 mt-1"
            />
            <span
              className={
                s.type === "good" ? "text-green-700" : "text-red-600"
              }
            >
              {s.tip}
            </span>
          </li>
        ))}
      </ul>

      {/* Closing Line */}
      <p className="mt-5 text-xs font-medium text-gray-600">
        Keep refining — every improvement brings you closer to landing interviews 🚀
      </p>
    </div>
  );
};

export default ATS;
