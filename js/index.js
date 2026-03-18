// TODO: TIL 폼 등록 기능을 구현하세요
// 1. 폼 요소와 목록 요소를 querySelector로 선택합니다.
// 2. 폼의 submit 이벤트를 감지하여 새 TIL 항목을 목록에 추가합니다.

const tilForm = document.querySelector("#til-form");
const tilList = document.querySelector("#til-list");

// 1. 페이지 로드 시 저장된 데이터 불러오기
document.addEventListener("DOMContentLoaded", () => {
  const savedTils = JSON.parse(localStorage.getItem("tils")) || [];
  savedTils.forEach(data => addToList(data));
});

// 2. 폼 제출 이벤트
tilForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // HTML에 있는 input들의 id를 확인해서 가져오세요. 
  // (만약 id가 다르다면 아래 querySelector 안의 이름을 수정해야 합니다)
  const dateInput = document.querySelector("#til-date") || { value: new Date().toISOString().split('T')[0] };
  const titleInput = document.querySelector("#til-title");
  const contentInput = document.querySelector("#til-content");

  const tilData = {
    date: dateInput.value,
    title: titleInput.value,
    content: contentInput.value
  };

  // 화면에 추가 & 저장
  addToList(tilData);
  saveToLocal(tilData);

  // 폼 초기화
  tilForm.reset();
});

// [함수] HTML 구조에 맞게 요소 생성 (article 태그 생성)
function addToList(data) {
  const article = document.createElement("article");
  article.classList.add("til-item");

  article.innerHTML = `
    <time>${data.date}</time>
    <h3>${data.title}</h3>
    <p>${data.content}</p>
  `;

  // 최신글이 위로 오게 하려면 prepend, 아래로 가게 하려면 appendChild
  tilList.prepend(article); 
}

// [함수] 로컬 스토리지 저장
function saveToLocal(data) {
  const savedTils = JSON.parse(localStorage.getItem("tils")) || [];
  savedTils.push(data);
  localStorage.setItem("tils", JSON.stringify(savedTils));
}