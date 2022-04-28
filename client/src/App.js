import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InitialPage from './pages/InitialPage';
import Videogames from './pages/Videogames';
import CreateVideogame from './pages/CreateVideogame';
import Detailvideogame from './pages/Detailvideogame';
import Notfound from './pages/Notfound';

import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<InitialPage />} />
				<Route path='/videogames' element={<Videogames />} />
				<Route path='/videogames/:id' element={<Detailvideogame />} />
				<Route path='/CreateVideogame' element={<CreateVideogame />} />
				<Route path='*' element={<Notfound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
