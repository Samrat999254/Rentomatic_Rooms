import React from "react";
import "./faq.css";

const Faq = () => {
  const qna = [
    {
      question: "What actually is Rentomatic Rooms?",
      answer: `Rentomatic Rooms is a rental platform that aims to help user to advertise and rent rooms at free    
            of cost. It focuses on providing easy room rental services to the people.`,
    },
    {
      question: "How to advertise rooms?",
      answer: `You needs to register as a owner to advertise your available rooms. All the personal and room        
            details should be valid during registration..`,
    },
    {
      question: "How to create tenant account?",
      answer: `You needs to register as a tenant to create tenant account. Add details of a room you are looking  
            forward to rent.`,
    },
    {
      question: "Can owner post ads of multiple rooms?",
      answer: `Yes, when a user is registered as owner, he/she can post multiple ads of available roooms. User 
            must login to the system.`,
    },
    {
      question: "How does search filter work?",
      answer: `Search filter categorized rooms and tenants based on your selection. It helps user to easy access 
            their preferred rooms and tenants.
            `,
    },
    {
      question: "What bookmark does?",
      answer: `Bookmark saves your bookmarked rooms in your profile so that you can easily view and access those in 
            future easily.
            `,
    },
    {
      question: "How does chat button work?",
      answer: ` You can easily get your querie’s answer using chat box. Chat queries related to application  
            functionalities and you will get your respond immediately.
            `,
    },
    {
      question: "What is customer rating?",
      answer: `Customer rating helps us to gather user experiences. You can rate system based on your experience 
            of using this application.
            `,
    },
  ];
  return (
    <div className="faq-container">
      <div className="faq-container-hero">
        <h1 style={{color:"black"}}>FREQUENTLY ASKED QUESTION</h1>
      </div>

      <div className="faq-question-container">
        <div>
          {qna.map((data) => {
            return (
              <>
                <div className=" card card-wrapper">
                  <div className="card-header">
                    <h2
                      style={{
                        fontWeight: "500",
                        fontSize: "1.4rem",
                        marginTop: "0.4rem",
                      }}
                    >
                      Q. {data.question}
                    </h2>
                  </div>
                  <div className="card-p">
                    <p>
                      <span style={{ fontWeight: "bold" }}>A.</span>{" "}
                      {data.answer}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Faq;
