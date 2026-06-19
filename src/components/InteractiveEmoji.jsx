import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const bodies = new Map();
let animationFrame = null;
let lastFrameTime = 0;
let emojiLayer = null;
let viewportFrame = null;
let viewportListenerCount = 0;

const FRICTION = 0.982;
const RESTITUTION = 0.86;
const MAX_SPEED = 24;
const MIN_IDLE_SPEED = 0.1;
const CLICK_IMPULSE = 10;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getDocumentHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    window.innerHeight,
  );
}

function getNavbarBottom() {
  return document.querySelector('[data-site-navbar]')?.getBoundingClientRect().bottom ?? 0;
}

function getNavbarBottomInDocument() {
  return window.scrollY + getNavbarBottom();
}

function clampSpeed(value) {
  return clamp(value, -MAX_SPEED, MAX_SPEED);
}

function hasMotion(body) {
  return body.dragging || Math.abs(body.vx) >= MIN_IDLE_SPEED || Math.abs(body.vy) >= MIN_IDLE_SPEED;
}

function isNearViewport(body) {
  const margin = Math.max(body.size * 2, 140);
  const viewportTop = window.scrollY - margin;
  const viewportBottom = window.scrollY + window.innerHeight + margin;

  return body.y + body.size >= viewportTop && body.y <= viewportBottom;
}

function syncElement(body) {
  if (!body.element) {
    return;
  }

  body.element.style.width = `${body.size}px`;
  body.element.style.height = `${body.size}px`;
  body.element.style.transform = `translate3d(${body.x}px, ${body.y - window.scrollY}px, 0)`;
}

function syncAllElements() {
  bodies.forEach(syncElement);
}

function scheduleViewportSync() {
  if (viewportFrame) {
    return;
  }

  viewportFrame = window.requestAnimationFrame(() => {
    viewportFrame = null;
    syncAllElements();
  });
}

function addViewportListeners() {
  viewportListenerCount += 1;

  if (viewportListenerCount > 1) {
    return;
  }

  window.addEventListener('scroll', scheduleViewportSync, { passive: true });
  window.addEventListener('resize', scheduleViewportSync);
}

function removeViewportListeners() {
  viewportListenerCount = Math.max(0, viewportListenerCount - 1);

  if (viewportListenerCount) {
    return;
  }

  window.removeEventListener('scroll', scheduleViewportSync);
  window.removeEventListener('resize', scheduleViewportSync);

  if (viewportFrame) {
    window.cancelAnimationFrame(viewportFrame);
    viewportFrame = null;
  }
}

function getEmojiLayer() {
  if (!emojiLayer) {
    emojiLayer = document.createElement('div');
    emojiLayer.id = 'loveclarinha-emoji-layer';
    emojiLayer.style.position = 'fixed';
    emojiLayer.style.inset = '0';
    emojiLayer.style.pointerEvents = 'none';
    emojiLayer.style.overflow = 'visible';
    emojiLayer.style.zIndex = '90';
    document.body.appendChild(emojiLayer);
  }

  return emojiLayer;
}

function removeEmojiLayerIfEmpty() {
  if (bodies.size || !emojiLayer) {
    return;
  }

  emojiLayer.remove();
  emojiLayer = null;
}

function resolveWallBounce(body) {
  const topBoundary = getNavbarBottomInDocument();
  const maxX = Math.max(window.innerWidth - body.size, 0);
  const maxY = Math.max(getDocumentHeight() - body.size, topBoundary);

  if (body.x < 0) {
    body.x = 0;
    body.vx = Math.abs(body.vx) * RESTITUTION;
  } else if (body.x > maxX) {
    body.x = maxX;
    body.vx = -Math.abs(body.vx) * RESTITUTION;
  }

  if (body.y < topBoundary) {
    body.y = topBoundary;
    body.vy = Math.abs(body.vy) * RESTITUTION;
  } else if (body.y > maxY) {
    body.y = maxY;
    body.vy = -Math.abs(body.vy) * RESTITUTION;
  }
}

