var twitch = "(?<=.[:\/\/])(www\.)?(clips\.)?twitch\.tv"

//Checks if current tab is twitch.tv page
chrome.tabs.onActivated.addListener(function () {
  chrome.tabs.query({active: true, currentWindow: true}, 
    function (tabs) {
      changeFavicon(tabs[0].url)
  });
});

//Sends the current URL when page is updated
chrome.tabs.onUpdated.addListener(function () {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      changeFavicon(tabs[0].url);
      chrome.tabs.sendMessage(tabs[0].id, {data: tabs[0].url});  
  });
});

//Redirects current tab to clips.twitch.tv page
chrome.runtime.onMessage.addListener(function (request, sender) {
  chrome.tabs.update(sender.tab.id, {url: request.redirect});
});

//Toggles favicon appearance between active and inactive
function changeFavicon(url){
  if (url.match(twitch)){
    chrome.browserAction.setIcon({path: "/images/active-icon16.png"})}
  else {
    chrome.browserAction.setIcon({path: "/images/inactive-icon16.png"})}
};