// * This assumes your name in package.json is the same as your repo name
// * and your author name is the same as your github username

const isProd = process.env.NODE_ENV === "production";
const { name, author } = require("./package.json");

module.exports = {
  assetPrefix: isProd ? `https://cdn.statically.io/gh/${author.name}/${name}/gh-pages/` : "",
};
