import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function ImageDownloader() {

  // useState 훅의 초기값으로 현재 날짜를 넣어줌
  const [today, setToday] = useState(new Date()); 

  // onChange 이벤트에 넣어줘서 날짜가 지날 때마다 today값이 업데이트 되도록 구현
  const onChangeToday = () => {
    setToday(today);
  };
  return (
    <div>
      <Calendar onChange={onChangeToday} value={today} />
    </div>
  );
}

export default ImageDownloader;