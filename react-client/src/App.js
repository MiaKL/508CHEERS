import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Heading from './component/Header';
import Footer from './component/Footer';
import Programs from './component/Programs';
import ProgramDetails from './component/ProgramDetails';
import About from './component/About';
import Homepage from './component/Homepage';

import {Routes, Route} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <div>
                <Heading/>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/Programs" element={<Programs/>}/>
                    <Route path="/Program-Details" element={<ProgramDetails/>}/>
                </Routes>
                <Footer/>
            </div>
        </div>
    );
}

export default App;