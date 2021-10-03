const addBookmarkForm = document.getElementById('add-bookmark-form');
const addBookmarkTitle = document.getElementById('add-bookmark-title');
const addBookmarkUrl = document.getElementById('add-bookmark-url');

const addTaskForm = document.getElementById('add-task-form');
const addTaskDescription = document.getElementById('add-task-description');

const addNoteForm = document.getElementById('add-note-form');
const addNoteContent = document.getElementById('add-note-content');

const bookmarksContainer = document.getElementById('bookmarks-container');
const tasksContainer = document.getElementById('tasks-container');
const notesContainer = document.getElementById('notes-container');

const exportButton = document.getElementById('export-button');
const importButton = document.getElementById('import-button');
const jsonDataContainer = document.getElementById('json-data');

const searchText = document.getElementById('search-text');

let bookmarks = [];
let tasks = [];
let notes = [];



// Build Bookmarks DOM
function buildBookmarks() {
    // Remove all bookmark elements
    bookmarksContainer.textContent = '';
    // Build items
    bookmarks.forEach(bookmark => {
        const { id, title, url } = bookmark;
        // Item
        const item = document.createElement('div');
        item.classList.add('item');

        // Close Icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('close-icon');
        closeIcon.innerHTML = '&cross;';
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${id}')`);

        // Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');

        // Link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = title;

        // Append to bookmarks container
        link.prepend(favicon);

        item.append(link, closeIcon);
        bookmarksContainer.appendChild(item);
    });
}

