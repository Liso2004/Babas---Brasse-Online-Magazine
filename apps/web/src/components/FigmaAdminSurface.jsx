export function FigmaAdminMetricGrid({ heading, items = [] }) {
  return (
    <div className="figma-admin-metrics">
      {heading ? <h2>{heading}</h2> : null}
      {items.map((item) => (
        <article key={item.key} className="metric figma-admin-metric" data-metric={item.key} data-value={item.value}>
          <p className="eyebrow">{item.label}</p>
          <strong>{item.value}</strong>
        </article>
      ))}
    </div>
  );
}

export function FigmaAdminSection({ className = "", children, ...props }) {
  return (
    <section className={`figma-admin-section ${className}`.trim()} {...props}>
      {children}
    </section>
  );
}
