function showRandomImage(event) {
  const images = ['click1', 'click2', 'click3','click4','click5','click6']; // 사용할 이미지들
  const randomIndex = Math.floor(Math.random() * images.length); // 랜덤 인덱스
  const selectedImageId = images[randomIndex]; // 랜덤으로 선택된 이미지의 ID
  const selectedImage = document.getElementById(selectedImageId); // 이미지 선택

  // 배경을 클릭한 좌표로 이미지를 배치
  const x = event.clientX;
  const y = event.clientY;
  selectedImage.style.left = `${x - 100}px`; // 이미지의 중앙이 클릭한 지점에 오도록 위치 조정
  selectedImage.style.top = `${y - 100}px`;

  // 이미지 보이기
  selectedImage.classList.add('show');

  // 이미지가 2초 후에 사라지도록 설정
  setTimeout(() => {
      selectedImage.classList.remove('show');
  }, 5000); // 2초 후에 사라지도록
}


const topDiv = document.querySelector(".top");
const intro6Div = document.querySelector("#intro6");

// snow 생성 함수
function createSnow() {
  for (let i = 0; i < 200; i++) {
    const snow = document.createElement("div");
    snow.className = "snow";
    snow.style.opacity = Math.random();

    const startX = Math.random() * 100;
    const endX = startX + (Math.random() * 20 - 10);
    const scale = Math.max(Math.random(), 0.5);

    const keyframe = [
      { transform: `translate(${startX}vw, 0) scale(${scale})` },
      { transform: `translate(${endX}vw, 100vh) scale(${scale})` },
    ];
    const option = {
      duration: 15000 + Math.random() * 5000,
      easing: "linear",
      iterations: Infinity,
      delay: -Math.random() * 20000,
    };

    snow.animate(keyframe, option);
    topDiv.appendChild(snow);
  }
}

// #intro6이 보일 때 snow 숨기기
function toggleSnowVisibility() {
  const snowElements = document.querySelectorAll('.snow');
  
  // #intro6이 화면에 보이면 snow 숨기기
  if (intro6Div.getBoundingClientRect().top <= window.innerHeight && intro6Div.getBoundingClientRect().bottom >= 0) {
    snowElements.forEach(snow => {
      snow.style.display = 'none';
    });
  } else {
    // #intro6이 화면에 없을 때 snow 보이게 하기
    snowElements.forEach(snow => {
      snow.style.display = 'block';
    });
  }
}

// 페이지 로드 시 snow 추가
createSnow();


let selectedX = null;
let selectedY = null;

// 1-1 그룹에서 선택된 X 이미지 확인 (이미지 클릭 시)
const group1Images = document.querySelectorAll('.btn1-1 [data-group="1-1"]');
group1Images.forEach(image => {
    image.addEventListener('click', () => {
        if (image.style.display !== "none" && image.getAttribute('src')) { // 이미지가 화면에 표시되고 src가 있는지 확인
            const src = image.getAttribute('src');
            selectedX = src.split('-')[2].split('.')[0]; // src에서 x 추출 (예: game1-3-x.png)
            console.log("selectedX:", selectedX); // 확인용
        }
    });
});

// 1-3 그룹에서 선택된 Y 이미지 확인 (이미지 클릭 시)
const group4Images = document.querySelectorAll('.btn1-3 [data-group="1-3"]'); // 여기 수정: data-group="1-3"로 정확한 선택자 확인
group4Images.forEach(image => {
    image.addEventListener('click', () => {
        if (image.style.display !== "none" && image.getAttribute('src')) { // 이미지가 화면에 표시되고 src가 있는지 확인
            const src = image.getAttribute('src');
            console.log("Clicked image src for Y:", src); // 클릭한 이미지의 src를 출력해 확인
            selectedY = src.split('-')[2].split('.')[0]; // src에서 y 값 추출 (예: btn1-3-1.png -> 2번째 요소)
            console.log("selectedY:", selectedY); // 확인용
        }
    });
});






