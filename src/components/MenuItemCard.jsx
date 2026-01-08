

import { useState } from "react";
import { Clock, Plus, Leaf, Flame } from "lucide-react";

export function MenuItemCard({
  item,
  language,
  onAddToCart,
  tableNumber,
  setTableNumber,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [tempTable, setTempTable] = useState("");

  const handleAddClick = () => {
    setShowPopup(true);
  };

  const confirmTable = () => {
    if (!tempTable.trim()) return;

    setTableNumber(tempTable);
    localStorage.setItem("tableNumber", tempTable);

    // ✅ MOST IMPORTANT FIX
    onAddToCart({
      ...item,
      tableNumber: tempTable,
    });

    setShowPopup(false);
  };

  const getDietIcon = () => {
    if (item.dietType === "veg")
      return (
        <div className="w-5 h-5 border-2 border-green-600 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-green-600" />
        </div>
      );

    if (item.dietType === "non-veg")
      return (
        <div className="w-5 h-5 border-2 border-red-600 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-red-600" />
        </div>
      );

    return <Leaf className="w-5 h-5 text-green-600" />;
  };

  const getSpiceIndicator = () => {
    if (item.spiceLevel === "none") return null;
    const count =
      item.spiceLevel === "mild"
        ? 1
        : item.spiceLevel === "medium"
        ? 2
        : 3;

    return (
      <div className="flex gap-1">
        {Array.from({ length: count }).map((_, i) => (
          <Flame key={i} className="w-3 h-3 text-red-500" fill="currentColor" />
        ))}
      </div>
    );
  };

  

  return (
    <>
            
    
      <div className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden">
        <img src={item.image} className="h-48 w-full object-cover" />

        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center gap-2">
            {getDietIcon()}
            <h3 className="font-semibold">
              {item.nameTranslations[language]}
            </h3>
          </div>

          <p className="text-sm text-gray-500">
            {item.descriptionTranslations[language]}
          </p>

          <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            {item.prepTime} min
            {getSpiceIndicator()}
          </div>

        
       <button
  onClick={handleAddClick}
  className="w-full mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 
             text-white rounded-xl flex items-center justify-center gap-2 
             transition"
        >
     <Plus className="w-4 h-4" />
      Add to Cart
        </button>


        </div>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-xl"
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold mb-3">
              Enter Table Number
            </h3>

            <input
              value={tempTable}
              onChange={(e) => setTempTable(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />

            <button
              onClick={confirmTable}
              className="w-full bg-orange-600 text-white py-2 rounded-lg"
            >
              Confirm & Add
            </button>
          </div>
        </div>
      )}
    </>
  );
}
