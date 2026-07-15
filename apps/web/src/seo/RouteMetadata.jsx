import { useEffect } from "react";
import * as launchFixtures from "../data/launchFixtures.js";
import { buildRouteMetadata } from "./routeMetadata.js";

function upsertMeta(attribute, descriptor) {
  const [key, value] = Object.entries(attribute)[0];
  let element = document.head.querySelector(`meta[${key}="${value}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(key, value);
    document.head.appendChild(element);
  }

  element.setAttribute("content", descriptor.content);
}

function upsertCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export function RouteMetadata({ route, slug, fixtures = launchFixtures }) {
  useEffect(() => {
    const metadata = buildRouteMetadata(route, { slug, fixtures });
    document.title = metadata.title;

    const tags = [
      { name: "description", content: metadata.description },
      { name: "robots", content: metadata.robots },
      { property: "og:title", content: metadata.ogTitle },
      { property: "og:description", content: metadata.ogDescription },
      { property: "og:type", content: metadata.ogType },
      { property: "og:url", content: metadata.ogUrl },
      { property: "og:image", content: metadata.ogImage },
      { name: "twitter:card", content: metadata.twitterCard },
      { name: "twitter:title", content: metadata.ogTitle },
      { name: "twitter:description", content: metadata.ogDescription },
      { name: "twitter:image", content: metadata.ogImage }
    ];

    for (const tag of tags) {
      const { content, ...attribute } = tag;
      upsertMeta(attribute, { content });
    }

    upsertCanonical(metadata.canonicalUrl);
  }, [route, slug, fixtures]);

  return null;
}