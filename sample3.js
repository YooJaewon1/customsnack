let selectedX = null;
let selectedY = null;

// 1-1 그룹에서 선택된 X 이미지 확인
const group1Images = document.querySelectorAll('.btn1-2 [data-group="1-2"]');
group1Images.forEach(image => {
    image.addEventListener('click', () => {
        if (image.style.display !== "none" && image.getAttribute('src')) {
            const src = image.getAttribute('src');
            selectedX = src.split('-')[2]?.split('.')[0]; // x 값 추출
            console.log("selectedX:", selectedX); // 디버깅용
        }
    });
});

// 1-3 그룹에서 선택된 Y 이미지 확인
const group4Images = document.querySelectorAll('.btn1-3 [data-group="1-3"]');
group4Images.forEach(image => {
    image.addEventListener('click', () => {
        if (image.style.display !== "none" && image.getAttribute('src')) {
            const src = image.getAttribute('src');
            console.log("Clicked image src for Y:", src); // 디버깅용
            selectedY = src.split('-')[2]?.split('.')[0]; // y 값 추출
            console.log("selectedY:", selectedY); // 디버깅용
        }
    });
});

function typeTextlast() {
  const textElement = document.querySelector(".textlast1");
  if (!textElement) {
    console.error("'.textlast1' 요소를 찾을 수 없습니다.");
    return;
  }

  const textContentlast = `부적의 효과는 대단했다!`; // 타이핑할 텍스트
  let index = 0;

  // 타이핑 효과를 구현하는 함수
  function type() {
    if (index < textContentlast.length) {
      textElement.textContent += textContentlast[index]; // 한 글자씩 추가
      index++;
      setTimeout(type, 100); // 타이핑 속도 (100ms)
    } else {
      // 타이핑이 끝난 후 클릭 이벤트 추가
      textElement.addEventListener('click', () => {
        window.location.href = 'index.html'; // 클릭 시 index.html로 이동
      });
    }
  }

  // 기존 텍스트 초기화 후 타이핑 시작
  textElement.textContent = ""; // 초기화
  type();
}

function nextIntro(introNumber) {
  document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
  
  const currentSection = document.getElementById('intro' + introNumber);
  if (currentSection) {
    currentSection.style.display = 'block';

    if (introNumber === 10) {
      const bungImage = document.getElementById('egg-image');
      if (selectedX && selectedY) {
        bungImage.src = `img/egg-${selectedX}-${selectedY}.png`;
        bungImage.alt = `egg-${selectedX}-${selectedY}`;
        console.log(`egg-${selectedX}-${selectedY}.png 표시`);
      } else {
        bungImage.src = `img/default-image.PNG`; // 기본 이미지 설정
        console.error("x 또는 y 값이 선택되지 않았습니다. selectedX:", selectedX, ", selectedY:", selectedY);
      }
    } else if (introNumber === 11) {
      setTimeout(() => {
        const textElement = currentSection.querySelector(".textlast1");
        if (textElement) {
          typeTextlast(); // 타이핑 효과 시작
        } else {
          console.error("'.textlast1' 요소를 찾을 수 없습니다.");
        }
      }, 10); // 약간의 지연 후 실행
    }
  } else {
    console.error(`'intro${introNumber}' 섹션을 찾을 수 없습니다.`);
  }
}



// 노래 플레이
const toggleButton = document.getElementById('bgmButton');
const audioPlayer = document.getElementById('audioPlayer');
let isPlaying = false;
toggleButton.addEventListener('click', () => {
if (isPlaying) {
  // 음악 정지 및 이미지 변경
  audioPlayer.pause();
  toggleButton.src = "icon/bgm2.PNG";  // 정지-이미지 변경
  isPlaying = false;
} else {     // 음악 재생 및 이미지 변경
  if (audioPlayer.paused && audioPlayer.currentTime === 0) {      // 처음 재생하는 경우
    audioPlayer.play();
  } else {    // 이어서
    audioPlayer.play();
  }
  toggleButton.src = "icon/bgm1.PNG";  // 재생-이미지 변경
  isPlaying = true;
}
});

