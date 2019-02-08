// Listen for form submition
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e) {
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    if(!siteName | !siteURL){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteURL
    }


    //Local Storage

    // Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        //Initialize array
        var bookmarks = [];
        //Add items to array
        bookmarks.push(bookmark);
        //Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Re-Fetch bookmarks
    fetchBookmarks();

    //Prevent form from submitting
    e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url){
    // Get bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for(var i = 0; i < bookmarks.length; i++){
        if (bookmarks[i].url == url){
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-Fetch bookmarks
    fetchBookmarks();
}


// Fetch Bookmarks

function fetchBookmarks(){

    // Get bookmarks
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output ID
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build our output
    bookmarksResults.innerHTML = '';

    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="card bg-faded">'+
                                      '<h3>' +name+
                                      ' <a class="btn btn-info" target="_blank" href="'+url+'">Visit</a> ' +
                                      ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '
                                      '</h3>'+
                                      '</div>';
    }

}









