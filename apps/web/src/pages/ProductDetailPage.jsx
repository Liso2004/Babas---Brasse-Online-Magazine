import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { useCart } from "../cart/CartContext.jsx";
import { useAccount } from "../account/AccountContext.jsx";
import { formatZar } from "../utils/currency.js";

function findProduct(fixtures, slug) {
  return fixtures.articles.find((article) => article.slug === slug && article.status === "published");
}

function ProductMeta({ label, value, accent = false }) {
  return (
    <li>
      <span>{label}</span>
      <strong className={accent ? "product-detail-accent" : undefined}>{value}</strong>
    </li>
  );
}

export function ProductDetailPage({ slug, fixtures = launchFixtures }) {
  const product = findProduct(fixtures, slug);

  if (!product) {
    return (
      <section className="urban-product-detail urban-product-detail--missing" data-page="product-detail" data-state="not-found">
        <p className="urban-kicker">SYSTEM ERROR // 404</p>
        <h1>Product not found.</h1>
        <p>This item has left the current drop.</p>
        <Link className="urban-product-detail__back" to="/">Return to Drop 01</Link>
      </section>
    );
  }

  const image = product.featuredImage;
  const isAvailable = product.id !== "the-new-uniform";
  const productCode = product.title.replace(/[^a-z0-9]+/gi, "_").toUpperCase().slice(0, 18);
  const { addItem, items } = useCart();
  const { isLoggedIn } = useAccount();
  const cartItem = items.find((item) => item.id === product.id);

  function handleAddToCart() {
    addItem({
      id: product.id,
      title: product.title,
      detail: product.dek,
      code: productCode,
      image: image.url,
      altText: image.altText,
      price: 999
    });
  }

  return (
    <article className="urban-product-detail" data-page="product-detail" data-design-reference="product-detail-zine-v1" data-product={product.slug}>
      <div className="urban-product-detail__watermark" aria-hidden="true">{productCode}</div>
      <div className="urban-product-detail__grid">
        <section className="urban-product-detail__media" aria-label={`${product.title} product image`}>
          <div className="urban-product-detail__tape" aria-hidden="true" />
          <img src={image.url} alt={image.altText} />
          <div className="urban-product-detail__specs">
            <p className="urban-kicker">System diagnostics</p>
            <ul>
              <ProductMeta label="MAT" value="400GSM / ARCHIVE COTTON" />
              <ProductMeta label="PRC" value={isAvailable ? formatZar(999) : "SOLD_OUT"} accent={!isAvailable} />
              <ProductMeta label="STS" value={isAvailable ? "ACTIVE_DROP" : "DEPLETED"} accent />
              <ProductMeta label="SIZE" value="[ADJUSTABLE_GRID]" />
            </ul>
          </div>
        </section>

        <section className="urban-product-detail__copy">
          <p className="urban-kicker">Classification // Drop 01</p>
          <h1>{product.title}</h1>
          <div className="urban-product-detail__price"><span>Archive value / ZAR</span><strong>{formatZar(isAvailable ? 999 : 0)}</strong></div>
          <p className="urban-product-detail__dek">{product.dek}</p>
          <button className="urban-product-detail__cart" type="button" data-glitch-label={isAvailable ? "ADD TO CART // INIT" : "ITEM DEPLETED // NO RESTOCK"} disabled={!isAvailable} onClick={handleAddToCart}>
            {isAvailable ? cartItem ? `In cart // ${cartItem.quantity}` : "Add to cart // init" : "Item depleted // no restock"}
          </button>
          <Link className="urban-product-detail__back" to={isLoggedIn ? "/checkout" : "/profile?next=/checkout"}>Proceed to checkout</Link>
        </section>
      </div>

      <section className="urban-product-detail__quote" aria-label="Drop statement">
        <p className="urban-kicker">// Log entry: alpha_09</p>
        <blockquote>Built for the fallout.<br />No restocks.<br />No mercy.</blockquote>
      </section>

      <section className="urban-product-detail__related" aria-labelledby="product-related-heading">
        <div className="urban-product-detail__section-heading">
          <p className="urban-kicker">Continue the system</p>
          <h2 id="product-related-heading">More from Drop 01</h2>
        </div>
        <div className="urban-product-detail__related-grid">
          {fixtures.articles.filter((article) => article.status === "published" && article.id !== product.id).slice(0, 3).map((item) => (
            <Link key={item.id} to={`/shop/${item.slug}`} className="urban-product-detail__related-card">
              <img src={item.featuredImage.url} alt={item.featuredImage.altText} />
              <strong>{item.title}</strong>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
