chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if ('status' in changeInfo && changeInfo.status == 'complete' && tab.url.includes('/keywords/search/')) {		
		chrome.tabs.executeScript(tabId,
		  {code: 'init()'}
		)
	}
});