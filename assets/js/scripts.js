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

// Page discover
$(document).ready(function () {
  var $currentGridItem;
  var imageDataUrl;
  var cropper;

  $(".grid-add-item").on("click", function () {
    $currentGridItem = $(this);
    $("#file-upload").click();
  });

  $("#file-upload").on("change", function (event) {
    var file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        imageDataUrl = e.target.result;
        $("#uploaded-photo").attr("src", imageDataUrl);

        var myModal = new bootstrap.Modal(
          document.getElementById("photoModal"),
          {
            keyboard: false,
          }
        );
        myModal.show();

        myModal._element.addEventListener("shown.bs.modal", function () {
          cropper = new Cropper(document.getElementById("uploaded-photo"), {
            aspectRatio: 1,
            viewMode: 1, // Ensure the cropped area respects container's boundaries
            autoCropArea: 0.8, // 80% of the visible area
            movable: true,
            zoomable: true,
            rotatable: true,
            scalable: true,
          });
        });
      };
      reader.readAsDataURL(file);
    }
  });

  $("#save-button").on("click", function () {
    if (cropper) {
      var croppedCanvas = cropper.getCroppedCanvas({
        width: 100,
        height: 100,
      });

      var croppedImageDataUrl = croppedCanvas.toDataURL("image/png");
      $currentGridItem.css({
        "background-image": "url(" + croppedImageDataUrl + ")",
        "background-position":
          -cropper.getData().x + "px " + -cropper.getData().y + "px",
      });
      $currentGridItem.find(".icon-plus").hide();

      var myModalEl = document.getElementById("photoModal");
      var modal = bootstrap.Modal.getInstance(myModalEl);
      modal.hide();

      cropper.destroy();
      cropper = null;
    }
  });

  $("#photoModal").on("hidden.bs.modal", function () {
    if (cropper) {
      cropper.destroy();
      cropper = null;
    }
  });
});
// $(document).ready(function () {
//   $(".grid-add-item").on("click", function () {
//     $("#file-upload").click();
//   });

//   $("#file-upload").on("change", function (event) {
//     var reader = new FileReader();
//     reader.onload = function (e) {
//       $("#uploaded-photo").attr("src", e.target.result);
//       var photoModal = new bootstrap.Modal(
//         document.getElementById("photoModal")
//       );
//       photoModal.show();
//     };
//     reader.readAsDataURL(event.target.files[0]);
//   });
// });