document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.querySelector(".text4");
  let selectedItem = ""; // 선택된 아이템 이름을 저장하는 변수
  const firstText = "저기로 가면 ";
  const secondText = "을 만날 수 있을지도?";
  
  // 이미지에 호버 이벤트와 클릭 이벤트 추가
  function attachHoverEvents() {
    const images = document.querySelectorAll(".hover-image");
    images.forEach(image => {
      // 마우스를 올렸을 때 이미지 이름 업데이트
      image.addEventListener("mouseenter", () => {
        selectedItem = image.dataset.name;
        console.log(`Hovered: ${selectedItem}`); // 디버깅용
      });

      // 클릭 시 텍스트 업데이트
      image.addEventListener("click", () => {
        updateTextWithItem(); // 선택된 간식을 텍스트에 반영
      });
    });
  }



  // 타이핑 효과로 텍스트를 출력
  function typeTextWithItem() {
    const fullText = `${firstText}${selectedItem}${secondText}`;
    let index = 0;

    function type() {
      if (index < fullText.length) {
        textElement.textContent += fullText[index];
        index++;
        setTimeout(type, 100); // 타이핑 속도
      } else {
        console.log("타이핑 완료");
      }
    }

    textElement.textContent = ""; // 초기화
    type();
  }

  // 초기화 및 이벤트 연결
  attachHoverEvents();
});


//타이머 함수 - 수정해야 함 - 사진 저장하는
let timerElement = document.getElementById("timer-text");
let remainingTime = 30; // 59초부터 시작
let timerInterval;

function startTimer() {
  const interval = setInterval(() => {
      // 시간 형식 변경 (초를 분:초 형식으로)
      const minutes = Math.floor(remainingTime / 60).toString().padStart(2, "0"); // 60초로 변경
      const seconds = (remainingTime % 60).toString().padStart(2, "0");
      timerElement.textContent = `${minutes}:${seconds}`;

      // 시간이 0이 되면 서버에 데이터 저장 후 nextIntro(10) 호출
      if (remainingTime <= 0) {  // remainingTime이 0 이하일 때 실행
          clearInterval(interval); // 타이머 멈추기
          nextIntro(10); // 다음 단계로 진행
      }

      remainingTime--; // 1초씩 감소
  }, 1000); // 1초 간격으로 실행
}


// 버튼 클릭 상태 추적을 위한 변수
let btn1_1_clicked = false;
let btn1_2_clicked = false;

// game 이미지와 설명을 숨기는 함수
function hideImages(groupPrefix) {
  document.querySelectorAll(`.game-image[data-group="${groupPrefix}"]`).forEach(image => {
    image.style.display = 'none';
  });

  document.querySelectorAll(`.image-description[data-group="${groupPrefix}"]`).forEach(desc => {
    desc.style.display = 'none';
  });
}


// game3 이미지를 표시하는 함수
function showGame3Image() {
  const visibleImage = document.querySelector('.game-image[data-group="1-2"]:not([style*="display: none"])');

  if (visibleImage) {
    let targetImageId = null;
    switch (visibleImage.id) {
      case 'game1-2-1': targetImageId = 'game1-3-1'; break;
      case 'game1-2-2': targetImageId = 'game1-3-2'; break;
      case 'game1-2-3': targetImageId = 'game1-3-3'; break;
    }

    if (targetImageId) {
      const game3Image = document.getElementById(targetImageId);
      if (game3Image) {
        game3Image.style.display = 'block';
      }
    }
  }

  // game1-1-container, game1-2-container의 모든 img 숨기기
  ['hidee', 'hideee'].forEach(containerId => {
    const container = document.getElementById(containerId);
    if (container) {
      const imagesInContainer = container.querySelectorAll('img');
      imagesInContainer.forEach(img => img.style.display = 'none');
      container.style.display = 'none';
    }
  });

  // data-group="1-1" 및 "1-2"인 요소 숨기기
  ['1-1', '1-2'].forEach(group => {
    document.querySelectorAll(`[data-group="${group}"]`).forEach(element => {
      element.style.display = 'none';
    });
  });

  // data-group="1-3"인 요소 표시
  ['1-3'].forEach(group => {
    document.querySelectorAll(`[data-group="${group}"]`).forEach(element => {
      element.style.display = 'block';
    });
  });
}

