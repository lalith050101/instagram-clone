const $faces = document.querySelectorAll('.face');
const $cub = document.querySelector('.cub');
const $btnNext = document.querySelector('.instagram-stories__btn-next');
const $btnPrev = document.querySelector('.instagram-stories__btn-prev');

let faceIndex = 0;
let storieIndex = 0;
let imgIndex = 0;
let imgInterval = 0;
let imgProgress = 0;
let countRotation = 1;
let crrRotationDeg = 0;
const stories = [
  {
    user: {
      name: 'crawlgossip',
      imageURL: 'https://picsum.photos/id/1/250/450',
    },
    images: [
      'https://picsum.photos/id/1/250/450',
      'https://picsum.photos/id/2/250/450',
      'https://picsum.photos/id/3/250/450',
      'https://picsum.photos/id/4/250/450',
      'https://picsum.photos/id/5/250/450',
    ],
  },
  {
    user: {
      name: 'cohortmandrake',
      imageURL: 'https://picsum.photos/id/6/250/450',
    },
    images: [
      'https://picsum.photos/id/6/250/450',
      'https://picsum.photos/id/7/250/450',
      'https://picsum.photos/id/8/250/450',
      'https://picsum.photos/id/9/250/450',
      'https://picsum.photos/id/10/250/450',
      'https://picsum.photos/id/11/250/450',
      'https://picsum.photos/id/12/250/450',
      'https://picsum.photos/id/13/250/450',
      'https://picsum.photos/id/14/250/450',
    ],
  },
  {
    user: {
      name: 'greg_green',
      imageURL: 'https://picsum.photos/id/15/250/450',
    },
    images: [
      'https://picsum.photos/id/15/250/450',
      'https://picsum.photos/id/16/250/450',
      'https://picsum.photos/id/17/250/450',
      'https://picsum.photos/id/18/250/450',
      'https://picsum.photos/id/19/250/450',
    ],
  },
  {
    user: {
      name: 'australians12',
      imageURL: 'https://picsum.photos/id/19/250/450',
    },
    images: [
      'https://picsum.photos/id/2/250/450',
      'https://picsum.photos/id/21/250/450',
    ],
  },
  {
    user: {
      name: 'graindar',
      imageURL: 'https://picsum.photos/id/22/250/450',
    },
    images: [
      'https://picsum.photos/id/22/250/450',
      'https://picsum.photos/id/23/250/450',
      'https://picsum.photos/id/24/250/450',
      'https://picsum.photos/id/25/250/450',
      'https://picsum.photos/id/26/250/450',
      'https://picsum.photos/id/27/250/450',
      'https://picsum.photos/id/28/250/450',
      'https://picsum.photos/id/29/250/450',
      'https://picsum.photos/id/30/250/450',
      'https://picsum.photos/id/31/250/450',
    ],
  },
  {
    user: {
      name: 'elegancekat',
      imageURL: 'https://picsum.photos/id/28/250/450',
    },
    images: [
      'https://picsum.photos/id/32/250/450',
      'https://picsum.photos/id/33/250/450',
      'https://picsum.photos/id/34/250/450',
      'https://picsum.photos/id/35/250/450',
      'https://picsum.photos/id/36/250/450',
      'https://picsum.photos/id/37/250/450',
    ],
  },
];

const createElement = (tagName, props) => {
  const element = document.createElement(tagName);

  Object
    .entries(props)
    .forEach(([ key, value ]) => element.setAttribute(key, value));

  return element;
};

const rotateCub = (rotation) => {
  $cub.style.transform = `rotateY(-${rotation}deg)`;
};

const renderInFace = (index, element) => {
  $faces[index].innerHTML = '';
  $faces[index].append(element);
};

const nextFace = () => {
  if (stories[storieIndex].images[imgIndex + 1]) {
    imgIndex++;
    imgProgress = 0;
    return;
  } else if (!stories[storieIndex + 1]) {
    return;
  }

  storieIndex++;
  countRotation++;
  crrRotationDeg += 90
  faceIndex = ((countRotation % 4 || 4)) - 1;

  if (!stories[storieIndex]) {
    storieIndex = 0;
  }

  renderInFace(faceIndex, createStorie(stories[storieIndex]));
  rotateCub(crrRotationDeg);
};

const prevFace = () => {
  if (stories[storieIndex].images[imgIndex - 1]) {
    imgIndex--;
    imgProgress = 0;
    return;
  }

  if (crrRotationDeg <= 0) return;

  storieIndex--;
  countRotation--;
  crrRotationDeg -= 90;
  faceIndex = ((countRotation % 4) || 4) - 1;

  renderInFace(faceIndex, createStorie(stories[storieIndex]));
  rotateCub(crrRotationDeg);
};

const createStorie = (storieData) => {
  imgIndex = 0;
  imgProgress = 0;

  const rootElement = createElement('div', {
    class: 'instagram-stories__storie',
  });

  const renderStorie = () => (
    rootElement.innerHTML = `<header class="instagram-storie__header">
            <div class="instagram-storie__header__user">
              <img
                alt="profile pic"
                class="instagram-storie__header__user-image"
                src="${storieData.user.imageURL}"
              />
              <h2 class="instagram-storie__header__user-name">
                ${storieData.user.name}
              </h2>
            </div>
            <div class="instagram-storie__header__options">
           
            <span class="instagram-storie__header__options-circle"></span>
              <span class="instagram-storie__header__options-circle"></span>
              <span class="instagram-storie__header__options-circle"></span>
            
            </div>
          </header>
          <div class="instagram-storie__progress">
            ${storieData.images.map((_, index) =>(
              `
              <div class="instagram-storie__progress-item">
                <div
                  class="instagram-storie__progress-item__bar"
                  style="width: ${index === imgIndex ? `${imgProgress}%` : (
                    index < imgIndex ? '100%' : '0%'
                  )}"
                >
                </div>
              </div>
            `
            )).join('')}
          </div>
          <div
            class="instagram-storie__image"
            style="background-image: url('${storieData.images[imgIndex]}')"
          >
          </div>`
    );

  const startImgProgress = () => {
    clearInterval(imgInterval);

    imgInterval = setInterval(() => {
      imgProgress += 10 / 3;

      if (imgIndex === storieData.images.length) {
        nextFace()
        return;
      }

      if (imgProgress > 100) {
        imgIndex++;
        imgProgress = 0;
        return;
      }

      renderStorie();
    }, 100);
  };

  renderStorie();
  startImgProgress();

  return rootElement;
};

$btnNext.addEventListener('click', nextFace);
$btnPrev.addEventListener('click', prevFace);

$cub.style.transformOrigin = `center center ${(-$cub.clientWidth / 2)}px`;
$faces[2].style.transform = `translateZ(-${$faces[2].clientWidth}px) rotateY(180deg) translateX(-100%)`;

window.addEventListener('resize', (event) => {
  $cub.style.transformOrigin = `center center ${(-$cub.clientWidth / 2)}px`;
  $faces[2].style.transform = `translateZ(-${$faces[2].clientWidth}px) rotateY(180deg) translateX(-100%)`;
});

renderInFace(0, createStorie(stories[storieIndex]));