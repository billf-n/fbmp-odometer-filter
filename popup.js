function getFirstChild(element, i) {
	if (i > 1) {
		return getFirstChild(element.children[0], i - 1);
	}
	else return element.firstElementChild;
}

async function sendMessageToActiveTab(message) {
	const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
	const response = await chrome.tabs.sendMessage(tab.id, message);
	// TODO: Do something with the response.
  }

const lowFilter = document.getElementById("lowFilter");
const highFilter = document.getElementById("highFilter");

validateInput(lowFilter);
validateInput(highFilter);

document.getElementById("filter").addEventListener("click", () => {
	sendMessageToActiveTab({
		lowFilter: document.getElementById("lowFilter").value,
		highFilter: document.getElementById("highFilter").value
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

