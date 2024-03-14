const examData = [
    {
        STT: 1,
        TenSinhVien: "Nguyen Van A",
        MaSV: "B21DCCN000",
        KyThi: "Ki 1",
        Mon: "Toan",
        Diem: 6,
    },
    {
        STT: 2,
        TenSinhVien: "Le Van B",
        MaSV: "B21DCCN001",
        KyThi: "Ki 1",
        Mon: "Van",
        Diem: 10,
    },
    {
        STT: 3,
        TenSinhVien: "Tran Van C",
        MaSV: "B21DCCN002",
        KyThi: "Ki 2",
        Mon: "Anh",
        Diem: 10,
    },
    {
        STT: 4,
        TenSinhVien: "Nguyen Thi D",
        MaSV: "B21DCCN003",
        KyThi: "Ki 2",
        Mon: "Ly",
        Diem: 8,
    },
    {
        STT: 5,
        TenSinhVien: "Phung Chi E",
        MaSV: "B21DCCN004",
        KyThi: "Ki 1",
        Mon: "Hoa",
        Diem: 10,
    },
    {
        STT: 6,
        TenSinhVien: "Le Thi G",
        MaSV: "B21DCCN005",
        KyThi: "Ki 1",
        Mon: "Sinh",
        Diem: 5,
    },
    {
        STT: 7,
        TenSinhVien: "Sinh Vien 006",
        MaSV: "B21DCCN006",
        KyThi: "Ki 1",
        Mon: "Toan",
        Diem: 8,
    },
    {
        STT: 8,
        TenSinhVien: "Sinh Vien 007",
        MaSV: "B21DCCN007",
        KyThi: "Ki 1",
        Mon: "Van",
        Diem: 7,
    },
    {
        STT: 9,
        TenSinhVien: "Sinh Vien 008",
        MaSV: "B21DCCN008",
        KyThi: "Ki 1",
        Mon: "Anh",
        Diem: 10,
    },
    {
        STT: 10,
        TenSinhVien: "Sinh Vien 009",
        MaSV: "B21DCCN009",
        KyThi: "Ki 2",
        Mon: "Toan",
        Diem: 1,
    },
];




function renderData(data) {
    const tableBody = document.querySelector('.table-body');
    tableBody.innerHTML = ''
    data.forEach(exam => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${exam.STT}</td>
            <td>${exam.TenSinhVien}</td>
            <td>${exam.MaSV}</td>
            <td>${exam.KyThi}</td>
            <td>${exam.Mon}</td>
            <td>${exam.Diem}</td>



        `;

        tableBody.appendChild(row);
    });
}
const searchInput = document.querySelector('.search');
const searchForm = document.querySelector('#search-form');
const searchSelect = document.querySelector('#search');
const subjectSelect = document.querySelector('#search2');

function searchExams(examData, searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    return examData.filter(exam => {
        return exam.TenSinhVien.toLowerCase().includes(searchTerm) || exam.MaSV.toLowerCase().includes(searchTerm)
    });
}



function handleSearch() {
    const searchTerm = searchInput.value.trim();
    // Kiểm tra xem ô input có dữ liệu không
    if (searchTerm !== '') {
        const filteredExams = searchExams(examData, searchTerm);
        renderData(filteredExams);

        // Reset giá trị của ô input
        searchInput.value = '';
    }
}

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    handleSearch();
});

// Thêm sự kiện lắng nghe cho sự thay đổi giá trị trong dropdown
// Lắng nghe sự kiện change cho cả hai ô select
searchSelect.addEventListener('change', filterData);
subjectSelect.addEventListener('change', filterData);

function filterData() {
    const selectedValue = searchSelect.value;
    const selectedSubject = subjectSelect.value;

    const filteredData = examData.filter((item) => {
        return (selectedValue === "all" || item.KyThi === selectedValue) &&
            (selectedSubject === "all" || item.Mon === selectedSubject);
    });

    renderData(filteredData);
}



searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        // Gọi hàm xử lý tìm kiếm khi nhấn Enter
        handleSearch();
    }
});


function exportToPDF() {
    const element = document.getElementById("pdf");
    console.log(element);
    const options = {
        margin: 0,
        filename: 'exported-document.pdf',
        image: { type: 'jpeg', quality: 0.8 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'mm', format: 'a3', orientation: 'landscape' }
    };

    html2pdf(element, options);
}


renderData(examData);