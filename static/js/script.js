const result = document.querySelector("#results");
const download = document.querySelector("#downloads");
const form = document.querySelector("#search");
const input = document.querySelector("#input");

function updatePage() {
  download.innerHTML = "<h2>Скачанные файлы</h2>";
  Object.entries(localStorage).forEach((i) => {
    download.innerHTML += `<a href="${i[1]}" class="link">${i[0]}</a><br/>`;
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
    if (urls) {
      result.innerHTML = "<h2>Найденные файлы</h2>";
      for (let i = 0; i < urls.length; i++) {
        const newUrl = `<a href="${urls[i]}" target="_blank" class="url">${urls[i]}</a><br/>`;
        result.innerHTML += newUrl;
      }
      const addedUrls = document.querySelectorAll(".url");
      addedUrls.forEach((url) => {
        url.addEventListener("click", (e) => {
          e.preventDefault();

          // let data = axios.get(`${url.href}`);
          // console.log(data);

          // let http = new XMLHttpRequest();
          // http.open("GET", `${url.href}`);
          // http.onreadystatechange = function () {
          //   if (this.readyState == 4 && this.status == 200) {
          //     console.log(this.responseText);
          //   }
          // };
          // http.send(null);

          localStorage.setItem(`${url.href}`, `${url.href}`);
          // localStorage.setItem(`${input.value}`, `${JSON.stringify(content)}`);
          download.innerHTML += `<a href="${url.href}" class="link">${url.href}</a><br/>`;
        });
      });
    }
  } else {
    result.innerHTML = "<h2>Ничего не найдено</h2>";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const keyword = input.value.toLowerCase();
  if (keyword != "") {
    getUrls(keyword);
  } else {
    result.innerHTML = "<h2>Ничего не найдено</h2>";
  }
});

updatePage();
