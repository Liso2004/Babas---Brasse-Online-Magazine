import * as launchFixtures from "../data/launchFixtures.js";
import { FigmaAdminMetricGrid, FigmaAdminSection } from "../components/FigmaAdminSurface.jsx";
import { buildAdminDashboardRouteModel } from "./adminDashboardRouteModel.js";

export function AdminDashboardPage({ fixtures = launchFixtures }) {
  const model = buildAdminDashboardRouteModel(fixtures);
  const { hero, sections } = model;

  return (
    <section className="figma-admin-page figma-admin-dashboard-page" data-page="admin-dashboard" data-design-reference="admin-dashboard-v4" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile} data-auth-required={model.auth.role}>
      <header className="figma-admin-page-intro" data-section="admin-dashboard-intro">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.dek}</p>
      </header>

      <FigmaAdminSection data-section="dashboard-stats">
        <FigmaAdminMetricGrid heading={sections.stats.heading} items={sections.stats.items} />
      </FigmaAdminSection>

      <section className="figma-admin-table-panel" data-section="recent-activity">
        <h2>{sections.recentActivity.heading}</h2>
        <div className="activity-table" role="table" aria-label="Recent admin activity">
          <div role="row" className="table-header">
            {sections.recentActivity.columns.map((column) => <span key={column} data-column={column} role="columnheader">{column}</span>)}
          </div>
          {sections.recentActivity.items.map((item) => (
            <div key={`${item.status}-${item.item}`} role="row" className="activity-row" data-status={item.status}>
              <span role="cell">{item.actor}</span>
              <span role="cell">{item.item}</span>
              <span role="cell">{item.status}</span>
              <span role="cell">{item.timestamp}</span>
              <a role="cell" href={item.href}>{item.nextAction}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="figma-admin-action-grid" data-section="quick-actions">
        <h2>{sections.quickActions.heading}</h2>
        {sections.quickActions.items.map((action) => (
          <article key={action.href} className="quick-action-card">
            <h3>{action.label}</h3>
            <p>{action.body}</p>
            <a href={action.href}>{action.label}</a>
          </article>
        ))}
      </section>

      <section className="figma-admin-state-grid" data-section="dashboard-states" data-state-note="dashboard-loading" data-state-note-secondary="dashboard-empty">
        <h2>Dashboard states</h2>
        {sections.states.items.map((state) => <article key={state} data-state={state}>{state}</article>)}
        <p>{sections.states.errorCopy}</p>
        <a href={sections.states.permissionHref}>Return to admin login</a>
      </section>
    </section>
  );
}