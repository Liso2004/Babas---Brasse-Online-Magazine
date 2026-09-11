import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { buildProfileDetailRouteModel } from "./profileDetailRouteModel.js";
import { useCart } from "../cart/CartContext.jsx";
import { formatZar } from "../utils/currency.js";

function ProfileLink({ link }) {
  const isExternal = /^https?:\/\//i.test(link.url);
  return isExternal
    ? <a href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
    : <Link to={link.url}>{link.label}</Link>;
}

export function ProfileDetailPage({ slug, fixtures = launchFixtures }) {
  const model = buildProfileDetailRouteModel(fixtures, slug);

  if (model.state === "not-found") {
    return (
      <section className="figma-public-page figma-profile-detail" data-page="profile-detail" data-state="not-found">
        <p className="eyebrow">Profile unavailable</p>
        <h1>This profile could not be found.</h1>
        <p>It may be unpublished or have moved.</p>
        <Link to={model.backHref}>Browse contributors</Link>
      </section>
    );
  }

  const { profile, publishedWorks } = model;
  const { items, itemCount } = useCart();
  const latestWork = publishedWorks[0];
  const activeCartItem = items[0];
  const dropCount = String(publishedWorks.length).padStart(2, "0");
  const profileCode = profile.id.slice(0, 8).toUpperCase();

  return (
    <article className="figma-public-page figma-profile-detail urban-profile-dossier" data-page="profile-detail" data-design-reference="profile-dossier-v1" data-route={model.route.path} data-profile={profile.slug}>
      <div className="urban-profile-statusbar" aria-label="System status"><span>09:41</span><span>/// UA NETWORK // ONLINE</span></div>
      <header className="urban-profile-header">
        <Link className="urban-profile-header__brand" to="/">URBAN ANARCHY</Link>
        <nav aria-label="Profile navigation">
          <Link to="/">Shop</Link><Link to="/visceral-mag">Archive</Link><Link to="/about">Manifesto</Link><Link className="is-active" to="/contact">Connect</Link>
        </nav>
        <Link className="urban-profile-cart" to="/cart">Cart / {itemCount}</Link>
      </header>

      <main className="urban-profile-main">
        <section className="urban-profile-dossier-card" aria-labelledby="profile-dossier-heading">
          <div className="urban-profile-dossier-card__topline"><span><i />Operative ident: {profileCode}-UA</span><strong>â—ˆ Clearance tier 05</strong></div>
          <div className="urban-profile-identity">
            <div className="urban-profile-polaroid">
              <span className="urban-profile-tape" aria-hidden="true" />
              <img src={profile.image.url} alt={profile.image.altText} />
              <small>UA-DOSSIER / <b>ACTIVE</b></small>
            </div>
            <div className="urban-profile-identity__copy">
              <span className="urban-profile-alert">ACTIVE BREACH</span>
              <h1 id="profile-dossier-heading">{profile.name}</h1>
              <p className="urban-profile-location">LOC // SECTOR 07G <b>| ONLINE</b></p>
              <p>{profile.fullBio}</p>
              <div className="urban-profile-actions">
                <Link to={profile.socialLinks[0]?.url || "/contact"}>â—‰ Biometric / connect</Link>
                <span aria-hidden="true">âŒ˜</span>
              </div>
            </div>
          </div>
        </section>

        <section className="urban-profile-stats" aria-label="Profile metrics">
          <div><span>Drops</span><strong>{dropCount}</strong><small>delivered</small></div>
          <div><span>Breaches</span><strong>{publishedWorks.length + 8}</strong><small className="is-green">unlocked</small></div>
          <div><span>Credits</span><strong>{publishedWorks.length * 250 + 100}</strong><small>synd_pts</small></div>
          <div className="is-red"><span>Tier</span><strong>V_ELITE</strong><small>max priv</small></div>
        </section>

        <nav className="urban-profile-tabs" aria-label="Dossier sections"><Link className="is-active" to="#drops">Drops &amp; orders</Link><a href="#logs">Cipher logs</a><a href="#security">Security</a></nav>

        <section id="drops" className="urban-profile-panel urban-profile-order" aria-labelledby="profile-order-heading">
          <div className="urban-profile-panel__heading"><div><span>Latest syndicate drop</span><h2 id="profile-order-heading">ORDER #UA-{profileCode.slice(0, 6)}B</h2></div><strong>EN ROUTE // DISPATCHED</strong></div>
          {activeCartItem || latestWork ? <div className="urban-profile-order__item"><div className="urban-profile-order__thumb"><img src={activeCartItem?.image || latestWork.featuredImage.url} alt="" /></div><div><b>{activeCartItem?.title || latestWork.title}</b><p>{activeCartItem ? `QTY: ${activeCartItem.quantity} â€¢ CART HOLD` : "COLOR: ASH BLACK â€¢ SIZE: L"}</p><strong>{activeCartItem ? formatZar(activeCartItem.price * activeCartItem.quantity) : formatZar(240)} <small>[PRE-RELEASE ACCESS]</small></strong></div></div> : <p>No published drops attached yet.</p>}
          <div className="urban-profile-tracker"><p><b>â— CARRIER: UA-GLOBAL DEAD-DROP</b><strong>ETA: TOMORROW 18:00</strong></p><div><span /></div><small><b>SEC_FACILITY</b><b>TRANSIT</b><b className="is-red">LAST MILE</b><b>COVERT DROP</b></small></div>
          <div className="urban-profile-order__actions"><button type="button">â–£ Track dispatch</button><button type="button">â–¤ Invoice</button></div>
        </section>

        {model.visualResearch?.length ? (
          <section className="urban-profile-panel urban-profile-visual-research" data-section="profile-visual-research" aria-labelledby="profile-visual-research-heading">
            <div className="urban-profile-panel__heading"><div><span>Research file</span><h2 id="profile-visual-research-heading">VISUAL RESEARCH</h2></div><Link to="/moodboard">OPEN ARCHIVE</Link></div>
            <div className="urban-related-material__list">
              {model.visualResearch.slice(0, 4).map((item) => <Link key={item.id} to={item.href}><img src={item.image.url} alt={item.image.altText} /><span>SPECIMEN {item.specimen}</span><strong>{item.title}</strong></Link>)}
            </div>
          </section>
        ) : null}
        <section id="security" className="urban-profile-security" aria-label="Profile security modules">
          <Link to="/contact"><span>âŒ–</span><b>Dead-drop coordinates<small>Primary: warehouse 14, sector 07G</small></b><i>â€º</i></Link>
          <Link to={profile.socialLinks[0]?.url || "/contact"}><span>â™§</span><b>Encrypted passkey &amp; 2FA<small className="is-green">â— Secured via hardware key</small></b><i>â€º</i></Link>
          <Link to="/contact"><span>âŒ</span><b>Burst transmissions<small>Push notifications active for drops</small></b><i>â€º</i></Link>
        </section>

        <section id="logs" className="urban-profile-connection"><p>CIPHERED CONNECTION: TLS 1.3 / AES-256-GCM</p><Link to={model.backHref}>â‡¥ Disconnect / purge session</Link></section>
      </main>

      <footer className="urban-profile-footer"><span>URBAN ANARCHY / TYPE_01</span><small>LOC: UNDERGROUND_S01<br />Â© 2024 NO_RIGHTS_RESERVED</small></footer>
      <nav className="urban-profile-bottom-nav" aria-label="Dossier navigation"><Link to="#drops">â—‰<small>Drops</small></Link><Link to="#logs">â—Œ<small>Radar</small></Link><Link to="#security">â–£<small>Comm</small></Link><Link className="is-active" to="#profile-dossier-heading">â–¤<small>Dossier</small></Link></nav>
    </article>
  );
}
