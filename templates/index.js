import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home({ shows }) {
  return (
    <div className="container">
      <Head>
        <title>tvDB</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">Welcome to tvDB</h1>

        <p className="description">
          Get started by editing <code className="code">pages/index.js</code>
        </p>

        <div className="grid">
          {shows.map((show) => (
            <Link href={`/${show.id}`} key={show.name}>
              <a className="card">
                <img
                  src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
                  alt={show.name}
                  width={100}
                  height={150}
                />
                <div>
                  <h2>{show.name}</h2>
                  <p>{show.overview.slice(0, 50)}...</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

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
