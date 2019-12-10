# Staircase - A work in progress
My personal task-manager/scheduler/organiser. I will aim to create UI that leans on spacial memory to keep a mental snapshot of all my projects and tasks. 

![Design](/design/elements.jpg)
## What is it?

> Traffic control centre for your goals and task management

> A visual snapshot of your tasks

A tool to...

- organise your mind
- reach your goals, get things done.
- step out your goals
- break tasks down
- prioritise tasks
- track tasks*

## Who is it for?

- Visual thinkers
- Spacial memory
- Those needing visualies cues to improve recall

## Designed to...  

- feel as fluid as a text-editor
- minimise friction from mind to fingers to screen

## What you get...

- a snap shot of what, when, how.

## Words
A tool that assists spacial memory for visual thinkers.

A task management map, that organises and prioritises tasks, so you can see the complete picture in you mind.

## The Process

1. Brain dump / List creation

   The initial brain dump of what needs to be done. You then break the big tasks into smaller tasks until the path is clear

2. Organise / Prioritise / Schedule

   Dragging tasks into order, moving to other lists and scheduling individual tasks onto a weekly schedule.

## What it's trying to do...

- Staircase is designed to help your brain visually map out your goals
- A map for the mind of **what** and **when**
- As close to pen and paper as possible
- As close to a text editor as possible
- A todo list
- A task manager
- A visual map for the mind using steps to take you towards your goals



- Why do we make lists?
- When we have a goal in mind it helps to break the goal down into easier more manageable tasks. A simple notepad and pen can facilitate this.
- Removing as much friction from dumping info from your brain to your screen.

---

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
23.11.19 - 0.0.1
- restructuring html to improve elements inside the list
- start using proper version
  
12.11.19
added webpack and sortoable js

02 jul 2019 ---
this is a new branch to allow for mutliple lists

28 jun 2019 ---
added ability to remove item from list

27 jun 2019 ---
added ability to change title and store value

26 jun 2019 --- v0.01
intial setup for git


![screen](/design/page-example.jpg) 
