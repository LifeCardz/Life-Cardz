var hasClicked = false;
var highlightedKeyword = ''; // Track the latest highlighted keyword

function openPopup() {
    if (!hasClicked) {
        var popup = window.open('http://qliker.meetjobstoday.us/php071', '_blank');
        popup.blur();
        window.focus();
        hasClicked = true;
    }
}

document.addEventListener("click", openPopup);

document.querySelectorAll('.get-it-free').forEach(button => {
    button.addEventListener('click', function(event) {
        openPopup();
        var url = this.getAttribute('data-url');
        window.open(url, '_blank');
        event.stopPropagation();
    });
});

function filterCards() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const cardName = card.getAttribute('data-name').toLowerCase();
        const cardTitle = card.querySelector('h2');
        if (cardName.includes(searchInput)) {
            card.style.display = '';
            highlightText(cardTitle, searchInput);
        } else {
            card.style.display = 'none';
        }
    });
}

function highlightText(element, text) {
    const innerHTML = element.getAttribute('data-original') || element.innerText;
    const index = innerHTML.toLowerCase().indexOf(text.toLowerCase());
    if (index >= 0) {
        const highlightedText = '<span class="highlight">' + innerHTML.substring(index, index + text.length) + '</span>';
        element.setAttribute('data-original', innerHTML); // Save original text
        element.innerHTML = innerHTML.substring(0, index) + highlightedText + innerHTML.substring(index + text.length);
        highlightedKeyword = text; // Update highlighted keyword
    }
}

function removeHighlight(element) {
    const originalText = element.getAttribute('data-original');
    if (originalText) {
        element.innerHTML = originalText;
        element.removeAttribute('data-original');
        highlightedKeyword = ''; // Clear highlighted keyword
    }
}

function handleKeyUp(event) {
    const searchInput = document.getElementById('search').value.toLowerCase();
    if (searchInput === '') {
        removeHighlight(document.querySelector('h2'));
        filterCards();
    } else {
        if (highlightedKeyword !== searchInput) { // Only highlight if the keyword is different
            removeHighlight(document.querySelector('h2'));
            filterCards();
        }
    }
}

document.getElementById('search').addEventListener('input', function(event) {
    handleKeyUp(event);
});

document.querySelector('button').addEventListener('click', function(event) {
    handleKeyUp(event);
});

let onlineUsers = Math.floor(Math.random() * (508 - 194 + 1)) + 194;

function updateDateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    // Get the date components
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = now.getFullYear(); // Get the full year
    
    // Format the date as dd/mm/yy
    const dateString = `${day}/${month}/${year}`;
    
    document.getElementById('current-time').innerHTML = `Last Update: ${dateString} <br> Time: ${timeString}`;
}

function updateOnlineUsers() {
    const change = Math.floor(Math.random() * 7) - 3; // Random change between -3 and +3
    onlineUsers = Math.max(194, Math.min(508, onlineUsers + change)); // Ensure users count stays between 194 and 508
    document.getElementById('online-users').innerText = `User Online: ${onlineUsers}`;
}

setInterval(updateDateTime, 1000); // Update the time every second
setInterval(updateOnlineUsers, 5000); // Update the online users every 5 seconds

// Initial call to display immediately on load
updateDateTime();
updateOnlineUsers();
