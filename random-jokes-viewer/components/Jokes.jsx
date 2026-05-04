function Jokes ({ jokes }) {
  return (
    <section className="jokes-list">
      {jokes.map((joke) => (
        <article className="joke-card" key={joke.id}>
          <p>{joke.content}</p>
        </article>
      ))}
    </section>
  )
}

export default Jokes
