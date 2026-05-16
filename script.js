// 버튼에 클릭 이벤트 연결
document.getElementById('generate-btn').addEventListener('click', generateSeating);

function generateSeating() {
    const namesInput = document.getElementById('student-names').value;
    const cols = parseInt(document.getElementById('cols').value);
    const rows = parseInt(document.getElementById('rows').value);
    
    // 입력된 텍스트에서 쉼표(,)나 줄바꿈, 띄어쓰기를 기준으로 이름을 분리하고 빈칸 제거
    let students = namesInput.split(/[\n,\s]+/).map(name => name.trim()).filter(name => name.length > 0);
    
    const totalSeats = cols * rows;
    
    // 학생 수가 좌석 수보다 많은 경우 경고
    if (students.length > totalSeats) {
        alert(`입력한 학생 수(${students.length}명)가 준비된 좌석 수(${totalSeats}석)보다 많습니다! 분단이나 줄을 늘려주세요.`);
        return;
    }

    // 학생 배열 무작위로 섞기 (Fisher-Yates 알고리즘)
    for (let i = students.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [students[i], students[j]] = [students[j], students[i]];
    }

    const grid = document.getElementById('seating-grid');
    grid.innerHTML = ''; // 기존에 배치된 좌석 초기화
    
    // CSS Grid의 열(분단) 개수 설정
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    // 좌석(책상) 생성하여 화면에 추가
    for (let i = 0; i < totalSeats; i++) {
        const desk = document.createElement('div');
        desk.classList.add('desk');
        
        if (i < students.length) {
            // 학생이 있는 자리
            desk.innerText = students[i];
        } else {
            // 학생 수가 모자라 남는 빈자리
            desk.innerText = '빈자리';
            desk.classList.add('empty-desk');
        }
        
        grid.appendChild(desk);
    }
}
