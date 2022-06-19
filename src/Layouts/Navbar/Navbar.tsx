import * as React from "react";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import SocialMediaBox from "./SocialMediaBox/SocialMediaBox";
import { containerTypeEnum } from "./SocialMediaBox/SocialMediaBox";

const pages = ["Products", "Pricing", "Blog"];

interface styledNavbarPropsInterface extends AppBarProps {
  navbarColor?: string;
}

const StyledNavbar = styled(AppBar)<styledNavbarPropsInterface>(
  ({ navbarColor, theme }) => ({
    backgroundColor: navbarColor || theme.palette.primary.main,
  })
);

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
    <StyledNavbar position="static" navbarColor="#111122">
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
        <Box sx={{ flexGrow: 2, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <SocialMediaBox layout={containerTypeEnum.Box} />
        </Box>
      </Toolbar>
    </StyledNavbar>
  );
};
export default Navbar;
