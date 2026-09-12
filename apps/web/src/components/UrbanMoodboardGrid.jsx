import { Link } from "react-router-dom";

export function UrbanMoodboardGrid({ items = [], preview = false, variant = "archive" }) {
  return (
    <div className={`urban-moodboard-grid urban-moodboard-grid--${variant}${preview ? " urban-moodboard-grid--preview" : ""}`} data-preview={preview ? "true" : undefined}>
      {items.map((item) => (
        <article key={item.id} className={`urban-moodboard-card urban-moodboard-card--${item.layout || "portrait"}`} data-specimen={item.specimen}>
          <Link to={item.href || `/moodboard/${item.slug}`} className="urban-moodboard-card__image">
            <img src={item.image.url} alt={item.image.altText} loading="lazy" />
            <span>SPECIMEN {item.specimen}</span>
          </Link>
          <div>
            <p className="eyebrow">{item.category} / Issue {item.issue}</p>
            <h3><Link to={item.href || `/moodboard/${item.slug}`}>{item.title}</Link></h3>
            <p>{item.tags.join(" / ")}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

