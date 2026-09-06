import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { useCart } from "../cart/CartContext.jsx";
import { useAccount } from "../account/AccountContext.jsx";
import { formatZar } from "../utils/currency.js";

export function CartPage({ fixtures = launchFixtures }) {
  const { items, itemCount, removeItem, updateQuantity, clearCart } = useCart();
  const { isLoggedIn } = useAccount();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="urban-cart-page" data-page="cart" data-design-reference="cart-zine-v1">
      <header className="urban-cart-page__heading">
        <p className="urban-kicker">Drop 01 // Cart manifest</p>
        <h1>Your cart / {String(itemCount).padStart(2, "0")}</h1>
        <p>Items held for your next dispatch. Quantities remain local to this browser until checkout is connected.</p>
      </header>
      {items.length === 0 ? (
        <section className="urban-cart-empty">
          <p className="urban-kicker">No active items</p>
          <h2>The cart is clear.</h2>
          <Link to="/">Return to the drop</Link>
        </section>
      ) : (
        <>
          <section className="urban-cart-list" aria-label="Cart items">
            {items.map((item) => (
              <article key={item.id} className="urban-cart-item">
                <img src={item.image} alt={item.altText} />
                <div className="urban-cart-item__details">
                  <p className="urban-kicker">{item.code}</p>
                  <h2>{item.title}</h2>
                  <p>{item.detail}</p>
                  <label>Quantity <input type="number" min="1" value={item.quantity} onChange={(event) => updateQuantity(item.id, Number(event.target.value))} /></label>
                </div>
                <div className="urban-cart-item__actions">
                  <strong>{formatZar(item.price * item.quantity)}</strong>
                  <button type="button" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </article>
            ))}
          </section>
          <aside className="urban-cart-summary">
            <span>{itemCount} item{itemCount === 1 ? "" : "s"} // dispatch total</span>
            <strong>{formatZar(total)}</strong>
            <button type="button" onClick={clearCart}>Clear cart</button>
            <Link to={isLoggedIn ? "/checkout" : "/profile?next=/checkout"}>Initiate checkout</Link>
          </aside>
        </>
      )}
    </section>
  );
}
