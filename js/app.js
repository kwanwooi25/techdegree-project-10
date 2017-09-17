// Variables
let employeesArray = [];
let employeesArrayFiltered = [];
let currentIndex;
const employeeList = document.getElementById('employeeList');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal__close');
const inputSearchEmployee = document.getElementById('input__searchEmployee');

// Get data from Random User Generator API
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us',
  dataType: 'json',
  success: (data) => {
    employeesArrayAll = data.results;
    employeesArrayFiltered = data.results;
    updateEmployeeList('');
    console.log(employeesArrayAll);
  }
});

function updateEmployeeList(searchValue) {
  let html = '';

  employeesArrayFiltered = [];
  employeeList.innerHTML = '';
  for (let i = 0; i < employeesArrayAll.length; i++) {
    let name = employeesArrayAll[i].name.first +
              ' ' +
              employeesArrayAll[i].name.last;
    if (name.includes(searchValue)) {
      html += appendLItoEmployeeList(employeesArrayAll[i]);
    }
  }

  if (employeesArrayFiltered.length === 0) {
    html = `
      <p class="employeeList__noResult">
        Cannot find any employee!
      </p>
    `;
  }

  employeeList.innerHTML = html;
}

function appendLItoEmployeeList(employee) {
  employeesArrayFiltered.push(employee);
  let thumbnail = employee.picture.medium;
  let name = capitalize(employee.name.first +
                        ' ' +
                        employee.name.last);
  let email = employee.email;
  let city = capitalize(employee.location.city);

  return `
    <li class="employeeList__item">
      <div class="employeeList__wrapperRow">
        <div class="employeeList__wrapperImage">
          <img class="image__employeeList" src="${thumbnail}" alt="${name}">
        </div>
        <div class="employeeList__wrapperText">
          <p class="employeeList__name">${name}</p>
          <p class="employeeList__email">${email}</p>
          <p class="employeeList__city">${city}</p>
        </div>
      </div>
      <div class="employeeList__wrapperRow">
        <button class="btn btn__employeeList">More Info</button>
      </div>
    </li>
  `;
}

// hide modal on modal close button click
function hideModal() {
  modal.style.display = 'none';
}

// show modal
/*=============================================================
 Show modal
 1. when 'more info' button clicked
 2. when 'prev' or 'next' button clicked
=============================================================*/
function showModal(index) {
  let employee = employeesArrayFiltered[index];
  let html = '';

  let image = employee.picture.large;
  let name = capitalize(employee.name.first +
                        ' ' +
                        employee.name.last);
  let email = employee.email;
  let city = capitalize(employee.location.city);
  let phone = employee.phone;
  let address = capitalize(employee.location.street) +
                ', ' +
                capitalize(employee.location.state) +
                ' ' +
                employee.location.postcode;
  let birthday = employee.dob.substring(8, 10) +
                '/' +
                employee.dob.substring(5, 7) +
                '/' +
                employee.dob.substring(0, 4);
  let statePrev = "";
  let stateNext = "";

  // disable 'prev' button for 1st employee
  if(index === 0) statePrev = "disabled";
  // disable 'next' button for last employee
  if(index === employeesArrayFiltered.length - 1) {
    stateNext = "disabled";
  }

  html = `
    <div class="modal__container">
      <div class="modal__closeContainer">
        <span id="modal__close" class="modal__close">&times;</span>
      </div>
      <div class="modal__imageContainer">
        <img class="modal__image" src="${image}" alt="${name}">
      </div>
      <div class="modal__textContainer">
        <p class="modal__text modal__name">${name}</p>
        <a class="modal__link modal__email" href="mailto:${email}">${email}</a>
        <p class="modal__text modal__city">${city}</p>
      </div>
      <div class="modal__textContainer">
        <a class="modal__link modal__phone" href="tel:${phone}">${phone}</a>
        <p class="modal__text modal__address">${address}</p>
        <p class="modal__text modal__birthday">Birthday: ${birthday}</p>
      </div>
      <div class="modal__buttonContainer">
        <button class="btn__modal prev" ${statePrev}>PREV</button>
        <button class="btn__modal next" ${stateNext}>NEXT</button>
      </div>
    </div>
  `;

  modal.innerHTML = html;
  modal.style.display = 'block';
}

// on 'more infor' button clicked
employeeList.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    currentIndex = getIndex(e.target.parentNode.parentNode);
    showModal(currentIndex);
  }
})

modal.addEventListener('click', (e) => {
  let clicked = e.target;

  // 'prev', 'next' button click event
  if (clicked.tagName === 'BUTTON') {
    if (clicked.classList.contains('prev')) currentIndex -= 1;
    if (clicked.classList.contains('next')) currentIndex += 1;
    showModal(currentIndex);
  }

  // hide modal on 'modal__close' button click
  if (clicked.id === 'modal__close') hideModal();
})

inputSearchEmployee.addEventListener('keyup', (e) => {
  let searchValue = e.target.value.toLowerCase();
  updateEmployeeList(searchValue);
})
