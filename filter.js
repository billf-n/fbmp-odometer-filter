// this depends on the styling of the site - if that changes, this won't work
let grid = document.getElementsByClassName("x8gbvx8 x78zum5 x1q0g3np x1a02dak x1nhvcw1 x1rdy4ex xcud41i x4vbgl9 x139jcc6");

// let these be changed through some interface
let lowFilter = 0;
let highFilter = 150000;

grid = grid[0];

// this bit makes sure that when new elements are loaded, they are filtered as well.
const observerConfig = { attributes: false, childList: true, subtree: true };

const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === "childList") {
            filterListings(lowFilter, highFilter);
        }
    }
}

const observer = new MutationObserver(callback);
observer.observe(grid, observerConfig);


let css = `
.mileageFiltered {
    display: none;
}`;

var stylesheet = document.createElement("style");
stylesheet.innerHTML = css;

document.body.appendChild(stylesheet);

/**
 * Gets the first child of the element i times.
 * Returns -1 if there are not i recursive children of the element
 */
function getFirstChild(element, i) {
    try {
        if (i > 1) {
            return getFirstChild(element.children[0], i-1);
        }
        else return element.firstElementChild;
    } catch (TypeError) {
        return -1;
    }
}

/**
 * Filters listings (sets them to display: none)
 * where the mileage reading (any unit) is not within the filter range.
 */
function filterListings(lowFilter, highFilter) {

    for (let i=0; i<grid.children.length; i++) {
        
        let listing = grid.children[i];
        let listingInfo = getFirstChild(listing, 9);
        if (listingInfo === -1) {
            continue;
        }
        else {
            listingInfo = listingInfo.children[1];
        }
        let mileageSection = listingInfo.children[3];
        let mileageText = getFirstChild(mileageSection, 3);
        if (mileageText === -1) {
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
        if (mileageNumber < lowFilter || mileageNumber > highFilter) {
            listing.classList.add("mileageFiltered");
        }
    }
}

// filter when this script loads
filterListings(lowFilter, highFilter);
