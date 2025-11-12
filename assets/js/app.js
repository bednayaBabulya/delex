document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const blur = document.getElementById('blur');
  const modalButtons = document.querySelectorAll('.modal-btn');
  const closeModalButton = document.getElementById('cross_modal');
  const rootElement = document.documentElement;
  const bodyElement = document.body;

  const lockScroll = () => {
    rootElement.classList.add('modal-open');
    bodyElement.classList.add('modal-open');
  };

  const unlockScroll = () => {
    rootElement.classList.remove('modal-open');
    bodyElement.classList.remove('modal-open');
  };

  const openModal = () => {
    modal.classList.add('is-visible');
    blur.classList.add('is-visible');
    lockScroll();
  };

  const closeModal = () => {
    modal.classList.remove('is-visible');
    blur.classList.remove('is-visible');
    unlockScroll();
  };

  modalButtons.forEach((button) => {
    button.addEventListener('click', openModal);
  });

  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }

  const players = document.querySelectorAll('[data-video-player]');

  players.forEach((player) => {
    const video = player.querySelector('.video-element');
    const playButton = player.querySelector('.play-button');
    const hideButton = () => playButton.classList.add('is-hidden');
    const showButton = () => playButton.classList.remove('is-hidden');
    let hasAutoOpenedModal = false;

    const togglePlayback = () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    };

    playButton.addEventListener('click', () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });

    video.addEventListener('click', togglePlayback);
    video.addEventListener('play', hideButton);
    video.addEventListener('pause', showButton);
    video.addEventListener('ended', () => {
      video.pause();
      video.currentTime = 0;
      showButton();
    });

    video.addEventListener('timeupdate', () => {
      if (hasAutoOpenedModal) {
        return;
      }

      if (!Number.isFinite(video.duration) || video.duration === 0) {
        return;
      }

      if (video.currentTime >= video.duration / 2) {
        hasAutoOpenedModal = true;
        video.pause();
        openModal();
      }
    });
  });

  const burder_button = document.querySelector('.ham');
  const burder_menu = document.querySelector('.mobile-header');

  burder_button.addEventListener('click', function () {
    if (this.classList.contains('active')) {
      burder_menu.style.right = '30px';
      document.documentElement.style.overflow = 'hidden';
    } else {
      burder_menu.style.right = '-700px';
      document.documentElement.style.overflow = '';
    }
  })

  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".button-next", prevEl: ".button-prev" },
    speed: 600,

  });
});

