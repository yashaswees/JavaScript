document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let num = document.getElementsByClassName("slide");
  console.log(num);

  slideIndex = 1;
  showSlides(slideIndex);

  function currentSlide(n) {
    console.log("here");
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    let num = document.getElementsByClassName("slide");
    let dotNum = document.getElementsByClassName("dot");
    if (n < 1) {
      slideIndex = num.length;
    }
    if (n >= num.length) {
      slideIndex = 1;
    }
    for (i = 0; i < num.length; i++) {
      num[i].style.width = "0%";
    }
    num[slideIndex - 1].style.width = "100%";

    // for active dots
    for (i = 0; i < dotNum.length; i++) {
      dotNum[i].className = dotNum[i].className.replace(" active", "");
    }
    dotNum[slideIndex-1].className += " active"; 
    // for automatic slideshow
    slides= slideIndex++;
    setTimeout(() => showSlides(slides), 2000);
  }

  function handleClick(event) {
    const clickedButton = event.target;
    if (clickedButton.classList.contains("prev")) {
      console.log("Previous Button Clicked"); // Previous button clicked
      console.log(slideIndex);
      showSlides((slideIndex -= 2));
    } else if (clickedButton.classList.contains("next")) {
      showSlides((slideIndex));
      console.log("Next Button Clicked"); // Next button clicked
      console.log(slideIndex);
    }
  }
  prevBtn.addEventListener("click", handleClick);
  nextBtn.addEventListener("click", handleClick);
});
