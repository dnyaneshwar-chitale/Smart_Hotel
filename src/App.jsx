



// import { useState, useEffect } from "react";
// import {
//   ShoppingCart,
//   ChefHat,
//   MessageCircle,
//   Mic,
//   Search,
// } from "lucide-react";

// import { LanguageSelector } from "./components/LanguageSelector";
// import MenuBrowser from "./components/MenuBrowser";
// import { Payment } from "./components/Payment";
// import OrderTracking from "./components/OrderTracking";
// import { Feedback } from "./components/Feedback";
// import { KitchenDashboard } from "./components/KitchenDashboard";
// import { VoiceAssistant } from "./components/VoiceAssistant";
// import { Chatbot } from "./components/Chatbot";
// import { Cart } from "./components/Cart";
// import Sidebar from "./components/Sidebar";

// import { projectId, publicAnonKey } from "./utils/supabase/info";
// import { menuData } from "./data/menuData";
// import "./App.css";

// export default function App() {
//   const [language, setLanguage] = useState(null);
//   const [currentView, setCurrentView] = useState("menu");
//   const [cart, setCart] = useState([]);
//   const [currentOrder, setCurrentOrder] = useState(null);
//   const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
//   const [showChatbot, setShowChatbot] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   // ✅ TABLE NUMBER (FIXED)
//   const [tableNumber, setTableNumber] = useState(
//     localStorage.getItem("tableNumber") || ""
//   );

//   const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-38c9f8bb`;

//   // INIT MENU
//   useEffect(() => {
//     fetch(`${API_URL}/initialize`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${publicAnonKey}`,
//         apikey: publicAnonKey,
//       },
//       body: JSON.stringify({ menuItems: menuData }),
//     }).catch(() => {});
//   }, []);

//   // LOAD CART
//   useEffect(() => {
//     const saved = localStorage.getItem("hotelCart");
//     if (saved) setCart(JSON.parse(saved));
//   }, []);

//   // SAVE CART
//   useEffect(() => {
//     localStorage.setItem("hotelCart", JSON.stringify(cart));
//   }, [cart]);

//   // ADD TO CART
//   const addToCart = (item) => {
//     setCart((prev) =>
//       prev.find((i) => i.id === item.id)
//         ? prev.map((i) =>
//             i.id === item.id
//               ? { ...i, quantity: i.quantity + 1 }
//               : i
//           )
//         : [...prev, { ...item, quantity: 1 }]
//     );
//   };

//   const updateQuantity = (id, quantity) => {
//     setCart((prev) =>
//       quantity <= 0
//         ? prev.filter((i) => i.id !== id)
//         : prev.map((i) =>
//             i.id === id ? { ...i, quantity } : i
//           )
//     );
//   };

//   const clearCart = () => setCart([]);

//   // PAYMENT
//   const handlePaymentComplete = async (paymentMethod) => {
//     const order = {
//       id: "ORD-" + Date.now(),
//       items: cart,
//       total: cart.reduce((s, i) => s + i.price * i.quantity, 0),
//       status: "pending",
//       tableNumber,
//       timestamp: Date.now(),
//       paymentMethod,
//     };

//     localStorage.setItem(
//       "orders",
//       JSON.stringify([
//         ...(JSON.parse(localStorage.getItem("orders") || "[]")),
//         order,
//       ])
//     );

//     try {
//       await fetch(`${API_URL}/orders`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${publicAnonKey}`,
//           apikey: publicAnonKey,
//         },
//         body: JSON.stringify(order),
//       });
//     } catch {}

//     setCurrentOrder(order);
//     clearCart();
//     setCurrentView("tracking");
//   };

//   const handleFeedbackComplete = () => {
//     setCurrentOrder(null);
//     setCurrentView("menu");
//   };

//   if (!language) {
//     return <LanguageSelector onSelectLanguage={setLanguage} />;
//   }

//   const cartItemCount = cart.reduce((s, i) => s + i.quantity, 0);

//   return (
//     <div className="app-container">
//       <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

//       <div className="main-content ml-64">
//         {/* HEADER */}
//         <header className="header">
//           <div className="header-left">
//             <ChefHat className="logo-icon" />
//             <div>
//               <h1 className="hotel-title">Smart Hotel</h1>
//               {/* {tableNumber && (
//                 <p className="table-text">Table: {tableNumber}</p>
//               )} */}
//             </div>
//           </div>

