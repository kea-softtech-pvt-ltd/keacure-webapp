import './App.css';
import Header from './common/Header';
import Footer from './common/Footer';
import MainContainer from './MainContainer';
import { BrowserRouter as Router, Outlet } from "react-router-dom";
import { setDoctorId } from "./recoil/atom/setDoctorId";
import {  useRecoilState } from 'recoil';
const fbConfig = require("./firebase.config")

function App() {
  const [doctorId, sestDoctorId] = useRecoilState(setDoctorId);

  return (
      <div className="App">
        <Router>
          <Header/>
          <MainContainer></MainContainer>
          <Outlet/>
          <Footer/>
        </Router>
      </div>
  );
}
export default App;
