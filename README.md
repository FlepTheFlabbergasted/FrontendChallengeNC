# FrontendChallengeNC

Check out the app on [GitHub Pages](https://fleptheflabbergasted.github.io/FrontendChallengeNC/)!

## Additional packages used

- [Angular Material](https://material.angular.io/)
  - UI components
- [Luxon](https://github.com/moment/luxon#readme)
  - For working with dates and times
- [Fontsource](https://fontsource.org/docs/getting-started/introduction)
  - To self host our font
- [angular-cli-ghpages](https://github.com/angular-schule/angular-cli-ghpages/#readme)
  - Deployment to GH pages

## Solution improvements

- Dynamic default values
  - We could set the default data to switch between e.g. Midsummer and Christmas depending on when
    the app is viewed.
- Vertical size control
  - If a too high `maxFontSizePx` is set on the
    [fit-text directive](src/app/directives/fit-text.directive.ts) and the event title is very very
    short, the size of the text becomes so large that it pushes the inputs off screen and you have
    to scroll. To combat this we could implement a check in the directive to not increase font size
    if the vertical size increases too much.
- Performance
  - If perfomance really becomes an issue, we can explore
    [some existing libraries and methods](https://css-tricks.com/fitting-text-to-a-container/).
    There's even someone who have managed to
    [fit text using only SASS](https://piccalil.li/blog/riffing-on-the-latest-css-fit-text-approach/)!
- Tests
  - If this app is going out to users and should be built further upon, unit and E2E tests would be
    good to fill out so that the functionality of the app is kept (and no bugs ofc).

## Running the app

- Clone the repository
- `cd` into the folder
- Run `npm install`
- Run `npm run start` to serve the app for development on `http://localhost:4200/`

## Deploying the app

Run `npm run deploy` to deploy the app to GitHub pages using
[angular-cli-ghpages](https://www.npmjs.com/package/angular-cli-ghpages). Update the `--base-href`
parameter in [package.json](./package.json) to your own GitHub repo name first if forked.