// game1-4 이미지와 클릭 이벤트 추가
const game1_4Button = document.getElementById('game1-4');
if (game1_4Button) {
  game1_4Button.addEventListener('click', () => {
    showGame3Image(); // game3 이미지를 표시하는 함수 호출
    playSound6();
    // game1-4 이미지를 숨기기
    console.log('game1-4 클릭됨'); // 클릭 여부 확인
    game1_4Button.style.visibility = 'hidden'; // game1-4 이미지 숨기기
    console.log('game1-4 숨겨짐'); // 숨겨짐 여부 확인
  });
}


// 모든 버튼에 클릭 이벤트 추가
const btnImages = document.querySelectorAll('.btn');
btnImages.forEach(btn => {
  btn.addEventListener('click', () => {
    showGameImage(btn.id);
  });
});

// game1-1, game1-2 버튼 클릭 이벤트 추가
function showGameImage(btnId) {
  const groupPrefix = btnId.startsWith('btn1-1-') ? '1-1' : '1-2';
  const gameId = btnId.replace(`btn${groupPrefix}-`, `game${groupPrefix}-`);
  const descId = btnId.replace(`btn${groupPrefix}-`, `desc-game${groupPrefix}-`);

  // 먼저 해당 그룹의 이미지와 설명을 모두 숨김
  hideImages(groupPrefix);

  // 선택된 game 이미지와 설명을 표시
  const gameImage = document.getElementById(gameId);
  const description = document.getElementById(descId);

  if (gameImage) gameImage.style.display = 'block';
  if (description) description.style.display = 'block';

  // 클릭 상태 업데이트
  if (groupPrefix === '1-1') btn1_1_clicked = true;
  if (groupPrefix === '1-2') btn1_2_clicked = true;

  // btn1-1과 btn1-2가 모두 클릭되었을 때 game1-4 버튼을 표시
  if (btn1_1_clicked && btn1_2_clicked) {
    const game1_4Button = document.getElementById('game1-4');
    if (game1_4Button) game1_4Button.style.display = 'block';
  }
}

// game1-3 버튼 클릭 시 game1-8-1, game1-8-2, game1-8-3 표시
function showGame8Image(btnId) {
  // 먼저 이전에 표시된 game1-8-x 이미지를 모두 숨김
  ['game1-8-1', 'game1-8-2', 'game1-8-3'].forEach(imageId => {
    const image = document.getElementById(imageId);
    if (image) {
      image.style.display = 'none';
    }
  });

  let targetImageId = null;
  switch (btnId) {
    case 'btn1-3-1': targetImageId = 'game1-8-1'; break;
    case 'btn1-3-2': targetImageId = 'game1-8-2'; break;
    case 'btn1-3-3': targetImageId = 'game1-8-3'; break;
  }

  if (targetImageId) {
    const game8Image = document.getElementById(targetImageId);
    if (game8Image) {
      game8Image.style.display = 'block';
    }
  }
}

// btn1-3-1, btn1-3-2, btn1-3-3 클릭 이벤트 추가
['btn1-3-1', 'btn1-3-2', 'btn1-3-3'].forEach(btnId => {
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.addEventListener('click', () => showGame8Image(btnId));
  }
});


const luckyCard = document.querySelector('.luckycard');

luckyCard.addEventListener('mousemove', (event) => {
    const cardRect = luckyCard.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2; // 카드의 중앙 X 좌표
    const mouseX = event.clientX; // 마우스 X 좌표

    // 카드의 중앙과 마우스의 차이 계산
    const deltaX = mouseX - cardCenterX;

    // 마우스가 카드 왼쪽에 있으면 시계방향(양의 rotateY 값), 오른쪽에 있으면 반시계방향(음의 rotateY 값)
    const rotateAmount = deltaX / cardRect.width * 360; // 360도 회전

    // 회전 적용
    luckyCard.style.transform = `translate(-50%, -50%) rotateY(${rotateAmount}deg)`;
});

// 마우스가 카드 밖으로 나가면 원래 상태로 돌아갑니다.
luckyCard.addEventListener('mouseleave', () => {
    luckyCard.style.transform = 'translate(-50%, -50%)'; // 기본 상태로 되돌리기
});

