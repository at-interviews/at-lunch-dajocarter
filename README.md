# AllTrails at Lunch

I chose the [with-jest](https://github.com/vercel/next.js/tree/canary/examples/with-jest) Next.js example as a starting point since it's configured to use Jest and has built-in support for Global CSS, SCSS Modules and TypeScript.

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
