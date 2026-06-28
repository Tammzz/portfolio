import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Custom page scrollbar — rectangular, pink, consistent across browsers.
 *
 * The native scrollbar can't be made rectangular in Firefox (CSS only exposes
 * colour/width there), so we hide it (see global.css) and draw our own: a fixed
 * track pinned to the right edge with a draggable pink thumb that mirrors the
 * document's scroll position. Pointer-events stay off the track so normal page
 * interaction is unaffected; the thumb itself is the only grabbable surface.
 */
export default function Scrollbar() {
  const [thumb, setThumb] = useState({ height: 0, top: 0 });
  const [visible, setVisible] = useState(false);
  const dragging = useRef(false);
  // Offset between the pointer and the thumb's top edge at grab time.
  const grabOffset = useRef(0);

  const measure = useCallback(() => {
    const doc = document.documentElement;
    const viewport = window.innerHeight;
    const total = doc.scrollHeight;

    if (total <= viewport) {
      setVisible(false);
      return;
    }
    setVisible(true);

    const trackH = viewport;
    const height = Math.max((viewport / total) * trackH, 32);
    const maxScroll = total - viewport;
    const maxThumbTop = trackH - height;
    const top = maxScroll > 0 ? (window.scrollY / maxScroll) * maxThumbTop : 0;
    setThumb({ height, top });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    // Track content growth (sections revealing, images loading, etc.).
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [measure]);

  // Dragging the thumb maps pointer movement back onto document scroll.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const viewport = window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const maxScroll = total - viewport;
      const maxThumbTop = viewport - thumb.height;
      const nextTop = Math.min(Math.max(e.clientY - grabOffset.current, 0), maxThumbTop);
      window.scrollTo({ top: (nextTop / maxThumbTop) * maxScroll });
    };
    const onUp = () => {
      dragging.current = false;
      document.body.style.userSelect = "";
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [thumb.height]);

  const onThumbDown = (e: React.PointerEvent) => {
    e.preventDefault();
    dragging.current = true;
    grabOffset.current = e.clientY - thumb.top;
    document.body.style.userSelect = "none";
  };

  if (!visible) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: 12,
        height: "100vh",
        background: "var(--bg)",
        borderLeft: "1px solid var(--grid-line)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div
        onPointerDown={onThumbDown}
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          height: thumb.height,
          top: thumb.top,
          background: "var(--pink)",
          borderRadius: 0,
          pointerEvents: "auto",
          cursor: "grab",
        }}
      />
    </div>
  );
}
