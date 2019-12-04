function sendCommand(){  
  
  var serverIp = window.location.hostname;
  var serverPort = '5600'

  fetch('http://' + serverIp + ':' + serverPort + '/sendcommand', {method: 'POST'} )
    .then(function(response) { 
      response.json().then(function(data){
        console.log(data);
      })
 
      if(response.ok) {
        showAlert('success-alert');
      } else {
        showAlert('error-alert')
      }
    })
    .catch(function(error) { 
        showAlert('error-alert');
        console.log(error);
    });
}

function showAlert(alertID){
  $("#" + alertID).fadeTo(2000, 500).slideUp(500, function(){
    $("#" + alertID).slideUp(500);
  }); 
}
