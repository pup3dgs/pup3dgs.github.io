window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function () {
  // Intelligent Autoplay with IntersectionObserver
  // Only play videos when they are actually visible in the viewport.
  // This drastically reduces decoder load on mobile by preventing off-screen/cloned videos from playing.
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Video is visible
        entry.target.play().catch(function (error) {
          // Autoplay was prevented.
          // console.log('Autoplay prevented for video:', error);
        });
      } else {
        // Video is hidden
        entry.target.pause();
      }
    });
  }, { threshold: 0.1 });

  function attachObserverToCarouselVideos(carousel) {
    // Select all videos in the carousel wrapper (including Bulma-created clones)
    var videos = carousel.wrapper.querySelectorAll('video');
    videos.forEach(function (video) {
      // Ensure basic properties
      video.muted = true;
      video.playsInline = true;
      // Attach observer
      observer.observe(video);
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
    attachObserverToCarouselVideos(carousel);

    // Add listener to  event
    carousel.on('before:show', state => {
      console.log(state);
    });
    // Dot pagination can set string indices; normalize so arrow math keeps working.
    carousel.on('after:show', function (state) {
      state.index = Number(state.index);
      state.next = Number(state.next);
      // ensureCarouselVideosAutoplay(carousel);
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
