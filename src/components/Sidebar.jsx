
// // import { Link } from "react-router-dom";
// // export default function Sidebar(){
// //   return (
// //     <div className="w-64 h-screen bg-gray-900 text-white p-4 fixed">
// //       <h2 className="text-xl font-bold mb-6">Smart Hotel</h2>
// //       <nav className="flex flex-col gap-4">
// //         <Link to="/" className="hover:text-yellow-400">Home</Link>
// //         <Link to="/menu" className="hover:text-yellow-400">Menu</Link>
// //         <Link to="/about" className="hover:text-yellow-400">About</Link>
        
// //       </nav>
// //     </div>
// //   );
// // }

// // import React, { useState } from "react";
// // import SideBar from "./components/SideBar";

// // import {
// //   Home,
// //   Utensils,
// //   ShoppingCart,
// //   FileText,
// //   MessageCircle,
// //   ChefHat,
// // } from "lucide-react";

// // export default function SideBar({ currentView, setCurrentView }) {
// //   return (
// //     <aside
// //       className="fixed left-0 top-0 h-screen w-64 bg-white border-r shadow-sm p-4 flex flex-col justify-between"
// //     >
// //       {/* Top Section */}
// //       <div>
// //         <h1 className="text-orange-600 font-bold text-xl mb-4 flex items-center gap-2">
// //           <Utensils className="w-6 h-6" /> Restaurant
// //         </h1>

// //         <ul className="space-y-2 mt-4">
// //           <SidebarItem
// //             icon={Home}
// //             label="Menu"
// //             active={currentView === "menu"}
// //             onClick={() => setCurrentView("menu")}
// //           />

// //           <SidebarItem
// //             icon={Utensils}
// //             label="Categories"
// //             active={currentView === "categories"}
// //             onClick={() => setCurrentView("categories")}
// //           />

// //           <SidebarItem
// //             icon={ShoppingCart}
// //             label="Cart"
// //             active={currentView === "cart"}
// //             onClick={() => setCurrentView("cart")}
// //           />

// //           <SidebarItem
// //             icon={FileText}
// //             label="My Orders"
// //             active={currentView === "tracking"}
// //             onClick={() => setCurrentView("tracking")}
// //           />

// //           <SidebarItem
// //             icon={MessageCircle}
// //             label="Feedback"
// //             active={currentView === "feedback"}
// //             onClick={() => setCurrentView("feedback")}
// //           />
// //         </ul>
// //       </div>

// //       {/* Footer Section */}
// //       <div className="border-t pt-4">
// //         <SidebarItem
// //           icon={ChefHat}
// //           label="Kitchen"
// //           active={currentView === "kitchen"}
// //           onClick={() => setCurrentView("kitchen")}
// //         />
// //       </div>
// //     </aside>
// //   );
// // }

// // function SidebarItem({ icon: Icon, label, active, onClick }) {
// //   return (
// //     <li
// //       onClick={onClick}
// //       className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition 
// //         ${active ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"}`}
// //     >
// //       <Icon className="w-5 h-5" />
// //       <span className="text-base font-medium">{label}</span>
// //     </li>
// //   );
// // }
// import React from "react";

// import {
//   Home,
//   Utensils,
//   ShoppingCart,
//   FileText,
//   MessageCircle,
//   ChefHat,
// } from "lucide-react";

// export default function Sidebar({ currentView, setCurrentView }) {
//   return (
//     <aside
//       className="fixed left-0 top-0 h-screen w-64 bg-white border-r shadow-sm p-4 flex flex-col justify-between"
//     >
//       {/* Top Section */}
//       <div>
//         <h1 className="text-orange-600 font-bold text-xl mb-4 flex items-center gap-2">
//           <Utensils className="w-6 h-6" /> Restaurant
//         </h1>

//         <ul className="space-y-2 mt-4">
//           <SidebarItem
//             icon={Home}
//             label="Menu"
//             active={currentView === "menu"}
//             onClick={() => setCurrentView("menu")}
//           />

//           <SidebarItem
//             icon={Utensils}
//             label="Categories"
//             active={currentView === "categories"}
//             onClick={() => setCurrentView("categories")}
//           />

//           <SidebarItem
//             icon={ShoppingCart}
//             label="Cart"
//             active={currentView === "cart"}
//             onClick={() => setCurrentView("cart")}
//           />

//           <SidebarItem
//             icon={FileText}
//             label="My Orders"
//             active={currentView === "tracking"}
//             onClick={() => setCurrentView("tracking")}
//           />

//           <SidebarItem
//             icon={MessageCircle}
//             label="Feedback"
//             active={currentView === "feedback"}
//             onClick={() => setCurrentView("feedback")}
//           />
//         </ul>
//       </div>

//       {/* Footer Section */}
//       <div className="border-t pt-4">
//         <SidebarItem
//           icon={ChefHat}
//           label="Kitchen"
//           active={currentView === "kitchen"}
//           onClick={() => setCurrentView("kitchen")}
//         />
//       </div>
//     </aside>
//   );
// }

// function SidebarItem({ icon: Icon, label, active, onClick }) {
//   return (
//     <li
//       onClick={onClick}
//       className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition 
//         ${active ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"}`}
//     >
//       <Icon className="w-5 h-5" />
//       <span className="text-base font-medium">{label}</span>
//     </li>
//   );
// }
import React from "react";
import "../Sidebar.css";

import {
  Home,
  Utensils,
  ShoppingCart,
  FileText,
  MessageCircle,
  ChefHat,
} from "lucide-react";

export default function Sidebar({ currentView, setCurrentView }) {
  return (
    <aside className="sidebar">
      {/* Top Section */}
      <div>
        <h1 className="sidebar-title">
          <Utensils className="icon-large" /> Restaurant
        </h1>

        <ul className="sidebar-list">
          <SidebarItem
            icon={Home}
            label="Menu"
            active={currentView === "menu"}
            onClick={() => setCurrentView("menu")}
          />
{/* 
          <SidebarItem
            icon={Utensils}
            label="Categories"
            active={currentView === "categories"}
            onClick={() => setCurrentView("categories")}
          /> */}

          <SidebarItem
            icon={ShoppingCart}
            label="Cart"
            active={currentView === "cart"}
            onClick={() => setCurrentView("cart")}
          />

          <SidebarItem
            icon={FileText}
            label="My Orders"
            active={currentView === "tracking"}
            onClick={() => setCurrentView("tracking")}
          />

          <SidebarItem
            icon={MessageCircle}
            label="Feedback"
            active={currentView === "feedback"}
            onClick={() => setCurrentView("feedback")}
          />
        </ul>
      </div>

      {/* Footer Section */}
      <div className="sidebar-footer">
        <SidebarItem
          icon={ChefHat}
          label="Kitchen"
          active={currentView === "kitchen"}
          onClick={() => setCurrentView("kitchen")}
        />
      </div>

        {/* ✅ ADD THIS */}
      {/* <button onClick={() => setCurrentView("admin")}>
        Admin
      </button> */}
    </aside>
  );
}

function SidebarItem({ icon: Icon, label, active, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`sidebar-item ${active ? "active" : ""}`}
    >
      <Icon className="icon-small" />
      <span className="sidebar-label">{label}</span>
    </li>
  );
}
