import { supabase } from "@/services/supabaseClient";
import moment from "moment";

export default async function ExperienceDetail({ params }) {
  const { id } = params; // URL: /experiences/[id]

  // Fetch data from Supabase
  const { data: experience, error } = await supabase
    .from("Experiences")
    .select("*")
    .eq("unique_id", id)
    .single();

  if (error || !experience) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center text-gray-500">
        ❌ Experience not found
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{experience.company}</h1>
          <p className="text-gray-600 mt-1">{experience.jobRole}</p>
          <div className="flex gap-3 mt-4 flex-wrap">
            <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
              Difficulty: {experience.difficulty}
            </span>
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                experience.selected === "selected"
                  ? "bg-green-100 text-green-700"
                  : experience.selected === "not selected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {experience.selected}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm">{experience?.name}</p>
          <p className="text-xs text-gray-500">{moment(experience?.created_at).format("DD MMM YYYY")}</p>
        </div>
      </div>

      {/* Questions */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-2">Interview Questions & Rounds</h2>
        <p className="text-gray-700 whitespace-pre-line">{experience.questions}</p>
      </div>

      {/* Tips */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-2">Preparation Tips</h2>
        <p className="text-gray-700 whitespace-pre-line">{experience.tips}</p>
      </div>
    </main>
  );
}
