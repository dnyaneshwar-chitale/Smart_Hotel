import { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  ChefHat,
  Package,
  UtensilsCrossed,
} from "lucide-react";


const statusSteps = [
  { status: "pending", label: "Order Placed", icon: CheckCircle },
  { status: "accepted", label: "Order Accepted", icon: Clock },
  { status: "preparing", label: "Preparing", icon: ChefHat },
  { status: "ready", label: "Ready to Serve", icon: Package },
  { status: "served", label: "Served", icon: UtensilsCrossed },
];

export default function OrderTracking({ order, onOrderServed, language }) {
  const [currentOrder, setCurrentOrder] = useState(order);

  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
  const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-38c9f8bb`;

  useEffect(() => {
    const checkOrderStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/orders/${order.id}`, {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        });

        const data = await response.json();

        if (data?.success && data?.data) {
          setCurrentOrder(data.data);

          if (data.data.status === "served") {
            setTimeout(() => {
              onOrderServed();
            }, 2000);
          }
        }
      } catch (error) {
        console.error("Order status fetch error:", error);
      }
    };

    checkOrderStatus();
    const interval = setInterval(checkOrderStatus, 2000);

    return () => clearInterval(interval);
  }, [order.id, onOrderServed]);

  if (!currentOrder) return null;

  const currentStepIndex = statusSteps.findIndex(
    (step) => step.status === currentOrder.status
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="text-center mb-8">
          <h2 className="text-gray-900 mb-2">Order Tracking</h2>
          <p className="text-gray-600">Order ID: {currentOrder.id}</p>
          <p className="text-gray-600">Table: {currentOrder.tableNumber}</p>
        </div>

        <div className="relative mb-8">
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full bg-orange-600 transition-all duration-500"
              style={{
                width: `${
                  (currentStepIndex / (statusSteps.length - 1)) * 100
                }%`,
              }}
            />
          </div>

          <div className="relative flex justify-between">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.status} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                      ${
                        isCompleted
                          ? "bg-orange-600 text-white"
                          : "bg-gray-200 text-gray-400"
                      }
                      ${isCurrent ? "ring-4 ring-orange-200" : ""}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <p
                    className={`mt-2 text-sm text-center ${
                      isCompleted ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <p className="text-orange-800 text-center">
            {currentOrder.status === "pending" &&
              "Your order has been placed and sent to the kitchen"}
            {currentOrder.status === "accepted" &&
              "Kitchen has accepted your order"}
            {currentOrder.status === "preparing" &&
              "Your food is being prepared"}
            {currentOrder.status === "ready" &&
              "Your order is ready! Our staff will serve it shortly"}
            {currentOrder.status === "served" &&
              "Enjoy your meal! Please provide feedback"}
          </p>
        </div>

        <div>
          <h3 className="text-gray-900 mb-3">Order Items</h3>
          <div className="space-y-2">
            {currentOrder.items?.map((item) => (
              <div
                key={item.id}
                className="flex justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.nameTranslations?.[language]}
                    className="w-12 h-12 rounded object-cover"
                  />

                  <div>
                    <p className="text-gray-900">
                      {item.nameTranslations?.[language]}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>

                <p className="text-gray-900">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between text-gray-900">
            <span>Total Paid</span>
            <span className="text-orange-600">
              ₹{currentOrder.total?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
