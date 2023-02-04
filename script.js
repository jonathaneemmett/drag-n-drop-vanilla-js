const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

let items = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'];

const listItems = [];

let dragStartIndex;

createList();

// Insert scrambled list items into DOM
function createList() {
	[...items].forEach((item, index) => {
		const listItem = document.createElement('li');
		listItem.setAttribute('data-index', index);
		listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        ${item}
        </div>
    `;

		listItems.push(listItem);

		draggable_list.appendChild(listItem);
	});

	addEventListeners();
}

function dragStart(e) {
	dragStartIndex = +this.closest('li').getAttribute('data-index');
	this.closest('li').classList.add('selected');
}

function dragEnter() {
	this.classList.add('over');
}

function dragLeave() {
	this.classList.remove('over');
}

function dragOver(e) {
	e.preventDefault();
}

function dragDrop() {
	this.classList.remove('over');
	const dragEndIndex = +this.getAttribute('data-index');
	swapItems(dragStartIndex, dragEndIndex);
}

function swapItems(fromIndex, toIndex) {
	const copyList = [...items];
	const itemOne = copyList[fromIndex];
	copyList.splice(fromIndex, 1);
	copyList.splice(toIndex, 0, itemOne);

	draggable_list.innerHTML = '';
	items = [...copyList];
	createList();
}

function addEventListeners() {
	const draggables = document.querySelectorAll('.draggable');
	const dragListItems = document.querySelectorAll('.draggable-list li');

	draggables.forEach((draggable) => {
		draggable.addEventListener('dragstart', dragStart);
	});

	dragListItems.forEach((item) => {
		item.addEventListener('dragover', dragOver);
		item.addEventListener('drop', dragDrop);
		item.addEventListener('dragenter', dragEnter);
		item.addEventListener('dragleave', dragLeave);
	});
}
