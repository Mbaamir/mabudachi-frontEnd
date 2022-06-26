import SocialMedia from "./SocialMediaBox/SocialMedia";
import Pages from "./Pages/Pages";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import * as React from "react";

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
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <StyledNavbar position="static" navbarColor="#080708">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Pages layout="Box" containerWidth="30%"/>

        {/* Cannot HAVE hideBelow and hideAbove Prop at the same time */}
        <SocialMedia layout="Box" hideBelow="sm" />
      </Toolbar>
    </StyledNavbar>
  );
};
export default Navbar;
