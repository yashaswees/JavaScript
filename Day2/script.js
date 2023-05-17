document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dots = document.getElementsByClassName("dot");

  let num = document.getElementsByClassName("slide");
  console.log(num);

  let slideIndex = 1;
  let slideTimer;

  showSlides(slideIndex);

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  function showSlides(n) {
    let num = document.getElementsByClassName("slide");
    let dotNum = document.getElementsByClassName("dot");
    if (n < 1) {
      slideIndex = num.length;
    }
    if (n > num.length) {
      slideIndex = 1;
    }
    for (let i = 0; i < num.length; i++) {
      num[i].style.width = "0%";
    }
    num[slideIndex - 1].style.width = "100%";

    // for active dots
    for (let i = 0; i < dotNum.length; i++) {
      dotNum[i].className = dotNum[i].className.replace(" active", "");
    }
    dotNum[slideIndex - 1].className += " active";
  }

  function startSlideTimer() {
    slideTimer = setTimeout(() => {
      showSlides((slideIndex += 1));
      startSlideTimer();
    }, 5000);
  }

  function handleClick(event) {
    const clickedButton = event.target;
    if (clickedButton.classList.contains("prev")) {
      console.log("Previous Button Clicked"); // Previous button clicked
      showSlides((slideIndex -= 1));
      clearTimeout(slideTimer);
      startSlideTimer();
    } else if (clickedButton.classList.contains("next")) {
      console.log("Next Button Clicked"); // Next button clicked
      showSlides((slideIndex += 1));
      clearTimeout(slideTimer);
      startSlideTimer();
    }
  }

  function handleDotClick(event) {
    const clickedDot = event.target;
    const dotIndex = Array.from(dots).indexOf(clickedDot);
    currentSlide(dotIndex + 1);
    clearTimeout(slideTimer);
    startSlideTimer();
  }

  prevBtn.addEventListener("click", handleClick);
  nextBtn.addEventListener("click", handleClick);
  Array.from(dots).forEach((dot) => {
    dot.addEventListener("click", handleDotClick);
  });

  startSlideTimer();
});
