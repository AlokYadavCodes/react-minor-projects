function Cat({ cat }) {
  const facts = [
    { label: 'Origin', value: cat.origin },
    { label: 'Life span', value: `${cat.life_span} years` },
    { label: 'Weight', value: `${cat.weight.metric} kg` },
  ]

  return (
    <article className="cat-card">
      <div className="cat-image-wrap">
        <img className="cat-image" src={cat.image} alt={cat.name} />
      </div>

      <div className="cat-content">
        <p className="cat-country">{cat.country_code}</p>
        <h2>{cat.name}</h2>
        <p className="cat-temperament">{cat.temperament}</p>

        <div className="cat-facts">
          {facts.map((fact) => (
            <div className="cat-fact" key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

export default Cat
