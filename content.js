//content script
var clickedEl = null;

document.addEventListener("mousedown", function(event){
    //right click
    if(event.button == 2) {
        clickedEl = event.target;
        if(clickedEl.value != null) {
          console.log(clickedEl);
          if(clickedEl.type == "select-one") {
            console.log(clickedEl.options[clickedEl.value].text);
            chrome.runtime.sendMessage({
                msg: "object_right_click",
                data: {
                    subject: "none",
                    content: clickedEl.options[clickedEl.value].text
                }
            });
          } else {
            chrome.runtime.sendMessage({
                msg: "object_right_click",
                data: {
                    subject: "none",
                    content: clickedEl.value
                }
            });
          }
        }
    }
}, true);


document.onmouseup = doSomethingWithSelectedText;

function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange().text;
    }
    return text;
}

function doSomethingWithSelectedText() {
    var selectedText = getSelectedText();
    console.log("getting selection");
    if (selectedText) {
      console.log("selection: " + selectedText);
      chrome.runtime.sendMessage({
          msg: "update_contextmenu",
          data: {
              subject: "none",
              content: selectedText
          }
      });
    } else {
      chrome.runtime.sendMessage({
          msg: "update_contextmenu",
          data: {
              subject: "none",
              content: "< Highlight some text to translate >"
          }
      });
    }
}
