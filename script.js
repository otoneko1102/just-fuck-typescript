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
    alert('Nice :)');
  } else if (language === 'TypeScript') {
    alert('Oh, fuck :(');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const voteButtons = document.getElementById('vote-buttons');
  const typeScriptButton = voteButtons.children[1];
  const emojiContainer = document.createElement('div');
  
  emojiContainer.id = 'emoji-container';
  voteButtons.appendChild(emojiContainer);

  typeScriptButton.addEventListener('mouseover', () => {
    generateEmojis(emojiContainer, 25);
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
