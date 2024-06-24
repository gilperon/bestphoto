document.addEventListener("DOMContentLoaded", function () {
  if (typeof KeenSlider !== "undefined") {
    var slider1 = new KeenSlider("#carousel-icons", {
      loop: false,
      mode: "free",
      slides: {
        perView: 4.5,
        spacing: 14,
      },
    });

    var slider2 = new KeenSlider("#carousel-textos", {
      loop: false,
      mode: "free",
      slides: {
        perView: 1.5,
        spacing: 14,
      },
    });

    var slider3 = new KeenSlider("#carousel-discover", {
      loop: false,
      mode: "free",
      slides: {
        perView: 1.8,
        spacing: 14,
      },
    });
  }
});
