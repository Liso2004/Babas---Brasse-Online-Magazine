import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const pointerStart = useRef(null);
  const pointerWasDragged = useRef(false);
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
    pointerStart.current = event.clientX;
    pointerWasDragged.current = false;
    setPaused(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function handlePointerUp(event) {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) < 44) return;
    pointerWasDragged.current = true;
    showSlide(activeIndex + (distance < 0 ? 1 : -1));
  }

  function handleMediaClick(event) {
    if (!pointerWasDragged.current) return;
    event.preventDefault();
    pointerWasDragged.current = false;
  }

  if (!slides.length) return null;

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
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { pointerStart.current = null; }}
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
              <Link
                className="home-carousel__media-link"
                to={slide.href}
                tabIndex={active ? 0 : -1}
                aria-label={"Open " + slide.title}
                onClick={handleMediaClick}
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
              </Link>
              <div className="home-carousel__copy">
                <div>
                  <p className="eyebrow">{slide.eyebrow}</p>
                  <Heading>{slide.title}</Heading>
                  <p>{slide.description}</p>
                </div>
                <Link to={slide.href} tabIndex={active ? 0 : -1}>
                  {slide.cta}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
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