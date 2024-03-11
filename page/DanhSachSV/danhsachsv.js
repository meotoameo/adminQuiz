const examData = [
    {
        TenSinhVien: "Nguyễn Văn A",
        MaSV: "B21DCCN001",
        NgaySinh: "01/01/2000",
        GioiTinh: "Nam"
    },
    {
        TenSinhVien: "Trần Thị B",
        MaSV: "B21DCCN002",
        NgaySinh: "02/02/2001",
        GioiTinh: "Nữ"
    },
    {
        TenSinhVien: "Lê Văn C",
        MaSV: "B21DCCN003",
        NgaySinh: "03/03/1999",
        GioiTinh: "Nam"
    },
    {
        TenSinhVien: "Phạm Thị D",
        MaSV: "B21DCCN004",
        NgaySinh: "04/04/2002",
        GioiTinh: "Nữ"
    },
    {
        TenSinhVien: "Vũ Minh E",
        MaSV: "B21DCCN005",
        NgaySinh: "05/05/1998",
        GioiTinh: "Nam"
    },
    {
        TenSinhVien: "Hoàng Thị F",
        MaSV: "B21DCCN006",
        NgaySinh: "06/06/2003",
        GioiTinh: "Nữ"
    },
    {
        TenSinhVien: "Ngô Đình G",
        MaSV: "B21DCCN007",
        NgaySinh: "07/07/1997",
        GioiTinh: "Nam"
    },
];

// In ra mảng danh sách sinh viên


function toggleFilterMenu(event) {
    console.log(1);
    var filterMenu = event.target.querySelector('.filter-menu');
    filterMenu.style.display = (filterMenu.style.display === 'block') ? 'none' : 'block';
}

function filterBy(event, option) {

    event.stopPropagation()
    const keyFilter = event.target.innerHTML
    if (keyFilter === 'Tất cả') {
        renderData(examData)
    } else {

        if (option === 'L1') {
            const filteredExams = examData.filter(exam => exam.type === keyFilter)
            renderData(filteredExams)

        }
        else {
            const filteredExams = examData.filter(exam => exam.status === keyFilter)
            renderData(filteredExams)
        }

    }



    // Close the filter menu after selecting an option
    var filterMenu = event.target.closest('.filter-btn').querySelector('.filter-menu');
    filterMenu.style.display = 'none';
}

function renderData(data) {
    const tableBody = document.querySelector('.table-body');
    tableBody.innerHTML = ''
    data.forEach((exam, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><span onclick="DisplayPopUp('edit-student')" class=" student-detail" href="">${exam.TenSinhVien}</span></td>
            <td>${exam.MaSV}</td>
            <td>${exam.NgaySinh}</td>
            <td>${exam.GioiTinh}</td>

            <td style="text-align: center;">
            <span onclick="DisplayPopUp('result-student')"   class="btn normal"><i class="fa-regular fa-eye"></i></span>

            
            <span onclick="DisplayPopUp('edit-student')" class="btn access"><i class="fa-solid fa-pen"></i></span>
            <span onclick="removeStudent(this)" class="btn remove"><i class="fa-solid fa-xmark"></i></span>

            </td>
             



            
           

        `;

        tableBody.appendChild(row);
    });
}
const searchInput = document.querySelector('.search')
const searchFrom = document.querySelector('#search-form')
function searchExamsByName(examData, searchTerm) {
    searchTerm = searchTerm.toLowerCase(); // Chuyển đổi searchTerm về chữ thường để tìm kiếm không phân biệt chữ hoa chữ thường
    return examData.filter(exam => exam.TenSinhVien.toLowerCase().includes(searchTerm));
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

searchFrom.addEventListener('submit', function (event) {
    event.preventDefault()
    if (event.key === 'Enter') {
        // Gọi hàm xử lý tìm kiếm khi nhấn Enter

    }
    handleSearch()
});
renderData(examData);

function closePopUp(name) {
    const cls = document.querySelector('.' + name)
    cls.classList.remove('show')
}

function DisplayPopUp(name) {
    const cls = document.querySelector('.' + name)
    cls.classList.add('show')
    console.log(1);
}
function removeStudent(e) {
    console.log(e);
    const parent = e.parentNode.parentNode.style.display = 'none';
    console.log(parent);
}

function exportToPDF() {
    const element = document.getElementById("pdf");
    console.log(element);
    const options = {
        margin: 10,
        filename: 'exported-document.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf(element, options);
}