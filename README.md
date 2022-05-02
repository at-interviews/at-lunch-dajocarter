# AllTrails at Lunch

I chose the [with-jest](https://github.com/vercel/next.js/tree/canary/examples/with-jest) Next.js example as a starting point since it's a React-based framework configured to use Jest and has built-in support for Global CSS, SCSS Modules and TypeScript.

## Requirements Met

- [x] The web app will use the Google Places API for its data source https://github.com/dajocarter/at-lunch/blob/main/pages/api/search.ts
- [x] The web app should display the search results as a list https://github.com/dajocarter/at-lunch/blob/main/pages/index.tsx#L177-L188
- [x] Search results on the list should include basic information about the restaurant https://github.com/dajocarter/at-lunch/blob/main/components/card/index.tsx
- [x] A search feature will be included that allows the user to search for restaurants https://github.com/dajocarter/at-lunch/blob/main/pages/index.tsx#L163-L171
- [x] The web app should display the search results as pins on a map https://github.com/dajocarter/at-lunch/blob/main/pages/index.tsx#L105-L126
- [x] Allow the user to flag restaurants as a favorite, and indicate its favorite status in the current and future search results https://github.com/dajocarter/at-lunch/blob/main/components/card/index.tsx#L10-L38
- [x] One or two test cases implemented with jest or a framework of your choice https://github.com/dajocarter/at-lunch/blob/main/components/card/index.test.tsx and https://github.com/dajocarter/at-lunch/blob/main/components/sort/index.test.tsx

## How to Use

Create a `.env.local` file that contains `NEXT_PUBLIC_GMAPS_API_KEY=yourGoogleMapsAPIkey`. Then, in your terminal, run the following command:

```bash
npm run dev
# or
yarn dev
```

## Run Jest Tests

There are test suites for the Card and SortButton components. In your terminal, run the following command:

```bash
npm test
# or
yarn test
```
