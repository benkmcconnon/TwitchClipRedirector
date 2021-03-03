var regex = "(?<=\/clip\/).*?(?=[^\A-Za-z0-9-_]|$)";

chrome.extension.onMessage.addListener(handleMessage);

//Checks if URL is twitch.tv clip page
function handleMessage(request) {
    if (request.data.match(regex)) {
        chrome.runtime.sendMessage({redirect: "http://clips.twitch.tv/" + request.data.match(regex)});
    };
};