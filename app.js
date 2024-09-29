document.addEventListener('DOMContentLoaded', () => {
  const addNoteBtn = document.getElementById('add-note-btn');
  const newNoteInput = document.getElementById('new-note');
  const notesList = document.getElementById('notes-list');

  // Load notes from localStorage
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  displayNotes();

  // Add note event
  addNoteBtn.addEventListener('click', () => {
    const noteText = newNoteInput.value.trim();
    if (noteText) {
      notes.push(noteText);
      newNoteInput.value = '';
      updateLocalStorage();
      displayNotes();
    }
  });

  // Display notes
  function displayNotes() {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
      const noteItem = document.createElement('li');
      noteItem.className = 'note';

      const noteText = document.createElement('span');
      noteText.textContent = note;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => deleteNote(index));

      noteItem.appendChild(noteText);
      noteItem.appendChild(deleteBtn);
      notesList.appendChild(noteItem);
    });
  }

  // Delete note
  function deleteNote(index) {
    notes.splice(index, 1);
    updateLocalStorage();
    displayNotes();
  }

  // Update localStorage
  function updateLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
  }
});
