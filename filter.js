
let lowFilter = 0;
let highFilter = 0;

// this bit makes sure that when new elements are loaded, they are filtered as well.
const observerConfig = { attributes: false, childList: true, subtree: true };

const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === "childList") {
            filterListings();
        }
    }
}

let grid = document.getElementsByClassName("x8gbvx8 x78zum5 x1q0g3np x1a02dak x1nhvcw1 x1rdy4ex xcud41i x4vbgl9 x139jcc6");
grid = grid[0];

const observer = new MutationObserver(callback);
observer.observe(grid, observerConfig);


function resetFilter() {
    let hidden = document.getElementsByClassName("mileageFiltered");
    debugger;
    while (hidden.length > 0) {
        hidden[0].classList.remove("mileageFiltered");
    }
}

function filterListings() {
    // this depends on the styling of the site - if that changes, this won't work
    let grid = document.getElementsByClassName("x8gbvx8 x78zum5 x1q0g3np x1a02dak x1nhvcw1 x1rdy4ex xcud41i x4vbgl9 x139jcc6");
    grid = grid[0];

    for (let i=0; i<grid.children.length; i++) {
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
            if (mileage.slice(-4,-3) === "K") {
                mileageNumber = mileage.slice(0, -4) * 1000;
            }
            else if (mileage.slice(-4,-3) === "M") {
                mileageNumber = mileage.slice(0, -4) * 1000000;
            }
            else {
                mileageNumber = mileage.slice(0, -3);
            }
        }
        else if (mileage.slice(-5) === "miles") {
            if (mileage.slice(-7,-6) === "K") {
                mileageNumber = mileage.slice(0, -6) * 1000;
            }
            else if (mileage.slice(-7,-6) === "M") {
                mileageNumber = mileage.slice(0, -6) * 1000000;
            }
            else {
                mileageNumber = mileage.slice(0, -6);
            }
        }
        if (mileageNumber < lowFilter || (highFilter != 0 && mileageNumber > highFilter)) {
            listing.classList.add("mileageFiltered");
        }
    }
}


chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {

        resetFilter();

        if (message.lowFilter != "") {
            lowFilter = message.lowFilter;
        }
        else {lowFilter = 0;}

        if (message.highFilter != "") {
            highFilter = message.highFilter;
        }
        else {highFilter = 0;}

        filterListings();
    }
);
