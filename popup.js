function filterListings(minMileage, maxMileage) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let currentTab = tabs[0];
    let newUrl;
    if (maxMileage != "") {
      if (currentTab.url.includes("maxMileage=")) {
        newUrl = currentTab.url.replace(
          /maxMileage=\d+/,
          `maxMileage=${maxMileage}`,
        );
      } else if (currentTab.url.includes("?")) {
        newUrl = currentTab.url + `&maxMileage=${maxMileage}`;
      } else {
        newUrl = currentTab.url + `?maxMileage=${maxMileage}`;
      }
    }
    if (minMileage != "") {
      if (currentTab.url.includes("minMileage=")) {
        newUrl = currentTab.url.replace(
          /minMileage=\d+/,
          `minMileage=${minMileage}`,
        );
      } else if (currentTab.url.includes("?")) {
        newUrl = currentTab.url + `&minMileage=${minMileage}`;
      } else {
        newUrl = currentTab.url + `?minMileage=${minMileage}`;
      }
    }
    // console.log(`Updating  to: ${newUrl}`);
    chrome.tabs.update(currentTab.id, { url: newUrl });
  });
}

document.getElementById("filter").addEventListener("click", () => {
  filterListings(
    document.getElementById("lowFilter").value,
    document.getElementById("highFilter").value,
  );
});

const lowInput = document.getElementById("lowFilter");
const lowDropdown = document.getElementById("lowFilterDropdown");

// Populate input when an option is clicked
lowDropdown.addEventListener("mousedown", (e) => {
  if (e.target.tagName === "LI") {
    lowInput.value = e.target.textContent;
  }
});

const highInput = document.getElementById("highFilter");
const highDropdown = document.getElementById("highFilterDropdown");

// Populate input when an option is clicked
highDropdown.addEventListener("mousedown", (e) => {
  if (e.target.tagName === "LI") {
    highInput.value = e.target.textContent;
  }
});
