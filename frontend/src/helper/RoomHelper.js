export const getRoomByOwner = (id) => {
  return fetch(`http://localhost:5000/api/v1/users/getroombyowner?ownerId=${id}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};