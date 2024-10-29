function expand(index) {
    const expandableDiv = document.getElementById(`expandable-${index}`);
    const togglebtn = document.getElementById(`toggle`);

    // Toggle the height
    if (expandableDiv.style.height === '160px' || !expandableDiv.style.height) {
        expandableDiv.style.height = expandableDiv.scrollHeight + 'px'; // Expand to content height
        togglebtn.innerHTML = 'View less'
    } else {
        expandableDiv.style.height = '160px'; // Collapse
        togglebtn.innerHTML = 'View more'
    }
}



const mediaQuery = window.matchMedia('(min-width: 640px)');

// Function to handle media query changes
function handleMediaQueryChange(e) {
    const nav = document.getElementById('nav');
    if (e.matches) {
        // If the viewport is 600px or less, change the background color
        //nav.className = "flex items-center"
        nav.classList.remove('hidden'); // Contract the div
        nav.classList.add('flex');
    } else {
        // If the viewport is more than 600px, revert the background color

    }
}

document.getElementById('backButton').addEventListener('click', function () {
    window.history.back();
});

// Initial check
handleMediaQueryChange(mediaQuery);

// Listen for changes in the media query
mediaQuery.addEventListener('change', handleMediaQueryChange);