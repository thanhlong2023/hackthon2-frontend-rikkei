let listJobs = [{
    id: 1,
    nameJob: "Lau nhà",
    deadLine: "2025-04-24",
    personInCharge: "Mr luận",
    status: "Đang tiến hành"
},
{
    id: 2,
    nameJob: "Quét nhà",
    deadLine: "2025-04-24",
    personInCharge: "Mr luận",
    status: "Đang tiến hành"
}, {
    id: 3,
    nameJob: "Tắm",
    deadLine: "2025-04-24",
    personInCharge: "Mr luận",
    status: "Đang tiến hành"
}];
//render list jobs

function renderListJobs(jobs = listJobs) {
    let html = "";
    for (let i = 0; i < jobs.length; i++) {
        html += `<tr>
        <td>${jobs[i].nameJob}</td>
        <td>${jobs[i].deadLine}</td>
        <td>${jobs[i].personInCharge}</td>
        <td>${jobs[i].status}</td>
        <td>
          <button type="button" class="btn btn-success" onclick="editJob(${jobs[i].id})">Sửa</button>
          <button type="button" class="btn btn-danger" onclick="deleteJob(${jobs[i].id})">Xóa</button>
        </td>
      </tr>`;
    }
    document.getElementById("tableBody").innerHTML = html;
}

renderListJobs();
//add job
function addJob(e) {
    e.preventDefault();
    let isValid = true;

    // Validate Tên công việc
    const nameJob = document.getElementById('nameJob');
    const errorName = document.querySelector('.errorName');
    if (nameJob.value.trim() === '') {
        errorName.style.display = 'block';
        isValid = false;
    } else {
        errorName.style.display = 'none';
    }

    // Validate Hạn chót
    const deadLine = document.getElementById('deadLine');
    const errorDate = document.querySelector('.errorDate');
    if (deadLine.value === '') {
        errorDate.style.display = 'block';
        isValid = false;
    } else {
        errorDate.style.display = 'none';
    }

    // Validate Người phụ trách
    const personInCharge = document.getElementById('personInCharge');
    const errorPerson = document.querySelector('.errorPerson');
    if (personInCharge.value.trim() === '') {
        errorPerson.style.display = 'block';
        isValid = false;
    } else {
        errorPerson.style.display = 'none';
    }

    // Validate Trạng thái
    const status = document.getElementById('status');
    const errorStatus = document.querySelector('.errorStatus');
    if (status.value === '') {
        errorStatus.style.display = 'block';
        isValid = false;
    } else {
        errorStatus.style.display = 'none';
    }

    // Nếu tất cả hợp lệ, thực hiện hành động tiếp theo

    if (isValid) {
        let newJob = {
            id: listJobs.length + 1,
            nameJob: nameJob.value,
            deadLine: deadLine.value,
            personInCharge: personInCharge.value,
            status: status.value
        };
        listJobs.push(newJob);

        document.getElementById('nameJob').value = '';
        document.getElementById('deadLine').value = '';
        document.getElementById('personInCharge').value = '';
        document.getElementById('status').value = '';
        renderListJobs();
    }

}
document.getElementById('btnAdd').addEventListener('click', addJob);

