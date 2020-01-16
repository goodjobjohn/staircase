// https://stackoverflow.com/a/42531715/1494947

export function getCaretPosition(node) {
  var range = window.getSelection().getRangeAt(0),
    preCaretRange = range.cloneRange(),
    caretPosition,
    tmp = document.createElement("div");

  preCaretRange.selectNodeContents(node);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  tmp.appendChild(preCaretRange.cloneContents());
  caretPosition = tmp.innerText.length;
  return caretPosition;
}
