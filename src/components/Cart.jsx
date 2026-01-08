




// import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

// export function Cart({
//   cart,
//   onUpdateQuantity,
//   onClearCart,
//   onCheckout,
//   language,
// }) {
//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const totalPrepTime =
//     cart.length > 0 ? Math.max(...cart.map(i => i.prepTime)) : 0;

//   if (!cart || cart.length === 0) {
//     return (
//       <div className="bg-white rounded-xl p-12 text-center">
//         <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//         <h2>Your cart is empty</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="bg-white rounded-xl shadow-sm p-6">
//         <div className="flex justify-between mb-6">
//           <h2>Your Cart</h2>
//           <button
//             onClick={onClearCart}
//             className="text-red-600 flex items-center gap-2"
//           >
//             <Trash2 className="w-4 h-4" />
//             Clear Cart
//           </button>
//         </div>

//        <div className="space-y-4 mb-6">
//   {cart.map((item) => (
//     <div
//       key={item.id}
//       className="flex gap-4 p-4 bg-gray-50 rounded-lg"
//     >
//       <img
//         src={item.image}
//         className="w-20 h-20 rounded-lg object-cover"
//       />

//       <div className="flex-1">
//         <h3 className="font-semibold">
//           {item.nameTranslations?.[language] || item.name}
//         </h3>

//         {/* TABLE NUMBER */}
//         <p className="text-xs text-gray-500">
//           Table No: <span className="font-semibold">{item.tableNumber}</span>
//         </p>

//         <p className="text-sm">
//           ₹{item.price.toFixed(2)}
//         </p>

//         <div className="flex items-center gap-3 mt-2">
//           <button
//             onClick={() =>
//               onUpdateQuantity(item.id, item.quantity - 1)
//             }
//             disabled={item.quantity <= 1}
//           >
//             <Minus />
//           </button>

//           <span>{item.quantity}</span>

//           <button
//             onClick={() =>
//               onUpdateQuantity(item.id, item.quantity + 1)
//             }
//           >
//             <Plus />
//           </button>
//         </div>
//       </div>

//       {/* RIGHT SIDE: PRICE + DELETE */}
//       <div className="flex flex-col items-end justify-between">
//         <p className="text-orange-600 font-semibold">
//           ₹{(item.price * item.quantity).toFixed(2)}
//         </p>

//         {/* DELETE BUTTON */}
//         <button
//           onClick={() => onUpdateQuantity(item.id, 0)}
//           className="text-red-500 hover:text-red-700"
//         >
//           <Trash2 className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   ))}
// </div>


//         <div className="border-t pt-4 space-y-2 mb-6">
//           <div className="flex justify-between font-semibold">
//             <span>Total</span>
//             <span className="text-orange-600">
//               ₹{subtotal.toFixed(2)}
//             </span>
//           </div>

//           <div className="flex justify-between text-sm text-gray-600">
//             <span>Preparation Time</span>
//             <span>{totalPrepTime} min</span>
//           </div>
//         </div>

//         <button
//           onClick={onCheckout}
//           className="w-full py-3 bg-orange-600 text-white rounded-lg"
//         >
//           Proceed to Payment
//         </button>
//       </div>
//     </div>
//   );
// }




import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export function Cart({
  cart,
  onUpdateQuantity,
  onClearCart,
  onCheckout,
  language,
}) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalPrepTime =
    cart.length > 0 ? Math.max(...cart.map(i => i.prepTime)) : 0;

  if (!cart || cart.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between mb-6">
          <h2>Your Cart</h2>
          <button
            onClick={onClearCart}
            className="text-red-600 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear Cart
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {cart.map((item, index) => (
            <div
              key={`${item.id}-${item.tableNumber}-${index}`} // ✅ FIX
              className="flex gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <img
                src={item.image}
                className="w-20 h-20 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">
                  {item.nameTranslations?.[language] || item.name}
                </h3>

                <p className="text-xs text-gray-500">
                  Table No:{" "}
                  <span className="font-semibold">
                    {item.tableNumber}
                  </span>
                </p>

                <p className="text-sm">
                  ₹{item.price.toFixed(2)}
                </p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() =>
                      onUpdateQuantity(
                        item.id,
                        item.quantity - 1,
                        item.tableNumber // ✅ FIX
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    <Minus />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      onUpdateQuantity(
                        item.id,
                        item.quantity + 1,
                        item.tableNumber // ✅ FIX
                      )
                    }
                  >
                    <Plus />
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <p className="text-orange-600 font-semibold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() =>
                    onUpdateQuantity(
                      item.id,
                      0,
                      item.tableNumber // ✅ FIX
                    )
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2 mb-6">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-orange-600">
              ₹{subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Preparation Time</span>
            <span>{totalPrepTime} min</span>
          </div>
        </div>

        <button
          onClick={onCheckout}
          className="w-full py-3 bg-orange-600 text-white rounded-lg"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
 
