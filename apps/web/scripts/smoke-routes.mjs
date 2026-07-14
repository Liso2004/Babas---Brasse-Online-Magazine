const baseUrl = (process.env.WEB_BASE_URL || "http://127.0.0.1:5173").replace(/\/$/, "");

const routes = [
  "/",
  "/about",
  "/creative-team",
  "/contributors",
  "/people/visceral-contributor",
  "/visceral-mag",
  "/visceral-mag/send-a-text-before-you-knock",
  "/search",
  "/featured",
  "/contact",
  "/admin",
  "/admin/articles",
  "/admin/profiles-media",
  "/admin/moderation",
  "/admin/contact-submissions",
  "/admin/login",
  "/admin/password-reset",
  "/404",
  "/500",
  "/offline",
  "/admin/media/upload",
  "/admin/articles/editor-workflow"
];

async function smokeRoute(pathname) {
  const url = `${baseUrl}${pathname}`;
  const response = await fetch(url, {
    headers: {
      accept: "text/html"
    }
  });
  const body = await response.text();

  return {
    path: pathname,
    status: response.status,
    ok: response.ok && body.includes('id="root"') && body.includes("/src/main.jsx"),
    hasRoot: body.includes('id="root"')
  };
}

const results = [];

for (const route of routes) {
  try {
    results.push(await smokeRoute(route));
  } catch (error) {
    results.push({
      path: route,
      status: "ERR",
      ok: false,
      hasRoot: false,
      error: error.message
    });
  }
}

for (const result of results) {
  const marker = result.ok ? "PASS" : "FAIL";
  const detail = result.error ? ` - ${result.error}` : "";
  console.log(`${marker} ${result.status} ${result.path}${detail}`);
}

const failed = results.filter((result) => !result.ok);

if (failed.length > 0) {
  console.error(`Live route smoke failed for ${failed.length} route(s).`);
  process.exitCode = 1;
} else {
  console.log(`Live route smoke passed for ${results.length} route(s) at ${baseUrl}.`);
}
