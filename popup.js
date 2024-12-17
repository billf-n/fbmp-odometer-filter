function getFirstChild(element, i) {
    //try {
    if (i > 1) {
        return getFirstChild(element.children[0], i-1);
    }
    else return element.firstElementChild;
    // } catch (TypeError) {
    //     return -1;
    // }
}

document.getElementById("filter").addEventListener("click", (e) => {
    chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
        
        chrome.tabs.sendMessage(tabs[0].id, {
            lowFilter: document.getElementById("lowFilter").value, 
            highFilter: document.getElementById("highFilter").value
        });

        // chrome.tabs.executeScript({
        //     target: {tabId: tab.id},
        //     func: resetAndFilter(lowFilter, highFilter),
        //     args: [document.getElementById("lowFilter").value, document.getElementById("highFilter").value]
        // })
    });
});

