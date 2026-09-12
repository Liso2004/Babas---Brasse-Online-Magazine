import { useEffect } from "react";
import * as launchFixtures from "../data/launchFixtures.js";
import { buildRouteMetadata, publicSiteUrl } from "./routeMetadata.js";

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

function upsertStructuredData(schema) {
  const selector = 'script[data-seo="structured-data"]';
  let element = document.head.querySelector(selector);

  if (!schema) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.dataset.seo = "structured-data";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(schema).replace(/</g, "\\u003c");
}

function getProfile(fixtures, id) {
  return fixtures?.profiles?.find((profile) => profile.id === id);
}

function getStructuredData(route, slug, fixtures, metadata) {
  if (metadata.robots.includes("noindex")) return null;

  const publisher = {
    "@type": "Organization",
    name: "URBAN ANARCHY",
    url: publicSiteUrl
  };

  if (route?.id === "article-detail") {
    const article = fixtures?.articles?.find((item) => item.slug === slug);
    if (!article) return null;
    const author = getProfile(fixtures, article.authorProfileId);
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: metadata.description,
      image: metadata.ogImage,
      datePublished: article.publishedAt,
      mainEntityOfPage: metadata.canonicalUrl,
      author: author ? { "@type": "Person", name: author.name, url: `${publicSiteUrl}/people/${author.slug}` } : publisher,
      publisher
    };
  }

  if (route?.id === "moodboard-detail") {
    const item = fixtures?.moodboardItems?.find((candidate) => candidate.slug === slug);
    if (!item) return null;
    return { "@context": "https://schema.org", "@type": "VisualArtwork", name: item.title, description: metadata.description, image: metadata.ogImage, url: metadata.canonicalUrl, creator: publisher };
  }

  if (route?.id === "profile-detail") {
    const profile = fixtures?.profiles?.find((item) => item.slug === slug || item.id === slug);
    if (!profile) return null;
    return { "@context": "https://schema.org", "@type": "Person", name: profile.name, description: metadata.description, image: metadata.ogImage, url: metadata.canonicalUrl };
  }

  if (route?.id === "product-detail") {
    const product = fixtures?.products?.find((item) => item.slug === slug);
    if (!product) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description: product.dek,
      image: metadata.ogImage,
      url: metadata.canonicalUrl,
      brand: publisher,
      offers: { "@type": "Offer", priceCurrency: "ZAR", price: product.price, availability: product.availability === "available" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock", url: metadata.canonicalUrl }
    };
  }

  if (route?.id === "home") {
    return { "@context": "https://schema.org", "@type": "WebSite", name: "URBAN ANARCHY", url: metadata.canonicalUrl, description: metadata.description, publisher };
  }

  return { "@context": "https://schema.org", "@type": "WebPage", name: metadata.title, description: metadata.description, url: metadata.canonicalUrl, publisher };
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
    upsertStructuredData(getStructuredData(route, slug, fixtures, metadata));
  }, [route, slug, fixtures]);

  return null;
}
