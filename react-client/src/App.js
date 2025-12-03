import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Heading from './component/Header';
import Footer from './component/Footer';
import Programs from './component/Programs';
import ProgramDetails from './component/ProgramDetails';
import YouthForm from "./component/YouthForm";
import VolunteerForm from "./component/VolunteerForm";
import PartnerForm from "./component/PartnerForm";

import {Routes, Route} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <div>
                <Heading/>
                <Routes>
                    <Route path="/" element={<p>Content to be added...</p>}/>
                    <Route path="/Programs" element={<Programs/>}/>
                    <Route path="/Program-Details" element={<ProgramDetails/>}/>
                    <Route path="/Volunteer-Form" element={<VolunteerForm />} />
                    <Route path="/Youth-Form" element={<YouthForm />} />
                    <Route path="/Partner-Form" element={<PartnerForm />} />
                </Routes>
                <Footer/>
            </div>
        </div>
    );
}

export default App;