function checkInput() {
    document.getElementById('nameJob').addEventListener('input', function () {
        document.querySelector('.errorName').style.display = 'none';
    });

    document.getElementById('deadLine').addEventListener('input', function () {
        document.querySelector('.errorDate').style.display = 'none';
    });

    document.getElementById('personInCharge').addEventListener('input', function () {
        document.querySelector('.errorPerson').style.display = 'none';
    });

    document.getElementById('status').addEventListener('change', function () {
        document.querySelector('.errorStatus').style.display = 'none';
    });

    // Thêm sự kiện 'blur' để hiển thị lỗi khi người dùng rời khỏi trường mà chưa nhập dữ liệu
    document.getElementById('nameJob').addEventListener('blur', function () {
        const errorName = document.querySelector('.errorName');
        if (this.value.trim() === '') {
            errorName.style.display = 'block';
        } else {
            errorName.style.display = 'none';
        }
    });

    document.getElementById('deadLine').addEventListener('blur', function () {
        const errorDate = document.querySelector('.errorDate');
        if (this.value === '') {
            errorDate.style.display = 'block';
        } else {
            errorDate.style.display = 'none';
        }
    });

    document.getElementById('personInCharge').addEventListener('blur', function () {
        const errorPerson = document.querySelector('.errorPerson');
        if (this.value.trim() === '') {
            errorPerson.style.display = 'block';
        } else {
            errorPerson.style.display = 'none';
        }
    });

    document.getElementById('status').addEventListener('blur', function () {
        const errorStatus = document.querySelector('.errorStatus');
        if (this.value === '') {
            errorStatus.style.display = 'block';
        } else {
            errorStatus.style.display = 'none';
        }
    });
}
checkInput();
let idUpdateCurrent = null;
//click edit
function editJob(id) {
    // alert("id:" + id);
    document.getElementById('btnAdd').style.display = 'none';
    document.getElementById('btnUpdate').style.display = 'block';

    //validate input
    const nameJob = document.getElementById('nameJob');
    const deadLine = document.getElementById('deadLine');
    const personInCharge = document.getElementById('personInCharge');
    const status = document.getElementById('status');



    // Gắn idUpdateCurrent toàn cục
    idUpdateCurrent = id;

    // Tìm công việc trong listJobs có id tương ứng
    const jobToEdit = listJobs.find(job => job.id === id);

    if (jobToEdit) {
        //fill dữ liệu vào input
        document.getElementById('nameJob').value = jobToEdit.nameJob;
        document.getElementById('deadLine').value = jobToEdit.deadLine;
        document.getElementById('personInCharge').value = jobToEdit.personInCharge;
        document.getElementById('status').value = jobToEdit.status;

        //input có value thì ẩn span error bằng none
        nameJob.value !== '' ? document.querySelector('.errorName').style.display = 'none' : document.querySelector('.errorName').style.display = 'block';
        deadLine.value !== '' ? document.querySelector('.errorDate').style.display = 'none' : document.querySelector('.errorDate').style.display = 'block';
        personInCharge.value !== '' ? document.querySelector('.errorPerson').style.display = 'none' : document.querySelector('.errorPerson').style.display = 'block';
        status.value !== '' ? document.querySelector('.errorStatus').style.display = 'none' : document.querySelector('.errorStatus').style.display = 'block';
        checkInput();
    }
}

//update job
function updateJob(e) {
    e.preventDefault();

    let isValid = true;

    // Validate Tên công việc
    const nameJob = document.getElementById('nameJob');
    const errorName = document.querySelector('.errorName');
    if (nameJob.value.trim() === '') {
        errorName.style.display = 'block';
        isValid = false;
    } else {
        errorName.style.display = 'none';
    }

    // Validate Hạn chót
    const deadLine = document.getElementById('deadLine');
    const errorDate = document.querySelector('.errorDate');
    if (deadLine.value === '') {
        errorDate.style.display = 'block';
        isValid = false;
    } else {
        errorDate.style.display = 'none';
    }

    // Validate Người phụ trách
    const personInCharge = document.getElementById('personInCharge');
    const errorPerson = document.querySelector('.errorPerson');
    if (personInCharge.value.trim() === '') {
        errorPerson.style.display = 'block';
        isValid = false;
    } else {
        errorPerson.style.display = 'none';
    }

    // Validate Trạng thái
    const status = document.getElementById('status');
    const errorStatus = document.querySelector('.errorStatus');
    if (status.value === '') {
        errorStatus.style.display = 'block';
        isValid = false;
    } else {
        errorStatus.style.display = 'none';
    }

    if (isValid) {
        listJobs = listJobs.map(job => {
            if (job.id === idUpdateCurrent) {
                return {
                    id: idUpdateCurrent,
                    nameJob: nameJob.value,
                    deadLine: deadLine.value,
                    personInCharge: personInCharge.value,
                    status: status.value
                };
            }
            return job;
        });

        document.getElementById('btnAdd').style.display = 'block';
        document.getElementById('btnUpdate').style.display = 'none';

        document.getElementById('nameJob').value = '';
        document.getElementById('deadLine').value = '';
        document.getElementById('personInCharge').value = '';
        document.getElementById('status').value = '';

        renderListJobs();
    }
}


//delete job
function deleteJob(id) {
    const confirmDelete = confirm("Bạn có muốn xóa công việc này không?");
    if (confirmDelete) {
        listJobs = listJobs.filter(job => job.id !== id);
        renderListJobs();
    }
}
//search job
function searchJob() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredJobs = listJobs.filter(job => job.nameJob.toLowerCase().includes(searchInput));
    renderListJobs(filteredJobs);
}
document.getElementById('searchInput').addEventListener('input', searchJob);