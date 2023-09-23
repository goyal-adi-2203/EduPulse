import { useState } from "react";
import './FAQAccordion.css'

function Accordion() {
    const [selected, setselected] = useState(null)
    const toggle = (i) =>{     
        if(selected===i){
            return setselected(null);
        }
        setselected(i);
    }

    return (
        <div style={{marginTop:"12%"}}>
            <h1 className='faq-heading'  >Frequently Asked Questions</h1>
    <hr
   style={{ marginTop:"1%",background: "#DF8A71",height: "5px",border: "none",width: "30%",marginLeft: "auto",marginRight: "auto",marginBottom:"0%"
   }}
/>
        <div className="wrapper">
            
            <div className="accordion">
                {data.map((items,i) =>(
                    <div className="item">
                        <div className="title" onClick={() => toggle(i)}>
                            <h4>{items.question}</h4>
                            <span>{selected ===i ? '-' : '+'}</span>
                        </div>
                        <div className={selected ===i ? 'content show' : 'content'}>{items.answer}</div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    )
}
const data = [
    {
      "id": 1,
      "question": "What is the capital of France?",
      "answer": "Paris"
    },
    {
      "id": 2,
      "question": "Who wrote the novel 'The Lord of the Rings'?",
      "answer": "J.R.R. Tolkien"
    },
    {
      "id": 3,
      "question": "What is the scientific name for the common house cat?",
      "answer": "Felis catus"
    },
    {
      "id": 4,
      "question": "What is the largest ocean in the world?",
      "answer": "Pacific Ocean"
    },
    {
      "id": 5,
      "question": "What is the highest mountain in the world?",
      "answer": "Mount Everest"
    } ]
  
export default Accordion