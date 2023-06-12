import React, { useEffect, useState,} from "react";
import axios from "axios";
import Header from "./header";
import { useSnackbar } from "notistack";
import Filters from "./Filters";
import {
  Grid
} from "@mui/material";
import SearchBar from "./SearchBar";
import TCard from "./TCard";
const Landing = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [tshirts, setTshirts] = useState([]);
  const [cartProducts,setCartProducts]=useState([]);
  const [filteredTshirts,setFilteredTshirts]=useState([]);
  const [debounceTimer,setDebounceTimer]=useState(0);
  const [show, setShow]=useState(true);
  const performAPICall = async () => {
    try {
      let resp = await axios.get(
        `https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`
      );
      setTshirts(resp.data);
      setFilteredTshirts(resp.data);
    } catch (e) {
      let obj = e.response;
      enqueueSnackbar(obj.data.message, { variant: "error" });
    }
  };
  useEffect(() => {
    performAPICall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isItemInCart=(item,cartProducts)=>{
    if(cartProducts.length===0){return ;}
    for(let i=0;i<cartProducts.length;i++)
    {
      if(cartProducts[i].id===item.id)
      {
        return true;
      }
    }
    return false;
  }
  const addToCart=(item,cartProducts)=>{
    if(isItemInCart(item,cartProducts))
    {
      enqueueSnackbar('already in cart,to upadate quantity go to cart',{ variant: "error" });
    }
    else 
    {
      let obj={...item};
      obj.currQuantity=1;
      cartProducts.push(obj);
      setCartProducts(cartProducts);
      localStorage.setItem(('Items'),JSON.stringify(cartProducts));
    }
  }
  const performSearch=(text)=>{
    let arr=[];
    for(let i=0;i<tshirts.length;i++)
    {
      if((tshirts[i].name).toLowerCase()===text.toLowerCase())
      {
        arr.push(tshirts[i]);
        break;
      }
      else if((tshirts[i].type).toLowerCase()===text.toLowerCase())
      {
        arr.push(tshirts[i]);
      }
      else if((tshirts[i].color).toLowerCase()===text.toLowerCase())
      {
        arr.push(tshirts[i]);
      }
    }
    if(arr.length===0){setFilteredTshirts(tshirts);}
    else{setFilteredTshirts(arr);}
  }
  const debounceSearch = (event, debounceTimeout) => {
    if (debounceTimeout !== 0) {
      clearTimeout(debounceTimeout);
    }
    let text = event.target.value;
    let newTimer = setTimeout(() => {
      performSearch(text);
    }, 1000);
    setDebounceTimer(newTimer);
  };
  return (
    <>
      <Header />
      <SearchBar handleSearch={debounceSearch} state={show} handleFilterButton={setShow} timer={debounceTimer}/>
      <Grid container>
        <Grid item xs={12} md={3} sx={{p:2}}>
          {show && <Filters list={tshirts} filteredList={filteredTshirts} handleTshirts={setFilteredTshirts}/>}
        </Grid>
        <Grid item xs={12} sm={6} md={9} sx={{p:2}}>
          <Grid container spacing={1.5} p={1.5}>
            {filteredTshirts.map((item) => {
              return (
                <Grid key={item.id} item xs={12} md={3}>
                  <TCard tshirt={item} handleAddToCart={()=>{addToCart(item,cartProducts);}}/>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Landing;
