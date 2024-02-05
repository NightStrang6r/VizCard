const preloader = document.querySelector('.preloader');
const button = document.querySelector('.preloader-content_button');

const videoId = 'rqJDO3TWnac';
const loadArr = ['⠻', '⠽', '⠾', '⠷', '⠯', '⠟'];

let animInterval, loadInterval, i = 0, j = 1;

function loadStep() {
	i == loadArr.length - 1 ? i = 0 : i++;
	button.textContent = loadArr[i];
};

function preloaderAnimation() {
	j -= .01;
	preloader.style.opacity = j;

	if (j <= 0) {
		clearInterval(animInterval);
		setTimeout(_ => preloader.removeAttribute('style'), 50);
		preloader.remove();
	};

	if (j <= 1) {
		player.unMute();
		player.playVideo();
	};
};

function onReady(event) {
    event.target.setVolume(25);
    clearInterval(loadInterval);

    button.innerText = 'Click';
    button.classList.add('ready');
    button.onclick = _ => {
        animInterval = setInterval(preloaderAnimation, 10);
        button.classList.add('clicked');
    };
}

YT.ready(_ => {
	player = new YT.Player('player', {
		videoId: videoId,
		playerVars: {'autoplay': 0, 'controls': 0, 'loop': 1, 'playlist': videoId},
		events: {
			'onReady': e => onReady(e)
		}
	});
});

loadInterval = setInterval(loadStep, 100);