import React, { useState, useEffect } from 'react';
import "./App.css"

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1)

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    if(data && data.products){
      setProducts(data.products)
    }
    // console.log(data.products)
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectedPage = (sPage)=>{
    if(sPage >=1 && sPage <= products.length/10 && sPage !== page)
    setPage(sPage)
  }


  return (
   <div>
    {products.length > 0 && <div className='products'>
      {
        products.slice(page*10 - 10, page*10).map((prod) => {
          return(
            <span className='products_single' key={prod.id}>
            <img src={prod.thumbnail} alt={prod.title}/>
            <span>{prod.title}</span>
            </span>
          ) 

        })
      }
      </div>}
      {products.length > 0 && <div className='pagination'>
        <span className={page > 1 ? "" : "pageDisabled"} onClick={() => selectedPage(page - 1)}>⏮️</span>  
        <span>{
          [...Array(products.length / 10)].map((_,i) =>{
            return <span className={page === i+1? "selectedPagination":""} onClick={() => selectedPage(i+1)} key={i}>{i+1}</span> 
          })
        }
        </span>  
        <span className={page < products.length/10 ? "" : "pageDisabled"} onClick={() => selectedPage(page + 1)}>⏭️</span>  

      </div>}
   </div>
  );
};

export default App;
