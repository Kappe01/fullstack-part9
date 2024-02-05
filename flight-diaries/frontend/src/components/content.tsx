import { DiaryEntry } from "../types";

interface DiaryEntries {
  diaryEntries: DiaryEntry[];
}

const Content = (props: DiaryEntries): JSX.Element => {
    return (
        <div>
          {props.diaryEntries.map((entry, index) => (
            <div key={index}>
            <b>{entry.date}</b>
            <p>weather: {entry.weather}<br></br>visibility: {entry.visibility}</p>
            </div>
          ))}
        </div>
    );
  };

export default Content;