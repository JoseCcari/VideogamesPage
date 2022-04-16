import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <div> ruta principal</div>}/>
        <Route path='/videogames' element = { <div> Videogames </div>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
