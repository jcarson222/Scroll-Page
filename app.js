// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** SET DATE ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

// ********** CLOSE LINKS ************
const navToggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.links');
const linksContainer = document.querySelector('.links-container');

navToggle.addEventListener('click', () => {
    // *** easy, non-dynamic method ***
    // linksContainer.classList.toggle("show-links");

    // *** dynamic method ***
    const containerHeight = linksContainer.getBoundingClientRect().height;
    // ^this will return "0" since the links container is hidden by default.
    const linksHeight = links.getBoundingClientRect().height;
    // ^this will return the height of the links container DYNAMICALLY if you add/remove list items
    containerHeight === 0 ? linksContainer.style.height = `${linksHeight}px` : linksContainer.style.height = 0;
});

// ********** FIXED NAVBAR ************
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');

window.addEventListener('scroll', () => {
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;
    // *** add fixed navbar after exceeding the navbar height ***
    scrollHeight > navHeight ? navbar.classList.add("fixed-nav") : navbar.classList.remove("fixed-nav");
    // *** add back-to-home button after scrolling past px spec(500) ***
    scrollHeight > 500 ? topLink.classList.add("show-link") : topLink.classList.remove("show-link");
});

// ********** SMOOTH SCROLL ************
// *** select links ***
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // *** prevent default ***
    e.preventDefault();
    // *** navigate precisely ***
    const id = e.currentTarget.getAttribute("href").slice(1); //slice(1) to get rid of the #
    const element = document.getElementById(id);
    //console.log(element);
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
        position = position - navHeight;
    };
    if (navHeight > 82) {
        position = position + containerHeight;
    };

    window.scrollTo({
        left: 0,
        top: position,
    });
    //close link container
    linksContainer.style.height = 0;
  });
});





