import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { formatZar } from "../utils/currency.js";

export function ShopPage({ fixtures = launchFixtures }) {
  const products = Array.isArray(fixtures.products) ? fixtures.products : [];

  return (
    <section className="urban-shop-page" data-page="shop" data-design-reference="shop-zine-v1">
      <header className="urban-shop-hero" data-section="shop-intro"><p className="urban-kicker">DROP 01 / OBJECT ARCHIVE</p><h1>THE DROP.</h1><p>Objects from the URBAN ANARCHY field kit. Every item is distinct from the editorial archive it appears beside.</p></header>
      {products.length ? <section className="urban-product-grid" data-section="product-listing" aria-label="Drop 01 products">
        {products.map((product, index) => <article className={`urban-product urban-product--${(index % 8) + 1}`} key={product.id}>
          <Link to={`/shop/${product.slug}`} className="urban-product__image" aria-label={`View ${product.title}`}><img src={product.image.url} alt={product.image.altText} loading={index > 1 ? "lazy" : "eager"} /></Link>
          <div className="urban-product__copy"><p className="urban-product__code">DROP 01 / {product.availability === "available" ? "ACTIVE" : "SOLD OUT"}</p><h2>{product.title}</h2><p>{product.dek}</p><div className="urban-product__specs"><span>MAT: {product.material}</span><span>VALUE: {formatZar(product.price)}</span><span>STATUS: {product.availability}</span></div><Link to={`/shop/${product.slug}`} className="urban-product__action">VIEW OBJECT</Link></div>
        </article>)}
      </section> : <section className="urban-cart-empty"><h2>No objects are available.</h2><Link to="/visceral-mag">Read the journal</Link></section>}
    </section>
  );
}
