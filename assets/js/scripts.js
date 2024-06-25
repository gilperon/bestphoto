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

$(document).ready(function () {
  let clickCounter = 1;
  $slide = 1;
  $(".grid-photos-item").click(function () {
    if (clickCounter <= 4) {
      var dataValue = $(this).data("position");
      if ($(this).find(".ranked-number").length > 0) {
        $(".grid-photos-item").children(".ranked-number").remove();
        $(this).append('<div class="ranked-number expandOpen">1</div>');
        clickCounter = 2;
      } else {
        $(this).append(
          '<div class="ranked-number expandOpen">' + clickCounter + "</div>"
        );
        if (clickCounter == 4) {
          $("#icon-cash").addClass("hatch");
          let currentBalance = $("#balance").text();
          let balanceNumber = parseFloat(currentBalance);
          balanceNumber += 0.001;
          $("#balance").text(balanceNumber.toFixed(3));
          setTimeout(function () {
            $(`#slide-${$slide}`).hide();
            $(`#slide-${$slide + 1}`)
              .addClass("slideSmoothRight")
              .show();
            $(".grid-photos-item").children(".ranked-number").remove();
            $slide++;
          }, 600);
          clickCounter = 1;
          return;
        }
        clickCounter++;
      }
    }
  });
  $("#next-slide").click(function () {
    $(`#slide-${$slide}`).hide();
    $(`#slide-${$slide + 1}`)
      .addClass("slideSmoothRight")
      .show();
    $(".grid-photos-item").children(".ranked-number").remove();
    $slide++;
    clickCounter = 1;
  });
});