function resolveCollisions() {
  const visibleBodies = [...bodies.values()].filter(isNearViewport);

  for (let firstIndex = 0; firstIndex < visibleBodies.length; firstIndex += 1) {
    const first = visibleBodies[firstIndex];

    for (let secondIndex = firstIndex + 1; secondIndex < visibleBodies.length; secondIndex += 1) {
      const second = visibleBodies[secondIndex];

      if (!hasMotion(first) && !hasMotion(second)) {
        continue;
      }

      const distanceX = second.x + second.radius - (first.x + first.radius);
      const distanceY = second.y + second.radius - (first.y + first.radius);
      const minDistance = first.radius + second.radius;

      if (Math.abs(distanceX) >= minDistance || Math.abs(distanceY) >= minDistance) {
        continue;
      }

      const distance = Math.hypot(distanceX, distanceY) || 1;

      if (distance >= minDistance) {
        continue;
      }

      const normalX = distanceX / distance;
      const normalY = distanceY / distance;
      const correction = (minDistance - distance) / 2;

      first.x -= normalX * correction;
      first.y -= normalY * correction;
      second.x += normalX * correction;
      second.y += normalY * correction;

      const relativeVx = second.vx - first.vx;
      const relativeVy = second.vy - first.vy;
      const velocityAlongNormal = relativeVx * normalX + relativeVy * normalY;

      if (velocityAlongNormal > 0) {
        continue;
      }

      const impulse = (-(1 + RESTITUTION) * velocityAlongNormal) / 2;
      const impulseX = impulse * normalX;
      const impulseY = impulse * normalY;

      first.vx = clampSpeed(first.vx - impulseX);
      first.vy = clampSpeed(first.vy - impulseY);
      second.vx = clampSpeed(second.vx + impulseX);
      second.vy = clampSpeed(second.vy + impulseY);
    }
  }
}

function tick(frameTime) {
  if (!bodies.size) {
    animationFrame = null;
    lastFrameTime = 0;
    return;
  }

  const delta = lastFrameTime ? Math.min((frameTime - lastFrameTime) / 16.67, 2) : 1;
  lastFrameTime = frameTime;
  let hasActiveBody = false;

  bodies.forEach((body) => {
    if (body.dragging) {
      hasActiveBody = true;
      return;
    }

    if (!hasMotion(body)) {
      body.vx = 0;
      body.vy = 0;
      return;
    }

    body.x += body.vx * delta;
    body.y += body.vy * delta;
    body.vx *= FRICTION;
    body.vy *= FRICTION;

    if (Math.abs(body.vx) < MIN_IDLE_SPEED) {
      body.vx = 0;
    }

    if (Math.abs(body.vy) < MIN_IDLE_SPEED) {
      body.vy = 0;
    }

    resolveWallBounce(body);
    hasActiveBody = true;
  });

  if (hasActiveBody) {
    resolveCollisions();
  }

  bodies.forEach((body) => {
    syncElement(body);

    if (hasMotion(body)) {
      hasActiveBody = true;
    }
  });

  if (hasActiveBody) {
    animationFrame = window.requestAnimationFrame(tick);
    return;
  }

  animationFrame = null;
  lastFrameTime = 0;
}

function startPhysics() {
  if (animationFrame) {
    return;
  }

  lastFrameTime = 0;
  animationFrame = window.requestAnimationFrame(tick);
}

function triggerWiggle(element) {
  element.classList.remove('animate-wiggle');
  void element.offsetWidth;
  element.classList.add('animate-wiggle');
  window.setTimeout(() => element.classList.remove('animate-wiggle'), 430);
}

