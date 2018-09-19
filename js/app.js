/*=============================================================
 Variables
=============================================================*/
var employeesArrayAll = [];
var employeesArrayFiltered = [];
var currentIndex;
var employeeList = document.getElementById('employeeList');
var modal = document.getElementById('modal');
var btnAddEmployee = document.getElementById('btn__addEmployee');
var btnRemoveEmployee = document.getElementById('btn__removeEmployee');
var inputSearchEmployee = document.getElementById('input__searchEmployee');
var messageWrapper = document.getElementById('messageWrapper');

/*=============================================================
 Get data from Random User Generator API
=============================================================*/
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us',
  dataType: 'json',
  success: (data) => {
    employeesArrayAll = data.results;
    employeesArrayFiltered = data.results;
    updateEmployeeList('');
  }
});

/*=============================================================
 Function to filter employees list
=============================================================*/
function updateEmployeeList(searchValue) {

  // reset filtered array and html
  employeesArrayFiltered = [];
  employeeList.innerHTML = '';

  for (var i = 0; i < employeesArrayAll.length; i++) {
    var name = employeesArrayAll[i].name.first +
              ' ' +
              employeesArrayAll[i].name.last;
    if (name.includes(searchValue)) {
      employeesArrayFiltered.push(employeesArrayAll[i]);
    }
  }

  displayEmployeeList(employeesArrayFiltered);
}

/*=============================================================
 Function to set the html for employees list
=============================================================*/
function displayEmployeeList(employees) {
  var html = '';
  if (employees.length === 0) {
    html = `
      <p class="employeeList__noResult">
        Cannot find any employee!
      </p>
    `;
  } else {
    for (var i = 0; i < employees.length; i++) {
      var thumbnail = employees[i].picture.medium;
      var name = capitalize(employees[i].name.first +
                            ' ' +
                            employees[i].name.last);
      var email = employees[i].email;
      var city = capitalize(employees[i].location.city);

      html += `
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
  }
  employeeList.innerHTML = html;
}

/*=============================================================
 Function to hide modal
=============================================================*/
function hideModal() {
  modal.style.display = 'none';
}

/*=============================================================
 Function to display modal
 1. when 'more info' button clicked
 2. when 'prev' or 'next' button clicked
=============================================================*/
function showModal(index) {
  var employee = employeesArrayFiltered[index];
  var html = '';

  var image = employee.picture.large;
  var name = capitalize(employee.name.first +
                        ' ' +
                        employee.name.last);
  var email = employee.email;
  var city = capitalize(employee.location.city);
  var phone = employee.phone;
  var address = capitalize(employee.location.street) +
                ', ' +
                capitalize(employee.location.state) +
                ' ' +
                employee.location.postcode;
  var birthday = employee.dob.date.substring(8, 10) +
                '/' +
                employee.dob.date.substring(5, 7) +
                '/' +
                employee.dob.date.substring(0, 4);
  var statePrev = "";
  var stateNext = "";

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

/*=============================================================
 Function to show message
=============================================================*/
function showMessage(text) {
  var html = `
    <p class="header__message">${text}</p>
  `;
  messageWrapper.innerHTML = html;
  messageWrapper.classList.add('show');
  setTimeout(hideMessage, 3000);
}

/*=============================================================
 Function to hide message
=============================================================*/
function hideMessage() {
  messageWrapper.classList.remove('show');
}

/*=============================================================
 Click handler for 'more info' button
 1. get the index of <li> clicked
 2. display modal with detailed information of the employee
=============================================================*/
employeeList.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {

    // function 'getIndex()' is defined in 'prototype.js'
    currentIndex = getIndex(e.target.parentNode.parentNode);
    showModal(currentIndex);
  }
})

/*=============================================================
 Click handler for modal
 1. when 'prev' or 'next' button clicked
 2. when 'close' button clicked
=============================================================*/
modal.addEventListener('click', (e) => {
  var clicked = e.target;

  // 'prev', 'next' button click event
  if (clicked.tagName === 'BUTTON') {
    if (clicked.classList.contains('prev')) currentIndex -= 1;
    if (clicked.classList.contains('next')) currentIndex += 1;
    showModal(currentIndex);
  }

  // hide modal on 'modal__close' button click
  if (clicked.id === 'modal__close') hideModal();
})

/*=============================================================
 update employee list as user types in to search for employees
=============================================================*/
inputSearchEmployee.addEventListener('keyup', (e) => {
  var searchValue = e.target.value.toLowerCase();
  updateEmployeeList(searchValue);
})

/*=============================================================
 Function to add another employee
=============================================================*/
btnAddEmployee.addEventListener('click', (e) => {
  $.ajax({
    url: 'https://randomuser.me/api/?results=1&nat=us',
    dataType: 'json',
    success: (data) => {
      employeesArrayAll.push(data.results[0]);
      employeesArrayFiltered.push(data.results[0]);
      displayEmployeeList(employeesArrayFiltered);

      var name = capitalize(data.results[0].name.first +
                            ' ' +
                            data.results[0].name.last);
      var text = 'New employee has been added! : ' + name;
      showMessage(text);
    }
  });
})

/*=============================================================
 Function to remove the last employee
=============================================================*/
btnRemoveEmployee.addEventListener('click', (e) => {
  var lastEmployee = employeesArrayAll[employeesArrayAll.length-1];
  var name = capitalize(lastEmployee.name.first +
                        ' ' +
                        lastEmployee.name.last);
  var text = 'Employee has been removed! : ' + name;
  employeesArrayAll.pop();
  employeesArrayFiltered.pop();
  displayEmployeeList(employeesArrayFiltered);
  showMessage(text);
})
