import { useState, useEffect } from 'react'
import axios from 'axios';
import Header from './components/header'
import Content from './components/content';
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState<Date>(new Date())
  const [weather, setWeather] = useState<Weather>(Weather.Sunny)
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good)
  const [comment, setComment] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data as DiaryEntry[])
    })
  }, []);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const entryToAdd = {
      date: date.toLocaleDateString(),
      weather: weather,
      visibility: visibility,
      comment: comment,
    }
    axios.post<NewDiaryEntry>('http://localhost:3000/api/diaries', entryToAdd)
      .then(response => {
        setDiaries(diaries.concat(response.data as DiaryEntry) as DiaryEntry[])
      })

    setComment('')
  }

  return (
    <>
    <h2>Add new entry</h2>
     <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" value={date.toISOString().split('T')[0]} onChange={(e) => setDate(new Date(e.target.value))} />
        </label>
        <br />
        <label>
          Weather:
          {Object.values(Weather).map((w) => (
            <label key={w}>
              <input
                type="radio"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w as Weather)}
              />
              {w}
            </label>
          ))}
        </label>
        <br />
        <label>
          Visibility:
          {Object.values(Visibility).map((v) => (
            <label key={v}>
              <input
                type="radio"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v as Visibility)}
              />
              {v}
            </label>
          ))}
        </label>
        <br />
        <label>
          Comment:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <br />
        <button type="submit">add</button>
      </form>
    <Header />
    <Content diaryEntries={diaries} />
    </>
  )
}

export default App;
