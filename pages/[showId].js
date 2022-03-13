import Head from "next/head";
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
      </main>
    </div>
  );
}

/* export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false,
  };
} */

/* export async function getStaticProps({ params }) {
  return {
    props: {},
  };
} */
