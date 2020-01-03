// KEYDOWN EVENT on .lists element
import { listData, listContainer } from "./app.js";

function listContainerKeyDownEvent(e) {
  const thisListNode = e.target.closest(".list");
  // let thisListNode = e.target.parentElement;
  let thisListIndex = Array.from(thisListNode.parentElement.children).indexOf(
    thisListNode
  );

  // Checking if keydown event matches 'tab' or 'enter'
  // if true continue...
  if (event.key === "Enter") {
    // RETRIEVE AND STORE TITLE
    // if event matches our title element continue...
    if (e.target.matches(".list__title")) {
      // cancel the default action, if needed
      event.preventDefault();

      // retrieve value from title element
      const title = e.target.innerText;
      // retrieve current stored value
      const currentTitle = listData[thisListIndex].title;

      // accessibility:: throw warning if input is empty
      if (title === "") {
        alert("The list requires a name");
        return;
      }

      // check to see if title value exists and prevent adding more than one input
      if (currentTitle === "blank") {
        // add input 'add-item' to page
        e.target.parentElement.insertAdjacentHTML("beforeend", addItem);
      }

      // focus on the new input
      e.target.parentElement.lastElementChild.focus();

      // store new title value
      listData[thisListIndex].title = title;
    }

    // ITEM :: ADD
    if (e.target.matches(".list__add-item")) {
      // cancel the default action, if needed
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
      const itemHtml = `<li class="item" contenteditable="true">
                          <div class="item__text" contenteditable="true" data-text="Enter text here">${itemText}</div>
                          <div class="item__check" contenteditable="false"></div>
                          <div class="item__delete" contenteditable="false"></div>
                          <div class="item__handle" contenteditable="false"></div>
                          </li>`;
      // insert html
      let unorderedList = thisListNode.querySelector("ul");
      unorderedList.insertAdjacentHTML("beforeend", itemHtml);
      // clear the input
      e.target.value = "";
    }

    // ITEM :: UPDATE
    if (e.target.matches(".item__text")) {
      // cancel the default action, if needed
      event.preventDefault();
      // grab value from input
      const itemText = e.target.innerHTML;
      // find index of item
      // const thisList = "li.item"; // no longer needed?
      const itemArray = Array.from(thisListNode.querySelector("ul").children);
      // index of item

      // needs -1 to account for title element in the nodelist
      const itemIndex = itemArray.indexOf(e.target.parentElement);

      // save item
      listData[thisListIndex].items[itemIndex].itemText = itemText;
    }

    // store item locally
    localStorage.setItem("listData", JSON.stringify(listData));
  }
}

listContainer.addEventListener("keydown", listContainerKeyDownEvent);
