//Sends the current URL when page is updated
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // read changeInfo data and do something with it (like read the url)
    if (changeInfo.url) {
      console.log("Sending URL" + changeInfo.url);
      chrome.tabs.sendMessage(tabId, {url: changeInfo.url});  
    }; 
});

//Redirects current tab to clips.twitch.tv page
chrome.runtime.onMessage.addListener(function (request, sender) {
  chrome.storage.sync.get(['key'], function(result) {
    console.log('Saved clip is ' + result.key);
    if (result.key != request.redirect){
      chrome.storage.sync.set({key: request.redirect}, function() {
        console.log('Saved clip set to ' + request.redirect);
      });
      chrome.tabs.update(sender.tab.id, {url: request.redirect});
    };
  });

});

