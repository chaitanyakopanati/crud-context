import './App.css';
import{ BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import  Navbarr  from './components/layout/Navbarr';
import CountryHome from './components/country/CountryHome'
import CreateCountry from './components/country/CreateCountry'
import StateHome from './components/state/StateHome';
import CreateState from './components/state/CreateState';
import CityHome from './components/city/CityHome';
import CreateCity from './components/city/CreateCity';

function App() {
  return (<>
  <Router>
  <div className="App">
    <Navbarr/>
    <Routes>
      <Route exact path='/countryhome' element={<CountryHome/>}/>
      <Route exact path='/createcountry' element={<CreateCountry/>}/>
      <Route exact path='/createcountry/:id' element={<CreateCountry/>}/>
      <Route exact path='/statehome' element={<StateHome/>}/>
      <Route exact path='/createstate' element={<CreateState/>}/>
      <Route exact path='/createstate/:id' element={<CreateState/>}/>
      <Route exact path='/cityhome' element={<CityHome/>}/>
      <Route exact path='/citycreate' element={<CreateCity/>}/>
      <Route exact path='/citycreate/:id' element={<CreateCity/>}/>
    </Routes>
    </div>
    </Router>
    </>);
}

export default App;
