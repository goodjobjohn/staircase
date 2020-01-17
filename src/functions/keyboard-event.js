//
// KEYDOWN EVENT on .lists element
//
// refer to keys by the KeyboardEvent.key value
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values

// EVENT
listContainer.addEventListener('keydown', listContainerKeyDownEvent);

//IMPORT
import { listData, listContainer } from '../app.js';
import { getCaretPosition } from '../functions/caret-position.js';

// ELEMENT SWITCH
function listContainerKeyDownEvent(e) {
  const thisListNode = e.target.closest('.list');
  let thisListIndex = Array.from(thisListNode.parentElement.children).indexOf(
    thisListNode
  );
  const target = e.target;
  const element = target.className;
  console.log(element);

  switch (element) {
    case 'list__title':
      titleKeyboardEvent(e, thisListNode, thisListIndex);
      break;
    case 'list__add-item':
      addItemKeyboardEvent(e, thisListNode, thisListIndex);
      break;
    case 'item__text':
    case 'item__text indent':
      itemTextKeyboardEvent(e, thisListNode, thisListIndex);
      break;
  }
}

// TITLE
function titleKeyboardEvent(e, thisListNode, thisListIndex) {
  if (event.key === 'Enter') {
    event.preventDefault();
    // retrieve value from title element
    const title = e.target.innerText;
    // retrieve current stored value
    const currentTitle = listData[thisListIndex].title;
    // throw warning if input is empty
    if (title === '') {
      alert('The list requires a name');
      return;
    }
    // check to see if title value exists and prevent adding more than one input
    if (currentTitle === 'blank') {
      // add input 'add-item' to page
      e.target.parentElement.insertAdjacentHTML('beforeend', addItem);
    }
    // focus on the new input
    e.target.parentElement.lastElementChild.focus();
    // store new title value
    listData[thisListIndex].title = title;
  }
}

// NEW ITEM
function addItemKeyboardEvent(e, thisListNode, thisListIndex) {
  if (event.key === 'Enter') {
    event.preventDefault();
    // grab value from input
    const itemText = e.target.value;
    // decalare item values
    const newItem = {
      itemText,
      check: false
    };
    // push item to list
    listData[thisListIndex].items.push(newItem);
    // html to insert into list
    const itemHtml = `<li class="item">
                          <div class="item__text" contenteditable="true" data-text="Enter text here">${itemText}</div>
                          <div class="item__check" contenteditable="false"></div>
                          <div class="item__delete" contenteditable="false"></div>
                          <div class="item__handle" contenteditable="false"></div>
                          </li>`;
    // insert html
    let unorderedList = thisListNode.querySelector('ul');
    unorderedList.insertAdjacentHTML('beforeend', itemHtml);
    // clear the input
    e.target.value = '';
  }
}

// EXISTING ITEM
function itemTextKeyboardEvent(e, thisListNode, thisListIndex) {
  /** Enter */
  if (event.key === 'Enter') {
    event.preventDefault();
    // grab value from input
    const itemText = e.target.innerHTML;
    // find index of item
    const itemArray = Array.from(thisListNode.querySelector('ul').children);
    // index of item
    // needs -1 to account for title element in the nodelist
    const itemIndex = itemArray.indexOf(e.target.parentElement);
    // save item
    listData[thisListIndex].items[itemIndex].itemText = itemText;
    // insert new item below current item
    const itemHtml = `<li class="item">
                          <div class="item__text" contenteditable="true" data-text="Enter text here"></div>
                          <div class="item__check" contenteditable="false"></div>
                          <div class="item__delete" contenteditable="false"></div>
                          <div class="item__handle" contenteditable="false"></div>
                          </li>`;
    e.target.parentElement.insertAdjacentHTML('afterend', itemHtml);
    // move cursor to new item
    e.target.parentElement.nextSibling.firstElementChild.focus();

    // store item locally
    localStorage.setItem('listData', JSON.stringify(listData));
  }

  /** ArrowDown */
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    if (e.target.parentNode.nextSibling != null) {
      e.target.parentNode.nextSibling.firstElementChild.focus();
    }
  }

  /** ArrowUp */
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (e.target.parentNode.previousSibling != null) {
      e.target.parentNode.previousSibling.firstElementChild.focus();
    }
  }

  /** Backspace */
  const itemText = e.target;
  const item = e.target.parentElement;
  if (event.key === 'Backspace') {
    // is event on list item?
    if (item.classList.contains('item')) {
      // move focus to item above
      console.log(item.previousSibling);

      // find caret position
      const caret = getCaretPosition(itemText);
      // if caret is at index[0] remove this item
      console.log(caret);
      if (caret === 0) {
        // move caret (cursor) to previous item
        item.previousSibling.firstElementChild.focus();
        item.remove();
      }
    }
  }

  /** Tab */
  if (event.key === 'Tab') {
    event.preventDefault();
    e.target.classList.add('indent');
  }

  /** Shift+Enter */
  if (e.shiftKey && e.code === 'Enter') {
    // Add note to item
  }
}
