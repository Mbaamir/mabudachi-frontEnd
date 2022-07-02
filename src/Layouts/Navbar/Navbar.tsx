import SocialMedia from "./Sections/SocialMedia/SocialMedia";
import Pages from "./Sections/Pages/Pages";
import NavbarDrawer from "./Drawer/Drawer";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material";
import { useState } from "react";

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
  const [isDrawerOpenState, setIsDrawerOpenState] = useState(false);
  return (
    <StyledNavbar position="static" navbarColor="#080708">
      <Toolbar>
        {/* {Put Drawer Component Here} */}
        <NavbarDrawer
          isDrawerOpen={isDrawerOpenState}
          closeDrawerFunc={() => {
            setIsDrawerOpenState(false);
          }}
        />

        {/* Cannot HAVE hideBelow and hideAbove Prop at the same time */}
        <Pages
          layout="Box"
          containerWidth="20%"
          hideBelow="sm"
          marginLeft="auto"
          marginRight="5%"
        />

        <SocialMedia layout="Box" hideBelow="sm" />

        <Box sx={{ display: { xs: "flex", sm: "none" }, marginLeft: "auto" }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={() => setIsDrawerOpenState(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </StyledNavbar>
  );
};
export default Navbar;
