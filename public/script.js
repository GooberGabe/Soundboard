function loadSound(url) {
    return new Promise((resolve, reject) => {
      const sound = new Audio(url);
      sound.oncanplaythrough = () => resolve(sound);
      sound.onerror = () => reject(new Error(`Failed to load sound: ${url}`));
    });
}

function playSound(sound) {
    sound.currentTime = 0; // Reset the playback position
    sound.play();
}

document.querySelectorAll('.sound-button').forEach(button => {
    const soundUrl = `sounds/${button.dataset.sound}`;
  
    button.addEventListener('click', async () => {
      try {
        const sound = await loadSound(soundUrl);
        playSound(sound);
      } catch (error) {
        console.error(error);
      }
    });
  });