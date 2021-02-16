let tabId;

// Fetch tab immediately
chrome.runtime.sendMessage({command: 'query-active-tab'}, (response) => {
    tabId = response.id;
});

// On command, get the stream ID and forward it back to the service worker
chrome.commands.onCommand.addListener((command) => {
    chrome.tabCapture.getMediaStreamId({consumerTabId: tabId}, (streamId) => {
        chrome.runtime.sendMessage({
            command: 'tab-media-stream',
            tabId: tabId,
            streamId: streamId
        })
    });
});
