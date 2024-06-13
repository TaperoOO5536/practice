const result = document.querySelector("#results");
const download = document.querySelector("#downloads");
const form = document.querySelector("#search");
const input = document.querySelector("#input");

function updatePage() {
  download.innerHTML = "<h2>Скачанные файлы</h2>";
  Object.entries(localStorage).forEach((i) => {
    download.innerHTML += `<a href="${i[0]}" class="link">${i[0]}</a><br/>`;
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
    return urls;
  } else {
    return null;
  }
}

async function addUrls(keyword) {
  const urls = await getUrls(keyword);
  if (urls) {
    result.innerHTML = "<h2>Найденные файлы</h2>";
    for (let i = 0; i < urls.length; i++) {
      const newUrl = `<a href="${urls[i]}" target="_blank" class="url">${urls[i]}</a><br/>`;
      result.innerHTML += newUrl;
    }
    const addedUrls = document.querySelectorAll(".url");
    for (let i = 0; i < addedUrls.length; i++) {
      addedUrls[i].addEventListener("click", (e) => {
        e.preventDefault();
        getPage(keyword, i);
      });
    }
  } else {
    result.innerHTML = "<h2>Ничего не найдено</h2>";
  }
}

async function getPage(keyword, url) {
  const response = await fetch("api/" + keyword + "/" + url, {
    methos: "GET",
    headers: { Accept: "application/json" },
  });
  let urls = await getUrls(keyword);
  if (response.ok === true) {
    const page = await response.json();
    localStorage.setItem(`${urls[url]}`, `${page}`);
    download.innerHTML += `<a href="${urls[url]}" class="link">${urls[url]}</a><br/>`;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const keyword = input.value.toLowerCase();
  if (keyword != "") {
    addUrls(keyword);
  } else {
    result.innerHTML = "<h2>Ничего не найдено</h2>";
  }
});

updatePage();
