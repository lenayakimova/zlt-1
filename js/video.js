(function(){/*Блок с видео*/

const dropArea2 = document.querySelector('.drop-area-2'),
	view2 = document.querySelector('.view-2');

dropArea2.querySelector('input[type="file"]').onchange = function () {
	handleFiles(this.files);
};

dropArea2.ondragover = ev => ev.preventDefault();
dropArea2.ondrop = ev => {
	ev.preventDefault();
	handleFiles(ev.dataTransfer.files);
}

function handleFiles(files) {
	if (!files.length) return;
	if (!files[0].type.startsWith('video/')) return alert('Нужно видео');
	addVideo(files[0]);
}

function addVideo(video) {
	const freeVideo = [...document.querySelectorAll('.video video')].find(el => !el.src);
	if (!freeVideo) return alert('Больше 2 видео добавлять нельзя');

	view2.classList.add('show-2');
	const url = URL.createObjectURL(video);
	freeVideo.src = url;
	freeVideo.parentElement.querySelector('[type="file"]').files = createFileList(video);
	freeVideo.onload = () => URL.revokeObjectURL(url);
}

document.body.addEventListener('click', (ev) => {
	if (ev.target.closest('.tools-2')) return;
	document.querySelectorAll('.dropdown-2').forEach(el => el.classList.remove('show-2'));
});

document.querySelectorAll('.video').forEach(el => {
	el.onclick = (ev) => {
		if (ev.target.classList.contains('tools-2')) {
			el.querySelector('.dropdown-2').classList.add('show-2')
		} else if (ev.target.classList.contains('del-2')) {
			el.querySelector('video').replaceWith(document.createElement('video'));
			if ([...document.querySelectorAll('.video video')].every(el => !el.src))
				view2.classList.remove('show-2');
		}
	}
});

function createFileList(...files) {
	const dataTransfer = new DataTransfer();
	files.forEach(file => dataTransfer.items.add(file));
	return dataTransfer.files;
}
})();