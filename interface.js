let filterSection = document.getElementById("seo_filters").children[1];

let priceFilter = document.getElementsByClassName("xw7yly9 x1sxyh0 xurb0ha")[0];

console.log(priceFilter);
console.table(priceFilter);


// copy the element of the price filter
try {
    let mileageFilter = priceFilter.cloneNode(true);
} catch (e) {
    // haven't searched or clicked the vehicles category yet
}

addEventListener("readystatechange", (event) => {
    try {
        createFilterSection();
    } catch (error) {
        console.error(error);
    }
});

// in case the page is complete before this script loads?
if (document.readyState === "complete") {
    createFilterSection();
}

function createFilterSection() {
    // change it for mileage
    getFirstChild(mileageFilter, 2).innerText = "Odometer";
    let minInput = getFirstChild(mileageFilter.children[1], 3);
    minInput.setAttribute("aria-label", "Minimum Odometer");
    minInput.setAttribute("id", "minMileage");
    let maxInput = getFirstChild(mileageFilter.children[1].children[2], 2);
    maxInput.setAttribute("aria-label", "Maximum Odometer");
    maxInput.setAttribute("id", "maxMileage");

    filterSection.appendChild(mileageFilter);

    // add event listeners
    let minMileageInput = document.getElementById("minMileage");
    let maxMileageInput = document.getElementById("maxMileage");

    minMileageInput.addEventListener("change", (event) => {
        resetFilter();
        filterListings();
    });

    maxMileageInput.addEventListener("change", (event) => {
        resetFilter();
        filterListings();
    });
}
