import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

export function FigmaSearchTool({
  className = "",
  id = "content-search",
  label = "Search articles",
  name = "q",
  placeholder = "Search the magazine...",
  defaultValue,
  onSubmit,
  overlay = false
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!overlay || !open) return undefined;
    inputRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    if (window.matchMedia("(max-width: 760px)").matches) document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, overlay]);

  function close() {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function submit(event) {
    onSubmit?.(event);
    if (overlay) setOpen(false);
  }

  const form = (
    <form className={`figma-search-tool ${className}`.trim()} role="search" onSubmit={submit}>
      <label htmlFor={id}>{label}</label>
      <div className="figma-search-tool__field">
        <input ref={inputRef} id={id} name={name} type="search" placeholder={placeholder} defaultValue={defaultValue} autoComplete="off" />
        <button type="submit" aria-label={`Submit ${label.toLowerCase()}`}><Search size={19} aria-hidden="true" /><span>Search</span></button>
      </div>
    </form>
  );

  if (!overlay) return form;

  return (
    <div className="figma-search-overlay-shell" data-open={open ? "true" : "false"}>
      <button ref={triggerRef} className="figma-search-trigger" type="button" aria-label="Open article search" aria-expanded={open} aria-controls={`${id}-panel`} onClick={() => setOpen(true)}>
        <Search size={19} aria-hidden="true" /><span>Search</span>
      </button>
      {open ? (
        <div className="figma-search-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
          <section id={`${id}-panel`} className="figma-search-overlay__panel" aria-label="Search the magazine">
            <div className="figma-search-overlay__heading"><div><p className="eyebrow">Babas & Brasse archive</p><h2>What are you looking for?</h2></div><button className="figma-search-close" type="button" aria-label="Close search" onClick={close}><X aria-hidden="true" /></button></div>
            {form}
          </section>
        </div>
      ) : null}
    </div>
  );
}
