import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { useCart } from "../cart/CartContext.jsx";
import { useAccount } from "../account/AccountContext.jsx";
import { formatZar } from "../utils/currency.js";

function findProduct(fixtures, slug) {
  return (fixtures.products || []).find((product) => product.slug === slug);
}

function ProductMeta({ label, value, accent = false }) {
  return <li><span>{label}</span><strong className={accent ? "product-detail-accent" : undefined}>{value}</strong></li>;
}

export function ProductDetailPage({ slug, fixtures = launchFixtures }) {
  const product = findProduct(fixtures, slug);
  if (!product) return <section className="urban-product-detail urban-product-detail--missing" data-page="product-detail" data-state="not-found"><p className="urban-kicker">SYSTEM ERROR // 404</p><h1>Object not found.</h1><p>This object is not in the current Drop 01 archive.</p><Link className="urban-product-detail__back" to="/shop">Return to the drop</Link></section>;

  const isAvailable = product.availability === "available";
  const productCode = product.title.replace(/[^a-z0-9]+/gi, "_").toUpperCase().slice(0, 18);
  const { addItem, items } = useCart();
  const { isLoggedIn } = useAccount();
  const cartItem = items.find((item) => item.id === product.id);
  const related = (fixtures.products || []).filter((item) => item.id !== product.id).slice(0, 3);

  function handleAddToCart() { addItem({ id: product.id, title: product.title, detail: product.dek, code: productCode, image: product.image.url, altText: product.image.altText, price: product.price }); }

  return <article className="urban-product-detail" data-page="product-detail" data-design-reference="product-detail-zine-v1" data-product={product.slug}>
    <div className="urban-product-detail__watermark" aria-hidden="true">{productCode}</div>
    <div className="urban-product-detail__grid"><section className="urban-product-detail__media" aria-label={`${product.title} product image`}><div className="urban-product-detail__tape" aria-hidden="true" /><img src={product.image.url} alt={product.image.altText} /><div className="urban-product-detail__specs"><p className="urban-kicker">Object specifications</p><ul><ProductMeta label="MAT" value={product.material} /><ProductMeta label="PRC" value={isAvailable ? formatZar(product.price) : "SOLD_OUT"} accent={!isAvailable} /><ProductMeta label="STS" value={isAvailable ? "ACTIVE_DROP" : "DEPLETED"} accent /><ProductMeta label="DROP" value="01 / NO RESTOCK" /></ul></div></section>
    <section className="urban-product-detail__copy"><p className="urban-kicker">Classification // Drop 01</p><h1>{product.title}</h1><div className="urban-product-detail__price"><span>Archive value / ZAR</span><strong>{formatZar(isAvailable ? product.price : 0)}</strong></div><p className="urban-product-detail__dek">{product.dek}</p><button className="urban-product-detail__cart" type="button" data-glitch-label={isAvailable ? "ADD TO CART // INIT" : "ITEM DEPLETED // NO RESTOCK"} disabled={!isAvailable} onClick={handleAddToCart}>{isAvailable ? cartItem ? `In cart // ${cartItem.quantity}` : "Add to cart // init" : "Item depleted // no restock"}</button><Link className="urban-product-detail__back" to={isLoggedIn ? "/checkout" : "/profile?next=/checkout"}>Proceed to checkout</Link>{product.relatedArticleIds?.length ? <Link className="urban-product-detail__back" to={`/visceral-mag/${product.relatedArticleIds[0]}`}>Read related dispatch</Link> : null}</section></div>
    <section className="urban-product-detail__quote" aria-label="Drop statement"><p className="urban-kicker">// Log entry: alpha_09</p><blockquote>Built for the fallout.<br />No restocks.<br />No mercy.</blockquote></section>
    <section className="urban-product-detail__related" aria-labelledby="product-related-heading"><div className="urban-product-detail__section-heading"><p className="urban-kicker">Continue the system</p><h2 id="product-related-heading">More from Drop 01</h2></div><div className="urban-product-detail__related-grid">{related.map((item) => <Link key={item.id} to={`/shop/${item.slug}`} className="urban-product-detail__related-card"><img src={item.image.url} alt={item.image.altText} loading="lazy" /><strong>{item.title}</strong></Link>)}</div></section>
  </article>;
}
