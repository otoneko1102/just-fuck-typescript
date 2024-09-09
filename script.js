document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.classList.add(`${savedTheme}-theme`);
  const themeToggleButton = document.querySelector('.theme-toggle');
  themeToggleButton.textContent = savedTheme === 'dark' ? '⚫' : '⚪';
  themeToggleButton.classList.add(savedTheme === 'dark' ? 'sun' : 'moon');

  // Create custom modals
  createModals();
});

function createModals() {
  // Create custom alert modal
  const alertModal = document.createElement('div');
  alertModal.id = 'customAlert';
  alertModal.className = 'custom-modal';
  alertModal.innerHTML = `
    <div class="custom-modal-content">
      <p id="alertMessage"></p>
      <div class="buttons-container single-button">
        <button onclick="closeAlert()">OK</button>
      </div>
    </div>
  `;
  document.body.appendChild(alertModal);

  // Create custom prompt modal
  const promptModal = document.createElement('div');
  promptModal.id = 'customPrompt';
  promptModal.className = 'custom-modal';
  promptModal.innerHTML = `
    <div class="custom-modal-content">
      <p id="promptMessage"></p>
      <br>
      <input type="text" id="promptInput">
      <br>
      <div class="buttons-container">
        <button onclick="closePrompt()">Cancel</button>
        <button onclick="submitPrompt()">OK</button>
      </div>
    </div>
  `;
  document.body.appendChild(promptModal);
}

function showAlert(message) {
  const alertElement = document.getElementById('customAlert');
  document.getElementById('alertMessage').textContent = message;
  alertElement.style.display = 'flex';
}

function closeAlert() {
  document.getElementById('customAlert').style.display = 'none';
}

function showPrompt(message, callback) {
  const promptElement = document.getElementById('customPrompt');
  document.getElementById('promptMessage').textContent = message;
  promptElement.style.display = 'flex';
  window.promptCallback = callback;
}

function submitPrompt() {
  const input = document.getElementById('promptInput').value;
  document.getElementById('customPrompt').style.display = 'none';
  window.promptCallback(input);
}

function closePrompt() {
  document.getElementById('customPrompt').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", async function () {
  const typedOutputs = document.querySelectorAll('.typing');

  for (const typedOutput of typedOutputs) {
    const textToType = typedOutput.getAttribute('text');
    let index = 0;
    let cursorInterval;

    async function typeText() {
      if (index < textToType.length) {
        if (textToType.charAt(index) === ';') {
          typedOutput.innerHTML += '<br>';
        } else {
          typedOutput.innerHTML += textToType.charAt(index);
        }

        index++;
        setTimeout(typeText, 25);
      } else {
        clearInterval(cursorInterval);
        typedOutput.classList.add('no-cursor');
      }
    }
    await typeText();
  }
});

document.getElementById('menu-toggle').addEventListener('click', function() {
  document.getElementById('menu').classList.toggle('open');
});

fetch('./sitemap.xml')
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'application/xml');
    const urls = xml.querySelectorAll('url > loc');
    const menuItems = document.getElementById('menu-items');

    urls.forEach(url => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = url.textContent;
      const text = url.textContent.split('/').at(-1)
      a.textContent = url.textContent.split('//').at(-1) === text ? 'home' : text;
      li.appendChild(a);
      menuItems.appendChild(li);
    });
  });

function vote(language) {
  if (language === 'JavaScript') {
    showAlert('Nice :)');
  } else if (language === 'TypeScript') {
    showAlert('Oh, fuck :(');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const voteButtons = document.getElementById('vote-buttons');
  const typeScriptButton = voteButtons.children[1];
  const emojiContainer = document.createElement('div');
  
  emojiContainer.id = 'emoji-container';
  voteButtons.appendChild(emojiContainer);

  typeScriptButton.addEventListener('mouseover', () => {
    generateEmojis(emojiContainer, 5);
  });

  typeScriptButton.addEventListener('mouseout', () => {
    emojiContainer.style.display = 'none';
    emojiContainer.innerHTML = '';
  });
});

function generateEmojis(container, count) {
  container.style.display = 'block';
  for (let i = 0; i < count; i++) {
    container.innerHTML += ' :(';
  }
}
