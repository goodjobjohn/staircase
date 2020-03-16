import { saveState } from './functions/save-state';
import Sortable from 'sortablejs';
import { v4 as uuidv4 } from 'uuid';
console.log(uuidv4());

// STAIRCASE VARIABLES
// list storage
let listData = JSON.parse(localStorage.getItem('listData')) || [];
// let appState = localStorage.getItem('appState') || [];
var newList;

// elements and buttons
const listContainer = document.querySelector('.list-container');
const addListButton = document.querySelector('[name=add-list]');

export { listData, listContainer };

const newItemHTML = `<li class="item">
                        <div class="item__text" contenteditable="true"></div>
                        <div class="item__note" contenteditable="true"></div>
                        <div class="absolute-top-left justify-end">
                          <div class="item__check"></div>
                          <div class="item__delete"></div>
                        </div>
                        <div class="absolute-top-left justify-start">
                          <div class="item__handle"></div>
                        </div>
                      </li>`;

const addItem = `<input type="text" class="list__add-item" placeholder="+">`;

// STAIRCASE - FUNCTIONS
// map listData and inside the map function loop through the lists.items array built the html
function loadStaircase() {
  var saved = localStorage.getItem('appState');

  if (saved) {
    listContainer.innerHTML = saved;
  }
}

function addNewList(e) {
  const listID = uuidv4();
  const listHTML = `<div id="list" class="list">
                    <div class="list__title" contenteditable="true" data-text="+ Add title"></div>
                    <div class="list__delete close"></div>
                    <ul id="${listID}"></ul>
                    <button class="list__add-item" placeholder="+">+</button>
                  </div>                  
                    `;

  // insert html into page
  listContainer.insertAdjacentHTML('beforeend', listHTML);

  // create new sortable object
  new Sortable(listID, {
    handle: '.item__handle',
    group: 'shared', // set both lists to same group
    animation: 150,
    draggable: '.item',
    ghostClass: 'item__ghost'
  });

  let lastListInNode = listContainer.lastElementChild;
  // move cursor to title of new list
  lastListInNode.firstElementChild.focus();

  newList = { title: 'blank', items: [] };
  // add new list to storage
  listData.push(newList);
}

function listClick(e) {
  // a click anywhere inside .lists triggers this function
  // here we identify the click event target and call the correct function

  if (e.target.closest('.list')) {
    const thisListNode = e.target.closest('.list');
    const thisListIndex = Array.from(
      thisListNode.parentElement.children
    ).indexOf(thisListNode); // find which list triggered the event

    // LIST :: DELETE
    if (e.target.matches('.list__delete')) {
      // remove list from listData
      listData.splice([thisListIndex], 1);
      // remove list node from page
      e.target.parentNode.remove();
    }

    // ITEM :: CHECK
    if (e.target.matches('.item__check')) {
      // toggle class 'checked' on item
      e.target.closest('.item').classList.toggle('checked');
    }

    // ITEM :: DELETE
    if (e.target.matches('.item__delete')) {
      // remove the item element from the node tree
      e.target.closest('.item').remove();
    }

    // LIST :: ADD ITEM
    if (e.target.matches('.list__add-item')) {
      // add new item to bottom of list <ul>
      e.target.previousSibling.previousSibling.insertAdjacentHTML(
        'beforeend',
        newItemHTML
      );
    }
    saveState();
  }
}

// STAIRCASE - EVENT LISTENERS
addListButton.addEventListener('click', addNewList);
listContainer.addEventListener('click', listClick);
// listContainer.addEventListener('focusout', focusOutEvent);

loadStaircase();

// Sortable (Drag n Drop)
var el = document.getElementById('thelist');
// var sortable = Sortable.create(el);

// List with handlen
// Sortable.create(list, {
//   animation: 150
// });

new Sortable(thelist, {
  handle: '.item__handle',
  // group: 'shared', // set both lists to same group
  animation: 150,
  draggable: '.item',
  ghostClass: 'item__ghost'
});
