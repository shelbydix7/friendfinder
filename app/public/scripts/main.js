const myModal = document.getElementById('mySimpleModal');

const myCloseBtn = document.getElementsByClassName('myCloseBtn')[0];
myCloseBtn.addEventListener('click', closeModal);
function closeModal() {
  myModal.style.display = 'none';
}
function closeModal() {
  myModal.style.display = 'none';
  window.location.href = '/survey';
}
window.addEventListener('click', clickOutside);

function clickOutside(e) {
  if (e.target === myModal) {
    myModal.style.display = 'none';
    window.location.href = '/survey';
  }
}