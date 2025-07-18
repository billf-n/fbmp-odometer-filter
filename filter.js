function getFirstChild(element, i) {
    if (i > 1) {
        return getFirstChild(element.children[0], i - 1);
    }
    else return element.firstElementChild;
}

let lowFilter = 0;
let highFilter = 0;
let listingsChecked = 0;

// Use full XPath to get the grid of listings.
// this depends on the _layout_ of the site - if that changes, this won't work
let grid = document.evaluate('/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[2]/div/div/div[3]/div/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

// this bit makes sure that when new elements are loaded, they are filtered as well.
const observerConfig = { attributes: false, childList: true, subtree: true };

const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === "childList") {
            filterListings();
        }
    }
}
const observer = new MutationObserver(callback);
observer.observe(grid, observerConfig);


function resetFilter() {
    listingsChecked = 0;
    let hidden = document.getElementsByClassName("mileageFiltered");
    while (hidden.length > 0) {
        hidden[0].classList.remove("mileageFiltered");
    }
}

function filterListings() {
    for (let i = listingsChecked; i < grid.children.length; i++) {
        let listing = grid.children[i];
        let listingInfo;
        try {
            listingInfo = getFirstChild(listing, 9);
        } catch (e) {
            // children don't exist, element hasn't been loaded - continue on
            continue;
        }
        listingInfo = listingInfo.children[1];

        let mileageSection = listingInfo.children[3];
        let mileageText;
        try {
            mileageText = getFirstChild(mileageSection, 3);
        } catch (e) {
            continue;
        }
        let mileage = mileageText.textContent;

        let mileageNumber = 0;

        mileage.slice(-2);
        if (mileage.slice(-2) === "km") {
            if (mileage.slice(-4, -3) === "K") {
                mileageNumber = parseInt(mileage.slice(0, -4)) * 1000;
            }
            else if (mileage.slice(-4, -3) === "M") {
                mileageNumber = parseInt(mileage.slice(0, -4)) * 1000000;
            }
            else {
                mileageNumber = parseInt(mileage.slice(0, -3));
            }
        }
        else if (mileage.slice(-5) === "miles") {
            if (mileage.slice(-7, -6) === "K") {
                mileageNumber = parseInt(mileage.slice(0, -7)) * 1000;
            }
            else if (mileage.slice(-7, -6) === "M") {
                mileageNumber = parseInt(mileage.slice(0, -7)) * 1000000;
            }
            else {
                mileageNumber = parseInt(mileage.slice(0, -6));
            }
        }
        if (mileageNumber < lowFilter || (highFilter != 0 && mileageNumber > highFilter)) {
            listing.classList.add("mileageFiltered");
        }
        listingsChecked = i;
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    resetFilter();

    if (message.lowFilter != "") {
        lowFilter = parseInt(message.lowFilter);
    }
    else { lowFilter = 0; }

    if (message.highFilter != "") {
        highFilter = parseInt(message.highFilter);
    }
    else { highFilter = 0; }

    filterListings();
    return true;
});


