const { crawlPage } = require("./crawl.js");

function main() {
  if (process.argv.length < 3) {
    console.log("no site provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("too many command line args");
    process.exit(1);
  }

  const baseURL = process.argv[2];

  console.log(`starting crawl of ${baseURL}`);
  console.log(crawlPage(baseURL));
}

main();
