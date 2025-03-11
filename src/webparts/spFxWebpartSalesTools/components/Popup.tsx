// import * as React from "react";

// interface PopupProps {
//   courses: string[];
//   onClose: () => void;
// }

// const Popup: React.FC<PopupProps> = ({ courses, onClose }) => {
//   return (
//     <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center max-w-md mx-auto">
//       {/* 🔹 Modal Header */}
//       <h2 className="text-lg font-semibold mb-4 text-center">Demo Courses</h2>
      
//       {/* 🔹 Course List */}
//       <div className="mb-4 w-full max-h-[300px] overflow-y-auto px-2">
//         {courses.map((course, index) => (
//           <div key={index} className="w-full text-center">
//             <button
//               type="button"
//               className="w-full bg-gray-200 text-gray-900 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none"
//             >
//               {course}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* 🔹 Close Button */}
//       <button
//         className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none"
//         onClick={onClose}
//       >
//         Close
//       </button>
//     </div>
//   );
// };

// export default Popup;
