import React from "react";
const API = `http://localhost:5000/api/v1/users`;

const ImageHelper = ({ productId, className }) => {
  const imgUrl = productId
    ? `${API}/getphoto/${productId}`
    : "https://images.pexels.com/photos/3577561/pexels-photo-3577561.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
  console.log(imgUrl);
  return (
    <img
      crossorigin="anonymous"
      src={imgUrl}
      alt="ProductPhoto"
      className={className}
    />
  );
};

export default ImageHelper;
