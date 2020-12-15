(function(){/* Блок изображения*/
const dropArea = document.querySelector('.drop-area'),
	view = document.querySelector('.view');

dropArea.querySelector('input[type="file"]').onchange = function () {
	handleFiles(this.files);
};

dropArea.ondragover = ev => ev.preventDefault();
dropArea.ondrop = ev => {
	ev.preventDefault();
	handleFiles(ev.dataTransfer.files);
}

function handleFiles(files) {
	if (!files.length) return;
	if (!files[0].type.startsWith('image/')) return alert('Нужно изображение');
	addImg(files[0]);
}

function addImg(img) {
	const freeImg = [...document.querySelectorAll('.img img')].find(el => !el.src);
	if (!freeImg) return alert('Больше 5 изображений добавлять нельзя');

	view.classList.add('show');
	const url = URL.createObjectURL(img);
	freeImg.src = url;
	freeImg.parentElement.querySelector('[type="file"]').files = createFileList(img);
	freeImg.onload = () => URL.revokeObjectURL(url);
}

document.body.addEventListener('click', (ev) => {
	if (ev.target.closest('.tools')) return;
	document.querySelectorAll('.dropdown').forEach(el => el.classList.remove('show'));
});

document.querySelectorAll('.img').forEach(el => {
	el.onclick = (ev) => {
		if (ev.target.classList.contains('tools')) {
			el.querySelector('.dropdown').classList.add('show')
		} else if (ev.target.classList.contains('del')) {
			el.querySelector('[type="file"]').value = null;
			el.querySelector('img').replaceWith(document.createElement('img'));
			if ([...document.querySelectorAll('.img img')].every(el => !el.src))
				view.classList.remove('show');
		}
	}
});

function createFileList(...files) {
  const dataTransfer = new DataTransfer();
  files.forEach(file => dataTransfer.items.add(file));
  return dataTransfer.files;
}
})();