import { useState } from 'react';
import './App.css';
import Box1 from './components/Box1'
import Box2 from './components/Box2'

function App() {
  const [mgrsBox1, setMgrsBox1] = useState("");
  const [radiusBox1, setRadiusBox1] = useState(0);
  const [answerLat, setAnswerLat] = useState(0)
  const [answerLng, setAnswerLng] = useState(0)

  const onAddData = (newData) =>{
    setMgrsBox1(newData.mgrs1);
    setRadiusBox1(newData.redius);
    setAnswerLat(newData.answerLat);
    setAnswerLng(newData.answerLng)
  }

  return (
    <div className='container p-3'> 
      <div className='row gap-4 p-2 d-flex justify-content-center justify-content-lg-around'>
        <div className='col-12 col-md-12 col-lg-5 card py-3 shadow-sm' >
          <Box1 addData = {onAddData} />
        </div>
        <div className='col-12 col-md-12 col-lg-5 card py-3 shadow-sm'>
          <Box2 mgrs1 = {mgrsBox1} radius = {radiusBox1} answerLat ={answerLat} answerLng ={answerLng}/>
        </div>
      </div>
    </div>
  );
}

export default App;