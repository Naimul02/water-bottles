import { useEffect, useState } from "react";
import { addToLS, getStoredCart, removeFromLS } from "../../Utilities/localStorage";
import Bottle from "../Bottle/Bottle";
import Cart from "../Cart/Cart";
import './Bottles.css'

const Bottles = () => {
      const [bottles , setBottles] = useState([]);
      const [cart , setCart] = useState([])

      useEffect(() => {
          fetch("bottles.json")
          .then(res => res.json())
          .then(data => setBottles(data))

      } ,[])

      // load cart from local storage
      useEffect(() => {
        console.log("called the useEffect" , bottles.length)
          
          if(bottles.length){
            const storedCart = getStoredCart();
            console.log(storedCart , bottles);


            const savedCart = []
            for(const id of storedCart){
              console.log(id)

              const bottle = bottles.find(bottle => bottle.id === id);
              if(bottle){
                  savedCart.push(bottle)
              }
            }
            console.log(savedCart);
            setCart(savedCart);
          }
      } , [bottles])

      const handleAddToCart = bottle => {
          const newCart = [...cart , bottle]
          setCart(newCart);
          addToLS(bottle.id)
          
      }

      const handleRemoveCart = id => {
        const remainingCart = cart.filter(bottle => bottle.id != id);
        setCart(remainingCart)
          // visual cart remove
          // remove from LS
          removeFromLS(id);
      }
  return (
    <div>
        <h2>Bottles Available : {bottles.length}</h2>  
          <Cart
            cart={cart}
            handleRemoveCart={handleRemoveCart}
          ></Cart>

      
       <div className="bottle-container">
       {
            bottles.map(bottle => <Bottle
              key={bottle.key}
                bottle={bottle}
                handleAddToCart={handleAddToCart}
            ></Bottle>)
        }
       </div>



    </div>
  );
};

export default Bottles;