import React from "react";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
  } from "@mui/material";
  import "./TCard.css";
const TCard= ({tshirt,handleAddToCart})=>{
    return (
        <Card key={tshirt.id} className="card" sx={{borderRadius:4}}>
        <CardMedia height='250' image={tshirt.imageURL} component='img' />
        <CardContent className="card-content">
          <Typography variant="h5">
            {tshirt.name}
          </Typography>
          <Typography variant="h6" >
            ${tshirt.price}
          </Typography>
        </CardContent>
        <Button variant="contained" startIcon={<AddShoppingCartOutlined/>} onClick={handleAddToCart}>ADD TO CART</Button>
      </Card>
    )
}

export default TCard;