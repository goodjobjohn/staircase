# staircase
intuitively simple, noise free, goal making, task managing, todo creating brain tool for the visual thinker.

## proccess
click + adds list to page with title input
'press enter' saves title and adds 'add item' input to list, focus moves to new input
- empty title won't save
'press enter' saves item, adds item to list, and clears input, focus back on empty input.

## todos
current:
 stuck on finding the index for the item to update the item 
 itemIndex has the title at index 0 so i needed to -1 on the index to get the correct one
 trying to grab value on e.target when i needed the text, e.target.value vs e.target.innerhtml

action: localSotage
 [x] build from localStorage

action: click + Add list button
 [x] adds list html to page with title
 [x] focus moves to title input
 [x] store new list in db
 
action: enter on title
 [x] saves to storage (if empty, nothing)
 [x] adds + add item input to list
 [x] focus moves to input
 [x]  fix double input when title exists
 

action: enter on item input
 [x] saves item to storage
 [x] inserts item into HTML
 [x] clears input, focus returns
 [x] can save more than one
 [x] a second enter doesn't add another item input / seperate creat item with edit

[] code restructure::
    [] single function for list object and localStorage manipulation
    [] place all event functions inside list event

code cleanup::
sanitise input text, remove spaces etc

* Notes


### changelog
02 jul 2019 ---
this is a new branch to allow for mutliple lists

28 jun 2019 ---
added ability to remove item from list

27 jun 2019 ---
added ability to change title and store value

26 jun 2019 --- v0.01
intial setup for git

