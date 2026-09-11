import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext.jsx";
import { useAccount } from "../account/AccountContext.jsx";
import { formatZar } from "../utils/currency.js";

const CHECKOUT_ERROR_MESSAGE = "Unable to process checkout. Please try again.";

async function readCheckoutResponse(response) {
  const body = await response.text();

  if (!body.trim()) {
    return { payload: null, issue: "The checkout service returned an empty response." };
  }

  try {
    return { payload: JSON.parse(body), issue: null };
  } catch (error) {
    console.error("Checkout response was not valid JSON.", {
      status: response.status,
      contentType: response.headers.get("content-type"),
      error
    });
    return { payload: null, issue: "The checkout service returned an invalid response." };
  }
}

export function CheckoutPage() {
  const { items, itemCount, clearCart } = useCart();
  const { account } = useAccount();
  const [checkoutState, setCheckoutState] = useState({ status: "idle", orderId: "", message: "" });
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function confirmDispatch() {
    if (!items.length) return;
    setCheckoutState({ status: "submitting", orderId: "", message: "Reserving your drop..." });

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          customer: account ? { name: account.name, email: account.email } : undefined,
          items: items.map((item) => ({ productId: item.id, title: item.title, price: item.price, quantity: item.quantity }))
        })
      });
      const { payload, issue } = await readCheckoutResponse(response);

      if (!response.ok) {
        const serverMessage = typeof payload?.error === "string" ? payload.error : issue;
        throw new Error(serverMessage || `Checkout request failed with status ${response.status}.`);
      }

      if (issue || !payload?.id) {
        throw new Error(issue || "The checkout service returned no order confirmation.");
      }

      clearCart();
      setCheckoutState({ status: "success", orderId: payload.id, message: "Dispatch reserved. Payment collection will be connected at launch." });
    } catch (error) {
      console.error("Checkout dispatch failed.", error);
      setCheckoutState({ status: "error", orderId: "", message: CHECKOUT_ERROR_MESSAGE });
    }
  }

  return (
    <section className="urban-checkout-page" data-page="checkout">
      <header className="urban-account-page__heading">
        <p className="urban-kicker">Dispatch terminal // checkout</p>
        <h1>Proceed to checkout.</h1>
        <p>Signed in as {account?.name}. Your cart is ready for dispatch.</p>
      </header>
      <section className="urban-account-card urban-checkout-card">
        <p>{itemCount} item{itemCount === 1 ? "" : "s"} queued</p>
        <strong>{formatZar(total)}</strong>
        {checkoutState.status === "success" ? (
          <p role="status">{checkoutState.message} Order <strong>{checkoutState.orderId}</strong>.</p>
        ) : (
          <>
            <button type="button" disabled={!items.length || checkoutState.status === "submitting"} onClick={confirmDispatch}>
              {checkoutState.status === "submitting" ? "Reserving..." : "Confirm dispatch"}
            </button>
            {checkoutState.message ? <p role="alert">{checkoutState.message}</p> : null}
          </>
        )}
        <Link to="/cart">Return to cart</Link>
      </section>
    </section>
  );
}
