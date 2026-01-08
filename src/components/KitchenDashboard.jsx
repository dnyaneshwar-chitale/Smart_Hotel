



import { useEffect, useState } from "react";
import { CheckCircle, Trash2 } from "lucide-react";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import "../KitchenDashboard.css";

export function KitchenDashboard({ language }) {
  const [orders, setOrders] = useState([]);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-38c9f8bb`;

  // 🔄 Load Orders
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/orders`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setOrders(data.data);
            localStorage.setItem("orders", JSON.stringify(data.data));
            return;
          }
        }
      } catch {}

      const saved = JSON.parse(localStorage.getItem("orders") || "[]");
      setOrders(saved);
    };

    loadOrders();
    const interval = setInterval(loadOrders, 2000);
    return () => clearInterval(interval);
  }, []);

  // 🔁 Update Status
  const updateOrderStatus = async (orderId, status) => {
    try {
      await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ status }),
      });
    } catch {}

    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status } : o
    );
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  // 🗑 Delete Order
  const deleteOrder = async (orderId) => {
    try {
      await fetch(`${API_URL}/orders/${orderId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
    } catch {}

    const updated = orders.filter((o) => o.id !== orderId);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  const activeOrders = orders.filter((o) => o.status !== "served");
  const completedOrders = orders.filter((o) => o.status === "served");

  const getTimeSince = (timestamp) => {
    const mins = Math.floor((Date.now() - timestamp) / 60000);
    return mins < 1 ? "Just now" : `${mins} min ago`;
  };

  return (
    <div className="kitchen-wrapper">
      {/* 📊 STATS TABLE */}
      <table className="stats-table">
        <thead>
          <tr>
            <th>Total Orders</th>
            <th>Active Orders</th>
            <th>Preparing</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orders.length}</td>
            <td>{activeOrders.length}</td>
            <td>{orders.filter(o => o.status === "preparing").length}</td>
            <td>{completedOrders.length}</td>
          </tr>
        </tbody>
      </table>

      {/* 🔥 ACTIVE ORDERS TABLE */}
      <h3 className="section-title">Active Orders</h3>

      {activeOrders.length === 0 ? (
        <div className="empty-box">
          <CheckCircle />
          <p>No active orders</p>
        </div>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Table</th>
              <th>Items</th>
              <th>Status</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {activeOrders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id.slice(-8)}</td>
                <td>{order.tableNumber}</td>

                <td>
                  {order.items.map((item) => (
                    <div key={item.id}>
                      {item.quantity}x{" "}
                      {item.nameTranslations?.[language] || item.name}
                      {item.spiceLevel !== "none" && (
                        <strong> ({item.spiceLevel})</strong>
                      )}
                    </div>
                  ))}
                </td>

                <td>
                  <span className={`status-badge status-${order.status}`}>
                    {order.status}
                  </span>
                </td>

                <td>{getTimeSince(order.timestamp)}</td>

                <td>
                  {order.status === "pending" && (
                    <button
                      className="btn blue"
                      onClick={() => updateOrderStatus(order.id, "accepted")}
                    >
                      Accept
                    </button>
                  )}

                  {order.status === "accepted" && (
                    <button
                      className="btn orange"
                      onClick={() => updateOrderStatus(order.id, "preparing")}
                    >
                      Start
                    </button>
                  )}

                  {order.status === "preparing" && (
                    <button
                      className="btn green"
                      onClick={() => updateOrderStatus(order.id, "ready")}
                    >
                      Ready
                    </button>
                  )}

                  {order.status === "ready" && (
                    <button
                      className="btn gray"
                      onClick={() => updateOrderStatus(order.id, "served")}
                    >
                      Served
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✅ COMPLETED ORDERS */}
      {completedOrders.length > 0 && (
        <>
          <h3 className="section-title">Recently Completed</h3>

          <table className="orders-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Table</th>
                <th>Items</th>
                <th>Time</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {completedOrders
                .slice(-5)
                .reverse()
                .map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id.slice(-8)}</td>
                    <td>{order.tableNumber}</td>
                    <td>{order.items.length}</td>
                    <td>{getTimeSince(order.timestamp)}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteOrder(order.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}


