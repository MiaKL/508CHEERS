import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Heading from "./component/Header";
import Footer from './component/Footer';

function App() {
    return (
        <div className="App">
            <div>
                <Heading/>
                <br/>
                <div>Website Content...</div>
                <br/>
                <Footer/>
            </div>
        </div>
    );
}

export default App;