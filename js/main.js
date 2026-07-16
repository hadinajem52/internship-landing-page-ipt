import { initPhoneCarousel } from "./phone-carousel.js";
import { initTrackRecharge } from "./track-recharge.js";

initPhoneCarousel();
const stopTrackRecharge = initTrackRecharge();

window.addEventListener("pagehide", stopTrackRecharge, { once: true });
