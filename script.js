const discordIconSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-discord" viewBox="0 0 16 16">
  <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
</svg>
`;
document.getElementById("icon-discord").innerHTML = discordIconSVG;

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
