const fs = require("fs");
const data = require("./data.json");

const html = fs.readFileSync("./index.html").toString();

const REPEAT_REGEXP = /{{#each\s(\S+)\s}}\n([\S\s]+?(?<=\n)).*{{\/each}}/;
const INTERPOLATE_REGEXP = /\${{\s.+?\s}}/g;

const getPlaceholderKey = (ph) => ph.substring(4, ph.length - 3);

const getValue = (obj, fullPath) => {
  return fullPath
    .split(".")
    .reduce((acc, path) => (acc[path] ? acc[path] : path), obj);
};

const arrayPlaceholders = (language) => (placeholder) => {
  const [_, arrayPath, iterationTemplate] = placeholder.match(
    new RegExp(REPEAT_REGEXP, "m")
  );
  const items = getValue(data[language], arrayPath);

  const repeatedString = items
    .map((item) => {
      return `${iterationTemplate.replace(INTERPOLATE_REGEXP, (ph) => {
        const attribute = getPlaceholderKey(ph);
        return item[attribute];
      })}`;
    })
    .join("");
  return repeatedString;
};

const singlePlaceholders = (language) => (placeholder) => {
  const attribute = getPlaceholderKey(placeholder);
  return getValue(data[language], attribute) || attribute;
};

["es", "en"].forEach((language) => {
  fs.writeFileSync(
    `${language}.html`,
    html
      .replace(
        /{{#each\s(\S+)\s}}\n([\S\s]+?(?<=\n)).*{{\/each}}/gm,
        arrayPlaceholders(language)
      )
      .replace(INTERPOLATE_REGEXP, singlePlaceholders(language))
  );
});