//           <div className="search-wrapper">
//             <Search className="search-icon" />
//             <input
//               className="search-input"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search dishes..."
//             />
//           </div>

//           <div className="header-buttons">
//             <button className="icon-btn" onClick={() => setShowVoiceAssistant(true)}>
//               <Mic />
//             </button>

//             <button className="icon-btn" onClick={() => setShowChatbot(true)}>
//               <MessageCircle />
//             </button>

//             <button
//               className="icon-btn cart-btn"
//               onClick={() => setCurrentView("cart")}
//             >
//               <ShoppingCart />
//               {cartItemCount > 0 && (
//                 <span className="cart-badge">{cartItemCount}</span>
//               )}
//             </button>
//           </div>
//         </header>

//         {/* PAGES */}
//         <main className="page">
//           {currentView === "menu" && (
//             <MenuBrowser
//               language={language}
//               onAddToCart={addToCart}
//               searchQuery={searchQuery}
//               tableNumber={tableNumber}          // ✅ FIX
//               setTableNumber={setTableNumber}    // ✅ FIX
//             />
//           )}

//           {currentView === "cart" && (
//             <Cart
//               cart={cart}
//               onUpdateQuantity={updateQuantity}
//               onClearCart={clearCart}
//               onCheckout={() => setCurrentView("payment")}
//               language={language}
//             />
//           )}

//           {currentView === "payment" && (
//             <Payment
//               cart={cart}
//               onPaymentComplete={handlePaymentComplete}
//               onBack={() => setCurrentView("cart")}
//               language={language}
//             />
//           )}

//           {currentView === "tracking" && currentOrder && (
//             <OrderTracking
//               order={currentOrder}
//               onOrderServed={() => setCurrentView("feedback")}
//               language={language}
//             />
//           )}

//           {currentView === "feedback" && currentOrder && (
//             <Feedback
//               order={currentOrder}
//               onComplete={handleFeedbackComplete}
//               language={language}
//             />
//           )}

//           {currentView === "kitchen" && <KitchenDashboard />}
//           {currentView === "admin" && <AdminPanel language={language} />}
//         </main>

//         {showVoiceAssistant && (
//           <VoiceAssistant
//             onClose={() => setShowVoiceAssistant(false)}
//             onAddToCart={addToCart}
//             language={language}
//           />
//         )}

//         {showChatbot && (
//           <Chatbot
//             onClose={() => setShowChatbot(false)}
//             language={language}
//           />
//         )}
//       </div>
//     </div>
//   );
// }







import { useState, useEffect } from "react";
import {
  ShoppingCart,
  ChefHat,
  MessageCircle,
  Mic,
  Search,
} from "lucide-react";

import { LanguageSelector } from "./components/LanguageSelector";
import MenuBrowser from "./components/MenuBrowser";
import { Payment } from "./components/Payment";
import OrderTracking from "./components/OrderTracking";
import { Feedback } from "./components/Feedback";
import { KitchenDashboard } from "./components/KitchenDashboard";
import { VoiceAssistant } from "./components/VoiceAssistant";
import { Chatbot } from "./components/Chatbot";
import { Cart } from "./components/Cart";
import Sidebar from "./components/Sidebar";

import { projectId, publicAnonKey } from "./utils/supabase/info";
import { menuData } from "./data/menuData";
import "./App.css";

