const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  const currentURLObj = new URL(currentURL);
  const baseURLObj = new URL(baseURL);

  if (currentURLObj.hostname !== baseURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;

  console.log(`crawling ${currentURL}`);
  let htmlBody = "";
  try {
    const response = await fetch(currentURL);
    if (response.status > 399) {
      console.log(
        `error in fetch with status code ${response.status} on page: ${currentURL}`
      );
      return pages;
    }
    const contentType = response.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `non html response, content type ${contentType} on page: ${currentURL}`
      );
      return pages;
    }
    htmlBody = await response.text();
  } catch (error) {
    console.log(
      `error in fetch because ---> ${error.message}, on page ${currentURL}`
    );
  }

  const nextURLs = getURLsFromHTML(htmlBody, baseURL);

  for (const nextURL of nextURLs) {
    pages = await crawlPage(baseURL, nextURL, pages);
  }

  return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`error with full url -> ${error.message}`);
      }
    } else {
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`error with path type url -> ${error.message}`);
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  let fullPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (fullPath.length > 0 && fullPath.slice(-1) === "/") {
    fullPath = fullPath.slice(0, -1);
  }
  return fullPath;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
