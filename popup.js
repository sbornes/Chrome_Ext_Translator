chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
}, function(selection) {
    // document.getElementById("output").innerHTML = selection[0];
    if(selection[0].length > 0) {

      document.getElementById("output").innerHTML = "Translating... " + selection[0];

      chrome.runtime.sendMessage({
          msg: "translate_this",
          data: {
              subject: "none",
              content: selection[0]
          }
      });
    } else {
      document.getElementById("output").innerHTML = "Select some text, then click this again !";
    }
});

// function selectedTrueOnClick(info, tab) {
//   console.log(info);
//     chrome.tabs.sendRequest(
//     tab.id, {
//         callFunction: "displaySidebar",
//         info: info
//     }, function(response) {
//         console.log(response);
//     });
// }

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "update_popup") {
            //  To do something
            console.log(request.data.subject)
            console.log(request.data.content)

            document.getElementById("output").innerHTML = request.data.content;
        }
    }
);
