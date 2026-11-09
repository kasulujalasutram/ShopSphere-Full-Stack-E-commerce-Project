
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext/CartContext.jsx";
import { useOrders } from "../CartContext/OrderContext.jsx";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, cartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSubmitError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "PIN code must contain exactly 6 digits.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (cartItems.length === 0) {
      setSubmitError("Your cart is empty.");
      return;
    }

    const order = {
      id: "SS-" + Date.now(),
      date: new Date().toLocaleDateString("en-IN"),
      items: cartItems,
      total: cartTotal,
      customer: formData,
      status: "Confirmed (Demo)",
    };

    addOrder(order);
    clearCart();

    navigate("/order-success", {
      state: { order },
    });
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "address", label: "Delivery Address", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "pincode", label: "PIN Code", type: "text" },
  ];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">
          Your cart is empty
        </h1>

        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold mb-6">
            Delivery Information
          </h1>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block font-medium mb-1">
                    {field.label}
                  </label>

                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    maxLength={
                      field.name === "phone" ? 10 :
                      field.name === "pincode" ? 6 : undefined
                    }
                    className={`w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors[field.name] ? "border-red-500" : ""
                    }`}
                  />

                  {errors[field.name] && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {submitError && (
              <p className="text-red-600 mt-4">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700"
            >
              Place Order
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-5">
            Order Summary
          </h2>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b py-3"
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}

          <div className="flex justify-between font-bold text-xl mt-5">
            <span>Total</span>
            <span>₹{cartTotal}</span>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Demo checkout: no real payment is processed.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
