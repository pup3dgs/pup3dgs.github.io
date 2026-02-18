window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function () {
  function ensureCarouselVideosAutoplay(carousel) {
    var videos = carousel.wrapper.querySelectorAll('video');
    videos.forEach(function (video) {
      video.muted = true;
      video.playsInline = true;
      var playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () { });
      }
    });
  }

  var options = {
    slidesToScroll: 1,
    slidesToShow: 2.3,
    centerMode: true, // Enable center mode
    loop: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    breakpoints: [{
      changePoint: 768,
      slidesToShow: 1,
      slidesToScroll: 1
    }]
  };

  // Initialize all div with carousel class
  var carousels = bulmaCarousel.attach('.carousel', options);

  // Loop on each carousel initialized
  for (let i = 0; i < carousels.length; i++) {
    const carousel = carousels[i];
    ensureCarouselVideosAutoplay(carousel);

    // Add listener to  event
    carousel.on('before:show', state => {
      console.log(state);
    });
    // Dot pagination can set string indices; normalize so arrow math keeps working.
    carousel.on('after:show', function (state) {
      state.index = Number(state.index);
      state.next = Number(state.next);
      ensureCarouselVideosAutoplay(carousel);
    });
  }

  // Access to bulmaCarousel instance of an element
  var element = document.querySelector('#my-element');
  if (element && element.bulmaCarousel) {
    // bulmaCarousel instance is available as element.bulmaCarousel
    element.bulmaCarousel.on('before-show', function (state) {
      console.log(state);
    });
  }


})
