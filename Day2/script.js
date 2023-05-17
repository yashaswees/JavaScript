document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let num = document.getElementsByClassName("slide");
  console.log(num);

  slideIndex = 1;
  showSlides(slideIndex);

  function currentSlide(n) {
    console.log("eha pugyo");
    showSlides(slideIndex = n);
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
    for (i = 0; i < num.length; i++) {
      num[i].style.width = "0%";
    }
    num[slideIndex - 1].style.width = "100%";

    // for automatic slideshow
    slideIndex++;
    setTimeout(() => showSlides(slideIndex), 5000);

    // for active dots
    for (i = 0; i < dotNum.length; i++) {
      dotNum[i].className = dotNum[i].className.replace(" active", "");
    }
    dotNum[slideIndex-2].className += " active";
  }

  function handleClick(event) {
    const clickedButton = event.target;
    if (clickedButton.classList.contains("prev")) {
      console.log("Previous Button Clicked"); // Previous button clicked
      console.log(slideIndex);
      showSlides((slideIndex -= 1));
    } else if (clickedButton.classList.contains("next")) {
      showSlides((slideIndex += 1));
      console.log("Next Button Clicked"); // Next button clicked
      console.log(slideIndex);
    }
  }
  prevBtn.addEventListener("click", handleClick);
  nextBtn.addEventListener("click", handleClick);
});
