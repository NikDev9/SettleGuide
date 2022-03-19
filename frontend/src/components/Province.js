import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROVINCE_URL } from '../constants';
import '../css/Province.css';

const Province = () => {

    const [prov, setProv] = useState("");
    const nav = useNavigate();

    const handleChange = (event) => {
        let target = event.target;
        let value = target.value;
        setProv(value);
    }

    const saveProvince = () => {
        Cookies.set("province", prov);
        const req = {'prov': prov, 'userId': Cookies.get('userId')};
        console.log('req', req);
        axios.post(PROVINCE_URL, req)
        .then(res => {
            nav('/home')
        });
    }

    return (
        <div className="provDiv">
            <h1 className="provHead">Select province</h1>
            <select name="prov" className="provDropdown" onChange={handleChange}>
              {/* {dept.map((dt) =>  */}
              <option value="none" selected disabled hidden>Select an option</option>
              <option value="Saskatchewan">Saskatchewan</option>
              {/* )} */}
            </select>
            <button className="next" onClick={() => saveProvince()}>Next</button>
        </div>
    );
}

export default Province;