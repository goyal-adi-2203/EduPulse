import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import location from './location.png'
import phone from './telephone.png';
import mail from './mail.png';
import globe from './globe.png'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,  
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import './ContactUs.css';
function ContactUs() {
  return (
    <div className='w-100 h-100 ' style={{backgroundColor:"#FEF3ED",paddingTop:"0%"}}>
       

    <MDBContainer className="my-5">
    <h1 className='Contact-heading' >Get in Touch</h1>
    <hr
   style={{ marginTop:"0",background: "#DF8A71",height: "5px",border: "none",width: "30%",marginLeft: "auto",marginRight: "auto",marginBottom:"8%"
   }}
/>
      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.080922078824!2d75.8687690750442!3d22.725233427359395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd13ed2bae49%3A0xb884fc340de875c6!2sShri%20Govindram%20Seksaria%20Institute%20of%20Technology%20and%20Science!5e0!3m2!1sen!2sin!4v1693674542015!5m2!1sen!2sin"
           height="550px" style={{border:"0"}}  loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='rounded-start w-100'></iframe>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                
                <span className="h1 fw-bold my-3 mb-4">Contact Us</span>
              </div>

              
                 <MDBInput wrapperClass='mb-4' label='Name' id='formControlLg' type='text' size="md"/>
                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="md"/> 
                
                <div class="form-group purple-border">
  
  <textarea class="form-control mb-5" id="exampleFormControlTextarea4" placeholder='Write something...' cols="30" rows="4"></textarea>
</div>

              <MDBBtn className="mb-4 px-5" color='danger' size='lg'>Submit</MDBBtn>
              

              

            </MDBCardBody>
          </MDBCol>


        </MDBRow>
      </MDBCard>
      <div class="row mt-4" >
							<div class="col-md-3">
								<div class="dbox w-100 text-center">
			        		<div class="icon d-flex align-items-center justify-content-center">
			        			<img src={location} />
			        		</div>
			        		<div class="text">
				            <p><span>Address:</span> 23, Sir M. Visvesvaraya Marg, Indore Madhya Pradesh-452005</p>
				          </div>
			          </div>
							</div>
							<div class="col-md-3">
								<div class="dbox w-100 text-center">
			        		<div class="icon d-flex align-items-center justify-content-center">
                            <img src={phone} />
			        		</div>
			        		<div class="text">
				            <p><span>Phone:</span> <a href="tel://1234567920">+91 9109601206</a></p>
				          </div>
			          </div>
							</div>
							<div class="col-md-3">
								<div class="dbox w-100 text-center">
			        		<div class="icon d-flex align-items-center justify-content-center">
                            <img src={mail} />
			        		</div>
			        		<div class="text">
				            <p><span>Email:</span> <a href="mailto:info@yoursite.com">gs2111095@sgsitsindore.in</a></p>
				          </div>
			          </div>
							</div>
							<div class="col-md-3">
								<div class="dbox w-100 text-center">
			        		<div class="icon d-flex align-items-center justify-content-center">
                            <img src={globe} />
			        		</div>
			        		<div class="text">
				            <p><span>Website</span> <a href="#">yoursite.com</a></p>
				          </div>
			          </div>
							</div>
						</div>
					
				
		

    </MDBContainer>
    </div>
  );
}

export default ContactUs;