export default function Card( {card, handler, disabled} ) {

  const handleMove = () => {
    handler(card)
  }

  return (

    <div className="card" onClick={handleMove}>
      <div className={disabled ? "disabled" : ""}>
        <img className="flipped" src={card.url} />
        <img className="default" src='src/assets/default.png'/>
      </div>
    </div>

  )

}