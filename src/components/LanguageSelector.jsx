// import { Globe } from "lucide-react";


// const languages = [
//   { code: "en", name: "English", flag: "🇬🇧" },
//   { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
//   { code: "mr", name: "मराठी", flag: "🇮🇳" }
// ];


// export function LanguageSelector({ onSelectLanguage }) {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
       
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
//             <Globe className="w-8 h-8 text-orange-600" />
//           </div>
//           <h1 className="text-2xl font-bold text-orange-600 mb-2">
//             Welcome to Smart Hotel
//           </h1>
//           <p className="text-gray-600">Please select your preferred language</p>
//         </div>

    
//         <div className="grid gap-3">
//           {languages.map((lang) => (
//             <button
//               key={lang.code}
//               onClick={() => onSelectLanguage(lang.code)}
//               className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all group"
//             >
//               <span className="text-3xl">{lang.flag}</span>
//               <span className="text-gray-700 font-medium group-hover:text-orange-600 transition-colors">
//                 {lang.name}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";
// import { Globe, ChevronDown } from "lucide-react";


// const languages = [
//   { code: "en", name: "English" },
//   { code: "hi", name: "हिन्दी" },
//   { code: "mr", name: "मराठी" },
// ];

// export function LanguageSelector({ onSelectLanguage }) {
//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState(null);

//   const handleSelect = (lang) => {
//     setSelected(lang);
//     setOpen(false);
//     onSelectLanguage(lang.code);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
//       <div className="">

//       <img
//   src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
//   alt="Hotel"
//   className="w-1/0 h-25 object-cover rounded-xl mb-6 mx-auto"
// />

//         <h1 className="text-2xl font-bold text-orange-600 text-center">
//           Smart Hotel
//         </h1>
//         <p className="text-gray-600 text-center mt-2 mb-6">
//           Experience comfort, smart service and delicious food at your table.
//         </p>

        
//         <div className="relative w-full">
//           <button
//             onClick={() => setOpen(!open)}
//             className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-orange-500 transition"
//           >
//             <div className="flex items-center gap-3">
//               <Globe className="text-orange-600" />
//               <span className="font-medium text-gray-700">
//                 {selected ? selected.name : "Select Language"}
//               </span>
//             </div>

//             <ChevronDown
//               className={`transition-transform duration-200 ${
//                 open ? "rotate-180" : ""
//               }`}
//             />
//           </button>

   
//           {open && (
//             <div className="absolute left-0 right-0 z-10 bg-white border rounded-xl shadow-md mt-2 overflow-hidden">
//               {languages.map((lang) => (
//                 <button
//                   key={lang.code}
//                   onClick={() => handleSelect(lang)}
//                   className="w-full text-left px-4 py-3 hover:bg-orange-50 hover:text-orange-600 transition"
//                 >
//                   {lang.name}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import "../styles/LanguageSelector.css";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी" },
  { code: "mr", name: "मराठी" },
];

export function LanguageSelector({ onSelectLanguage }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (lang) => {
    setSelected(lang);
    setOpen(false);
    if (onSelectLanguage) {
      onSelectLanguage(lang.code);
    }
  };

  return (
    <div className="lang-page">
      <div className="lang-card">
        {/* Hotel Image */}
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
          alt="Hotel"
          className="lang-hotel-img"
        />

        {/* Title */}
        <h1 className="lang-title">Smart Hotel</h1>

        {/* Subtitle */}
        <p className="lang-subtitle">
          Experience comfort, smart service and delicious food at your table.
        </p>

        {/* Language Selector */}
        <div style={{ position: "relative" }}>
          <button
            type="button"
            className="lang-btn"
            onClick={() => setOpen(!open)}
          >
            <div className="lang-left">
              <Globe color="#ea580c" size={20} />
              <span>
                {selected ? selected.name : "Select Language"}
              </span>
            </div>

            <ChevronDown
              size={20}
              style={{
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </button>

          {open && (
            <div className="lang-dropdown">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang)}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
