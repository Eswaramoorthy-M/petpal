import { createContext, useContext , useState } from "react";


const CartContext=createContext();

export function CartProvider({children}){
  const [items,setItems]=useState([]);
  const [list,setList]=useState([]);
  
  const addToCart = (item)=>{
    const existingItem=items.find((cartItem)=>cartItem._id===item._id);
    if (!existingItem) {
      // If the item is not in the cart, add it with quantity 1
      setItems([...items, { ...item, quantity: 1 }]);
  } else {
      // If the item is already in the cart, update its quantity
      setItems(
          items.map((cartItem) =>
              cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
          )
      );
  }
 
  };
  // Update cart item quantity
  const updateCartItemQuantity = (itemId, newQuantity) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

   // Calculate total price
   const getTotalPrice = () => {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  const addToWish = (data)=>{
    //find method will searches through the items of array and  find an item with the same _id as the item being added.
    const existing = list.find((wishListItem) => wishListItem._id === data._id);
    if (!existing) {
      setList([...list, data ]);
  } 
  else {
    removeFromWish(data._id);
  }
 
  };

  const removeFromWish = (dataId) => {
    setList((prevItems) => prevItems.filter((data) => data._id !== dataId));
  };

  const removeFromCart = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };
  return(
    <CartContext.Provider value={{items,addToCart,updateCartItemQuantity, getTotalPrice,removeFromCart, list,addToWish,removeFromWish }}>{children}</CartContext.Provider>
  )
}

export default CartContext;
