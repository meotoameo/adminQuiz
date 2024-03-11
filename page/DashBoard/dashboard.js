const examData = [
    {
        STT: 1,
        TenSinhVien: "Sinh Vien 000",
        MaSV: "B21DCCN000",
        KyThi: "Ki 1",
        Mon: "Toan",
        Diem: 6,
    },
    {
        STT: 2,
        TenSinhVien: "Sinh Vien 001",
        MaSV: "B21DCCN001",
        KyThi: "Ki 1",
        Mon: "Van",
        Diem: 10,
    },
    {
        STT: 3,
        TenSinhVien: "Sinh Vien 002",
        MaSV: "B21DCCN002",
        KyThi: "Ki 2",
        Mon: "Anh",
        Diem: 10,
    },
    {
        STT: 4,
        TenSinhVien: "Sinh Vien 003",
        MaSV: "B21DCCN003",
        KyThi: "Ki 2",
        Mon: "Ly",
        Diem: 8,
    },
    {
        STT: 5,
        TenSinhVien: "Sinh Vien 004",
        MaSV: "B21DCCN004",
        KyThi: "Ki 1",
        Mon: "Hoa",
        Diem: 10,
    },
    {
        STT: 6,
        TenSinhVien: "Sinh Vien 005",
        MaSV: "B21DCCN005",
        KyThi: "Ki 1",
        Mon: "Sinh Hoc",
        Diem: 5,
    },
    {
        STT: 7,
        TenSinhVien: "Sinh Vien 006",
        MaSV: "B21DCCN006",
        KyThi: "Ki 1",
        Mon: "Lich Su",
        Diem: 8,
    },
    {
        STT: 8,
        TenSinhVien: "Sinh Vien 007",
        MaSV: "B21DCCN007",
        KyThi: "Ki 1",
        Mon: "Dia Ly",
        Diem: 7,
    },
    {
        STT: 9,
        TenSinhVien: "Sinh Vien 008",
        MaSV: "B21DCCN008",
        KyThi: "Ki 1",
        Mon: "Cong Nghe Thong Tin",
        Diem: 10,
    },
    {
        STT: 10,
        TenSinhVien: "Sinh Vien 009",
        MaSV: "B21DCCN009",
        KyThi: "Ki 1",
        Mon: "Quoc Te Hoa",
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

function searchExams(examData, searchTerm, filterBy) {
    searchTerm = searchTerm.toLowerCase();
    return examData.filter(exam => {
        const fieldValue = exam[filterBy].toLowerCase();
        return fieldValue.includes(searchTerm);
    });
}



function handleSearch() {
    const searchTerm = searchInput.value.trim();
    const filterBy = searchSelect.value;
    if(filterBy === 'all')
    {
        renderData(examData)
    }
    // Kiểm tra xem ô input có dữ liệu không
    if (searchTerm !== '') {
        const filteredExams = searchExams(examData, searchTerm, filterBy);
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
searchSelect.addEventListener('change', function () {
    // Nếu giá trị dropdown thay đổi, thực hiện tìm kiếm lại
    handleSearch();
});



searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        // Gọi hàm xử lý tìm kiếm khi nhấn Enter
        handleSearch();
    }
});
renderData(examData);