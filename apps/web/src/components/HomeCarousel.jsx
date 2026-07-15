import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getArticleDetailRoute } from "../pages/articleDetailRouteModel.js";

function resolveSlideDestination(slide) {
  const candidate = slide?.href || slide?.url || slide?.route || getArticleDetailRoute(slide);
  const destination = String(candidate || "").trim();
  return /^(?:\/|https?:\/\/)/i.test(destination) ? destination : "";
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

export function HomeCarousel({ slides, interval = 6500 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerState = useRef({ startX: null, dragged: false });
  const suppressNextClick = useRef(false);
  const dragResetTimer = useRef(null);
  const reducedMotion = useReducedMotion();

  function showSlide(nextIndex) {
    setActiveIndex((nextIndex + slides.length) % slides.length);
  }

  function showPrevious() {
    setPaused(true);
    showSlide(activeIndex - 1);
  }

  function showNext() {
    setPaused(true);
    showSlide(activeIndex + 1);
  }

  useEffect(() => {
    if (paused || reducedMotion || slides.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [interval, paused, reducedMotion, slides.length]);

  function handlePointerDown(event) {
    pointerState.current = { startX: event.clientX, dragged: false };
    suppressNextClick.current = false;
    setPaused(true);
  }

  function handlePointerMove(event) {
    if (pointerState.current.startX === null) return;
    if (Math.abs(event.clientX - pointerState.current.startX) > 8) pointerState.current.dragged = true;
  }

  function handlePointerUp(event) {
    if (pointerState.current.startX === null) return;
    const distance = event.clientX - pointerState.current.startX;
    const wasDragged = pointerState.current.dragged;
    pointerState.current = { startX: null, dragged: false };
    suppressNextClick.current = wasDragged;
    window.clearTimeout(dragResetTimer.current);
    dragResetTimer.current = window.setTimeout(() => { suppressNextClick.current = false; }, 0);
    if (wasDragged && Math.abs(distance) >= 44) showSlide(activeIndex + (distance < 0 ? 1 : -1));
  }

  function handleMediaClick(event) {
    if (!suppressNextClick.current) return;
    event.preventDefault();
    suppressNextClick.current = false;
  }

  if (!slides.length) return null;

  function SlideLink({ slide, children, className, tabIndex }) {
    const destination = resolveSlideDestination(slide);
    if (!destination) return <div className={className}>{children}</div>;
    const label = `Open ${slide.title}`;
    if (/^https?:\/\//i.test(destination)) {
      return <a className={className} href={destination} target="_blank" rel="noopener noreferrer" tabIndex={tabIndex} aria-label={`${label} (opens in a new tab)`} onClick={handleMediaClick}>{children}</a>;
    }
    return <Link className={className} to={destination} tabIndex={tabIndex} aria-label={label} onClick={handleMediaClick}>{children}</Link>;
  }

  return (
    <section
      className="home-carousel"
      aria-label="Babas and Brasse featured stories"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div
        className="home-carousel__track"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { pointerState.current = { startX: null, dragged: false }; suppressNextClick.current = false; }}
      >
        {slides.map((slide, index) => {
          const active = index === activeIndex;
          const Heading = index === 0 ? "h1" : "h2";
          return (
            <article
              className="home-carousel__slide"
              data-active={active ? "true" : "false"}
              key={slide.id}
              aria-hidden={!active}
              aria-roledescription="slide"
              aria-label={"Slide " + (index + 1) + " of " + slides.length}
            >
              <SlideLink
                className="home-carousel__media-link"
                slide={slide}
                tabIndex={active ? 0 : -1}
              >
                <div className="home-carousel__media">
                  <img
                  src={slide.image}
                  alt={slide.alt}
                  width="1600"
                  height="900"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                    draggable="false"
                  />
                </div>
              </SlideLink>
              <div className="home-carousel__copy">
                <SlideLink slide={slide} className="home-carousel__copy-link" tabIndex={active ? 0 : -1}>
                  <p className="eyebrow">{slide.eyebrow}</p>
                  <Heading>{slide.title}</Heading>
                  <p>{slide.description}</p>
                </SlideLink>
                <SlideLink slide={slide} tabIndex={active ? 0 : -1}>
                  {slide.cta}
                  <ArrowRight size={18} aria-hidden="true" />
                </SlideLink>
              </div>
            </article>
          );
        })}
      </div>

      <div className="home-carousel__controls">
        <button className="home-carousel__control home-carousel__control--previous" type="button" onClick={showPrevious} aria-label="Previous slide">
          <ArrowLeft aria-hidden="true" />
        </button>
        <div className="home-carousel__indicators" aria-label="Choose a slide">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.id}
              aria-label={"Show slide " + (index + 1) + ": " + slide.title}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => {
                setPaused(true);
                showSlide(index);
              }}
            />
          ))}
        </div>
        <button className="home-carousel__control home-carousel__control--next" type="button" onClick={showNext} aria-label="Next slide">
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
