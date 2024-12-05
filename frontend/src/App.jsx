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
      const response = await fetch(
        "http://localhost:3000/get-razorpay-script",
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

      if (!response.ok) {
        throw new Error("Failed to fetch Razorpay script.");
      }

      if (!document.querySelector(`script[src="${result.url}"]`)) {
        const script = document.createElement("script");
        script.src = result.url;
        script.async = true;
        script.onload = () => {
          const scriptTwo = document.createElement("script");
          scriptTwo.innerHTML = result.script;
          document.body.appendChild(scriptTwo);
        };
        script.onerror = () => {
          throw new Error("Failed to load library.");
        };
        document.body.appendChild(script);
      } else {
        const scriptTwo = document.createElement("script");
        scriptTwo.innerHTML = result.script;
        document.body.appendChild(scriptTwo);
      }

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
        "http://localhost:3000/get-razorpay-paymentLink",
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
      window.location.href=result.url

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
      <button style={{border:"1px solid"}} onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay with Razorpay using pop-up"}
      </button>
      <button style={{border:"1px solid"}} onClick={handlePaymentUsingLink} disabled={loading}>
        {loading ? "Processing..." : "Pay with Razorpay using Redirect Link"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
