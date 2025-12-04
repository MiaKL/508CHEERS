import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Heading from './component/Header';
import Footer from './component/Footer';
import Programs from './component/Programs';
import ProgramDetails from './component/ProgramDetails';
import About from './component/About';
import VolunteerForm from "./component/VolunteerForm";
import YouthForm from "./component/YouthForm";
import PartnerForm from "./component/PartnerForm";
import Homepage from './component/Homepage';
import FlyersDownloads from "./component/FlyersDownloads";

import {Routes, Route} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <div>
                <Heading/>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/About" element={<About/>}/>
                    <Route path="/Programs" element={<Programs/>}/>
                    <Route path="/Program-Details" element={<ProgramDetails/>}/>
                    <Route path="/Volunteer-Form" element={<VolunteerForm />} />
                    <Route path="/Youth-Form" element={<YouthForm />} />
                    <Route path="/Partner-Form" element={<PartnerForm />} />
                    <Route path="/FlyersDownloads" element={<FlyersDownloads />} />
                </Routes>
                <Footer/>
            </div>
        </div>
    );
}

export default App;