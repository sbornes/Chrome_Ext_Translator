var gObject;

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      "id": "translator",
      "title": "Select some text",
      "contexts": ["all"]
    });
  });

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if(info.menuItemId == "translator") {
    if(gObject != null) {
      alert(gObject);
      gObject = null;
    } else if(info.selectionText != null) {
      var msg = selectedTrueOnClick(info.selectionText);
      alert(msg);
    }
  }
});



function selectedTrueOnClick(text, alert) {

  var sourceText = text;

  var sourceLang = 'auto';

  var targetLang = 'en';

  /* Option 2 */

  var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
            + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);

  //var result = JSON.parse(UrlFetchApp.fetch(url).getContentText());

  var xhr = new XMLHttpRequest();

  xhr.open("GET", url, false);
  xhr.send();

  var result = JSON.parse(xhr.responseText);

  console.log(result);

  var  translatedText = result[0][0][0];

  var json = {
    'sourceText' : sourceText,
    'translatedText' : translatedText
  };

  var msg = json['sourceText'] + ' => ' + json['translatedText'];


  chrome.runtime.sendMessage({
    msg: "update_popup",
    data: {
      subject: "none",
      content: msg
    }
  });


  return msg;

}



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "translate_this") {
            //  To do something
            console.log(request.data.subject)
            console.log(request.data.content)

            selectedTrueOnClick(request.data.content);
        }
        if (request.msg === "object_right_click") {
            //  To do something
            console.log(request.data.subject)
            console.log(request.data.content)

            gObject = selectedTrueOnClick(request.data.content);

            chrome.contextMenus.update("translator", {
                  title: 'Translate "' + request.data.content + '"'
              });
        }
        if (request.msg === "update_contextmenu") {
            //  To do something
            console.log(request.data.subject)
            console.log(request.data.content)

            chrome.contextMenus.update("translator", {
                  title: 'Translate "' + request.data.content + '"'
              });
        }
    }
);