const images = ['img/luckycard1.PNG', 'img/luckycard2.png', 'img/luckycard3.png'];
let currentImageIndex = 0;

luckyCard.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length; // 이미지 순차적으로 변경
    luckyCard.style.backgroundImage = `url('${images[currentImageIndex]}')`;
});

// 오디오 객체 생성
const hoverSound = new Audio("sound/hover-image.mp3");

// 호버 이미지 요소 선택
const hoverImage1 = document.querySelector(".snack-top");
const hoverImage2 = document.querySelector(".snack-bottom");
const hoverImage3 = document.querySelector(".selectbox");

// 호버 시 효과음 재생
hoverImage1.addEventListener("mouseenter", () => {
  hoverSound.currentTime = 0; // 재생 위치 초기화
  hoverSound.play(); // 효과음 재생
});
hoverImage2.addEventListener("mouseenter", () => {
  hoverSound.currentTime = 0; // 재생 위치 초기화
  hoverSound.play(); // 효과음 재생
});
hoverImage3.addEventListener("mouseenter", () => {
  hoverSound.currentTime = 0; // 재생 위치 초기화
  hoverSound.play(); // 효과음 재생
});


const clickSound0 = new Audio("sound/check.mp3");
const clickSound1 = new Audio("sound/entrance.mp3");
const clickSound2 = new Audio("sound/tts.mp3");
const clickSound3 = new Audio("sound/timer.mp3");
const clickSound4 = new Audio("sound/pot-select.wav");
const clickSound5 = new Audio("sound/topping.mp3");
const clickSound6 = new Audio("sound/tost.mp3");
const clickSound7 = new Audio("sound/tada.mp3");
const clickSound8 = new Audio("sound/last.mp3");

// 소리 재생 함수
function playSound() {
  clickSound0.currentTime = 0; // 재생 위치 초기화
  clickSound0.play(); // 소리 재생
}

function playSound2() {
  clickSound2.currentTime = 0; // 재생 위치 초기화
  clickSound2.play(); // 소리 재생
}

function playSound3() {
  clickSound3.currentTime = 0; // 재생 위치 초기화
  clickSound3.play(); // 소리 재생
}

// guide 이미지를 클릭했을 때 playSound3 함수 실행
document.getElementById('guide').addEventListener('click', function() {
  this.style.display = 'none'; // 이미지를 숨기기
  playSound3(); // playSound3 함수 실행
  startTimer();
});

function playSound4() {
  clickSound4.currentTime = 0; // 재생 위치 초기화
  clickSound4.play(); // 소리 재생

  // 3초 후에 소리 멈추기
  setTimeout(() => {
    clickSound4.pause(); // 소리 멈추기
    clickSound4.currentTime = 0; // 재생 위치 초기화
  }, 1500); // 3초 후
}

function playSound5() {
  clickSound5.currentTime = 0; // 재생 위치 초기화
  clickSound5.play(); // 소리 재생
}

function playSound6() {
  clickSound6.currentTime = 0; // 재생 위치 초기화
  clickSound6.play(); // 소리 재생
}

function playSound7() {
  // clickSound3 정지
  if (clickSound3) {
    clickSound3.pause();
    clickSound3.currentTime = 0; // 재생 위치 초기화
    console.log("clickSound3 paused and reset");
  }

  // clickSound7 재생
  if (clickSound7) {
    clickSound7.currentTime = 0; // 재생 위치 초기화
    clickSound7.play().then(() => {
      console.log("clickSound7 playing");
    }).catch(error => {
      console.error("clickSound7 재생 실패:", error);
    });
  }
}

function playSound8() {
  clickSound8.currentTime = 0; // 재생 위치 초기화
  clickSound8.play(); // 소리 재생
}


function guide() {
  const guideImage = document.getElementById('guide2');
  const guideButton = document.getElementById('guidebtn');

  // guide 이미지가 보일 때 클릭하면 숨기기
  if (guideImage.style.display === 'block') {
    guideImage.style.display = 'none'; // guide 이미지 숨기기
  } else {
    guideImage.style.display = 'block'; // guide 이미지 보이게 하기
  }
}
