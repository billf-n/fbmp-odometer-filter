let filterSection = document.getElementById("seo_filters").children[1];

let priceFilter = document.getElementsByClassName("xw7yly9 x1sxyh0 xurb0ha");

//priceFilter.firstElementChild

let mileageFilterSection = `
<div class="xw7yly9 x1sxyh0 xurb0ha">
    <div class="x1e56ztr">
        <span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen x1s688f xzsf02u" dir="auto">
            Mileage</span>
    </div>
    <div class="x6s0dn4 x78zum5 x12nagc x1gslohp">
        <span class="xh8yej3">
            <label class="xzsf02u x6prxxf">
                <input class="x1i10hfl xggy1nq x1s07b3s x1kdt53j x1a2a7pz xmjcpbm x8cjs6t x1ch86jh 
                x80vd3b xckqwgs xhk9q7s x1otrzb0 x1i1ezom x1o6z2jb x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi 
                x178xt8z xm81vs4 xso031l xy80clv x9f619 xzsf02u x1qlqyl8 xk50ysn x6ikm8r x1y1aw1k 
                xwib8y2 x1ye3gou xn6708d xh8yej3 xha3pab xyc4ar7 x1b3pals x10bruuh x108a08w x1c7mv8g 
                xacio93 x1ake63s x1yc453h xc9qbxq" 
                id="maxMileage" dir="ltr" placeholder="Min" aria-label="Minimum Mileage" type="text" value="">
            </label>
        </span>
        <div class="x2lah0s xexx8yu xn6708d x18d9i69 x1ye3gou xdnwjd9">
            <span class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen xo1l8bm xzsf02u" dir="auto">
            to
            </span>
        </div>
        <span class="xh8yej3">
            <label class="xzsf02u x6prxxf">
                <input class="x1i10hfl xggy1nq x1s07b3s x1kdt53j x1a2a7pz xmjcpbm x8cjs6t x1ch86jh 
                x80vd3b xckqwgs xhk9q7s x1otrzb0 x1i1ezom x1o6z2jb x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi 
                x178xt8z xm81vs4 xso031l xy80clv x9f619 xzsf02u x1qlqyl8 xk50ysn x6ikm8r x1y1aw1k 
                xwib8y2 x1ye3gou xn6708d xh8yej3 xha3pab xyc4ar7 x1b3pals x10bruuh x108a08w x1c7mv8g 
                xacio93 x1ake63s x1yc453h xc9qbxq" 
                id="maxMileage" dir="ltr" placeholder="Max" aria-label="Maximum Mileage" type="text" value="">
            </label>
        </span>
    </div>
</div>
`;


var x = new DOMParser().parseFromString(mileageFilterSection, "text/html");


filterSection.appendChild();