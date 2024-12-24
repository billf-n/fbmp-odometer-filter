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

const lowFilter = document.getElementById("lowFilter");
const highFilter = document.getElementById("highFilter");

validateInput(lowFilter);
validateInput(highFilter);

document.getElementById("filter").addEventListener("click", (e) => {

    chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            lowFilter: document.getElementById("lowFilter").value, 
            highFilter: document.getElementById("highFilter").value
        });
    });
});

function validateInput(element) {
  element.addEventListener("beforeinput", function (event) {
    let beforeValue = element.value;
    event.target.addEventListener(
      "input",
      function () {
        if (element.validity.patternMismatch) {
          element.value = beforeValue;
        }
      },
      { once: true }
    );
  });
}

