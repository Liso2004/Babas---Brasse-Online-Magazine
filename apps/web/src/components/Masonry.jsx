import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";

const COLUMN_QUERIES = ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"];
const COLUMN_VALUES = [4, 3, 2];

function useMedia(queries, values, fallback) {
  const getValue = () => values[queries.findIndex((query) => window.matchMedia(query).matches)] ?? fallback;
  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const update = () => setValue(getValue());
    const media = queries.map((query) => window.matchMedia(query));
    media.forEach((query) => query.addEventListener("change", update));
    return () => media.forEach((query) => query.removeEventListener("change", update));
  }, [queries, values]);

  return value;
}

function useMeasure() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return undefined;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function preloadImages(urls) {
  return Promise.all(urls.map((src) => new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src;
  })));
}

export default function Masonry({
  items,
  ease = "power3.out",
  duration = 0.55,
  stagger = 0.04,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.98,
  blurToFocus = true,
  variant = "editorial"
}) {
  const columns = useMedia(COLUMN_QUERIES, COLUMN_VALUES, 1);
  const [containerRef, width] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
  const mounted = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let current = true;
    preloadImages(items.map((item) => item.thumbnail)).then(() => {
      if (current) setImagesReady(true);
    });
    return () => { current = false; };
  }, [items]);

  const layout = useMemo(() => {
    if (!width) return { placements: [], height: 0 };
    const columnWidth = width / columns;
    const heights = new Array(columns).fill(0);
    const placements = items.map((item) => {
      const column = heights.indexOf(Math.min(...heights));
      const itemHeight = Math.max(280, item.height / 2);
      const placement = {
        ...item,
        x: columnWidth * column,
        y: heights[column],
        width: columnWidth,
        layoutHeight: itemHeight
      };
      heights[column] += itemHeight;
      return placement;
    });
    return { placements, height: Math.max(...heights) };
  }, [columns, items, width]);

  useLayoutEffect(() => {
    if (!imagesReady || !containerRef.current) return undefined;
    const elements = layout.placements
      .map((item) => containerRef.current.querySelector('[data-key="' + item.id + '"]'))
      .filter(Boolean);

    layout.placements.forEach((item, index) => {
      const element = elements[index];
      if (!element) return;
      const finalState = {
        x: item.x,
        y: item.y,
        width: item.width,
        height: item.layoutHeight
      };

      if (reducedMotion) {
        gsap.set(element, { ...finalState, opacity: 1, filter: "blur(0px)" });
      } else if (!mounted.current) {
        const offset = animateFrom === "top" || animateFrom === "left" ? -80 : 80;
        const initial = {
          opacity: 1,
          x: animateFrom === "left" || animateFrom === "right" ? item.x + offset : item.x,
          y: animateFrom === "top" || animateFrom === "bottom" ? item.y + offset : item.y,
          width: item.width,
          height: item.layoutHeight,
          filter: blurToFocus ? "blur(8px)" : "blur(0px)"
        };
        gsap.fromTo(element, initial, {
          ...finalState,
          opacity: 1,
          filter: "blur(0px)",
          duration,
          ease,
          delay: index * stagger
        });
      } else {
        gsap.to(element, { ...finalState, duration, ease, overwrite: "auto" });
      }
    });

    mounted.current = true;
    return () => gsap.killTweensOf(elements);
  }, [animateFrom, blurToFocus, duration, ease, imagesReady, layout, reducedMotion, stagger]);

  function handleEnter(event) {
    if (!scaleOnHover || reducedMotion) return;
    gsap.to(event.currentTarget, { scale: hoverScale, duration: 0.2, ease: "power2.out" });
  }

  function handleLeave(event) {
    if (!scaleOnHover || reducedMotion) return;
    gsap.to(event.currentTarget, { scale: 1, duration: 0.2, ease: "power2.out" });
  }

  return (
    <div ref={containerRef} className="home-media-masonry" data-variant={variant} style={{ height: layout.height + "px" }} aria-label="Featured media">
      {layout.placements.map((item, index) => (
        <Link
          className="home-media-masonry__item"
          data-key={item.id}
          key={item.id}
          to={item.href}
          aria-label={item.title + ", " + item.category}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onFocus={handleEnter}
          onBlur={handleLeave}
        >
          <img src={item.thumbnail} alt={item.alt} width="800" height={item.height} loading={index < 2 ? "eager" : "lazy"} />
          <span className="home-media-masonry__body">
            <span className="home-media-masonry__meta">
              <span>{item.category}</span>
              {item.publishedAt ? <time dateTime={item.publishedAt}>{item.publishedAt}</time> : null}
            </span>
            <strong>{item.title}</strong>
            {item.description ? <span>{item.description}</span> : null}
            {item.credit ? <span className="home-media-masonry__credit">Credit: {item.credit}</span> : null}
            <ArrowUpRight aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  );
}