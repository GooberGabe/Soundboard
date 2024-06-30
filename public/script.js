document.addEventListener('DOMContentLoaded', () => {
  const soundboard = document.querySelector('.soundboard');
  const newSoundBtn = document.getElementById('new-sound-btn');
  const modal = document.getElementById('new-sound-modal');
  const closeModal = document.getElementById('close-modal');
  const submitNewSound = document.getElementById('submit-new-sound');
  const newSoundNameInput = document.getElementById('new-sound-name');
  const newSoundUrlInput = document.getElementById('new-sound-url');

  soundboard.addEventListener('click', (e) => {
    if (e.target.classList.contains('sound-button')) {
      const sound = new Audio("sounds/"+e.target.dataset.sound);
      sound.play().catch(error => {
        console.error('Error playing sound:', error);
        alert('Error playing sound. Check the console for details.');
      });
    }
  });

  newSoundBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    newSoundNameInput.value = '';
    newSoundUrlInput.value = '';
  });

  submitNewSound.addEventListener('click', async () => {
    const soundName = newSoundNameInput.value.trim();
    const soundUrl = newSoundUrlInput.value.trim();
    if (soundName && soundUrl) {
      try {
        const response = await fetch('/new-sound', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: soundName, url: soundUrl }),
        });
        const data = await response.json();
        if (data.success) {
          const newButton = document.createElement('button');
          newButton.classList.add('sound-button');
          newButton.textContent = data.name;
          console.log(data);
          newButton.dataset.sound = data.url;
          soundboard.appendChild(newButton);
          modal.style.display = 'none';
          newSoundNameInput.value = '';
          newSoundUrlInput.value = '';
        }
      } catch (error) {
        console.error('Error adding new sound:', error);
      }
    } else {
      alert('Please enter both a name and a URL for the new sound.');
    }
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      newSoundNameInput.value = '';
      newSoundUrlInput.value = '';
    }
  });
});