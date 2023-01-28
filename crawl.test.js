const { normalizeURL } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL", () => {
  const input = "https://GIThub.com/ga7axy/web-crawler-js/";
  const actual = normalizeURL(input);
  const expected = "github.com/ga7axy/web-crawler-js";
  expect(actual).toEqual(expected);
});
