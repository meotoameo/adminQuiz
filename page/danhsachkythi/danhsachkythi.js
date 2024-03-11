const examData = [
    {
        ID: 1,
        TenBaiThi: "Bài Thi 1",
        BatDau: "10/03/2024 08:00",
        ThoiLuong: 120, // 2 giờ
        TrangThai: "Đang diễn ra"
    },
    {
        ID: 2,
        TenBaiThi: "Bài Thi 2",
        BatDau: "11/03/2024 10:30",
        ThoiLuong: 90, // 1.5 giờ
        TrangThai: "Đã kết thúc"
    },
    {
        ID: 3,
        TenBaiThi: "Bài Thi 3",
        BatDau: "12/03/2024 09:15",
        ThoiLuong: 150, // 2.5 giờ
        TrangThai: "Chưa bắt đầu"
    },
    {
        ID: 4,
        TenBaiThi: "Bài Thi 4",
        BatDau: "13/03/2024 14:00",
        ThoiLuong: 120, // 2 giờ
        TrangThai: "Đang diễn ra"
    },
    {
        ID: 5,
        TenBaiThi: "Bài Thi 5",
        BatDau: "14/03/2024 11:45",
        ThoiLuong: 90, // 1.5 giờ
        TrangThai: "Đã kết thúc"
    },
    {
        ID: 6,
        TenBaiThi: "Bài Thi 6",
        BatDau: "15/03/2024 13:30",
        ThoiLuong: 180, // 3 giờ
        TrangThai: "Chưa bắt đầu"
    },
    {
        ID: 7,
        TenBaiThi: "Bài Thi 7",
        BatDau: "16/03/2024 10:00",
        ThoiLuong: 150, // 2.5 giờ
        TrangThai: "Đã kết thúc"
    },
];



function renderData(data) {
    const tableBody = document.querySelector('.table-body');
    tableBody.innerHTML = ''
    data.forEach((exam, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>     
            <td>${exam.TenBaiThi}</td>
            <td>${exam.BatDau}</td>
            <td>${exam.ThoiLuong}</td>
            <td>${exam.TrangThai}</td>
           
            <td onClick="DisplayPopUp('add-exam')" style="text-align: center;"><a class="btn access" href="#"><i class="fa-solid fa-pen"></i></a></td>
            <td onClick="removeExam(this)" style="text-align: center;"><a class="btn remove" href="#"><i class="fa-solid fa-xmark"></i></a></td>
        `;

        tableBody.appendChild(row);
    });
}
const searchInput = document.querySelector('.search')
function searchExamsByName(examData, searchTerm) {
    searchTerm = searchTerm.toLowerCase(); // Chuyển đổi searchTerm về chữ thường để tìm kiếm không phân biệt chữ hoa chữ thường
    return examData.filter(exam => exam.name.toLowerCase().includes(searchTerm));
}
function handleSearch() {
    const searchTerm = searchInput.value.trim();

    const filteredExams = searchExamsByName(examData, searchTerm)
    // Kiểm tra xem ô input có dữ liệu không
    if (searchTerm !== '') {
        // Thực hiện các thao tác tìm kiếm dựa trên searchTerm
        // Ví dụ: Hiển thị kết quả, tương tác với dữ liệu, v.v.

        // Gọi hàm renderData với searchTerm
        renderData(filteredExams);

        // Reset giá trị của ô input
        searchInput.value = '';
    }
}


searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        // Gọi hàm xử lý tìm kiếm khi nhấn Enter
        handleSearch();
    }
});
const arrQuestion = [];

function addQuestion() {
    const newQuestion = {
        questionText: '',
        answers: ['', '', '', '']
    };
    arrQuestion.push(newQuestion)
    updateQuestionList();
}

function updateQuestionList() {
    const listQuestion = document.querySelector('.list-question');
    let fulltext = "";

    arrQuestion.forEach((item, index) => {
        const text = `
        <div style="position: relative;" class="form-question"> 
                <div class="stt">Câu ${index + 1}</div>
                <div class="question">
                    <textarea name="question" id="question-${index}" cols="30" rows="10" placeholder="Enter your question">${item.questionText}</textarea>
                </div>
                <div class="form-answer">
                    <div class="answer-more">
                        <span onclick="toggleAnswer(this)" class="icon-answer">A</span>
                        <textarea name="answer" id="answer-${index}-A" cols="30" rows="10" placeholder="Enter answer A">${item.answers[0]}</textarea>
                    </div>
                    <div class="answer-more">
                        <span onclick="toggleAnswer(this)" class="icon-answer">B</span>
                        <textarea name="answer" id="answer-${index}-B" cols="30" rows="10" placeholder="Enter answer B">${item.answers[1]}</textarea>
                    </div>
                    <div class="answer-more">
                        <span onclick="toggleAnswer(this)" class="icon-answer">C</span>
                        <textarea name="answer" id="answer-${index}-C" cols="30" rows="10" placeholder="Enter answer C">${item.answers[2]}</textarea>
                    </div>
                    <div class="answer-more">
                        <span onclick="toggleAnswer(this)"  class="icon-answer">D</span>
                        <textarea name="answer" id="answer-${index}-D" cols="30" rows="10" placeholder="Enter answer D">${item.answers[3]}</textarea>
                    </div>
                    <span class="delete-question" onclick="deleteQuestion(${index})">X</span>
                </div>
            </div>
        `;
        fulltext += text;
    })

    listQuestion.innerHTML = fulltext;
}

function toggleAnswer(span) {
    span.classList.toggle('access');
}

function deleteQuestion(index) {
    arrQuestion.splice(index, 1);
    updateQuestionList();
}

// Sử dụng

function closePopUp(name) {
    const cls = document.querySelector('.' + name)
    cls.classList.remove('show')
}

function DisplayPopUp(name) {
    const cls = document.querySelector('.' + name)
    cls.classList.add('show')
    console.log(1);
}

function removeExam(e) {
    console.log(e);
    const parent = e.parentNode.style.display = 'none';
    console.log(parent);
}
function handleFile() {
    const input = document.getElementById('excelFileInput');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });

            // Assume your data is in the first sheet (Sheet1)
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert the worksheet to a JSON object
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Process jsonData and add questions to arrQuestion
            addQuestionsFromExcel(jsonData);

            // Update the question list
            updateQuestionList();
        };

        reader.readAsBinaryString(file);
    } else {
        console.error('No file selected');
    }
}

function addQuestionsFromExcel(data) {
    // Clear existing questions
    arrQuestion.length = 0;

    // Assuming each row in Excel represents a question
    data.forEach((row, index) => {
        const newQuestion = {
            questionText: row[0] || '',
            answers: [row[1] || '', row[2] || '', row[3] || '', row[4] || ''],
        };
        arrQuestion.push(newQuestion);
    });
}

renderData(examData);