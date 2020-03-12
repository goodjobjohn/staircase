/**
 * Function to save the app state by
 * saving the HTML to localStorage.
 *
 * @desc any change to a list triggers a save
 * @param object $trigger - the node of the triggering event
 */

export function saveState(trigger) {
  let lists = document.querySelector('#app');
  // save the to localStorage
  localStorage.setItem('appState', lists.innerHTML);
  console.log('SAVE FUNCTION');
}
