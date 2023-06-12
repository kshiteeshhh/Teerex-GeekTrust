import React, { useEffect, useState, } from "react";
import Header from "./header";
import {
  Box,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import "./cart.css";
const Cart = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(()=>{
    let localCart=JSON.parse(localStorage.getItem('Items'));
    setCartProducts(localCart);
  },[])
  useEffect(()=>{
    localStorage.setItem(('Items'),JSON.stringify(cartProducts))
  },[cartProducts])
  const totalValue = () => {
    let sum = 0;
    for (let i = 0; i < cartProducts.length; i++) {
      sum += cartProducts[i].currQuantity * cartProducts[i].price;
    }
    return sum;
  };
  const increaseQuantity = (id, curr, quant) => {
    if (curr === quant) {
      enqueueSnackbar("sorry can't add more of this product", {
        variant: "error",
      });
    } else {
      let arr = [...cartProducts];
      for (let i = 0; i < arr.length; i++) {
        if (id === arr[i].id) {
          arr[i].currQuantity += 1;
        }
      }
      setCartProducts(arr);
      let string = JSON.stringify(arr);
      localStorage.setItem("Items", string);
    }
  };
  const decreaseQuantity = (id, curr, quant) => {
    let arr = [...cartProducts];
    for (let i = 0; i < arr.length; i++) {
      if (id === arr[i].id) {
        arr[i].currQuantity -= 1;
        if (arr[i].currQuantity === 0) {
          arr.splice(i, 1);
        }
      }
    }
    setCartProducts(arr);
    let string = JSON.stringify(arr);
    localStorage.setItem("Items", string);
  };
  const ItemQuantity = ({ value, handleAdd, handleDecrease }) => {
    return (
      <Stack direction="row" alignItems="center">
        <IconButton size="small" color="primary" onClick={handleDecrease}>
          <RemoveOutlined />
        </IconButton>
        <Box padding="0.5rem">{value}</Box>
        <IconButton size="small" color="primary" onClick={handleAdd}>
          <AddOutlined />
        </IconButton>
      </Stack>
    );
  };
  const handleDelete = (id) => {
    let arr = [...cartProducts];
    for (let i = 0; i < arr.length; i++) {
      if (id === arr[i].id) {
        arr.splice(i, 1);
      }
    }
    setCartProducts(arr);
    let string = JSON.stringify(arr);
    localStorage.setItem("Items", string);
  };
  return (
    <>
      <Header />
      <Box className="cart" sx={{ p: 1 }}>
        <h3>Shopping Cart</h3>
        <Box
          display="flex"
          flexDirection="column"
          padding="1rem"
          flexWrap="wrap"
          justifyContent="space-evenly"
        >
          {cartProducts.map((ele) => {
            return (
              <Box key={ele.id} display="flex" margin={2} padding={1} sx={{border:1,borderColor:"#8441A4", borderRadius:3}}>
                <Box className="image-container">
                  <img
                    src={ele.imageURL}
                    alt={ele.name}
                    width="100%"
                    height="100%"
                  />
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <h3>{ele.name}</h3>
                    <h3>${ele.price}</h3>
                  </Box>
                  <Box padding={2}>
                    <ItemQuantity
                      value={ele.currQuantity}
                      handleAdd={() => {
                        increaseQuantity(
                          ele.id,
                          ele.currQuantity,
                          ele.quantity
                        );
                      }}
                      handleDecrease={() => {
                        decreaseQuantity(
                          ele.id,
                          ele.currQuantity,
                          ele.quantity
                        );
                      }}
                    />
                    <Button
                      variant="contained"
                      className="card-button card-actions"
                      onClick={() => {
                        handleDelete(ele.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Box>
            );
          })}
          <Box display="flex" justifyContent="space-evenly" alignItems="center">
            <Box
              color="#3C3C3C"
              fontSize="1.5rem"
              alignSelf="center"
              fontWeight="700"
            >
              Total Amount
            </Box>
            <Box
              color="#3C3C3C"
              fontWeight="700"
              fontSize="1.5rem"
              alignSelf="center"
            >
              ${totalValue(cartProducts)}
            </Box>
          </Box>
        </Box>
      </Box>
      </>
  );
};
export default Cart;
