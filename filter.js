// this depends on the styling of the site - if that changes, this won't work
let grid = document.getElementsByClassName("x8gbvx8 x78zum5 x1q0g3np x1a02dak x1nhvcw1 x1rdy4ex xcud41i x4vbgl9 x139jcc6");

grid = grid[0];

// this bit makes sure that when new elements are loaded, they are filtered as well.
const observerConfig = { attributes: false, childList: true, subtree: true };

const callback = (mutationList, observer) => {
    if (document.readyState === "complete") {
        debugger;
    } else {
        return;
    }
    for (const mutation of mutationList) {
        if (mutation.type === "childList") {
            filterListings();
        }
    }
}

const observer = new MutationObserver(callback);
observer.observe(grid, observerConfig);

function resetFilter() {
    let hidden = document.getElementsByClassName("mileageFiltered");
    for (let i = 0; i < hidden.length; i++) {
        hidden[i].classList.remove("mileageFiltered");
    }
}

let lowFilterInput, highFilterInput;

addEventListener("readystatechange", (event) => {
    try {
        lowFilterInput = document.getElementById("minMileage");
        highFilterInput = document.getElementById("maxMileage");
        filterListings();
    } catch (error) {
        console.error(error);
    }
});

// in case the page is complete before this script loads?
if (document.readyState === "complete") {
    lowFilterInput = document.getElementById("minMileage");
    highFilterInput = document.getElementById("maxMileage");
    filterListings();
}

/**
 * Filters listings (sets them to display: none)
 * where the mileage reading (any unit) is not within the filter range.
 */
function filterListings() {

    try {
        lowFilter = lowFilterInput.value;
        highFilter = highFilterInput.value;
        console.log(lowFilter);
        console.log(highFilter);
    } catch (e) {
        return;
    }
    

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

