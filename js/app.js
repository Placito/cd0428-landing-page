// Select the navbar menu
const navbarMenu = document.querySelector("#navbar__list");

// Create an array of button labels
const labels = ["Section 1", "Section 2", "Section 3"];

// Create a document fragment to improve performance when adding multiple elements
const fragment = document.createDocumentFragment();

for (let i = 0; i < labels.length; i++) {
    // Create list item
    const listItem = document.createElement("li");
    
    // Create anchor element
    const anchor = document.createElement("a");
    anchor.textContent = labels[i];
    anchor.setAttribute("href", `#${labels[i].toLowerCase().replace(/\s/g, "")}`);
    
    // Add class to listItem 
    anchor.classList.add("menu__link");
    // Add atribute to listItem 
    listItem.setAttribute("data-nav", `${labels[i]}`);
    
    // Append anchor element to list item
    listItem.appendChild(anchor);
    
    // Append list item to fragment
    fragment.appendChild(listItem);
}

// Append fragment to navbar menu
navbarMenu.appendChild(fragment);