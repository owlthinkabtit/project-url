const API_KEY = 'spoo_TQmYef3zgu4p6jd3GxtDIfJk5qIUOVfR1SH1DJnRNQU';

const shortenBtn = document.querySelector('.shorten-form button');
const urlInput = document.querySelector('.shorten-form input');
// const resultsArea = document.querySelector('#shorten-area .container');

shortenBtn.addEventListener('click', function (event) {
  event.preventDefault();

  const urlToShorten = urlInput.value;
  const inputParent = urlInput.parentElement;

  if (urlToShorten === "") {
    inputParent.classList.add('error');
    return;
  } else {
    inputParent.classList.remove('error');
  }

  shortenLink(urlToShorten);
});

function shortenLink(longUrl) {
  fetch('https://spoo.me/', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'X-Spoo-Key': 'spoo_TQmYef3zgu4p6jd3GxtDIfJk5qIUOVfR1SH1DJnRNQU'
    },
    body: new URLSearchParams({
      'url': longUrl
    })
  })
  .then(response => response.json())
  .then(data => {
   displayLink(longUrl, data.short_url);
  })
  .catch(error => {
    console.error("Oops, something went wrong:", error);
  });
}

function displayLink(longUrl, shortUrl) {
  const container = document.getElementById('link-results-container');

  const card = document.createElement('div');
  card.className = 'link-card';

  card.innerHTML = `
    <span class="long-url">${longUrl}</span>
    <span class="short-url">${shortUrl}</span>
    <button class="btn-copy">Copy</button>
  `
  const copyBtn = card.querySelector('.btn-copy');
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(shortUrl);
    copyBtn.innerText = "Copied!";
    copyBtn.classList.add('copied');
  });

  container.prepend(card);
}