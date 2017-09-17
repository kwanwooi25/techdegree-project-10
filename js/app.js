/*===========================================================

===========================================================*/

// Variables
let employeesArray = [];
const employeeList = document.getElementById('employeeList');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal__close');

// Get data from Random User Generator API
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us,gb,au',
  dataType: 'json',
  success: (data) => {
    employeesArray = data.results;
    updateEmployeeList(employeesArray);
  }
});

function updateEmployeeList(data) {
  let html = '';

  for (let i = 0; i < employeesArray.length; i++) {
    let thumbnail = employeesArray[i].picture.medium;
    let name = capitalize(employeesArray[i].name.first +
                          ' ' +
                          employeesArray[i].name.last);
    let email = employeesArray[i].email;
    let city = capitalize(employeesArray[i].location.city);

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

  employeeList.innerHTML = html;
}

// hide modal on modal close button click
function hideModal() {
  modal.style.display = 'none';
}

employeeList.addEventListener('click', (e) => {
  let index = getIndex(e.target.parentNode.parentNode);
  let html = '';

  let image = employeesArray[index].picture.large;
  let name = capitalize(employeesArray[index].name.first +
                        ' ' +
                        employeesArray[index].name.last);
  let email = employeesArray[index].email;
  let city = capitalize(employeesArray[index].location.city);
  let phone = employeesArray[index].phone;
  let address = capitalize(employeesArray[index].location.street) +
                ', ' +
                capitalize(employeesArray[index].location.state) +
                ' ' +
                employeesArray[index].location.postcode;
  let birthday = employeesArray[index].dob.substring(8, 10) +
                '/' +
                employeesArray[index].dob.substring(5, 7) +
                '/' +
                employeesArray[index].dob.substring(0, 4);
  let statePrev = "";
  let stateNext = "";

  if(index === 0) {
    statePrev = "disabled";
  }

  if(index === employeesArray.length - 1) {
    stateNext = "disabled";
  }
  
  html = `
    <div class="modal__container">
      <div class="modal__closeContainer">
        <span id="modal__close" class="modal__close" onclick="hideModal();">&times;</span>
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
})
