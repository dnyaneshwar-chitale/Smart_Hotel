



// import { useState } from "react";
// import { Star, Send } from "lucide-react";
// import { projectId, publicAnonKey } from "../utils/supabase/info";

// export function Feedback({ order, onComplete, language }) {
//   const [rating, setRating] = useState(0);
//   const [hoveredRating, setHoveredRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-38c9f8bb`;

//   const handleSubmit = async () => {
//     const feedback = {
//       orderId: order.id,
//       items: order.items,
//       rating,
//       comment,
//       timestamp: Date.now(),
//     };

//     try {
//       const response = await fetch(`${API_URL}/feedback`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${publicAnonKey}`,
//         },
//         body: JSON.stringify(feedback),
//       });

//       if (!response.ok) throw new Error("Feedback submission failed");
//     } catch (error) {
//       console.error("Error submitting feedback:", error);

//       const old = JSON.parse(localStorage.getItem("feedbacks") || "[]");
//       old.push(feedback);
//       localStorage.setItem("feedbacks", JSON.stringify(old));
//     }

//     setSubmitted(true);
//     setTimeout(() => onComplete(), 2000);
//   };

//   if (submitted) {
//     return (
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-xl shadow-sm p-12 text-center">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Send className="w-8 h-8 text-green-600" />
//           </div>
//           <h2 className="text-gray-900 mb-2">Thank You!</h2>
//           <p className="text-gray-600">
//             Your feedback helps us improve our service
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="bg-white rounded-xl shadow-sm p-6">
//         <h2 className="text-gray-900 mb-2 text-center">
//           How was your experience?
//         </h2>
//         <p className="text-gray-600 text-center mb-8">
//           Please rate your meal and service
//         </p>

//         {/* Stars */}
//         <div className="flex justify-center gap-2 mb-8">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <button
//               key={star}
//               onClick={() => setRating(star)}
//               onMouseEnter={() => setHoveredRating(star)}
//               onMouseLeave={() => setHoveredRating(0)}
//               className="transition-transform hover:scale-110"
//             >
//               <Star
//                 className={`w-12 h-12 ${
//                   star <= (hoveredRating || rating)
//                     ? "text-yellow-400 fill-yellow-400"
//                     : "text-gray-300"
//                 }`}
//               />
//             </button>
//           ))}
//         </div>

//         {/* Order Summary */}
//         <div className="mb-6">
//           <h3 className="text-gray-900 mb-3">Your Order</h3>

//           <div className="space-y-2">
//             {order.items.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.nameTranslations[language]}
//                   className="w-12 h-12 rounded object-cover"
//                 />
//                 <p className="flex-1 text-gray-900">
//                   {item.nameTranslations[language]}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Comment */}
//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2">
//             Additional Comments (Optional)
//           </label>
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="Tell us more about your experience..."
//             rows={4}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 resize-none"
//           />
//         </div>

//         {/* Submit */}
//         <button
//           onClick={handleSubmit}
//           disabled={rating === 0}
//           className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//         >
//           <Send className="w-4 h-4" />
//           Submit Feedback
//         </button>
//       </div>
//     </div>
//   );
// }











import { useState } from "react";
import { Star, Send } from "lucide-react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

export function Feedback({ order, onComplete, language }) {
  // per-item rating
  const [ratings, setRatings] = useState(order.items.map(() => 0));
  const [hoveredRatings, setHoveredRatings] = useState(order.items.map(() => 0));
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-38c9f8bb`;

  const handleRating = (index, value) => {
    const updated = [...ratings];
    updated[index] = value;
    setRatings(updated);
  };

  const handleHover = (index, value) => {
    const updated = [...hoveredRatings];
    updated[index] = value;
    setHoveredRatings(updated);
  };

  const handleSubmit = async () => {
    const feedbackPayload = {
      orderId: order.id,
      items: order.items.map((item, i) => ({
        itemId: item.id,
        rating: ratings[i],
      })),
      comment,
      timestamp: Date.now(),
    };

    try {
      const response = await fetch(`${API_URL}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(feedbackPayload),
      });

      if (!response.ok) throw new Error("Feedback submission failed");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      const old = JSON.parse(localStorage.getItem("feedbacks") || "[]");
      old.push(feedbackPayload);
      localStorage.setItem("feedbacks", JSON.stringify(old));
    }

    setSubmitted(true);
    setTimeout(() => onComplete(), 2000);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600">
            Your feedback helps us improve our service
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-gray-900 mb-2 text-center">
          How was your experience?
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Please rate each item and leave a comment
        </p>

        {/* Per-item ratings */}
        {order.items.map((item, index) => (
          <div key={item.id} className="mb-6 border-b pb-4">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={item.image}
                alt={item.nameTranslations[language]}
                className="w-12 h-12 rounded object-cover"
              />
              <p className="text-gray-900">{item.nameTranslations[language]}</p>
            </div>

            <div className="flex gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(index, star)}
                  onMouseEnter={() => handleHover(index, star)}
                  onMouseLeave={() => handleHover(index, 0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hoveredRatings[index] || ratings[index])
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Single comment for all items */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Additional Comments (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us more about your experience..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={ratings.some((r) => r === 0)}
          className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Submit Feedback
        </button>
      </div>

      
    </div>
  );
}
