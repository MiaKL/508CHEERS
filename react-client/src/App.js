import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Heading from './component/Header';
import Footer from './component/Footer';
import Programs from './component/Programs';

function App() {
    return (
        <div className="App">
            <div>
                <Heading/>
                <Programs/>
                <Footer/>
            </div>
        </div>
    );
}

export default App;