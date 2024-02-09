// Function to handle scrolling to target section
function scrollToTarget(targetSectionId) {
    const targetSection = document.getElementById(targetSectionId);
    if (!targetSection) return; // Section not found

    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;
    const step = 20;

    // Function to check if the target section is within the viewport
    function isTargetInSectionViewport(targetSection) {
        const rect = targetSection.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }

    // Function to perform one step of scrolling
    function scrollStep() {
        const currentPosition = window.scrollY;
        const remainingDistance = targetPosition - currentPosition;

        // If remaining distance is less than or equal to the step size, scroll to the top of the section
        if (Math.abs(remainingDistance) <= step) {
            window.scrollTo(0, targetPosition);
            // Remove the event listener if the target section is within the viewport
            if (isTargetInSectionViewport(targetSection)) {
                window.removeEventListener('scroll', scrollStep);
            }
            return;
        }

        // Otherwise, scroll one step and schedule the next step
        window.scrollBy(0, remainingDistance > 0 ? step : -step);
        requestAnimationFrame(scrollStep);
    }

    // Start scrolling
    scrollStep();
}

// Select the navbar menu and toggle button
const navbarMenu = document.querySelector("#navbar__list");
const menuToggle = document.querySelector(".menu__toggle");

// Create an array of button labels and corresponding section IDs
const labels = ["Section 1", "Section 2", "Section 3","Section 4"];
const sectionIds = ["section1", "section2", "section3", "section4"]; // IDs of the sections corresponding to the links

// Function to create anchor elements for the navbar menu
function createMenuItems(labels, sectionIds) {
    // Clear existing menu items
    navbarMenu.innerHTML = '';

    // Iterate through the labels and section IDs to create the anchor elements
    labels.forEach((label, index) => {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.textContent = label;
        anchor.setAttribute("href", `#${sectionIds[index]}`);
        anchor.classList.add("menu__link");
        anchor.addEventListener("click", handleClick); // Add click event listener
        listItem.appendChild(anchor);
        navbarMenu.appendChild(listItem);
    });
}

// Initial creation of menu items
createMenuItems(labels, sectionIds);

// Function to handle click event
function handleClick(event) {
    event.preventDefault();
    const targetSectionId = event.target.getAttribute("href").substring(1); // Get the ID of the target section
    scrollToTarget(targetSectionId);
    // Close the dropdown menu after clicking on a menu item (if it's open)
    navbarMenu.classList.remove('active');
}

// Function to handle window resize event
function handleWindowResize() {
    // Check if screen width is less than or equal to 800px
    if (window.innerWidth <= 800) {
        // Change navbarMenu to menuToggle
        navbarMenu.style.display = 'none';
        menuToggle.style.display = 'block';
    } else {
        // Change menuToggle to navbarMenu
        menuToggle.style.display = 'none';
        navbarMenu.style.display = 'block';
    }
}

// Event listener for window resize event
window.addEventListener('resize', handleWindowResize);

// Initialize the menu type based on window width
handleWindowResize();

// Function to create a dropdown
function createDropdownMenu() {
    const dropdown = document.createElement("ul");
    dropdown.classList.add("my-collapse");
    labels.forEach((label, index) => {
        const dropdownItem = document.createElement("li");
        const dropdownAnchor = document.createElement("a");
        dropdownAnchor.textContent = label;
        dropdownAnchor.setAttribute("href", `#${sectionIds[index]}`);
        dropdownAnchor.classList.add("menu__link");
        dropdownAnchor.addEventListener("click", handleClick); // Add click event listener
        dropdownItem.appendChild(dropdownAnchor);
        dropdown.appendChild(dropdownItem);
    });
    menuToggle.appendChild(dropdown);

    // Add event listener to the menu toggle to remove the dropdown when clicked again
    menuToggle.removeEventListener('click', createDropdownMenu);
    menuToggle.addEventListener('click', removeDropdownMenu);
}

// Function to remove the dropdown
function removeDropdownMenu() {
    const dropdown = document.querySelector(".my-collapse");
    if (dropdown) {
        dropdown.remove();
    }

    // Re-attach the event listener to create the dropdown menu
    menuToggle.removeEventListener('click', removeDropdownMenu);
    menuToggle.addEventListener('click', createDropdownMenu);
}

// Event listener for the menu toggle button
menuToggle.addEventListener('click', createDropdownMenu);

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".menu__link");
    
    // Highlight active section on click
    navLinks.forEach(link => {
      link.addEventListener("click", function() {
        navLinks.forEach(navLink => {
          navLink.classList.remove("active");
        });
        this.classList.add("active");
      });
    });
  
    // Highlight active section on scroll
    window.addEventListener("scroll", function() {
      const fromTop = window.scrollY;
  
      navLinks.forEach(link => {
        const section = document.querySelector(link.hash);
  
        if (
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    });
  });