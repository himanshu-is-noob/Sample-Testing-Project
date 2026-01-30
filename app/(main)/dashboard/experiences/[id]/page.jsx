// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { supabase } from "@/services/supabaseClient";
// import moment from 'moment'

// function SkeletonBox({ className }) {
//   return (
//     <div
//       className={`bg-gray-200 animate-pulse rounded-md ${className}`}
//     />
//   );
// }

// function ExperienceDetail() {
//   const { id } = useParams();
//   const [experience, setExperience] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;

//     const fetchExperience = async () => {
//       const { data, error } = await supabase
//         .from("Experiences")
//         .select("*")
//         .eq("unique_id", id)
//         .single();

//       if (!error) {
//         setExperience(data);
//       }

//       setLoading(false);
//     };

//     fetchExperience();
//   }, [id]);

//   /* -------------------- SKELETON -------------------- */

//   if (loading) {
//     return (
//       <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
//         {/* Header Skeleton */}
//         <div className="bg-white rounded-xl border p-6 space-y-3">
//           <SkeletonBox className="h-7 w-48" />
//           <SkeletonBox className="h-4 w-64" />
//           <div className="flex gap-3 mt-4">
//             <SkeletonBox className="h-6 w-24" />
//             <SkeletonBox className="h-6 w-28" />
//           </div>
//         </div>

//         {/* Questions Skeleton */}
//         <div className="bg-white rounded-xl border p-6 space-y-3">
//           <SkeletonBox className="h-5 w-52" />
//           <SkeletonBox className="h-4 w-full" />
//           <SkeletonBox className="h-4 w-11/12" />
//           <SkeletonBox className="h-4 w-10/12" />
//         </div>

//         {/* Tips Skeleton */}
//         <div className="bg-white rounded-xl border p-6 space-y-3">
//           <SkeletonBox className="h-5 w-40" />
//           <SkeletonBox className="h-4 w-full" />
//           <SkeletonBox className="h-4 w-9/12" />
//         </div>
//       </div>
//     );
//   }

//   /* -------------------- EMPTY STATE -------------------- */

//   if (!experience) {
//     return (
//       <div className="text-center mt-24 text-gray-500">
//         ❌ Experience not found
//       </div>
//     );
//   }

//   /* -------------------- CONTENT -------------------- */

//   return (
//     <div className="max-w-4xl mx-auto px-6 py-10">
//       {/* Header */}
//       <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center justify-between">

//         <div>
//         <h1 className="text-2xl font-bold text-gray-900">
//           {experience.company}
//         </h1>

//         <p className="text-gray-600 mt-1">
//           {experience.jobRole}
//         </p>

//         <div className="flex gap-3 mt-4 flex-wrap">
//           <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
//             Difficulty: {experience.difficulty}
//           </span>

//           <span
//             className={`px-3 py-1 text-sm rounded-full ${
//               experience.selected === "selected"
//                 ? "bg-green-100 text-green-700"
//                 : experience.selected === "not selected"
//                 ? "bg-red-100 text-red-700"
//                 : "bg-yellow-100 text-yellow-700"
//             }`}
//           >
//             {experience.selected}
//           </span>
//         </div>

//         </div>

//         <div>
//           <p className="text-sm">{experience?.name}</p>
//           <p className='text-xs text-gray-500'>{moment(experience?.created_at).format('DD MMM yyy')}</p>
//         </div>
//       </div>

//       {/* Questions */}
//       <div className="bg-white rounded-xl shadow-sm border p-6 mt-6">
//         <h2 className="text-lg font-semibold mb-2">
//           Interview Questions & Rounds
//         </h2>
//         <p className="text-gray-700 whitespace-pre-line">
//           {experience.questions}
//         </p>
//       </div>

//       {/* Tips */}
//       <div className="bg-white rounded-xl shadow-sm border p-6 mt-6">
//         <h2 className="text-lg font-semibold mb-2">
//           Preparation Tips
//         </h2>
//         <p className="text-gray-700 whitespace-pre-line">
//           {experience.tips}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default ExperienceDetail;



import React, { Suspense } from "react";
import ExperienceDetail from "./_components/ExperienceDetail";
import { SkeletonExperience } from "./_components/SkeletonExperience";

export default function ExperiencePageWrapper({ params }) {
  return (
    <Suspense fallback={<SkeletonExperience />}>
      <ExperienceDetail params={params} />
    </Suspense>
  );
}
