_**Note:** this is currently not any actual truffle box. You can not use `truffle unbox` to download it_

# Drizzle, Next, Typescript and Chakra UI Truffle Box

This also includes:

- Prettier support for solidity
- gh-pages
- @drizzle/react-components types
- xDai and Ganache support
- Example greeter contract

The greeter contract is live on xDai and viewable [here](https://kowasaur.github.io/drizzle-next-typescript/)

## Setup

<!-- TODO: apply for this to be an actual box
1. `truffle unbox kowasaur/drizzle-next-typescript`
2. Create a `.env` file in the root directory and write `MNEMONIC=YOUR MNEMONIC HERE`
   - For example, `MNEMONIC=word1 word2 word3 word4 you get the point`
   - This is only necessary if you are deploying to a non-local network
3. Change the package.json name to your repo name and the author name to your github username -->

1. Press the green **Use this template** button (next to the code download button) and create a repository
2. Download your repository onto your computer
3. Run `npm install`
4. Create a `.env` file in the root directory and write `MNEMONIC=YOUR MNEMONIC HERE`
   - For example, `MNEMONIC=word1 word2 word3 word4 you get the point`
   - This is only necessary if you are deploying to a non-local network
5. Change the package.json name to your repo name and the author name to your github username

If you want to run the app, setup Ganache and run the following:

1. `truffle migrate`
2. `npm run dev`

Then go to localhost:3000 in your browser

## How This Was Made

This is everything I did to get this setup

1. `npx create-next-app --example with-chakra-ui-typescript`
2. `truffle init`
3. delete _test_ folder
4. Change _truffle-config.js_:
   1. Add `contracts_build_directory: "./src/artifacts/",`
   2. Uncomment the development network and change the port to `7545`
5. change `build` script in _package.json_ to `next build && next export`
6. `npm install --save-dev prettier prettier-plugin-solidity`
7. `npm install @drizzle/store @drizzle/react-plugin @drizzle/react-components`
8. Changed/added a bunch of the default example files
9. `npm install @truffle/hdwallet-provider dotenv`
10. Add xDai support
11. `npm i gh-pages`
