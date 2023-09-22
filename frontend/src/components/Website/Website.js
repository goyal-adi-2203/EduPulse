import React from "react";
import LandingPage from "../LandingPage/LandingPage";
import ContactUs from "../ContactUs/ContactUs";
import AboutUs from "../AboutUs/AboutUs";
import OurServices from "../OurServices/OurServices";
import Accordion from "../FAQAccordion/FAQAccordion";


function Website(){
    return(
        <div>
            <LandingPage />
            <OurServices />
            <AboutUs />
            <Accordion />
            <ContactUs />
        </div>
    );
}

export default Website;