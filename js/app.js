/*===========================================================

===========================================================*/

// Variables
var employeesArray = [];
const employeeList = document.getElementById('employeeList');

// Get data from Random User Generator API
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us,gb,au',
  dataType: 'json',
  success: addEmployees
});

function addEmployees(data) {
  employeesArray = data.results;
  var html = '';

  for (var i = 0; i < employeesArray.length; i++) {
    var thumbnail = employeesArray[i].picture.medium;
    var name = employeesArray[i].name.first.capitalize() +
              ' ' +
              employeesArray[i].name.last.capitalize();
    var email = employeesArray[i].email;
    var city = employeesArray[i].location.city.capitalize();

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
