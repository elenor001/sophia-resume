const openBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');

openBtn.addEventListener('click', () => {
	modal.classList.add('open');
	alert("open");
});

closeBtn.addEventListener('click', () => {
	modal.classList.remove('open');
	alert("close");
});