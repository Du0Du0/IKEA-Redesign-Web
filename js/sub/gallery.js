const wrap = document.querySelector('.gallery .wrap');
const loading = document.querySelector('.gallery .loading');
const input = document.querySelector('.gallery #search');
const btnSearch = document.querySelector('.gallery .btnSearch');
const btnInterest = document.querySelector('.gallery .btnInterest');
const btnMine = document.querySelector('.gallery .btnMine');
const api_key = '08e2b5a2a14d18ff9a849c7109134194';
const num = 30;
const myId = '168950802@N02';
/*
keydown: 키를 누를때
keyup: 키를  뗄때 (mac OS 이벤트가 두번씩 발생)
keypress: 키를 눌렀다가 땔때 (한자같은 특수키 지원안됨) 추천
*/

fecthData(setURL('interest'));

btnSearch.addEventListener('click', getSearch);

//검색창에 키보드 이벤트 연결
input.addEventListener('keypress', (e) => e.code === 'Enter' && getSearch());

//이벤트 위임 처리
document.body.addEventListener('click', (e) => {
	if (e.target.className === 'userid') fecthData(setURL('user', e.target.innerText));
	if (e.target.className === 'thumb') createPop(e.target.getAttribute('alt'));
	if (e.target.className === 'close') removePop();
});

btnInterest.addEventListener('click', () => fecthData(setURL('interest')));
btnMine.addEventListener('click', () => fecthData(setURL('user', myId)));

//인수값에 따른 데이터 호출 URL반환 함수
function setURL(type, opt) {
	const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;
	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';

	if (type === 'interest') return `${baseURL}${method_interest}`;
	if (type === 'search') return `${baseURL}${method_search}&tags=${opt}`;
	if (type === 'user') return `${baseURL}${method_user}&user_id=${opt}`;
}

function getSearch() {
	const value = input.value.trim();
	input.value = '';
	if (value === '') return alert('검색어를 입력해주세요.');
	fecthData(setURL('search', value));
}

async function fecthData(url) {
	loading.classList.remove('off');
	wrap.classList.remove('on');

	const res = await fetch(url);
	const json = await res.json();
	const items = json.photos.photo;
	if (items.length === 0) {
		loading.classList.add('off');
		wrap.classList.add('on');
		return alert('해당 검색어의 결과이미지가 없습니다.');
	}
	createList(items);
}

function createList(arr) {
	let tags = '';

	arr.forEach((item) => {
		tags += `
        <li class='item'>
          <div>           
						<img class='thumb' src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg' alt='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg' />   
							<article class='profile'>	
							<img src='http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg' />			
            <p>${item.title === '' ? 'Have a good day!!' : item.title}</p>
							<span class='userid'>${item.owner}</span>
						</article>
          </div>
        </li>
      `;
	});
	wrap.innerHTML = tags;

	setLoading();
}

function setLoading() {
	const imgs = wrap.querySelectorAll('img');
	let count = 0;

	for (const el of imgs) {
		//만약 이미지에 엑박이 뜨면 onerror이벤트로 잡아서 디폴트 이미지로 대체
		el.onerror = () => {
			el.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
		};
		//디폴트로 변경된 이미지까지 포함해서 카운트 (무한로딩에 빠지지 않음)
		el.onload = () => {
			count++;
			count === imgs.length && isoLayout();
		};
	}
}

function isoLayout() {
	new Isotope(wrap, {
		itemSelector: '.item',
		transitionDuration: '0.5s',
	});
	wrap.classList.add('on');
	loading.classList.add('off');
}

function createPop(url) {
	document.body.style.overflow = 'hidden';
	const aside = document.createElement('aside');
	aside.className = 'pop';
	const tags = `
		<div class='con'>
			<img src='${url}' />
		</div>

		<span class='close'>close</span>
	`;
	aside.innerHTML = tags;
	document.body.append(aside);

	setTimeout(() => document.querySelector('.pop').classList.add('on'), 0);
}

function removePop() {
	document.body.style.overflow = 'auto';
	const pop = document.querySelector('.pop');
	pop.classList.remove('on');
	setTimeout(() => {
		pop.remove();
	}, 1000);
}
