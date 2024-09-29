document.addEventListener('DOMContentLoaded', () => {
  const addNoteBtn = document.getElementById('add-note-btn');
  const newNoteInput = document.getElementById('new-note');
  const noteTitleInput = document.getElementById('note-title');
  const notesList = document.getElementById('notes-list');
  const togglePreviewCheckbox = document.getElementById('toggle-preview');

  // Load notes from localStorage
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  displayNotes();

  // Add note event
  addNoteBtn.addEventListener('click', () => {
    const noteTitle = noteTitleInput.value.trim();
    const noteContent = newNoteInput.value.trim();
    
    if (noteTitle && noteContent) {
      const note = { title: noteTitle, content: noteContent };
      notes.push(note);
      noteTitleInput.value = '';
      newNoteInput.value = '';
      updateLocalStorage();
      displayNotes();
    }
  });

  // Display notes in the sidebar
  function displayNotes() {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
      const noteItem = document.createElement('li');
      noteItem.className = 'note-item';

      const noteTitle = document.createElement('span');
      noteTitle.className = 'note-item-title';
      noteTitle.textContent = note.title;

      const notePreview = document.createElement('p');
      notePreview.className = 'note-item-preview';
      notePreview.textContent = note.content.substring(0, 100) + (note.content.length > 100 ? '...' : '');

      noteItem.appendChild(noteTitle);
      noteItem.appendChild(notePreview);
      noteItem.addEventListener('click', () => loadNoteForEditing(index));
      
      notesList.appendChild(noteItem);
    });
  }

  // Load a note for editing
  function loadNoteForEditing(index) {
    const note = notes[index];
    noteTitleInput.value = note.title;
    newNoteInput.value = note.content;
  }

  // Update localStorage
  function updateLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  // Toggle note preview visibility
  togglePreviewCheckbox.addEventListener('change', (event) => {
    const notePreviews = document.querySelectorAll('.note-item-preview');
    notePreviews.forEach(preview => {
      preview.style.display = event.target.checked ? 'block' : 'none';
    });
  });
});
