const result = document.querySelector("#results");
const download = document.querySelector("#downloads");
const form = document.querySelector("#search");
const input = document.querySelector("#input");

function updatePage() {
  download.innerHTML = "<h2>Скачанные файлы</h2>";
  Object.entries(localStorage).forEach((i) => {
    download.innerHTML += `<a href="#" class="link">${i[0]}</a>`;
  });

  const links = document.querySelectorAll(".link");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(`${link.href}`);
    });
  });
}

async function getUrls(keyword) {
  const response = await fetch("/api/keywords/" + keyword, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (response.ok === true) {
    const urls = await response.json();
    console.log(urls);
    // if (urls) {
    result.innerHTML = "<h2>Найденные файлы</h2>";
    for (let i = 0; i < urls.length; i++) {
      result.innerHTML += `<a href="${urls[i]}" class="link" target="_blank">${urls[i]}</a><br/>`;
    }
  } else {
    result.innerHTML = "<h2>Ничего не найдено</h2>";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const keyword = input.value.toLowerCase();
  getUrls(keyword);
});

updatePage();
