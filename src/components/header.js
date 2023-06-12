
import {
  Button
} from "@mui/material";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import React from "react";
import "./header.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  const history = useHistory();
  const handleCart = () => {
    history.push('/cart');
  };
  const handleProducts = () => {
    history.push("/");
  };
  return (
    <Box className="header">
      <Box className="header-title">
        <h3>TeeRex Store</h3>
      </Box>
      <Box sx={{display:'flex'}}>
        <Button
          variant="contained"
          sx={{m:1,border:1,borderColor:"black"}}
          onClick={handleProducts}
        >
          Products
        </Button>
        <Button
          sx={{m:1,border:1,borderColor:"black"}}
          variant="contained"
          onClick={handleCart}
        >
          <ShoppingCartIcon/>
          
        </Button>
      </Box>
    </Box>
  );
};
export default Header;