export default function InteractiveEmoji({
  symbol,
  label,
  className = '',
  displayClass = 'inline-flex',
  idleClass = '',
  sizeClass = 'text-3xl',
  style,
}) {
  const id = useId();
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const glyphRef = useRef(null);
  const pointerState = useRef(null);
  const bodyRef = useRef(null);
  const [layer, setLayer] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    setLayer(getEmojiLayer());
    addViewportListeners();

    return () => {
      removeViewportListeners();
    };
  }, []);

  useEffect(() => {
    if (!layer) {
      return undefined;
    }

    const wrapper = wrapperRef.current;
    const element = buttonRef.current;

    if (!wrapper || !element) {
      return undefined;
    }

    function registerBody() {
      const rect = wrapper.getBoundingClientRect();

      if (rect.width < 4 || rect.height < 4) {
        bodies.delete(id);
        bodyRef.current = null;
        setIsRegistered(false);
        return;
      }

      const size = Math.max(rect.width, rect.height);
      const topBoundary = getNavbarBottomInDocument();
      const existingBody = bodies.get(id);
      const body =
        existingBody ??
        {
          element,
          x: rect.left,
          y: rect.top + window.scrollY,
          vx: 0,
          vy: 0,
          size,
          radius: size / 2,
          dragging: false,
        };

      body.element = element;
      body.size = size;
      body.radius = size / 2;
      body.x = clamp(body.x, 0, Math.max(window.innerWidth - size, 0));
      body.y = clamp(body.y, topBoundary, Math.max(getDocumentHeight() - size, topBoundary));

      bodies.set(id, body);
      bodyRef.current = body;
      syncElement(body);
      setIsRegistered(true);
    }

    const resizeObserver = new ResizeObserver(registerBody);
    resizeObserver.observe(wrapper);
    registerBody();

    return () => {
      resizeObserver.disconnect();
      bodies.delete(id);
      bodyRef.current = null;
      setIsRegistered(false);
      removeEmojiLayerIfEmpty();
    };
  }, [id, layer]);

  function handlePointerDown(event) {
    if (event.button !== 0 || !bodyRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const body = bodyRef.current;
    const now = performance.now();

    pointerState.current = {
      offsetX: event.clientX - body.x,
      offsetY: event.clientY + window.scrollY - body.y,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: now,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };

    body.dragging = true;
    body.vx = 0;
    body.vy = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
    startPhysics();
  }

  function handlePointerMove(event) {
    const body = bodyRef.current;
    const pointer = pointerState.current;

    if (!body || !pointer) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const now = performance.now();
    const elapsed = Math.max(now - pointer.lastTime, 8);
    const movement =
      Math.abs(event.clientX - pointer.startX) +
      Math.abs(event.clientY - pointer.startY);
    const topBoundary = getNavbarBottomInDocument();
    const maxY = Math.max(getDocumentHeight() - body.size, topBoundary);

    if (movement > 3) {
      pointer.moved = true;
    }

    body.x = clamp(event.clientX - pointer.offsetX, 0, Math.max(window.innerWidth - body.size, 0));
    body.y = clamp(event.clientY + window.scrollY - pointer.offsetY, topBoundary, maxY);
    body.vx = clampSpeed(((event.clientX - pointer.lastX) / elapsed) * 16.67);
    body.vy = clampSpeed(((event.clientY - pointer.lastY) / elapsed) * 16.67);

    pointer.lastX = event.clientX;
    pointer.lastY = event.clientY;
    pointer.lastTime = now;
    syncElement(body);
  }

  function handlePointerUp(event) {
    const body = bodyRef.current;
    const pointer = pointerState.current;

    if (!body || !pointer) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    body.dragging = false;

    if (!pointer.moved) {
      body.vx = clampSpeed((Math.random() - 0.5) * CLICK_IMPULSE * 2);
      body.vy = clampSpeed(-CLICK_IMPULSE);

      if (glyphRef.current) {
        triggerWiggle(glyphRef.current);
      }
    }

    pointerState.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    startPhysics();
  }

  function handleKeyDown(event) {
    if ((event.key === 'Enter' || event.key === ' ') && bodyRef.current) {
      event.preventDefault();
      bodyRef.current.vx = CLICK_IMPULSE;
      bodyRef.current.vy = -CLICK_IMPULSE;
      startPhysics();
    }
  }

  const emojiButton = (
    <button
      ref={buttonRef}
      type="button"
      aria-label={label}
      className={`emoji-pop group fixed left-0 top-0 z-[90] inline-flex items-center justify-center border-0 bg-transparent p-0 leading-none shadow-none outline-none will-change-transform focus-visible:ring-2 focus-visible:ring-white/80 ${sizeClass} ${idleClass} cursor-grab pointer-events-auto active:cursor-grabbing`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
    >
      <span
        ref={glyphRef}
        aria-hidden="true"
        className="block transition-transform duration-150 group-hover:scale-110 group-focus-visible:scale-110"
      >
      {symbol}
      </span>
    </button>
  );

  return (
    <span
      ref={wrapperRef}
      className={`${displayClass} ${className}`}
      style={style}
      aria-hidden="true"
    >
      {layer && isRegistered ? createPortal(emojiButton, layer) : null}
    </span>
  );
}
