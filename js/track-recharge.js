const CAROUSEL_DELAY = 1400;

export function initTrackRecharge() {
  const section = document.querySelector(".track-recharge");
  const trigger = section?.querySelector(".track-recharge__trigger");
  const slides = [...(section?.querySelectorAll(".track-recharge__middle-slide") ?? [])];

  if (!section || !trigger || slides.length < 2) return () => {};

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeIndex = 0;
  let carouselTimer = 0;
  let isVisible = false;
  let isExpanded = false;

  const showSlide = (index) => {
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === index;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
  };

  const stopCarousel = () => {
    window.clearInterval(carouselTimer);
    carouselTimer = 0;
  };

  const startCarousel = () => {
    if (carouselTimer || !isExpanded || !isVisible) return;
    carouselTimer = window.setInterval(() => {
      activeIndex = (activeIndex + 1) % slides.length;
      showSlide(activeIndex);
    }, CAROUSEL_DELAY);
  };

  const setExpanded = (nextExpanded) => {
    if (isExpanded === nextExpanded) return;

    isExpanded = nextExpanded;
    section.classList.toggle("is-expanded", isExpanded);

    if (isExpanded) startCarousel();
    else stopCarousel();
  };

  const centerObserver = new IntersectionObserver(
    ([entry]) => {
      setExpanded(entry.isIntersecting);
    },
    { rootMargin: "-25% 0px -25% 0px" },
  );

  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) startCarousel();
      else stopCarousel();
    },
    { threshold: 0.15 },
  );

  const handleMotionPreference = () => {
    stopCarousel();
    startCarousel();
  };

  showSlide(activeIndex);
  centerObserver.observe(trigger);
  visibilityObserver.observe(section);
  reducedMotion.addEventListener("change", handleMotionPreference);

  return () => {
    centerObserver.disconnect();
    visibilityObserver.disconnect();
    reducedMotion.removeEventListener("change", handleMotionPreference);
    stopCarousel();
  };
}
