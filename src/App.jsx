import React, {useEffect, useState} from 'react'
import './App.css'
import Card from './components/Card'

const cardProps = [
  {"url": 'src/assets/1.png', disabled: false},
  {"url": 'src/assets/2.png', disabled: false},
  {"url": 'src/assets/3.png', disabled: false},
  {"url": 'src/assets/4.png', disabled: false},
  {"url": 'src/assets/5.png', disabled: false},
  {"url": 'src/assets/6.png', disabled: false},
  {"url": 'src/assets/7.png', disabled: false},
  {"url": 'src/assets/8.png', disabled: false}]

function App() {
  const [counter, setCounter] = useState(0)
  const [title, setTitle] = useState("Memoria")
  const [currentColor, setColor] = useState("#fff")
  const [cards, setCards] = useState([])
  const [move, setMove] = useState([])

  const setNewGrid = () => {
    let cards = [...cardProps, ...cardProps].sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()*10}))

    setCards(cards)
    setCounter(0)
    setMove([])
}

const logMove = () => {
  setMove([])
  setCounter(counter => counter + 1 )
}

const moveHandler = (card) => {

  if(!card.disabled){
  
    if (!move.length) {
      setMove([card])
    }

    else if (move.length === 1) {
      if(move[0].id !== card.id){ setMove(move => [...move, card]) }
    }

  }

}

useEffect(() => {

  console.log(cards)

  setTimeout(() => {

    if (move.length === 2) {

      if(move[0].url === move[1].url) {
        setCards(cards => {
          return cards.map( card => {

            if (card.url === move[0].url) {
              return {...card, disabled: true}
            }
            return card

          })
        })
        logMove()
      }

      else { logMove() }

    }

    let cond = true

    cards.forEach((card) => {
      if(!card.disabled) {cond = false}
    })

    cond && cards.length !== 0 ? setTitle("¡Ganaste!") : setTitle("Memoria")
    cond && cards.length !== 0 ? setColor("#d1bb2e") : setColor("#fff")

  }, 1000)

}, [move[1]])

return (

  <div>
    <button onClick={setNewGrid}>Reiniciar</button>
    <h1 onClick={setNewGrid} style={{ color: currentColor }}>{title}</h1>
    <h3>Movimientos: {counter}</h3>
    <div className="cardContainer">
      {cards.map(card => ( <Card key = {card.id} card = {card} handler={moveHandler} 
      disabled={move[0] === card || move[1] === card || card.disabled}/> ))}
    </div>
  </div>

)

}

export default App
