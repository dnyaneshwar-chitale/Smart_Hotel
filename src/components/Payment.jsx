// import { useState } from "react";
// import { CreditCard, Smartphone, Wallet, ArrowLeft, Check } from "lucide-react";

// export function Payment({ cart, onPaymentComplete, onBack }) {
//   const [selectedMethod, setSelectedMethod] = useState("upi");
//   const [processing, setProcessing] = useState(false);

//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
//   const tax = subtotal * 0.1;
//   const total = subtotal + tax;

//   const handlePayment = () => {
//     setProcessing(true);

//     setTimeout(() => {
//       setProcessing(false);
//       onPaymentComplete(selectedMethod);
//     }, 2000);
//   };

//   const paymentMethods = [
//     {
//       id: "upi",
//       name: "UPI",
//       description: "Pay via UPI apps",
//       icon: Smartphone,
//     },
//     {
//       id: "card",
//       name: "Card",
//       description: "Credit / Debit Card",
//       icon: CreditCard,
//     },
//     {
//       id: "wallet",
//       name: "Wallet",
//       description: "Digital Wallets",
//       icon: Wallet,
//     },
//   ];

//   return (
//     <div className="max-w-2xl mx-auto">
//       <button
//         onClick={onBack}
//         className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
//       >
//         <ArrowLeft className="w-4 h-4" />
//         Back to Cart
//       </button>

//       <div className="bg-white rounded-xl shadow-sm p-6">
//         <h2 className="text-gray-900 mb-6">Payment Method</h2>

//         {/* Payment Method Selection */}
//         <div className="space-y-3 mb-6">
//           {paymentMethods.map((method) => {
//             const Icon = method.icon;

//             const isActive = selectedMethod === method.id;

//             return (
//               <button
//                 key={method.id}
//                 onClick={() => setSelectedMethod(method.id)}
//                 className={`w-full flex items-center gap-4 p-4 border-2 rounded-lg transition-all ${
//                   isActive
//                     ? "border-orange-600 bg-orange-50"
//                     : "border-gray-200 hover:border-gray-300"
//                 }`}
//               >
//                 <div
//                   className={`w-12 h-12 rounded-full flex items-center justify-center ${
//                     isActive ? "bg-orange-600" : "bg-gray-100"
//                   }`}
//                 >
//                   <Icon
//                     className={`w-6 h-6 ${
//                       isActive ? "text-white" : "text-gray-600"
//                     }`}
//                   />
//                 </div>

//                 <div className="flex-1 text-left">
//                   <p className="text-gray-900">{method.name}</p>
//                   <p className="text-gray-500 text-sm">{method.description}</p>
//                 </div>

//                 {isActive && <Check className="w-5 h-5 text-orange-600" />}
//               </button>
//             );
//           })}
//         </div>

//         {/* Payment Details Form */}
//         <div className="bg-gray-50 rounded-lg p-4 mb-6">
//           {selectedMethod === "upi" && (
//             <div>
//               <label className="block text-gray-700 mb-2">UPI ID</label>
//               <input
//                 type="text"
//                 placeholder="username@upi"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
//               />
//             </div>
//           )}

//           {selectedMethod === "card" && (
//             <div className="space-y-3">
//               <div>
//                 <label className="block text-gray-700 mb-2">Card Number</label>
//                 <input
//                   type="text"
//                   placeholder="1234 5678 9012 3456"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-gray-700 mb-2">Expiry</label>
//                   <input
//                     type="text"
//                     placeholder="MM/YY"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-2">CVV</label>
//                   <input
//                     type="text"
//                     placeholder="123"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {selectedMethod === "wallet" && (
//             <div>
//               <label className="block text-gray-700 mb-2">Select Wallet</label>
//               <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
//                 <option>PayPal</option>
//                 <option>Google Pay</option>
//                 <option>Apple Pay</option>
//                 <option>Paytm</option>
//               </select>
//             </div>
//           )}
//         </div>

//         {/* Order Summary */}
//         <div className="border-t pt-4 space-y-2 mb-6">
//           {/* <div className="flex justify-between text-gray-600">
//             <span>Subtotal</span>
//             <span>₹{subtotal.toFixed(2)}</span>
//           </div> */}

//           {/* <div className="flex justify-between text-gray-600">
//             <span>Tax (10%)</span>
//             <span>₹{tax.toFixed(2)}</span>
//           </div> */}

//           <div className="flex justify-between text-gray-900 pt-2 border-t">
//             <span>Total Amount</span>
//             <span className="text-orange-600">₹{total.toFixed(2)}</span>
//           </div>
//         </div>

//         {/* Pay Button */}
//         <button
//           onClick={handlePayment}
//           disabled={processing}
//           className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//         >
//           {processing ? "Processing Payment..." : `Pay ₹${total.toFixed(2)}`}
//         </button>

//         {processing && (
//           <div className="mt-4 text-center">
//             <div className="inline-block w-6 h-6 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
//             <p className="text-gray-600 mt-2">
//               Please wait while we process your payment...
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { CreditCard, Smartphone, Wallet, ArrowLeft, Check } from "lucide-react";

export function Payment({ cart, onPaymentComplete, onBack }) {
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal; // ❌ NO TAX

  const handlePayment = () => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      onPaymentComplete(selectedMethod);
    }, 2000);
  };

  const paymentMethods = [
    { id: "upi", name: "UPI", description: "Pay via UPI apps", icon: Smartphone },
    { id: "card", name: "Card", description: "Credit / Debit Card", icon: CreditCard },
    { id: "wallet", name: "Wallet", description: "Digital Wallets", icon: Wallet },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Cart
      </button>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-gray-900 mb-6">Payment Method</h2>

        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isActive = selectedMethod === method.id;

            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full flex items-center gap-4 p-4 border-2 rounded-lg ${
                  isActive
                    ? "border-orange-600 bg-orange-50"
                    : "border-gray-200"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isActive ? "bg-orange-600" : "bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isActive ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>

                <div className="flex-1 text-left">
                  <p>{method.name}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>

                {isActive && <Check className="w-5 h-5 text-orange-600" />}
              </button>
            );
          })}
        </div>

        <div className="border-t pt-4 mb-6 flex justify-between">
          <span>Total Amount</span>
          <span className="text-orange-600">₹{total.toFixed(2)}</span>
        </div>

        <button
          onClick={handlePayment}
          disabled={processing}
          className="w-full py-3 bg-orange-600 text-white rounded-lg"
        >
          {processing ? "Processing..." : `Pay ₹${total.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}
