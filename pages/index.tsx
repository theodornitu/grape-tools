import Footer from '../components/Footer';
import About from '../components/MainPage/About';
import Carousel from '../components/MainPage/Carousel';
import Faq from '../components/MainPage/Faq';
import Main from '../components/MainPage/Main';
import Navbar from '../components/Navbar';

import type {NextPage} from 'next'
const Home: NextPage = () => {
    return (
        <div>
                <Navbar />
                <About />
                <Main />
                <Carousel />
                <Faq />
                <Footer footerLanding />
        </div>
        
    );
};

export default Home;

