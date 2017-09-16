
// Get data from Random User Generator API
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us,gb,au',
  dataType: 'json',
  success: function(data) {
    console.log(data.results);
  }
});
