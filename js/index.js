const icon = document.querySelector(".player_audio > span");
const audio = document.querySelector("audio");
let play_audio = true;
let first_play = false;


$(document).ready(function () {

  navScrollFunction()
  $('#lightSlider').lightSlider({
    gallery: true,
    item: 1,
    loop: true,
    slideMargin: 0,
    thumbItem: 9
  });


  $('.parallax').each(function (index) {
    var imageSrc = $(this).data('image-src')
    var imageHeight = $(this).data('height')
    $(this).css('background-image', 'url(' + imageSrc + ')')
    $(this).css('height', imageHeight)

    var initY = $(this).offset().top
    var height = $(this).height()
    var diff = scrolled - initY
    var ratio = Math.round((diff / height) * 100)
    $(this).css('background-position', 'center ' + parseInt(-(ratio * 1.5)) + 'px')

  })

});

function isInViewport(node) {
  // Am I visible? Height and Width are not explicitly necessary in visibility
  // detection, the bottom, right, top and left are the essential checks. If an
  // image is 0x0, it is technically not visible, so it should not be marked as
  // such. That is why either width or height have to be > 0.
  var rect = node.getBoundingClientRect()
  return (
    (rect.height > 0 || rect.width > 0) &&
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

$(window).scroll(function () {
  // console.log('scoll')
  navScrollFunction();
  var scrolled = $(window).scrollTop()
  $('.parallax').each(function (index, element) {
    var initY = $(this).offset().top
    var height = $(this).height()
    var endY = initY + $(this).height()

    // Check if the element is in the viewport.
    var visible = isInViewport(this)
    if (visible) {
      var diff = scrolled - initY
      var ratio = Math.round((diff / height) * 100)
      $(this).css('background-position', 'center ' + parseInt(-(ratio * 2)) + 'px')
      if (ratio > 0) {
        $(this).css('filter', 'blur(' + (ratio / 8 + 3) + 'px)')
      }
    }
  })
})

function setPlay() {
  audio.play().then(() => {
    first_play = true;
    $('#audio_button').html('<img src="img/mute.png" height=20px></img>');
  }).catch(err => {
    $('#audio_button').html('<img src="img/unmute.png" height=20px></img>');
  });
}

function setPause() {
  audio.pause();
  $('#audio_button').html('<img src="img/unmute.png" height=20px></img>');
}


$('#audio_button').click(() => {
  if (play_audio && first_play) {
    play_audio = false
    setPause();
  } else {
    console.log('play audio')
    play_audio = true;
    setPlay()
  }
})

function navScrollFunction() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    $('#nav-button').fadeIn();
    if (play_audio) {
      setPlay();
    } else {
      setPause();
    }
  } else {
    $('#nav-button').fadeOut();
    setPause();
  }
}

$(window).on('load', function () {
  $('#loading').fadeOut("slow");
});


var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
var scrolled = $(window).scrollTop()


// Dev : Muhammad Hidayat
