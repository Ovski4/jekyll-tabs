/**
 * Remove all "active" classes on li elements that belong to the given ul element.
 */
const removeActiveClasses = function (ulElement) {
    const liElements = ulElement.querySelectorAll('ul > li');

    Array.prototype.forEach.call(liElements, function(liElement) {
        liElement.classList.remove('active');
    });
}

/**
 * Get the element position looking from the perspective of the parent element.
 *
 * Considering the following html:
 *
 * <ul>
 *   <li class="zero">0</li>
 *   <li class="one">1</li>
 *   <li class="two">2</li>
 * </ul>
 *
 * Then getChildPosition(document.querySelector('.one')) would return 1.
 */
const getChildPosition = function (element) {
    var parent = element.parentNode;
    var i = 0;

    for (var i = 0; i < parent.children.length; i++) {
        if (parent.children[i] === element) {
            return i;
        }
    }

    throw new Error('No parent found');
}

/**
 * Returns a list of elements of the given tag that contains the given text.
 */
const findElementsContaining = function(elementTag, text) {
    const elements = document.querySelectorAll(elementTag);
    const elementsThatContainText = [];

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      if (element.textContent.includes(text)) {
        elementsThatContainText.push(element);
      }
    }

    return elementsThatContainText;
}

/**
 * Handle adding or removing active classes on tab list items.
 */
const handleTabClicked = function(link) {
    liTab = link.parentNode;
    ulTab = liTab.parentNode;
    liPositionInUl = getChildPosition(liTab);

    if (liTab.className.includes('active')) {
        return;
    }

    tabContentId = ulTab.getAttribute('data-tab');
    tabContentElement = document.getElementById(tabContentId);

    // Remove all "active" classes first.
    removeActiveClasses(ulTab);
    removeActiveClasses(tabContentElement);

    // Then add back active classes depending on the tab (ul element) that was clicked on.
    tabContentElement.querySelectorAll('ul > li')[liPositionInUl].classList.add('active');
    liTab.classList.add('active');
}

window.addEventListener('load', function () {
	const syncTabsWithSameNames = false;
    const tabLinks = document.querySelectorAll('ul.tab > li > a');

    Array.prototype.forEach.call(tabLinks, function(link) {

      link.addEventListener('click', function (event) {
          event.preventDefault();

          handleTabClicked(link);

          if (syncTabsWithSameNames) {
              const linksWithSameName = findElementsContaining('a', link.textContent);

              for(let i = 0; i < linksWithSameName.length; i++) {
                  if (linksWithSameName[i] !== link) {
                      handleTabClicked(linksWithSameName[i]);
                  }
              }
          }
      }, false);
    });
});
