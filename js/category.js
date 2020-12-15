/* Блок добавить категорию*/
class SelectModal {
	constructor(modal) {
		this.modal = modal;
		this.cat = modal.querySelector('.cat');
		this.subcat = modal.querySelector('.subcat');
		this.info = modal.querySelector('.info');
		this.infoGroup = modal.querySelector('.info .group');
		this.infoSubGroup = modal.querySelector('.info .subgroup');
		this.clear = modal.querySelector('.clear');
		this.close = modal.querySelector('.close');
		this.save = modal.querySelector('.save');
		this.categories = [...modal.querySelectorAll('.categories option')].map(opt => opt.value);
		this.subcategories = Object.fromEntries([...modal.querySelectorAll('.subcategories select')]
			.map(sel => [
				sel.dataset.category,
				[...sel.querySelectorAll('option')].map(opt => opt.value)
			]));
		this.fillSelect(this.cat, this.categories);
		this._attachListeners();
	}
	onSave = () => {};
	onClose = () => {};

	show = () => {
		this.modal.classList.add('show');
	}

	hide = () => {
		this.modal.classList.remove('show');
		this.reset();
	}

	set(group, subgroup) {
		this._setGroup(group);
		this._setSubGroup(subgroup);
	}

	reset = () => {
		this.info.classList.remove('show');
		this.cat.value = null;
		this.subcat.innerHTML = '';
		this.save.disabled = true;
	}

	fillSelect(select, arr) {
		select.innerHTML = arr.map(el => `<option>${el}</option>`).join('');
	}

	_setGroup(group) {
		this.info.classList.add('show');
		this.cat.value = group;
		this.infoGroup.innerText = group;
		this.fillSelect(this.subcat, this.subcategories[group]);
		this.infoSubGroup.innerText = '';
	}
	_setSubGroup(subgroup) {
		this.subcat.value = subgroup;
		this.infoSubGroup.innerText = subgroup;
		this.save.disabled = false;
	}

	_attachListeners() {
		this.close.onclick = () => {
			this.hide();
			this.onClose();
		}
		this.clear.onclick = this.reset;

		this.cat.onchange = () => {
			this._setGroup(this.cat.value);
			this.save.disabled = true;
		}
		this.subcat.onchange = () => {
			this._setSubGroup(this.subcat.value);
		}
		this.save.onclick = () => {
			this.onSave(this.infoGroup.innerText, this.infoSubGroup.innerText);
			this.hide();
		}
	}
}

const addNew = document.querySelector('.add-new'),
	cats = document.querySelector('.cats');
const selectModal = new SelectModal(document.querySelector('.modal'));
// selectModal.show();

let editing;
selectModal.onClose = () => editing = null;
selectModal.onSave = (group, subgroup) => {
	if (editing) {
		[['.group', group], ['.subgroup', subgroup]].forEach(([sel, val]) =>
			editing.querySelector(sel).innerText = val);
		return editing = null;
	}

	cats.insertAdjacentHTML('afterBegin', `<div class="item">
		<span><span class="group">${group}</span>&nbsp;<span class="subgroup">${subgroup}</span></span>
		<button type="button" class="edit">Редактировать</button>
		<button type="button" class="del">Удалить</button>
	</div>`);
	addNew.innerText = 'Добавить дополнительную категорию (опционально)';
}

cats.onclick = (ev) => {
	if (ev.target.classList.contains('edit')) {
		editing = ev.target.parentElement;
		selectModal.set(...['.group', '.subgroup'].map(sel => editing.querySelector(sel).innerText));
		selectModal.show();
	} else if (ev.target.classList.contains('del')) {
		ev.target.parentElement.remove();
		if (cats.children.length < 2) addNew.innerText = 'Добавить категорию';
	}
}

addNew.onclick = () => selectModal.show();