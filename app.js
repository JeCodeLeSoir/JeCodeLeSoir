/*const menu = document.querySelector("menu");
   window.addEventListener("scroll", function () {
     if (window.scrollY === 0) {
       menu.style.top = "-100px";
     } else if (window.scrollY > 1) {
       menu.style.top = "0";
     }
});*/


/* code */

let dontSpam = false;
let pitch = 1.0;

const audio = new Audio('https://cdn.pixabay.com/audio/2022/03/24/audio_cf65a6004c.mp3');
document.querySelectorAll('b').forEach(function (button) {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    const isPlay = audio.duration > 0 && !audio.paused;
    if (dontSpam === false && !isPlay) {
      dontSpam = true;

      pitch = Math.random() + 0.1;

      audio.mozPreservesPitch = false;
      audio.playbackRate = pitch;

      audio.play();
      audio.addEventListener('ended', function () {
        dontSpam = false;
      }, false);
    }
  });
});


document.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var href = link.getAttribute('href');

    if (href === undefined || href === null) {
      return;
    }

    if (href.charAt(0) !== '#') {
      return;
    }

    e.preventDefault();

    var target = document.querySelector(href);

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  });
});

const preview = document.querySelector('.preview img');
let lastImg = document.querySelector('.grid li .Select');

document.querySelectorAll('.grid a img').forEach(function (img) {
  img.addEventListener('click', function () {
    lastImg.classList.remove('Select');
    img.classList.add('Select');
    preview.src = img.src;
    lastImg = img;
  });
})