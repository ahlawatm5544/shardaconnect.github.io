// Function to save posts to local storage
function savePostsToLocalStorage(posts) {
    localStorage.setItem('shardaConnectPosts', JSON.stringify(posts));
}

// Function to load posts from local storage
function loadPostsFromLocalStorage() {
    var storedPosts = localStorage.getItem('shardaConnectPosts');
    if (storedPosts) {
        return JSON.parse(storedPosts);
    } else {
        return [];
    }
}

// Initialize previousPosts array with posts from local storage
var previousPosts = loadPostsFromLocalStorage();

// Function to add a new post to the array and save to local storage
function addPost(name, content, date) {
    previousPosts.push({ name: name, content: content, date: date });
    savePostsToLocalStorage(previousPosts);
}

// Function to display previous posts in the feed section
function displayPreviousPosts() {
    var feedSection = document.getElementById('feed');
    feedSection.innerHTML = ''; // Clear previous content

    previousPosts.forEach(function(item) {
        var feedItem = document.createElement('div');
        feedItem.classList.add('feed-item');
        feedItem.innerHTML = '<p><strong>' + item.name + ':</strong> ' + item.content + '</p><small>Posted on ' + item.date + '</small>';
        feedSection.appendChild(feedItem);
    });

    feedSection.style.display = 'block'; // Display the feed
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the email and password from the form
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Check if email and password are correct (for demonstration purpose only)
    if (email === '1234.Guest@ug.sharda.ac.in' && password === '12345678') {
        // Hide the login section
        document.querySelector('.login-section').style.display = 'none';

        // Show the tabs section
        document.querySelector('.tabs').style.display = 'block';

        // Show the post section
        document.getElementById('post-section').style.display = 'block';

        // Display the initial feed
        displayPreviousPosts();
    } else {
        alert('Invalid email or password. Please try again.');
    }
});

document.getElementById('post-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the name, thoughts, and current date from the form
    var name = 'user'; 
    var thoughts = document.getElementById('thoughts').value;
    var currentDate = new Date().toLocaleDateString();

    // Add the post to the array and save to local storage
    addPost(name, thoughts, currentDate);

    // Display the updated feed
    displayPreviousPosts();

    // Reset the form
    document.getElementById('thoughts').value = '';
});

function openTab(event, tabName) {
    var i, tabcontent, tablinks;

    // Hide all tab contents
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Deactivate all tab links
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the selected tab content and mark the button as active
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}
