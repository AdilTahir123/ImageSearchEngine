const accessKey = 'YmT2YwbhJQhiOHjBhdmUIBcwEAw4-z-O3I07Ds1-mH8';

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');
const loader = document.getElementById('loader');

let keyword = '';
let page = 1;

async function fetchImages() {
  try {
    keyword = searchBox.value.trim();

    if (!keyword) {
      alert('Please enter a keyword to search images.');
      return;
    }

    loader.style.display = 'block';

    const url = `https://api.unsplash.com/search/photos?query=${keyword}&page=${page}&client_id=${accessKey}&per_page=9`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
      searchResult.innerHTML = '';
    }

    results.forEach((image) => {
      const imgElement = document.createElement('img');
      imgElement.src = image.urls.small;
      imgElement.alt = image.alt_description || `Image related to ${keyword}`;

      const imgLink = document.createElement('a');
      imgLink.href = image.links.html;
      imgLink.target = '_blank';
      imgLink.appendChild(imgElement);

      searchResult.appendChild(imgLink);
    });

    showMoreBtn.style.display = results.length ? 'block' : 'none';
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    loader.style.display = 'none';
  }
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  page = 1;
  fetchImages();
});

showMoreBtn.addEventListener('click', () => {
  page++;
  fetchImages();
});
