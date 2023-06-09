//----------------------------------------------------------------------------------------------------
//room
const roomSection = document.querySelector('#room');
const roomBtns = roomSection.querySelectorAll('.roomTab');
const roomBg = roomSection.querySelector('.roomBg');
const previewBg = roomSection.querySelector('.previewBg');
const roomTitle = roomSection.querySelector('.previewTit');
const roomSub = roomSection.querySelector('.previewSub');

const roomImgs = ['bg1.png', 'preview2.png', 'preview3.png', 'preview4.png'];

const preTit = [
	'Urban kitchen solutions',
	'Long-lasting style and quality',
	'An elegant living room',
	'A flexible room with space',
];

const preSub = [
	'Urban homes often mean small spaces and tricky architecture, but that doesn’t change the need for a storage-optimised (and stylish!) space for cooking. The flexible ENHET kitchen can tackle most nooks while letting you express your style to the fullest.',

	'A traditional look never goes out of style – so why not invest in the high-quality IDANÄS series of bedroom furniture that will be at your service for many years to come?',

	'Comfort and style go hand in hand in this colour coordinated living room where EKOLSUND recliner is the centre of attention. It can be adjusted into three positions: sit upright, lean back or lie back for a nap. How do you want to relax today?',

	'When you’ve got one room for your busy life, here’s a layout that gives you space to breathe. Whether you’re socialising, gaming or studying, it’s packed with useful ways to keep things running smoothly.',
];

//room 탭버튼 기능
roomBtns.forEach((roomBtn, idx) => {
	roomBtn.addEventListener('click', (e) => {
		e.preventDefault();

		//모든 버튼 비활성화
		for (const roomBtn of roomBtns) roomBtn.classList.remove('on');
		//클릭한 버튼 활성화
		roomBtns[idx].classList.add('on');

		// roomBg 사진 바뀜
		roomBg.style.backgroundImage = `url(img/${roomImgs[idx]})`;
		// previewBg 사진 바뀜
		previewBg.style.backgroundImage = `url(img/${roomImgs[idx]})`;
		roomTitle.innerHTML = `${preTit[idx]}`;
		roomSub.innerHTML = `${preSub[idx]}`;
	});
});
