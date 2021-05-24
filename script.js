var regex = "(?<=\/clip\/).*?(?=[^\A-Za-z0-9-_]|$)";

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Message recieved: " + request.url);
        // listen for messages sent from background.js
        if (request.url.match(regex)) {
            console.log("Twitch clip found!");
            chrome.runtime.sendMessage({redirect: "http://clips.twitch.tv/" + request.url.match(regex)});
        };
  });