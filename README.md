# hyper-next

Starter app and file templates for the Hyper Island Next.js workshop.

## Tutorial

In this tutorial, we will look at the basics of Next.js and start to build a simple TV show database using The Movie Database API.

To get started, run `npm i` then run `npm run dev` to start the Next.js app, and head to http://localhost:3000/ to see the app.

In the sample app ([built using the `create-next-app` cli](https://nextjs.org/docs/getting-started#automatic-setup)), we have some directories:

- `/pages` - where all of our pages live (and therefore our routes)
- `/public` - some static assets we need like logos and favicons
- `/styles` - our global styles. I've just given some basic CSS here but you can use whatever CSS stylesheet/framework you like with Next.js (CSS, CSS Modules, Styled Components, Tailwind, etc)
- `/templates` - some solutions to our workshop code-along if you get stuck. You can copy and paste these files to catch up

There is also a backup data file `db.json` in case the API blocks our requests and thinks we are spamming them. You can import this data to any file with `import data from "../db.json";`

## Code snippets

API Docs: https://developers.themoviedb.org/3/tv

### 1. Fetching homepage data with useEffect

Data is fetched client side, _after_ the app has downloaded, parsed & rendered for the 1st time, causing a white screen for the initial load.

```js
const [shows, setShows] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=3c81d3d434a13d39edaea832df6550a3&page=1"
    );
    const showsRes = await res.json();
    setShows(showsRes.results);
  };

  fetchData();
}, []);
```

### 2. Fetching homepage data with useStaticProps

Data is fetched at build time by Next.js, and the HTML is pre-rendered for the initial page load. No white screen.

```js
export async function getStaticProps() {
  const res = await fetch(
    "https://api.themoviedb.org/3/tv/popular?api_key=3c81d3d434a13d39edaea832df6550a3&page=1"
  );
  const shows = await res.json();

  return {
    props: {
      shows: shows.results,
    },
  };
}
```

### 3. Image Optimization

Images on modern websites are hard. Luckily Next.js ships with a ready-made Image component that does all of the hardwork for developers.

You can read the [documentation](https://nextjs.org/docs/basic-features/image-optimization) to learn more about the component API.

```js
import Image from "next/image";

<Image src="/me.png" alt="Picture of the author" width={500} height={500} />;
```

### 4.1 SSG vs. SSR - Getting dynamic data statically

Here we fetch some dynamic data when we build the app, but notice that the `currentTime` is static when we refresh the page. If we need dynamic or "live" data, `getStaticProps` won't work.

```js
export async function getStaticProps() {
  const currentTime = new Date().toISOString();

  return {
    props: {
      currentTime,
    },
  };
}
```

And render the time with `<p className="description">The time is {currentTime}</p>`

### 4.2 SSG vs. SSR - Getting dynamic data dynamically

Using `getServerSideProps`, the data is fetched at request time. We still get the initial HTML but Next.js handles all of this when requesting the page. Now the `currentTime` changes on each request since it is calculated at request time.

```js
export async function getServerSideProps() {
  const currentTime = new Date().toISOString();

  return {
    props: {
      currentTime,
    },
  };
}
```

### 5.1 Fetching dynamic parameters with useRouter

If we want dynamic pages (profile page, a unique video page, etc) we can create dynamic pages with Next.js. One template, unlimited pages. To get the dynamic/unique part of the page, we can use the next router package. One issue here is we can only get the parameter on the client side.

The query parameter is the same as the filename.

i.e. with a file named `[showId]` we can fetch the show requested with `showId`.

```js
import { useRouter } from "next/router";
const router = useRouter();
const { showId } = router.query;
```

### 5.2. Fetching dynamic page data with useStaticProps

If we want the dynamic parameter ahead of time, we can fetch it on the server with `getStaticProps`.

The query parameter is still the same as the filename.

```js
export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${params.showId}?api_key=3c81d3d434a13d39edaea832df6550a3&language=en-US`
  );
  const show = await res.json();

  return {
    props: {
      show,
    },
  };
}
```

### 6. Fetching dynamic page paths with useStaticProps

When making dynamic static pages, Next-js needs to know how to create the page at build time and give it a page path.

With `getStaticPaths`, we can tell Next.js how to do this.

i.e. with a file named `[showId]` we want the path for each page to use the show.id value from our API data.

```js
export async function getStaticPaths() {
  const res = await fetch(
    "https://api.themoviedb.org/3/tv/popular?api_key=3c81d3d434a13d39edaea832df6550a3&page=1"
  );
  const shows = await res.json();

  const paths = shows.results.map((show) => ({
    params: { showId: show.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}
```
