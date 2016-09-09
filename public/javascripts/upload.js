$('.view-chart').hide();
$('#myChart').hide();
$('.upload-btn').on('click', function (){
    $('#upload-input').click();
});

$('#upload-input').on('change', function(){

  var files = $(this).get(0).files;

  if (files.length > 0){
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();

    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
    }

    $.ajax({
      url: '/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
          console.log('upload successful!\n' + data);
          $('.view-chart').show();
          $('.upload-btn').hide();
      }
    });
  }
});
$('.view-chart').on('click', function(){
      $.ajax({
      url: '/chart',
      type: 'GET',
      processData: false,
      contentType: false,
      success: function(data){
        console.log(data);
        console.log(typeof(data));
        var ages = [];
        var names = [];
        for(var i=0; i< data.length; i++){
        ages.push(data[i]["age"]);
        names.push(data[i]["name"]);
        }
        $('#myChart').show();
        var ctx = document.getElementById("bar");
        var cty = document.getElementById("doughnut");
        var ctz = document.getElementById("pie");

        // bar graph
        var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ["Dog", "Cat", "Lion", "Zebra"] || names,
            datasets: [{
            label: 'Pet ages',
            data: [12, 13, 15, 4] || ages,
            backgroundColor: [
                'red',
                'blue',
                'orange',
                'indigo'


            ],
            borderColor: [
                'red',
                'blue',
                'orange',
                'indigo'
            ],
            borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
            }
          }
        });
        // doughnut
        var myChart = new Chart(cty, {
          type: 'doughnut',
          data: {
            labels: ["Dog", "Cat", "Lion", "Zebra"] || names,
            datasets: [{
            label: 'Pet ages',
            data: [12, 13, 15, 4] || ages,
            backgroundColor: [
                'red',
                'blue',
                'orange',
                'indigo'


            ],
            borderColor: [
                'red',
                'blue',
                'orange',
                'indigo'
            ],
            borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
            }
          }
        });
        // Pie chart
         var myChart = new Chart(ctz, {
          type: 'pie',
          data: {
            labels: ["Dog", "Cat", "Lion", "Zebra"] || names,
            datasets: [{
            label: 'Pet ages',
            data: [12, 13, 15, 4] || ages,
            backgroundColor: [
                'red',
                'blue',
                'orange',
                'indigo'


            ],
            borderColor: [
                'red',
                'blue',
                'orange',
                'indigo'
            ],
            borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
            }
          }
        });

      }
    });
});
