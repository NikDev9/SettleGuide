import Header from "./Header";
import '../css/Info.css';
import {useLocation} from 'react-router-dom';

const Info = (props) => {

    const location = useLocation();

    //renders html that is sent via props by the home component 
    return (
        <div>
            <Header />
            <div dangerouslySetInnerHTML={ { __html: location.state.content } }>
            </div>
        </div>
    );
}

export default Info;