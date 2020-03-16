//
// KEYDOWN EVENT on .lists element
//
// refer to keys by the KeyboardEvent.key value
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values

// EVENT
listContainer.addEventListener('keydown', KeyboardEvent);

//IMPORT
import { listData, listContainer } from '../app.js';
import { getCaretPosition } from '../functions/caret-position.js';
import { saveState } from '../functions/save-state';

/**
 * Acts as a filter directing the event.target to its
 * appropriate function on a keydown event.
 * @param {object} event.target
 */

function KeyboardEvent(e) {
  const thisListNode = e.target.closest('.list');
  let thisListIndex = Array.from(thisListNode.parentElement.children).indexOf(
    thisListNode
  );
  const target = e.target;
  const element = target.className;

  switch (element) {
    case 'list__title':
      titleKeyboardEvent(e, thisListNode, thisListIndex);
      break;
    case 'list__add-item':
      addItemKeyboardEvent(e, thisListNode, thisListIndex);
      break;
    // to test multiple cases you can use 'fall-through'
    // as done below, simply stack the cases.
    case 'item__text':
    case 'item__text indent':
      itemTextKeyboardEvent(e, thisListNode, thisListIndex);
      break;
    case 'item__note':
    case 'item__note noted':
      itemNote(e);
      break;
  }
}

// ELEMENT :: TITLE
function titleKeyboardEvent(e, thisListNode, thisListIndex) {
  if (event.key === 'Enter') {
    event.preventDefault();

    // retrieve title from element
    const title = e.target.innerText;

    // throw warning if input is empty
    if (title === '') {
      alert('The list requires a name');
      return;
    }

    let list = thisListNode.querySelector('ul');

    // do we have items in the list?
    if (list.children.length < 1) {
      // add an item
      const itemHTML = `<li class="item">
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

      list.insertAdjacentHTML('beforeend', itemHTML);
      list.firstElementChild.firstElementChild.focus();
    } else {
      // There are items, move cursor to first item.
      list.firstElementChild.firstElementChild.focus();
      console.log(list.firstElementChild.firstElementChild);
    }

    saveState();
  }

  if (event.key === 'ArrowDown') {
    thisListNode.querySelector('.item__text').focus();
  }
}

// ELEMENT :: ADD ITEM BUTTON
function addItemKeyboardEvent(e, thisListNode, thisListIndex) {
  if (event.key === 'Enter') {
    event.preventDefault();
    // grab value from input
    const itemText = e.target.value;
    // declare item values
    const newItem = {
      itemText,
      check: false
    };
    // push item to list
    listData[thisListIndex].items.push(newItem);
    // html to insert into list
    const itemHtml = `<li class="item">
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
    // insert html
    let unorderedList = thisListNode.querySelector('ul');
    unorderedList.insertAdjacentHTML('beforeend', itemHtml);
    // clear the input
    e.target.value = '';
  }
  saveState();
}

// ITEM
function itemTextKeyboardEvent(e, thisListNode, thisListIndex) {
  // Key 'Enter'
  if (event.key === 'Enter') {
    // Key 'Shift+Enter'
    if (e.shiftKey && e.code === 'Enter') {
      event.preventDefault();
      // move focus to note
      e.target.nextElementSibling.classList.add('noted');
      e.target.nextElementSibling.focus();
    } else {
      // Insert new item below current item
      event.preventDefault();
      console.log('ENTER');
      // grab value from input
      const itemText = e.target.innerHTML;
      // find index of item
      const itemArray = Array.from(thisListNode.querySelector('ul').children);
      // index of item
      // needs -1 to account for title element in the nodelist
      const itemIndex = itemArray.indexOf(e.target.parentElement);

      // insert new item below current item
      const itemHtml = `<li class="item">
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
      e.target.parentElement.insertAdjacentHTML('afterend', itemHtml);
      // move cursor to new item
      e.target.parentElement.nextSibling.firstElementChild.focus();

      // store item locally
      localStorage.setItem('listData', JSON.stringify(listData));
    }
    saveState();
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
    } else {
      thisListNode.querySelector('.list__title').focus();
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
    saveState();
  }

  /** Tab */
  if (event.key === 'Tab') {
    event.preventDefault();
    e.target.classList.toggle('indent');
  }
}

// ITEM NOTE
function itemNote(e) {
  if (e.shiftKey && e.code === 'Enter') {
    event.preventDefault();
    console.log(e.target.parentNode.firstElementChild);
    e.target.parentNode.firstElementChild.focus();

    // if note is empty remove .noted from element
    if (e.target.innerHTML.length < 1) {
      e.target.classList.remove('noted');
    }
  }
  saveState();
}
