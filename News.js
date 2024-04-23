const apiKey = "e2bcacaa05404d238ec90d09dc1a30af";
const apiUrl = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(key) {
    const responce = await fetch(`${apiUrl}${key}&apiKey=${apiKey}`);
    const data = await responce.json();
    bindData(data.articles);
    console.log(data);
}

function bindData(article) {
    const cardContainer = document.getElementById("cards-container");
    const newsTemplate = document.getElementById("template-card");

    cardContainer.innerHTML = '';
   
    article.forEach(article => {
        if(!article.urlToImage) return;
        const cloneCard = newsTemplate.content.cloneNode(true);
        dataFill(cloneCard, article);
        cardContainer.appendChild(cloneCard);
    });
}

function dataFill(cloneCard, article) {
    const newsImg = cloneCard.querySelector("#news-img");
    const newsTitle = cloneCard.querySelector("#news-title");
    const newsSrc = cloneCard.querySelector("#source");
    const newsDesc = cloneCard.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSrc.innerHTML = `${article.source.name} • ${date}`;

    cloneCard.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    })
}

let curSelector = null;
function onNavClick(id) {
   fetchNews(id);
   const navItem = document.getElementById(id);
   curSelector?.classList.remove('active');
   curSelector = navItem;
   curSelector.classList.add('active');
}

const searchBtn = document.getElementById("btn-search");
const textSearch = document.getElementById("search-text");

searchBtn.addEventListener('click', () => {
    const query = textSearch.value;
    if(!query) return;
    fetchNews(query);
    curSelector?.classList.remove('active');
    curSelector = null;
})