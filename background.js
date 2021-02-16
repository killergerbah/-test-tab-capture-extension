chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        // Popup asks for current tab
        if (request.command === 'query-active-tab') {
            chrome.tabs.query({active: true}, (tabs) => {
                if (tabs.length > 0) {
                    sendResponse({id: tabs[0].id});
                }
            });

            return true;
        }

        // Popup sent back media stream ID, forward it to the content script
        if (request.command === 'tab-media-stream') {
            chrome.tabs.sendMessage(request.tabId, {
                command: 'tab-media-stream',
                streamId: request.streamId
            });
        }
    }
);