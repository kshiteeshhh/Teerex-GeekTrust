import { Box, Checkbox, FormControlLabel } from "@mui/material";
import "./Filters.css";
import { useState } from "react";
import { useSnackbar } from "notistack";
const Filters = ({ list, filteredList, handleTshirts }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [Checked, setChecked] = useState({
    color: [],
    gender: [],
    price: [],
    type: [],
  });
  const handleFn = (event, type) => {
    const newChecked = { ...Checked };
    const currIndex=Checked[type].indexOf(event.target.name);
    if(currIndex===-1)
    {
      newChecked[type].push(event.target.name);
    }
    else 
    {
      newChecked[type].splice(currIndex,1);
    }
    let arr = [];
    let temp=[];
    if (newChecked.color.length > 0) {
      if(arr.length>0)
      {
        newChecked.color.forEach((ele) => {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].color === ele) {
              temp.push(arr[i]);
            }
          }
        })
        arr=temp;
        temp=[];
      }
      else 
      {
        newChecked.color.forEach((ele) => {
          for (let i = 0; i < list.length; i++) {
            if (list[i].color === ele) {
              arr.push(list[i]);
            }
          }
        })
      }
    }
    if (newChecked.gender.length > 0) {
      if(arr.length>0)
      {
        newChecked.gender.forEach((ele) => {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].gender === ele) {
              temp.push(arr[i]);
            }
          }
        })
        arr=temp;
        temp=[];
      }
      else 
      {
        newChecked.gender.forEach((ele) => {
          for (let i = 0; i < list.length; i++) {
            if (list[i].gender === ele) {
              arr.push(list[i]);
            }
          }
        })
      }
    }
    if (newChecked.price.length > 0) 
    {
      if(arr.length>0)
      {
        newChecked.price.forEach((ele) => {
          let priceArr=ele.split("-");
          if(priceArr.length===2)
          {
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].price>=Number(priceArr[0])&& arr[i].price<=Number(priceArr[1])) {
                temp.push(arr[i]);
              }
            }
          }
          else 
          {
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].price>=Number(priceArr[0])) {
                temp.push(arr[i]);
              }
            }
          }
        })
        arr=temp;
        temp=[];
      }
      else 
      {
        newChecked.price.forEach((ele) => {
          let priceArr=ele.split("-");
          if(priceArr.length===2)
          {
            for (let i = 0; i < list.length; i++) {
              if (list[i].price>=Number(priceArr[0])&& list[i].price<=Number(priceArr[1])) {
                arr.push(list[i]);
              }
            }
          }
          else 
          {
            for (let i = 0; i < list.length; i++) {
              if (list[i].price>=Number(priceArr[0])) {
                arr.push(list[i]);
              }
            }
          }
        })
      }
    }
    if (newChecked.type.length > 0) {
      if(arr.length>0)
      {
        newChecked.type.forEach((ele) => {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].type === ele) {
              temp.push(arr[i]);
            }
          }
        })
        arr=temp;
        temp=[];
      }
      else
      {
        newChecked.type.forEach((ele) => {
          for (let i = 0; i < list.length; i++) {
            if (list[i].type === ele) {
              arr.push(list[i]);
            }
          }
        })
      }
    }
    setChecked(newChecked);
    if(arr.length===0 && (Checked.type.length>0||Checked.color.length>0||Checked.gender.length>0||Checked.price.length>0)){
      enqueueSnackbar("Sorry no matching products",{variant:"error"});
      handleTshirts(list);
    }
    else if(arr.length===0){
      handleTshirts(list);
    }
    else { handleTshirts(arr);}
  };
  return (
    <Box className="filters">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <h2>Colour</h2>
        <FormControlLabel
          control={
            <Checkbox
              name="Red"
              onChange={(event) => {
                handleFn(event, "color");
              }}
              type="checkbox"
              checked={Checked.color.indexOf("Red") === -1 ? false : true}
            />
          }
          label="red"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="Blue"
              onChange={(event) => {
                handleFn(event, "color");
              }}
              type="checkbox"
              checked={Checked.color.indexOf("Blue") === -1 ? false : true}
            />
          }
          label="blue"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="Green"
              onChange={(event) => {
                handleFn(event, "color");
              }}
              type="checkbox"
              checked={Checked.color.indexOf("Green") === -1 ? false : true}
            />
          }
          label="green"
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <h2>Gender</h2>
        <FormControlLabel
          control={
            <Checkbox
              name="Men"
              onChange={(event) => {
                handleFn(event, "gender");
              }}
              type="checkbox"
              checked={Checked.gender.indexOf("Men") === -1 ? false : true}
            />
          }
          label="Male"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="Women"
              onChange={(event) => {
                handleFn(event, "gender");
              }}
              type="checkbox"
              checked={Checked.gender.indexOf("Women") === -1 ? false : true}
            />
          }
          label="Female"
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <h2>Price</h2>
        <FormControlLabel
          control={
            <Checkbox
              name="0-250"
              onChange={(event) => {
                handleFn(event, "price");
              }}
              type="checkbox"
              checked={Checked.price.indexOf("0-250") === -1 ? false : true}
            />
          }
          label="0-Rs250"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="251-450"
              onChange={(event) => {
                handleFn(event, "price");
              }}
              type="checkbox"
              checked={Checked.price.indexOf("251-450") === -1 ? false : true}
            />
          }
          label="Rs251-450"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="450"
              onChange={(event) => {
                handleFn(event, "price");
              }}
              type="checkbox"
              checked={Checked.price.indexOf("450") === -1 ? false : true}
            />
          }
          label="Rs450"
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <h2>Type</h2>
        <FormControlLabel
          control={
            <Checkbox
              name="Polo"
              onChange={(event) => {
                handleFn(event, "type");
              }}
              type="checkbox"
              checked={Checked.type.indexOf("Polo") === -1 ? false : true}
            />
          }
          label="polo"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="Hoodie"
              onChange={(event) => {
                handleFn(event, "type");
              }}
              type="checkbox"
              checked={Checked.type.indexOf("Hoodie") === -1 ? false : true}
            />
          }
          label="hoodie"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="Basic"
              onChange={(event) => {
                handleFn(event, "type");
              }}
              type="checkbox"
              checked={Checked.type.indexOf("Basic") === -1 ? false : true}
            />
          }
          label="basic"
        />
      </Box>
    </Box>
  );
};

export default Filters;
