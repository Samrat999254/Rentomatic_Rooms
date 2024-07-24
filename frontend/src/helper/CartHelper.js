// eslint-disable-next-line react-hooks/rules-of-hooks
export const addItemToCart = (item, next) => {
  //check whether room is bookmarked or not
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    let alreadyExist = false;

    cart = cart.map((product) => {
      if (item._id === product._id) {
        alreadyExist = true;
        return { ...product, count: product.count + 1 };
      } else {
        return product;
      }
    });

    if (!alreadyExist) {
      cart.push({ ...item, count: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

//displaying all bookmarked room
export const getAllCartItems = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("cart"));
  }
};

//remove bookmarked room
export const removeItemFromCart = (productId) => {
  if (typeof window !== "undefined") {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.filter((item) => productId !== item._id);

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const emptyCart = (next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify([]));
    next && next();
  }
};
