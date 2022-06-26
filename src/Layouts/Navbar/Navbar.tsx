import * as React from "react";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import SocialMedia from "./SocialMedia/SocialMedia";

interface styledNavbarPropsInterface extends AppBarProps {
  navbarColor?: string;
}

// Apply Styling to Navbar Here
const StyledNavbar = styled(AppBar, {
  shouldForwardProp: (prop) => {
    return prop !== "navbarColor";
  },
})<styledNavbarPropsInterface>(({ navbarColor, theme }) => ({
  backgroundColor: navbarColor || theme.palette.background.paper,
}));

const Navbar = () => {


  return (
    <StyledNavbar position="static" navbarColor="#080708">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Box>
       

        {/* Cannot HAVE hideBelow and hideAbove Prop at the same time */}
        <SocialMedia layout="Box" hideBelow="md" containerWidth="20%"/>
      </Toolbar>
    </StyledNavbar>
  );
};
export default Navbar;
