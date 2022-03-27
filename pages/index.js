import Head from "next/head";

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
          {shows?.map((show) => (
            <a className="card" key={show.name}>
              <div className="image">
                <img
                  src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
                  alt={show.name}
                  width={100}
                  height={150}
                />
              </div>
              <div className="content">
                <h2>{show.name}</h2>
                <p>{show.overview.slice(0, 50)}...</p>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
