import React from "react";
import photo from './photo.avif'
import './OurServices.css'
function OurServices(){
    return(
        <div className="services-main-div">
        <div className="services-heading">
            <h1>About Us</h1>
            <hr
   style={{ marginTop:"0",background: "#DF8A71",height: "5px",border: "none",width: "30%",marginLeft: "auto",marginRight: "auto",marginBottom:"5%"
   }}
/>
        </div>
        <div className="services-container">
            <section className="service">
                <div className="service-image">
                    <img src={photo} />
                </div>
                <div className="service-content">
                    <h2>What we are...</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt posuere 
                        elit et venenatis. Etiam luctus rhoncus aliquet. Aenean maximus nec mi id congue. 
                        Curabitur arcu massa, dictum sed pharetra ut, porta eget metus. Phasellus gravida 
                        lobortis feugiat. Etiam lectus quam, ullamcorper quis elementum ut, finibus mattis 
                        ligula. Quisque vel quam vitae ipsum molestie ultrices et quis nisi. Quisque tempor
                         egestas sem vel condimentum. Sed nec ligula non nunc sagittis placerat.</p>
                </div>
            </section>
        </div>
        </div>
    );
}

export default OurServices;