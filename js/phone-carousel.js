export function initPhoneCarousel() {
  const carousel = document.querySelector(".hero__phone-carousel");
  if (!carousel) {
    return;
  }

  const slides = [...carousel.querySelectorAll(".hero__phone-carousel-slide")];
  if (slides.length < 2) {
    return;
  }

  let activeIndex = 0;
  const showSlide = (index) => {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });
  };

  showSlide(activeIndex);
  window.setInterval(() => {
    activeIndex = (activeIndex + 1) % slides.length;
    showSlide(activeIndex);
  }, 2000);
}
