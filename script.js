const API_key = "758b56d37ff04f2f93fa11d21d4c0ee9";
const url = "https://newsapi.org/v2/everything?q=";
const cardsContainer = document.getElementById("cards-container");
const templateNewsCard = document.getElementById("template-news-card");

window.addEventListener("load", () => fatchApi("india"));

async function fatchApi(apiCall) {
  const res = await fetch(`${url}${apiCall}&apiKey=${API_key}`);
  const data = await res.json();
  //   console.log(res);
  // console.log(data);
  bindData(data.articles);
}

function bindData(articles) {
  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardColon = templateNewsCard.content.cloneNode(true);
    displayNews(cardColon, article);
    // console.log(cardColon);
    cardsContainer.appendChild(cardColon);
  });
}

function displayNews(cardColon, article) {
  const cardImg = cardColon.getElementById("card-img");
  const newsTitle = cardColon.getElementById("news-title");
  const newsSourch = cardColon.getElementById("news-sourch");
  const newsDesc = cardColon.getElementById("news-desc");
  const dateNow = new Date(article.publishedAt);
  const DateLocal = Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  }).format(dateNow);
  cardImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsSourch.innerHTML = `${article.source.name} (${DateLocal})`;
  newsDesc.innerHTML = article.description;

  cardColon.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

const navItemAll = document.querySelectorAll(".nav-item");
// navItemAll.addEventListener("click", (e) => {
//   // fatchApi(e.target.textContent);
//   console.log(e.target.textContent);
// });

navItemAll.forEach((item) => {
  item.addEventListener("click", (e) => {
    fatchApi(e.target.textContent);
    // console.log(e.target.textContent);
  });
});

const searchBtn = document.querySelector("#search-btn");

const searchInput = document.querySelector("#search-input");

searchBtn.addEventListener("click", () => {
  if (!searchInput.value) {
    alert("Enter a valu first");
  } else if (searchInput.value) {
    fatchApi(searchInput.value);
  }
});
