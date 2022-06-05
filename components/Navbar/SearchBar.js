import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper } from "@mui/material";

const SearchBar = () => {
  return (
    <Paper sx={{ ml: 3 }}>
      {/* <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper> */}
      {/* <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      /> */}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Products"
        inputProps={{ "aria-label": "search products" }}
      />

      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
