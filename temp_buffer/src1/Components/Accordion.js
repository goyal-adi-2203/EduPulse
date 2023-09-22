import { useState } from "react";
import React from "react";

function Accordion() {
    const [selected, setselected] = useState(null)
    const toggle = (i) =>{     
        if(selected===i){
            return setselected(null);
        }
        setselected(i);
    }

    return (
        <div className="wrapper">
            <div className="accordion"><h1 style={{marginLeft:"25px"}}>FAQs</h1>
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