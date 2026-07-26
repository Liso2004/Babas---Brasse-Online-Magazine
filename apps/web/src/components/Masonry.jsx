import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

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
  const [renderCount, setRenderCount] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return undefined;
    
    const updateWidth = () => {
      const currentWidth = ref.current?.clientWidth ?? 0;
      setWidth(currentWidth);
    };
    
    // Measure immediately
    updateWidth();
    
    const observer = new ResizeObserver(() => updateWidth());
    observer.observe(ref.current);
    
    // Force a re-measure on next frame to catch any layout changes
    const frameId = requestAnimationFrame(() => {
      updateWidth();
    });
    
    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return [ref, width];
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
  variant = "editorial"
}) {
  const columns = useMedia(COLUMN_QUERIES, COLUMN_VALUES, 1);
  const [containerRef, width] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    let current = true;
    preloadImages(items.map((item) => item.thumbnail)).then(() => {
      if (current) setImagesReady(true);
    });
    return () => { current = false; };
  }, [items]);

  // Fallback to containerRef.current.clientWidth if width hasn't been set yet
  const effectiveWidth = width || (containerRef.current?.clientWidth ?? 0);

  const layout = useMemo(() => {
    if (!effectiveWidth) {
      // If we still don't have width, use a minimum fallback width for calculation
      // This ensures height is never 0 on initial render
      const fallbackWidth = 320; // Minimum reasonable width
      const columnWidth = fallbackWidth / columns;
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
      return { placements, height: items.length > 0 ? Math.max(...heights) : 0 };
    }
    
    const columnWidth = effectiveWidth / columns;
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
  }, [columns, items, effectiveWidth]);

  return (
    <div ref={containerRef} className="home-media-masonry" data-variant={variant} style={{ height: layout.height + "px" }} aria-label="Featured media">
      {layout.placements.map((item, index) => (
        <Link
          className="home-media-masonry__item"
          data-key={item.id}
          key={item.id}
          to={item.href}
          aria-label={item.title + ", " + item.category}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: item.width + "px",
            height: item.layoutHeight + "px",
            transform: `translate(${item.x}px, ${item.y}px)`
          }}
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