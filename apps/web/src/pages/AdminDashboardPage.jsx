import { ArrowUpRight, CircleCheck, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import * as launchFixtures from "../data/launchFixtures.js";
import { FigmaAdminMetricGrid, FigmaAdminSection } from "../components/FigmaAdminSurface.jsx";
import { buildAdminDashboardRouteModel } from "./adminDashboardRouteModel.js";

export function AdminDashboardPage({ fixtures = launchFixtures }) {
  const model = buildAdminDashboardRouteModel(fixtures);
  const { hero, sections } = model;

  return (
    <section className="figma-admin-page figma-admin-dashboard-page" data-workspace="stitch-dashboard-workspace" data-page="admin-dashboard" data-design-reference="admin-dashboard-v4" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile} data-auth-required={model.auth.role}>
      <header className="figma-admin-page-intro stitch-dashboard-intro" data-section="admin-dashboard-intro">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p>{hero.dek}</p>
        </div>
        <p className="stitch-live-status"><span aria-hidden="true" /> Live workspace</p>
      </header>

      <FigmaAdminSection className="stitch-dashboard-metrics" data-section="dashboard-stats">
        <FigmaAdminMetricGrid heading={sections.stats.heading} items={sections.stats.items} />
      </FigmaAdminSection>

      <div className="stitch-dashboard-grid">
        <section className="figma-admin-table-panel" data-stitch-panel="stitch-activity-panel" data-section="recent-activity">
          <div className="stitch-panel-heading">
            <div><p className="eyebrow">Queue</p><h2>{sections.recentActivity.heading}</h2></div>
            <Clock3 size={24} aria-hidden="true" />
          </div>
          <div className="activity-table" role="table" aria-label="Recent admin activity">
            <div role="row" className="table-header">
              {sections.recentActivity.columns.map((column) => <span key={column} data-column={column} role="columnheader">{column}</span>)}
            </div>
            {sections.recentActivity.items.map((item) => (
              <div key={item.status + "-" + item.item} role="row" className="activity-row" data-status={item.status}>
                <span role="cell">{item.actor}</span>
                <span role="cell">{item.item}</span>
                <span role="cell"><i aria-hidden="true" />{item.status}</span>
                <span role="cell">{item.timestamp}</span>
                <Link role="cell" to={item.href} aria-label={item.nextAction + ": " + item.item}><ArrowUpRight aria-hidden="true" /></Link>
              </div>
            ))}
          </div>
        </section>

        <section className="figma-admin-action-grid" data-stitch-panel="stitch-quick-actions" data-section="quick-actions">
          <div className="stitch-panel-heading">
            <div><p className="eyebrow">Shortcuts</p><h2>{sections.quickActions.heading}</h2></div>
          </div>
          {sections.quickActions.items.map((action, index) => (
            <Link key={action.href} className="quick-action-card" to={action.href}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{action.label}</h3><p>{action.body}</p></div>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </section>
      </div>

      <footer className="stitch-dashboard-status" data-section="dashboard-states">
        <p><CircleCheck aria-hidden="true" /> Editorial workspace operational</p>
        <p>Admin session required / Production content connected</p>
      </footer>
    </section>
  );
}
