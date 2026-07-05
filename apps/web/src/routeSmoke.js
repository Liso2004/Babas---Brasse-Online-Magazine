import { getRouteByPath, routes } from "./routes.js";

export function getLayoutForRoute(route) {
  return route.area === "admin" || route.authRequired === true ? "admin" : "public";
}

export function buildRouteSmokeRecord(route) {
  const layout = getLayoutForRoute(route);

  return {
    id: route.id,
    label: route.label,
    path: route.path,
    area: route.area,
    authRequired: route.authRequired === true,
    prototypeFile: route.prototypeFile,
    layout,
    navigationLabel: layout === "admin" ? "Admin navigation" : "Public navigation",
    mainLandmarkId: "main-content"
  };
}

export function buildRouteSmokeRecords() {
  return routes.map(buildRouteSmokeRecord);
}

export function resolveSmokeRoute(pathname) {
  const route = getRouteByPath(pathname);

  return {
    ...buildRouteSmokeRecord(route),
    params: route.params || {}
  };
}