// Fetch Bookmarks
function fetchBookmarks() {
    // Get bookmarks from localStorage if available
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        // Create bookmarks array in localStorage
        bookmarks = [
            {
                id: Date.now(),
                title: 'Google',
                url: 'https://google.com',
            },
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildBookmarks();
}

// Delete Bookmark
function deleteBookmark(id) {
    bookmarks.forEach((bookmark, i) => {
        if (bookmark.id == id) {
            bookmarks.splice(i, 1);
        }
    });
    // Update bookmarks array in localStorage, re-populate DOM
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

// Handle Data from Form
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = addBookmarkTitle.value;
    let urlValue = addBookmarkUrl.value;

    if(!addBookmarkForm.checkValidity()){
        addBookmarkForm.reportValidity();
        return false;
    }

    const bookmark = {
        id: Date.now(),
        title: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    addBookmarkForm.reset();
    addBookmarkTitle.focus();
}


// Tasks
// Build Tasks DOM
function buildTasks() {
    // Remove all bookmark elements
    tasksContainer.textContent = '';
    // Build items
    tasks.forEach(task => {
        const { id, description } = task;
        // Item
        const item = document.createElement('div');
        item.classList.add('item');
        // Close Icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('close-icon', 'done');
        closeIcon.innerHTML = '&check;';
        closeIcon.setAttribute('title', 'Delete Task');
        closeIcon.setAttribute('onclick', `deleteTask('${id}')`);

        // Description
        const taskContent = document.createElement('div');
        taskContent.textContent = description;

        item.append(closeIcon, taskContent);
        tasksContainer.appendChild(item);
    });
}

// Fetch Tasks
function fetchTasks() {
    // Get tasks from localStorage if available
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        // Create bookmarks array in localStorage
        tasks = [
            {
                id: Date.now(),
                description: 'Do whatever you want with your life',
            },
        ];
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    buildTasks();
}

// Delete Bookmark
function deleteTask(id) {
    tasks.forEach((task, i) => {
        if (task.id == id) {
            tasks.splice(i, 1);
        }
    });
    // Update tasks array in localStorage, re-populate DOM
    localStorage.setItem('tasks', JSON.stringify(tasks));
    fetchTasks();
}

// Handle Data from Form
function storeTask(e) {
    e.preventDefault();

    if(!addTaskForm.checkValidity()){
        addTaskForm.reportValidity();
        return false;
    }

    const task = {
        id: Date.now(),
        description: addTaskDescription.value,
    };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    fetchTasks();
    addTaskForm.reset();
    addTaskDescription.focus();
}



// Notes
// Build Notes DOM
function buildNotes() {
    // Remove all notes elements
    notesContainer.textContent = '';
    // Build items
    notes.forEach(note => {
        const { id, content } = note;
        // Item
        const item = document.createElement('div');
        item.classList.add('item');
        // Close Icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('close-icon');
        closeIcon.innerHTML = '&cross;';
        closeIcon.setAttribute('title', 'Delete Note');
        closeIcon.setAttribute('onclick', `deleteNote('${id}')`);

        // Description
        const noteContent = document.createElement('div');
        noteContent.textContent = content;

        item.append(closeIcon, noteContent);
        notesContainer.appendChild(item);
    });
}

// Fetch Notes
function fetchNotes() {
    // Get tasks from localStorage if available
    if (localStorage.getItem('notes')) {
        notes = JSON.parse(localStorage.getItem('notes'));
    } else {
        // Create bookmarks array in localStorage
        notes = [
            {
                id: Date.now(),
                description: 'Eat a pizza.',
            },
        ];
        localStorage.setItem('notes', JSON.stringify(notes));
    }
    buildNotes();
}

// Delete Note
function deleteNote(id) {
    notes.forEach((note, i) => {
        if (note.id == id) {
            notes.splice(i, 1);
        }
    });
    // Update notes array in localStorage, re-populate DOM
    localStorage.setItem('notes', JSON.stringify(notes));
    fetchNotes();
}

// Handle Data from Form
function storeNote(e) {
    e.preventDefault();

    if(!addNoteForm.checkValidity()){
        addNoteForm.reportValidity();
        return false;
    }

    const note = {
        id: Date.now(),
        content: addNoteContent.value,
    };
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    fetchNotes();
    addNoteForm.reset();
    addNoteContent.focus();
}







function filterBySearchText() {

    // Hide add forms when searching to clean the UI
    if(searchText.value.length == 0){
        addBookmarkForm.style.display = 'block';
        addNoteForm.style.display = 'block';
        addTaskForm.style.display = 'block';
        return false;
    }

    addBookmarkForm.style.display = 'none';
    addNoteForm.style.display = 'none';
    addTaskForm.style.display = 'none';

    let items = document.querySelectorAll('.item');
    items.forEach(function(item) {
        if(item.textContent.toLowerCase().includes(searchText.value.toLowerCase())){
            item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }
    });

}





// Export localstorage data
function exportData() {
    jsonDataContainer.value = JSON.stringify(localStorage);
    openJsonDataContainer();
}

// Import localstorage data
function importData() {

    if(jsonDataContainer.value.length === 0){
        openJsonDataContainer();
    }else{
        var data = JSON.parse(jsonDataContainer.value);
        Object.keys(data).forEach(function (k) {
            localStorage.setItem(k, data[k]);
        });
        fetchBookmarks();
        closeJsonDataContainer();
    }
}

function openJsonDataContainer() {
    jsonDataContainer.style.display = 'block';
}

function closeJsonDataContainer() {
    jsonDataContainer.value = ''; // Empty before closing
    jsonDataContainer.style.display = 'none';
}

// Modal Event Listeners
window.addEventListener('click', (e) => {

    // Close import/export textarea if open and click on any place that is not export or import
    if(jsonDataContainer.style.display == 'block'){
        if(e.target !== jsonDataContainer && e.target !== importButton && e.target !== exportButton){
            closeJsonDataContainer();
        }
    }

});

// Event Listener
addBookmarkForm.addEventListener('submit', storeBookmark);
addTaskForm.addEventListener('submit', storeTask);
addNoteForm.addEventListener('submit', storeNote);

// Export/Import listeners
exportButton.addEventListener('click', exportData);
importButton.addEventListener('click', importData);

searchText.addEventListener('input', filterBySearchText);

// On Load, Fetch everything
fetchBookmarks();
fetchTasks();
fetchNotes();