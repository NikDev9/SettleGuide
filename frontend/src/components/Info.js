import Header from "./Header";
import '../css/Info.css';

const Info = () => {
    return (
        <div>
            <Header />
            <div className="infoContainer">
                <h1 className="mainHeading">Housing</h1>
                <p className="infoPara">You have two options when planning living arrangements in Canada. You can find a temporary place to live when you arrive such as a hotel, hostel, airbnb, friends house, etc. Any of these options allow for a short-erm housing while you wait to find a place that you want to settle into. We recommend booking a place online before you arrive in Canada to ensure you have a reservation and a room.</p>
                <p className="infoPara">You can also start looking for apartments and homes online before arriving. Some apartments even allow you to close a lease before arriving. You can use websites to search available rentals like:</p>
                <p className="infoPara">Kijiji: <a className="infoLink" href="https://www.kijiji.ca/b-short-term-rental/saskatchewan/c42l9009">https://www.kijiji.ca/b-short-term-rental/saskatchewan/c42l9009</a></p>
                <p className="infoPara">Mainstreet: <a className="infoLink" href="https://www.mainst.biz/apartments/regina">https://www.mainst.biz/apartments/regina</a></p>
                <p className="infoPara">and there's also Facebook marketplace.</p>
            </div>
            <div className="infoContainer">
                <h1 className="mainHeading">Banking</h1>
                <p className="infoPara">Once you arrive in Canada you will want to open a Canadian bank account as soon as possible for obvious reasons. Opening a Canadian bank account is extremely easy compared to other countries. In Canada to open a bank account all you need is to walk into the bank and provide a valid personal identification. You do not need a job, permanent address, money to put into the address, or credit. The bank teller will help walk you through the process and also, many Canadian banks have special services for newcomers. Some of the best banks for newcomers include: RBC Royal Bank, BMO Bank of Montreal, TD Bank, CIBC, Scotiabank and HSBC.</p>
            </div>
            <div className="infoContainer">
                <h1 className="mainHeading">Documents</h1>
                <ol>
                    <li><p className="infoSubheading">Proof of Residence (Saskatchewan id , Driving licence)</p></li>
                    <li><p className="infoSubheading">Health card</p>
                    <p className="infoPara">Both Canadian citizens and permanent residents can apply for public health insurance in Canada. Depending on which province or territory you live in, they each have their own insurance plans. Some provinces require newcomers to wait up till 3 months before receiving government health insurance. Since government health insurance is free, during the wait time you can purchase private health insurance. Private health insurances also cover things that public health insurance does not cover.</p>
                    </li>
                    <li><p className="infoSubheading">University id</p></li>
                    <li><p className="infoSubheading">SIN</p>
                    <p className="infoPara">In Canada, you need a Social Insurance Number to work. Having the Social Insurance Number also gives you access to government programs and benefits. You can apply for one in person at a Service Canada office or by mail. In order to receive a Social Insurance Number you will need to provide an original primary document to prove your identity and status such as a Study permit.</p></li>
                    <li><p className="infoSubheading">Study Permit</p></li>
                    <li><p className="infoSubheading">Lease/Rental agreement</p></li>
                </ol>
            </div>
        </div>
    );
}

export default Info;