import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import './App.css'

// https://rapidapi.com/theapiguy/api/free-nba/
// https://www.stickpng.com/img/download/58419be4a6515b1e0ad75a58

function App() {
  const [games, setGames] = useState([])
  const [day, setDay] = useState(new Date())
  const getScores = async () => {
    const month = ('0' + (day.getMonth() + 1)).slice(-2)
    const date = ('0' + day.getDate()).slice(-2)
    const year = day.getFullYear()
    console.log(month, date, year)
    const res = await fetch(
      'https://free-nba.p.rapidapi.com/games?' +
        new URLSearchParams({
          'dates[]': `${year}-${month}-${date}`,
        }),
      {
        headers: {
          'x-rapidapi-host': 'free-nba.p.rapidapi.com',
          'x-rapidapi-key':
            'bf23548d17mshfb9c42fc97ee039p1b61b4jsnf167bc0c5949',
        },
      }
    )
    const data = await res.json()
    setGames(data.data)
  }
  useEffect(() => {
    getScores()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day])

  const addDay = () => {
    const newDay = new Date(day)
    newDay.setDate(day.getDate() + 1)
    setDay(newDay)
  }
  const subtractDay = () => {
    const newDay = new Date(day)
    newDay.setDate(day.getDate() - 1)
    setDay(newDay)
  }

  const today = () => {
    setDay(new Date())
  }

  return (
    <div className="App">
      <h1 className="header">
        Scores for {day.getMonth() + 1}/{day.getDate()}/{day.getFullYear()}
      </h1>
      <div className="buttons">
        <Button variant="outlined" onClick={subtractDay}>
          Prev Day
        </Button>
        <Button variant="outlined" onClick={today}>
          Today
        </Button>
        <Button variant="outlined" onClick={addDay}>
          Next Day
        </Button>
      </div>

      <div className="scoreboard">
        {games.length === 0 ? (
          <h1 className="no-games"> </h1>
        ) : (
          games.map((game) => (
            <div className="game" key={game.id}>
              <div
                className={`team visitor ${
                  game.visitor_team.name === '76ers'
                    ? 'Seventy-sixers'
                    : game.visitor_team.name
                }`}
              >
                <div className="image">
                  <img
                    className="logo"
                    src={`/${game.visitor_team.name}.png`}
                    alt=""
                  />
                </div>
                <h4>{game.visitor_team.name}</h4>
              </div>
              <div className="score">
                <h4 className="game-status">{game.status}</h4>
                {game.visitor_team_score !== 0 && game.home_team_score !== 0 && (
                  <div className="scores">
                    <h2>{game.visitor_team_score}</h2>
                    <h2>{game.home_team_score}</h2>
                  </div>
                )}
              </div>
              <div
                className={`team home ${
                  game.home_team.name === '76ers'
                    ? 'Seventy-sixers'
                    : game.home_team.name
                }`}
              >
                <div className="image">
                  <img
                    className="logo"
                    src={`/${game.home_team.name}.png`}
                    alt=""
                  />
                </div>
                <h4>{game.home_team.name}</h4>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
