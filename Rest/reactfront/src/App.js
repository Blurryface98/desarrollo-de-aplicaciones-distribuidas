import './App.css';

import { BrowserRouter,Routes,Route } from 'react-router-dom';

import ShowProducts from './componets/ShowProducts';
import CreateProduct from './componets/CreateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ShowProducts/>}/>
          <Route path='/create' element={<CreateProduct/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
