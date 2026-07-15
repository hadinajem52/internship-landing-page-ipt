import { initPhoneCarousel } from "./phone-carousel.js";
import { initHeroParallax } from "./hero-parallax.js";

initPhoneCarousel();
const stopHeroParallax = initHeroParallax();

window.addEventListener("pagehide", stopHeroParallax, { once: true });
