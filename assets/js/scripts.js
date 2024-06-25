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

// Page Rate photo
$(document).ready(function () {
  let clickCounter = 1;
  $slide = 1;
  $(".grid-photos-item").click(function () {
    if (clickCounter <= 4) {
      var dataValue = $(this).data("position");
      if ($(this).find(".ranked-number").length > 0) {
        $(".grid-photos-item").children().remove();
        $(this).append(
          `<div class="ranked-number expandOpen">1</div><div class="pullDown" style="position:absolute;right: -10px;top: -5px;border-radius:8px 0 14px 0;padding:5px;"><img src='../assets/img/medal-icon.svg'></div>`
        );
        clickCounter = 2;
      } else {
        $(this).append(
          clickCounter == 1
            ? `<div class="ranked-number expandOpen">${clickCounter}</div><div class="pullDown" style="position:absolute;right: -10px;top: -5px;border-radius:8px 0 14px 0;padding:5px;"><img src='../assets/img/medal-icon.svg'></div>`
            : `<div class="ranked-number expandOpen">${clickCounter}</div>`
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

// Page discover (crop image)
$(document).ready(function () {
  var resize;
  var currentGridItem;

  $(".grid-add-item").on("click", function () {
    currentGridItem = $(this); // Salva o item de grid atual

    var dataValue = currentGridItem.attr("data-value");

    if (dataValue === "true") {
      $("#offcanvasBottom").offcanvas("show");
    } else {
      $("#imgInp").val("").click(); // Limpa o valor atual e aciona o input de arquivo para selecionar uma imagem
    }
  });

  // Offcanvas options click events
  $("#offcanvasBottom").on("click", ".options-remove-photo", function () {
    // Perform remove action here
    currentGridItem.css("background-image", ""); // Remove background image
    currentGridItem.attr("data-value", "empty"); // Reset data-value attribute
    currentGridItem.find(".icon-plus").show(); // Show the icon-plus element
    $("#offcanvasBottom").offcanvas("hide"); // Hide offcanvas
  });

  $("#offcanvasBottom").on("click", ".options-select-photo", function () {
    $("#imgInp").val("").click(); // Limpa o valor atual e aciona o input de arquivo para selecionar uma nova imagem
    $("#offcanvasBottom").offcanvas("hide"); // Hide offcanvas
  });

  $("#imgInp").on("change", function () {
    var input = this;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#my-image").attr("src", e.target.result);
        $("#imageModal").modal("show"); // Show the modal first
        initializeCroppie(); // Initialize Croppie after modal is shown
      };
      reader.readAsDataURL(input.files[0]);

      // fix to force zoom to zero
      setTimeout(function () {
        var rangeInput = $("#imageModal").find(".cr-slider")[0];
        if (rangeInput) {
          rangeInput.value = rangeInput.min;
          var event = new Event("input", { bubbles: true });
          rangeInput.dispatchEvent(event);
        }
      }, 1000);
    }
  });

  // Function to initialize Croppie
  function initializeCroppie() {
    if (!resize) {
      resize = new Croppie(document.getElementById("croppie-container"), {
        viewport: {
          width: 185,
          height: 240,
          type: "square",
        },
        boundary: {
          width: 300,
          height: 300,
        },
      });
    } else {
      // If Croppie instance already exists, re-bind to update dimensions
      resize.bind({
        url: $("#my-image").attr("src"),
      });
    }
  }

  // Save button click event
  $("#saveCrop").on("click", function () {
    resize
      .result({
        type: "base64",
        size: "viewport",
      })
      .then(function (dataImg) {
        var originalBase64 = $("#my-image").attr("src");
        console.log(originalBase64); // imagem original
        console.log(dataImg); // imagem cortada
        currentGridItem.css("background-image", "url(" + dataImg + ")");
        currentGridItem.attr("data-value", "true"); // Update the data-value attribute to true
        currentGridItem.find(".icon-plus").hide(); // Hide the icon-plus element
        $("#imageModal").modal("hide");
      });
  });

  // Prevent modal close on backdrop click
  $("#imageModal").modal({
    backdrop: "static",
    keyboard: false,
  });

  // Re-bind Croppie on modal show
  $("#imageModal").on("shown.bs.modal", function () {
    initializeCroppie();
  });
});
