import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Search } from "@mui/icons-material";
import { InputAdornment, TextField, Box, Button } from "@mui/material";
import "./searchBar.css"
const SearchBar = ({ handleSearch, state, handleFilterButton, timer }) => {
  const handleFn = () => {
    handleFilterButton(!state);
  };
  return (
    <Box className='search-parent'>
      <Box sx={{ display: "flex", m: 2 }} className="search-bar">
      <TextField
        size="small"
        variant="standard"
        style={{ width: 300 }}
        sx={{ my: 2 }}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" startIcon={<Search />}></Button>
            </InputAdornment>
          ),
        }}
        placeholder="Search for products"
        name="search"
        onChange={(event) => {
          handleSearch(event, timer);
        }}
      />
      <Box className="filterButton">
        <Button
          variant="contained"
          onClick={handleFn}
          startIcon={<FilterAltIcon />}
          sx={{mt:1.7, mx:0.5}}
        ></Button>
      </Box>
      </Box>
    </Box>
  );
};
export default SearchBar;
