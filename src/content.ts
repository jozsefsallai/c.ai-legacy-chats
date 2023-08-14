async function mewChat(characterId: string, authToken: string): Promise<void> {
  try {
    const res = await fetch('https://beta.character.ai/chat/history/create/', {
      method: 'POST',
      body: JSON.stringify({ character_external_id: characterId }),
      credentials: 'same-origin',
      headers: {
        Authorization: `Token ${authToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const data = await res.json();
    const chatId = data.external_id;

    if (!chatId) {
      alert(
        'Unexpected response from Character.AI. Check the console for more info.',
      );
      console.warn('Unexpected response from Character.AI', data);
      return;
    }

    window.location.href = `https://beta.character.ai/chat?char=${characterId}&hist=${chatId}`;
  } catch (err) {
    alert(
      'Failed to create a new chat using the legacy API. Check the console for more info.',
    );
    console.error(err);
  }
}

async function newChatWithCurrentCharacter() {
  const queryParams = new URLSearchParams(window.location.search);
  const characterId = queryParams.get('char');

  if (!characterId) {
    alert('You are not on a character page!');
    return;
  }

  const rawTokenData = localStorage.getItem('char_token');
  if (!rawTokenData) {
    alert('You are not logged in!');
    return;
  }

  const tokenData = JSON.parse(rawTokenData);
  const authToken = tokenData.value;

  if (!authToken) {
    alert('You are not logged in!');
    return;
  }

  await mewChat(characterId, authToken);
}

function createButton(): HTMLButtonElement {
  const button = document.createElement('button');

  button.innerText = 'New Legacy Chat';
  button.id = 'new-legacy-chat-button';
  button.style.position = 'fixed';
  button.style.top = '16px';
  button.style.right = '16px';

  button.addEventListener('click', newChatWithCurrentCharacter);

  return button;
}

function injectButton() {
  const currentButton = document.querySelector('#new-legacy-chat-button');
  if (currentButton) {
    return;
  }

  const button = createButton();
  document.body.appendChild(button);
}

function destroyButton() {
  const button = document.querySelector('#new-legacy-chat-button');
  if (!button) {
    return;
  }

  button.remove();
}

chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  if (!message.data.url) {
    return;
  }

  const url = new URL(message.data.url);
  const pathname = url.pathname;

  if (pathname.startsWith('/chat')) {
    injectButton();
    console.log('[Character.AI Legacy Chat] Button injected.');
  } else {
    destroyButton();
    console.log('[Character.AI Legacy Chat] Button destroyed.');
  }
});

console.log('[Character.AI Legacy Chat] Extension loaded.');
