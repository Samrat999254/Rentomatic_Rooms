import React from "react";
import "./privacy.css";
const Privacy = () => {
  const detail = [
    {
      title: "Introduction",
      description: `Rentomatic Rooms is a free rental portal in Nepal that focuses on the marketing of 
            rental rooms. You agree to our terms and conditions as a Rentomatic Rooms user. The 
            Rentomatic Rooms Privacy Policy governs how the company collects, uses, stores, and 
            discloses information obtained from users. This privacy statement applies to the
             Rentomatic Rooms website as well as all of the company's products and services.`,
    },
    {
      title: "Advertisements",
      description: `Rentomatic Rooms allows anyone with a rental home to post an ad on our website. When an ad is created, it is recorded into our database and approved before being made available to potential tenants.`,
    },
    {
      title: "Personal identification information",
      description: `In association with the activities, services, features, or resources we make accessible on our Site, we may collect personal identifiable information from Users in a variety of ways. Users have the option of visiting our site anonymously. Users' personal identification information will only be collected if they willingly provide it to us.`,
    },
    {
      title: "Web browser cookies",
      description: `Our Site may use “cookies” to enhance User experience. Cookies are stored on a user's hard drive by their web browser for record-keeping and sometimes to track information about them. Users can set their web browser to reject cookies or to notify them when cookies are sent. If they do, be aware that some areas of the Site may become inaccessible.`,
    },
    {
      title: "Security",
      description: `Please contact info@rentomaticrooms.com right away, if you consider that your Rentomatic Rooms email address or password has been exploited.`,
    },
    {
      title: "Changes to Terms",
      description: `Rentomatic Rooms is always updating. As a result, we have the right to change current terms and prices at any time without warning. The last time these terms were modified was in January of 2024.

        `,
    },
    {
      title: "Your acceptance of these terms",
      description: `You express your acceptance of this policy by using this Site. Please do not use our Site if you do not agree to this policy. Following the publishing of modifications to this policy, your continuing use of the Site will be considered your acceptance of those changes.`,
    },
  ];
  return (
    <div className="detail-container">
      <div>
        {detail.map((data) => {
          return (
            <>
              <div className=" title">
                <h1>{data.title}</h1>
              </div>
              <div className=" details">
                <p>{data.description}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Privacy;
