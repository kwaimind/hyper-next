# hyper-next

Starter app and file templates for the Hyper Island Next.js workshop.

## Install

To get started, run `npm i` in the `tvdb` directory. Then run `npm run dev` to start the Next.js app, and head to http://localhost:3000/ to see the app.

## Code snippets

API Docs: https://developers.themoviedb.org/3/tv

### 1. Fetching homepage data with useEffect

Data is fetched client side, after the app has downloaded, parsed & rendered for the 1st time, causing a white screen for the initial load.

```js
const [data, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=3c81d3d434a13d39edaea832df6550a3&page=1"
    );
    const shows = await res.json();
    setData(shows.results);
  };

  fetchData();
}, []);
```

### 2. Fetching homepage data with useStaticProps

Data is fetched at build time, & the HTML is pre-rendered for the initial page load.

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

### 3. Fetching dynamic page data with useStaticProps

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

### 4. Fetching dynamic page paths with useStaticProps

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

## Viewing the final app

Run `npm i` in the `tvdb-finished` directory.
