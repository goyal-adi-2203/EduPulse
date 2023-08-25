
import './App.css';
import Login from './Login';
import Accordion from './Accordion';
import {Routes,Route} from "react-router-dom";
import Registration from './Registration';
function App() {
  return (
    <Routes>

      <Route path='/login exact' element={<Login />} />
      <Route path='/faq' exact element={<Accordion />} />
      <Route index exact element={<Registration />} />
    </Routes>

    
  );
}

export default App;
