import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Show({ show }) {
  return (
    <div className="container">
      <Head>
        <title>{show.name}</title>
        <meta name="description" content={show.overview} />
      </Head>

      <main className="main">
        <Link href="/">
          <a className="back">← Back to home</a>
        </Link>
        <Image
          src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
          alt={show.name}
          width={200}
          height={300}
        />
        <h1 className="title">{show.name}</h1>
        <p className="description">{show.overview}</p>
      </main>
    </div>
  );
}

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