function nextIntro(introNumber) {
  // 모든 섹션 숨기기
  document.querySelectorAll('.section').forEach(section => section.style.display = 'none');

  // 현재 섹션 표시
  const currentSection = document.getElementById('intro' + introNumber);
  if (currentSection) {
      currentSection.style.display = 'block';
  }

  if (introNumber === 2) {
      typeText1();

      // 첫 번째 효과음 재생
      const audio1 = document.getElementById("effect1");
      const audio2 = document.getElementById("effect1-1");

      if (audio1 && audio2) {
          audio1.play().catch(error => console.error("effect1 재생 실패:", error));

          // 첫 번째 효과음이 끝난 뒤 두 번째 효과음 재생
          audio1.addEventListener("ended", () => {
              // 두 번째 효과음 시작 지점 설정 (77초)
              audio2.currentTime = 77;
              audio2.play();

              setTimeout(() => {
                  audio2.pause();
                  audio2.currentTime = 0; // 재생 위치 초기화// intro3으로 전환
              }, 10000); // 20초 지속
          });
      }
  } else if (introNumber === 3) {
      typeText2(); // intro3에서 실행할 함수
  } else if (introNumber === 4) {
      typeText3(); // intro4에서 실행할 함수
  } else if (introNumber === 5) {
      typeText4(); // intro5에서 실행할 함수
  } else if (introNumber === 6) {
      // nextIntro(6) 실행 시 snow 숨기기
      const snowElements = document.querySelectorAll('.snow');
      snowElements.forEach(snow => {
          snow.style.display = 'none'; // snow 숨기기
      });
      typeText6();
  } else if (introNumber === 7) {
      // nextIntro(7) 실행 시 timer 시작
      const snowElements = document.querySelectorAll('.snow');
      snowElements.forEach(snow => {
          snow.style.display = 'none'; // snow 숨기기
      });

      clickSound4.pause(); // 소리 멈추기
  } else if (introNumber === 8) {
    // nextIntro(7) 실행 시 timer 시작
    const snowElements = document.querySelectorAll('.snow');
    snowElements.forEach(snow => {
        snow.style.display = 'none'; // snow 숨기기
    });
    startTimer();
} else if (introNumber === 9) {
  // nextIntro(7) 실행 시 timer 시작
  const snowElements = document.querySelectorAll('.snow');
  snowElements.forEach(snow => {
      snow.style.display = 'none'; // snow 숨기기
  });
  startTimer();
} else if (introNumber === 10) {
    if (selectedX && selectedY) {
        const bungImage = document.getElementById('bung-image');
        bungImage.src = `img/bung-${selectedX}-${selectedY}.png`;
        bungImage.alt = `bung-${selectedX}-${selectedY}`;
        console.log(`bung-${selectedX}-${selectedY}.png 표시`);
    } else {
        console.error("x 또는 y 값이 선택되지 않았습니다. selectedX:", selectedX, ", selectedY:", selectedY);
    }
} else if (introNumber === 11) {typeTextlast()} 

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

const texts = ["슈붕", "호떡", "팥붕", "어묵", "간식", "군밤", "호빵"];
const animatedText = document.getElementById("anitext");

function changeText() {
  const randomIndex = Math.floor(Math.random() * texts.length); // 랜덤 인덱스 생성
  const newText = texts[randomIndex]; // 랜덤 텍스트 선택

  setTimeout(() => {
    // 텍스트 변경 및 랜덤 색상 적용
    animatedText.textContent = newText;
    animatedText.classList.remove("hidden");
  }, 100); // 애니메이션 지속 시간 (0.5초 후 텍스트 변경)
}
// 일정 시간 간격으로 텍스트 변경
setInterval(changeText, 500); // 2초마다 변경

// 첫 번째 타이핑 효과
function typeText1() {
const textElement = document.querySelector(".text1");
const textContent = "추운 겨울, 길을 걷던..."; // 타이핑
let index = 0;

// 타이핑 효과를 구현하는 함수
function type() {
  if (index < textContent.length) {
    textElement.textContent += textContent[index]; // 한 글자씩 추가
    index++;
    setTimeout(type, 100); // 타이핑 속도 (100ms)
  } else {
    showAlertBox(); // 타이핑이 끝난 후 alertbox2-1 표시
  }
}

// 기존 텍스트 초기화 후 타이핑 시작
textElement.textContent = ""; // 초기화
type();
}

// alertbox2-1 표시 함수
function showAlertBox() {
const alertBox = document.querySelector('.alertbox2-1');
alertBox.style.transition = "opacity 1s ease-in-out"; // 부드러운 전환
alertBox.style.opacity = "1"; // 보이게 설정
}

// 입력한 이름을 로컬 스토리지에 저장하는 함수
function saveName() {
    const nameInput = document.getElementById("nameInput").value;
    if (nameInput) {
        // 입력한 이름을 로컬 스토리지에 저장
        localStorage.setItem("userName", nameInput);

        // intro2 숨기기, intro3로 넘어가기
        document.getElementById("intro2").style.display = "none";
        nextIntro(3); // intro3로 넘어가기

        // 오디오 재생
        const audio = document.getElementById("effect2");
        if (audio) {
            audio.play()
        }
    } else {
        alert("별명을 써도 좋아요");
    }
}


// 두 번째 타이핑 효과
function typeText2() {
const savedName = localStorage.getItem("userName");
const textElement = document.querySelector(".text2");
const textContent2 = `추운 겨울, 길을 걷는 ${savedName}은 오늘도 배고프다`+'.        ▶'; // 타이핑할 텍스트
let index = 0;

// 타이핑 효과를 구현하는 함수
function type() {
  if (index < textContent2.length) {
    textElement.textContent += textContent2[index]; // 한 글자씩 추가
    index++;
    setTimeout(type, 100); // 타이핑 속도 (100ms)
  } else {
    // 타이핑이 끝난 후 클릭 이벤트 추가
    textElement.addEventListener('click', () => {
      nextIntro(4);  // 텍스트 클릭 시 nextIntro(4) 호출
    });
  }
}

// 기존 텍스트 초기화 후 타이핑 시작
textElement.textContent = ""; // 초기화
type();
}

function typeText3() {
  const textElement = document.querySelector(".text3");
  const firstText = "난 아무래도 ";
  const secondText = "이 가장 먹고싶어.";
  let selectedItem = ""; // 선택된 아이템 텍스트 저장
  let index = 0;

  // 첫 번째 타이핑 효과
  function typeFirstText() {
    if (index < firstText.length) {
      textElement.textContent += firstText[index]; // 한 글자씩 추가
      index++;
      setTimeout(typeFirstText, 100); // 타이핑 속도 (100ms)
    } else {
      textElement.textContent += "이게 제일 먹고싶어"; // 초기 ㅇㅇ 추가
      attachHoverEvents(); // 호버 이벤트 추가
    }
  }

  
  // 이미지에 마우스 호버 이벤트 추가
  function attachHoverEvents() {
    const images = document.querySelectorAll(".hover-image");
    images.forEach(image => {
      image.addEventListener("mouseenter", () => {
        selectedItem = image.dataset.name; // 호버 중인 이미지 이름 가져오기
        updateTextWithItem(); // 텍스트 업데이트
      });
    });
  }

  // 텍스트에 ㅇㅇ 대신 선택된 아이템 추가
  function updateTextWithItem() {
    textElement.textContent = `${firstText}${selectedItem}${secondText}`;
  }

  // 기존 텍스트 초기화 후 첫 번째 타이핑 시작
  textElement.textContent = ""; // 초기화
  typeFirstText();
}


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

  // 텍스트에 [선택한 간식]을 반영
  function updateTextWithItem() {
    if (selectedItem) {
      textElement.textContent = ""; // 초기화
      typeTextWithItem(); // 타이핑 시작
    } else {
      console.error("선택된 아이템이 없습니다."); // 디버깅용
    }
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


// 여섯 번째 타이핑 효과
function typeText6() {
  const savedName = localStorage.getItem("userName");
  const textElement = document.querySelector(".text6");

  const texts = [
    "어서오세요.",
    `입복당에서는 ${savedName}님이 선택한 간식을 만날 확률 증가 부적을 제작할 수 있어요.`,
    "아쉽게도 아직 붕어빵, 계란빵, 십원빵 부적만 제작 가능합니다.",
    "이중에 부적에 새길 간식을 골라보세요."
  ];
  
  let textIndex = 0;
  let index = 0;

  // 타이핑 효과를 구현하는 함수
  function type() {
    if (index < texts[textIndex].length) {
      textElement.textContent += texts[textIndex][index]; // 한 글자씩 추가
      index++;
      setTimeout(type, 50); // 타이핑 속도 (100ms)
    } else {
      // 타이핑이 끝난 후 텍스트를 지우고 다음 텍스트로 넘어가도록
      setTimeout(() => {
        if (textIndex < texts.length - 1) {
          textIndex++; // 다음 텍스트로 넘어감
          index = 0; // 새로운 텍스트는 처음부터 타이핑 시작
          textElement.textContent = ''; // 기존 텍스트 지우기
          type(); // 새로운 텍스트 타이핑 시작
        } else {
          // 마지막 텍스트는 계속 유지
          textElement.textContent = texts[textIndex];
        }
      }, 2300); // 텍스트 끝나고 1초 후에 다음 텍스트로 넘어가도록 설정
    }
  }
  // 첫 번째 텍스트 타이핑 시작
  textElement.textContent = ""; // 기존 텍스트 초기화
  type();
}


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
          saveSelectionToServer(); // 서버에 선택 사항 저장
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
  const visibleImage = document.querySelector('.game-image[data-group="1-1"]:not([style*="display: none"])');

  if (visibleImage) {
    let targetImageId = null;
    switch (visibleImage.id) {
      case 'game1-1-1': targetImageId = 'game1-3-1'; break;
      case 'game1-1-2': targetImageId = 'game1-3-2'; break;
      case 'game1-1-3': targetImageId = 'game1-3-3'; break;
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

function playSound1() {
  clickSound1.currentTime = 0; // 재생 위치 초기화
  clickSound1.play(); // 소리 재생
}
function playSound2() {
  clickSound2.currentTime = 0; // 재생 위치 초기화
  clickSound2.play(); // 소리 재생
}

function playSound3() {
  clickSound3.currentTime = 0; // 재생 위치 초기화
  clickSound3.play(); // 소리 재생
        startTimer();
}

// guide 이미지를 클릭했을 때 playSound3 함수 실행
document.getElementById('guide').addEventListener('click', function() {
  this.style.display = 'none'; // 이미지를 숨기기
  playSound3(); // playSound3 함수 실행
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


function typeTextlast() {
  const textElement = document.querySelector(".textlast");
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
        location.reload();  // 텍스트 클릭 시 nextIntro(4) 호출
      });
    }
  }
  
  // 기존 텍스트 초기화 후 타이핑 시작
  textElement.textContent = ""; // 초기화
  type();
  }