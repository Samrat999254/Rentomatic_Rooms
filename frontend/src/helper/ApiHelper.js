const API = "http://localhost:5000/api/v1/users";
export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      // Accept: "application/json",
      // "Content-Type": "multipart/form-data",
    },
    body: user,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(`${API}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((user) => {
      return user.json();
    })
    .catch((err) => console.log(err));
};

export const getAllRooms = async () => {
  try {
    const response = await fetch(`${API}/getallrooms`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getAllTenant = () => {
  return fetch(`${API}/getalltenant`, {
    method: "GET",
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const searchRoom = (type, param) => {
  console.log(type, param);

  return fetch(`${API}/searchrooms/?${type}=${param}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const searchTenant = (type, param) => {
  console.log(type, param);
  return fetch(`${API}/searchtenant/?${type}=${param}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getRoomById = (productId) => {
  console.log(productId);
  return fetch(`${API}/hello/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      // console.log(response.json());
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getTenantById = (productId) => {
  console.log(productId);
  return fetch(`${API}/gettenantbyid/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateOwner = (user) => {
  return fetch(`${API}/update`, {
    method: "PUT",
    headers: {
      // Accept: "application/json",
      // "Content-Type": "multipart/form-data",
    },
    body: user,
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateR = (user) =>{
  return fetch(`${API}/updateroom`, {
    method: "PATCH",
    headers: {
      // Accept: "application/json",
      // "Content-Type": "multipart/form-data",
    },
    body: user,
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
    
}

//reset password
export const resetpassword = (user, token) => {
  return fetch(`${API}/reset-password/${token}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((user) => {
      return user.json();
    })
    .catch((err) => console.log(err));
};

//send reset token mail
export const sendresetokenmail = (user) => {
  return fetch(`${API}/request-password-reset`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((user) => {
      return user.json();
    })
    .catch((err) => console.log(err));
};

//delete room
export const deleteRoom = (id) => {
  return fetch(`${API}/deleteroom/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(user),
  })
    .then((user) => {
      return user;
    })
    .catch((err) => console.log(err));
};

//delete tenant
//delete room
export const deleteTenant = (id) => {
  return fetch(`${API}/delete-tenant/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(user),
  })
    .then((user) => {
      return user;
    })
    .catch((err) => console.log(err));
};

//get tenant profile
export const getProfile = (ids) => {
  return fetch(`${API}/profile/${ids}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
