import Head from "next/head";
import Link from "next/link";

export default function ShowSSR({ show, timeNow }) {
  return (
    <div className="container">
      <Head>
        <title>{show.name}</title>
        <meta name="description" content={show.overview} />
      </Head>

      <main className="main">
        <Link href="/">
          <a className="link">← Back to home</a>
        </Link>
        <img
          src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
          alt={show.name}
          width={200}
          height={300}
        />
        <h1 className="title">{show.name}</h1>
        <p className="description">{show.overview}</p>

        <p className="description">
          Average score as of {JSON.parse(timeNow)}:<br />
          {show.vote_average}
        </p>
      </main>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${params.showId}?api_key=3c81d3d434a13d39edaea832df6550a3&language=en-US`
  );
  const show = await res.json();

  const timeNow = JSON.stringify(new Date());

  return {
    props: {
      show,
      timeNow,
    },
  };
}
