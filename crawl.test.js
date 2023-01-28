const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL", () => {
  const input = "http://GIThub.com/ga7axy/web-crawler-js/";
  const actual = normalizeURL(input);
  const expected = "github.com/ga7axy/web-crawler-js";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML fullURL", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="https://github.com/ga7axy/web-crawler-js/">
                GitHub WebCrawler Repo
            </a>
        </body>
    </html>
  `;
  const inputBaseURL = "https://github.com/ga7axy/web-crawler-js";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://github.com/ga7axy/web-crawler-js/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML pathOnlyURL", () => {
  const inputHTMLBody = `
      <html>
          <body>
              <a href="/ga7axy/web-crawler-js/">
                  GitHub WebCrawler Repo
              </a>
          </body>
      </html>
    `;
  const inputBaseURL = "https://github.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://github.com/ga7axy/web-crawler-js/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both type of URL", () => {
  const inputHTMLBody = `
        <html>
            <body>
                <a href="https://github.com/ga7axy/web-crawler-js/">
                    GitHub WebCrawler Repo
                </a>
                <a href="/ga7axy/web-crawler-js/">
                    GitHub WebCrawler Repo
                </a>
            </body>
        </html>
      `;
  const inputBaseURL = "https://github.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://github.com/ga7axy/web-crawler-js/",
    "https://github.com/ga7axy/web-crawler-js/",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid url", () => {
  const inputHTMLBody = `
        <html>
            <body>
                <a href="undefined">
                    undefined
                </a>
            </body>
        </html>
      `;
  const inputBaseURL = "https://github.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
