/**
 * Gets the first child of the element i times.
 * Returns -1 if there are not i recursive children of the element
 */
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
