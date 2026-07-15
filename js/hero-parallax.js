export function initHeroParallax() {
  const hero = document.querySelector(".hero");
  const visual = hero?.querySelector(".hero__visual");
  const phone = visual?.querySelector(".hero__phone-carousel");

  if (!hero || !visual || !phone) return () => {};

  let animationFrame = 0;
  let lastOffset = -1;

  const updatePosition = () => {
    animationFrame = 0;
    const phoneCenter = phone.offsetTop + phone.offsetHeight / 2;
    const pinStart = visual.offsetTop + phoneCenter - window.innerHeight / 2;
    const scrollInsideHero = window.scrollY - hero.offsetTop;
    const maxOffset = hero.offsetHeight - visual.offsetTop - phoneCenter;
    const offset = Math.min(Math.max(scrollInsideHero - pinStart, 0), maxOffset);

    if (offset === lastOffset) return;
    visual.style.setProperty("--phone-pin-y", `${offset.toFixed(2)}px`);
    visual.classList.toggle("is-scroll-pinned", offset > 0 && offset < maxOffset);
    lastOffset = offset;
  };

  const requestUpdate = () => {
    if (animationFrame) return;
    animationFrame = window.requestAnimationFrame(updatePosition);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  updatePosition();

  return () => {
    window.removeEventListener("scroll", requestUpdate);
    window.removeEventListener("resize", requestUpdate);
    window.cancelAnimationFrame(animationFrame);
  };
}
