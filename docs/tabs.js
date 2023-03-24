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
 * Get the position the element is in its parent node.
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
 * Handle adding or removing active classes on tab list items.
 */
window.addEventListener('load', function () {
    const tabLinks = document.querySelectorAll('ul.tab > li > a');

    Array.prototype.forEach.call(tabLinks, function(link) {
      link.addEventListener('click', function (event) {
          event.preventDefault();

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
      }, false);
    });
});
