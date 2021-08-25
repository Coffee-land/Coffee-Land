'use strict'; 
 
function openForm() {
 
  document.getElementById("myForm").style.display = "block";
}
 
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
closeForm();

function success(){
  let boxEl = document.getElementById('box');

  let successAlerEl = document.createElement('div');
  successAlerEl.className = 'success alert';
  boxEl.appendChild(successAlerEl);

  let alertBodyEl = document.createElement('div');
  alertBodyEl.className = 'alert-body';
  alertBodyEl.textContent = 'Success';
  successAlerEl.appendChild(alertBodyEl);
  closeForm();
  setInterval(function(){boxEl.innerHTML=''},3000);
}

