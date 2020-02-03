// STAIRCASE VARIABLES
// list storage
let listData = JSON.parse(localStorage.getItem('listData')) || [];
var newList;

// elements and buttons
const listContainer = document.querySelector('.list-container');
const addListButton = document.querySelector('[name=add-list]');

export { listData, listContainer };

// html to be inserted
// changed h2 to div - <h2 class="title" contenteditable="true" data-text="+ Add title"></h2>
const listHTML = `<div id="list" class="list">
                      <div class="list__title" contenteditable="true" data-text="+ Add title"></div>
                      <div class="list__delete close"></div>
                      <ul></ul>
                    </div>`;

const newItemHTML = `<li class="item">
                        <div class="item__text" contenteditable="true"></div>
                        <div class="item__note" contenteditable="true></div>
                        <div class="item__check"></div>
                        <div class="item__delete"></div>
                        <div class="item__handle"></div>
                      </li>`;

const addItem = `<input type="text" class="list__add-item" placeholder="+">`;

// STAIRCASE - FUNCTIONS
// map listData and inside the map function loop through the lists.items array built the html
function loadStaircase(listData, listContainer) {
  function renderItems(items) {
    // create an array to push items into.
    let listString = [];
    // loop through items
    for (let i = 0; i < items.length; i++) {
      // check if item is checked
      let checked = '';
      if (items[i].check === true) {
        checked = 'checked';
      }
      const item = `<li class="item ${checked}">
                        <div class="item__text" contenteditable="true">${items[i].itemText}</div>
                        <div class="item__note" contenteditable="true"></div>
                        <div class="item__check"></div>
                        <div class="item__delete"></div>
                        <div class="item__handle"></div>
                      </li>`;
      // push item into list of items
      listString.push(item);
      // reset
      checked = '';
    }
    return listString.join('');

    // return `${items.map(item => `<li class="item" contenteditable="true">${item.itemText}
    //                               <div class="item-check">C</div>
    //                               <div class="item-delete">X</div>
    //                             </li>`).join('')}`
  }

  const markup = listData
    .map(list => {
      return `<div id="list" class="list">
                <div class="list__title" contenteditable="true" data-text="+ Add title">${
                  list.title
                }</div>
                <div class="list__delete close"></div>
                <ul>${renderItems(list.items)}</ul>
                <input type="text" class="list__add-item" placeholder="+">
              </div>`;
    })
    .join('');

  // render html
  listContainer.innerHTML = markup;
  // console.log(markup);
}

function addNewList(e) {
  // insert html into page
  listContainer.insertAdjacentHTML('beforeend', listHTML);

  let lastListInNode = listContainer.lastElementChild;
  // move cursor to title of new list
  lastListInNode.querySelector('.list__title').focus();

  newList = { title: 'blank', items: [] };
  // add new list to storage
  listData.push(newList);
}

// not being used
function focusOutEvent(e) {
  // which node in this event
  // this = .lists element
  // console.log(listContainer); // equals the the element losing focus

  // TITLE :: UNFOCUS
  if (e.target.matches('.list__title')) {
    // get title value
    let title = e.target.innerHTML;
    // get index of list in lists
    let el = e.target.parentElement; // .list
    let index = Array.from(el.parentElement.children).indexOf(el); // index of list event belongs too
    // storageObject[index].splice(index,1,title);
    console.log('index:', index, 'text:', title, 'el:', this);
  }

  // ITEM :: UNFOCUS

  if (e.target.matches('.item__text')) {
    // get text value of item
    let itemText = e.target.innerHTML;
    // get index of item in list
    let el = e.target.parentElement.parentElement; // .list
    let index = Array.from(el.children).indexOf('li.item'); // index of item in list

    console.log(index, itemText, el.children, 'el:', el);
  }
}

function listClick(e) {
  // a click anywhere inside .lists triggers this function
  // here we identify the click event target and call the correct function

  if (e.target.closest('.list')) {
    const thisListNode = e.target.closest('.list');
    const thisListIndex = Array.from(
      thisListNode.parentElement.children
    ).indexOf(thisListNode);

    // LIST :: DELETE
    if (e.target.matches('.list__delete')) {
      // remove list from listData
      listData.splice([thisListIndex], 1);
      // remove list node from page
      e.target.parentNode.remove();
    }

    // ITEM :: CHECK/DELETE
    if (e.target.parentElement.matches('.item')) {
      const listOfElements = thisListNode.querySelector('ul').children;
      const itemArray = Array.from(listOfElements);
      const itemIndex = itemArray.indexOf(e.target.parentElement);

      if (e.target.matches('.item__check')) {
        // toggle class 'checked' on item
        e.target.parentElement.classList.toggle('checked');
        // modify listData
        if (e.target.parentElement.classList.contains('checked')) {
          listData[thisListIndex].items[itemIndex].check = true;
        } else {
          listData[thisListIndex].items[itemIndex].check = false;
        }
      }
      if (e.target.matches('.item__delete')) {
        // remove item from listData
        listData[thisListIndex].items.splice([itemIndex], 1);
        // remove the item element from the node tree
        e.target.parentNode.remove();
      }
    }
    // update localStorage
    localStorage.setItem('listData', JSON.stringify(listData));
  }
}

// STAIRCASE - EVENT LISTENERS
addListButton.addEventListener('click', addNewList);
listContainer.addEventListener('click', listClick);
// listContainer.addEventListener('focusout', focusOutEvent);

loadStaircase(listData, listContainer);

// Sortable (Drag n Drop)
// var el = document.getElementById('list');
// var sortable = Sortable.create(el);

// List with handle
// Sortable.create(list, {
//   handle: '.glyphicon-move',
//   animation: 150
// });
