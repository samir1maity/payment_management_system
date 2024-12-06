import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState(0);

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/payment-popup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 400,
          currency: "INR",
          receiptId: "abcd",
        }),
      });

      const result = await response.json();
      console.log("result", result);

      if (!response.ok) {
        throw new Error("Failed to fetch Razorpay script.");
      }

      /*****************************************************************/

      const { handler, options } = result;

      const handlerFunction = new Function(`return ${handler}`)();
      const razorPayOptions = {
        ...options,
        handler: handlerFunction, 
      };

      console.log("razorPayOptions", razorPayOptions);
      const rzp1 = new window.Razorpay(razorPayOptions);
      rzp1.open();

      /******************************************************************/

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handlePaymentUsingLink = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:3001/get-razorpay-paymentLink",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 400,
            currency: "INR",
            receiptId: "abcd",
          }),
        }
      );

      const result = await response.json();

      console.log("result", result);
      window.location.href = result.url;

      if (!response.ok) {
        throw new Error("Failed to fetch Razorpay script.");
      }
    } catch (error) {}
  };

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        style={{ border: "1px solid" }}
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay with Razorpay using pop-up"}
      </button>
      <button
        style={{ border: "1px solid" }}
        onClick={handlePaymentUsingLink}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay with Razorpay using Redirect Link"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