export default function App() {
  const [language, setLanguage] = useState(null);
  const [currentView, setCurrentView] = useState("menu");
  const [cart, setCart] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ TABLE NUMBER (PERSISTENT)
  const [tableNumber, setTableNumber] = useState(
    localStorage.getItem("tableNumber") || ""
  );

  useEffect(() => {
    if (tableNumber) {
      localStorage.setItem("tableNumber", tableNumber);
    }
  }, [tableNumber]);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-38c9f8bb`;

  // INIT MENU (SAFE)
  useEffect(() => {
    fetch(`${API_URL}/initialize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicAnonKey}`,
        apikey: publicAnonKey,
      },
      body: JSON.stringify({ menuItems: menuData }),
    }).catch(() => {});
  }, []);

  // LOAD CART
  useEffect(() => {
    const saved = localStorage.getItem("hotelCart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // SAVE CART
  useEffect(() => {
    localStorage.setItem("hotelCart", JSON.stringify(cart));
  }, [cart]);

  // ✅ ADD TO CART (MULTI-TABLE SAFE)
  const addToCart = (item) => {
    if (!tableNumber) return;

    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.tableNumber === tableNumber
      );

      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.tableNumber === tableNumber
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [
        ...prev,
        {
          ...item,
          quantity: 1,
          tableNumber,
        },
      ];
    });
  };

  // ✅ UPDATE / DELETE (MULTI-TABLE SAFE)
  const updateQuantity = (id, quantity, tableNumber) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter(
            (i) => !(i.id === id && i.tableNumber === tableNumber)
          )
        : prev.map((i) =>
            i.id === id && i.tableNumber === tableNumber
              ? { ...i, quantity }
              : i
          )
    );
  };

  const clearCart = () => setCart([]);

  // ✅ PAYMENT (TABLE-AWARE)
  const handlePaymentComplete = async (paymentMethod) => {
    if (!tableNumber || cart.length === 0) return;

    const order = {
      id: "ORD-" + Date.now(),
      items: cart,
      total: cart.reduce((s, i) => s + i.price * i.quantity, 0),
      status: "pending",
      tableNumber,
      timestamp: Date.now(),
      paymentMethod,
    };

    localStorage.setItem(
      "orders",
      JSON.stringify([
        ...(JSON.parse(localStorage.getItem("orders") || "[]")),
        order,
      ])
    );

    try {
      await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
          apikey: publicAnonKey,
        },
        body: JSON.stringify(order),
      });
    } catch {}

    setCurrentOrder(order);
    clearCart();
    setCurrentView("tracking");
  };

  const handleFeedbackComplete = () => {
    setCurrentOrder(null);
    setCurrentView("menu");
  };

  if (!language) {
    return <LanguageSelector onSelectLanguage={setLanguage} />;
  }

  const cartItemCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="app-container">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      <div className="main-content ml-64">
        {/* HEADER */}
        <header className="header">
          <div className="header-left">
            <ChefHat className="logo-icon" />
            <h1 className="hotel-title">Smart Hotel</h1>
          </div>

          <div className="search-wrapper">
            <Search className="search-icon" />
            <input
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes..."
            />
          </div>

          <div className="header-buttons">
            <button className="icon-btn" onClick={() => setShowVoiceAssistant(true)}>
              <Mic />
            </button>

            <button className="icon-btn" onClick={() => setShowChatbot(true)}>
              <MessageCircle />
            </button>

            <button
              className="icon-btn cart-btn"
              onClick={() => setCurrentView("cart")}
            >
              <ShoppingCart />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>
          </div>
        </header>

        {/* PAGES */}
        <main className="page">
          {currentView === "menu" && (
            <MenuBrowser
              language={language}
              onAddToCart={addToCart}
              searchQuery={searchQuery}
              tableNumber={tableNumber}
              setTableNumber={setTableNumber}
            />
          )}

          {currentView === "cart" && (
            <Cart
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onClearCart={clearCart}
              onCheckout={() => setCurrentView("payment")}
              language={language}
            />
          )}

          {currentView === "payment" && (
            <Payment
              cart={cart}
              onPaymentComplete={handlePaymentComplete}
              onBack={() => setCurrentView("cart")}
              language={language}
            />
          )}

          {currentView === "tracking" && currentOrder && (
            <OrderTracking
              order={currentOrder}
              onOrderServed={() => setCurrentView("feedback")}
              language={language}
            />
          )}

          {currentView === "feedback" && currentOrder && (
            <Feedback
              order={currentOrder}
              onComplete={handleFeedbackComplete}
              language={language}
            />
          )}

          {currentView === "kitchen" && <KitchenDashboard />}
        </main>

        {showVoiceAssistant && (
          <VoiceAssistant
            onClose={() => setShowVoiceAssistant(false)}
            onAddToCart={addToCart}
            language={language}
          />
        )}

        {showChatbot && (
          <Chatbot
            onClose={() => setShowChatbot(false)}
            language={language}
          />
        )}
      </div>
    </div>
  );
}
