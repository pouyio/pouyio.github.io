const puppeteer = require("puppeteer");
const fs = require("fs");
const Bundler = require("parcel-bundler");
const path = require("path");

(async () => {
  const bundler = new Bundler(path.join(__dirname, "./index.html"));
  const parcelServer = await bundler.serve();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log(`${process.env.LANGUAGE} language process start`);

  await page.goto(`http://localhost:1234/${process.env.LANGUAGE}.html`, {
    waitUntil: "networkidle0",
  });
  await page.evaluateHandle("document.fonts.ready");
  const buffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  if (!fs.existsSync("docs")) {
    fs.mkdirSync("docs");
  }
  fs.writeFileSync(
    `docs/cv_vicente_ortiz_${process.env.LANGUAGE}.pdf`,
    buffer,
    "binary"
  );

  console.log(`${process.env.LANGUAGE} language process end`);
  parcelServer.close();
  await browser.close();
  process.exit();
})();
