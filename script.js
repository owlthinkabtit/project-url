const button = document.querySelector('.shorten-form button');
const input = document.querySelector('.shorten-form input');
const resultsArea = document.querySelector('#shorten-area .container');

button.addEventListener('click', (event) => {
  event.preventDefault();
  const longUrl = input.ariaValueMax;

  fetch('https://spoo.me/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
    body: new URLSearchParams({ url: longUrl })
  })
  .then(response => response.json())
  .then(data => {
    const newLinkBox = document.createElement('div');
    newLinkBox.className = 'link-result';
    newLinkBox.innerHTML = `<p>${data.short_url}</p>`;
    resultsArea.appendChild(newLinkBox);
  });
});