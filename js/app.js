function scrollToTarget(targetSectionId) {
    const targetSection = document.getElementById(targetSectionId);
    if (!targetSection) return; // Section not found

    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
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

// Select the navbar menu
const navbarMenu = document.querySelector("#navbar__list");

// Create an array of button labels and corresponding section IDs
const labels = ["Section 1", "Section 2", "Section 3"];
const sectionIds = ["section1", "section2", "section3"]; // IDs of the sections corresponding to the links

// Create a document fragment to improve performance when adding multiple elements
const fragment = document.createDocumentFragment();

// Function to handle click event
function handleClick(event) {
    event.preventDefault();
    const targetSectionId = event.target.getAttribute("href").substring(1); // Get the ID of the target section
    scrollToTarget(targetSectionId);
}

// Iterate through the labels and section IDs to create the anchor elements
for (let i = 0; i < labels.length; i++) {
    const listItem = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.textContent = labels[i];
    anchor.setAttribute("href", `#${sectionIds[i]}`);
    anchor.classList.add("menu__link");
    anchor.addEventListener("click", handleClick); // Add click event listener
    listItem.appendChild(anchor);
    fragment.appendChild(listItem);
}

// Append fragment to navbar menu
navbarMenu.appendChild(fragment);