
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {

  // Load orders from localStorage
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem("shopsphere_orders");

      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      console.error("Error loading orders:", error);
      return [];
    }
  });

  // Save orders whenever they change
  useEffect(() => {
    localStorage.setItem(
      "shopsphere_orders",
      JSON.stringify(orders)
    );
  }, [orders]);

  // Add a new order
  const addOrder = (order) => {
    setOrders((previousOrders) => [
      order,
      ...previousOrders,
    ]);
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

// Custom hook
export function useOrders() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrders must be used inside OrderProvider"
    );
  }

  return context;
}
