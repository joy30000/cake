
function category(birthday) {
    document.getElementById('submitButton').addEventListener('click', () => {
      document.getElementById('myForm').submit();
    })
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

  // Initial check
  handleMediaQueryChange(mediaQuery);

  // Listen for changes in the media query
  mediaQuery.addEventListener('change', handleMediaQueryChange);