import Drawer, { DrawerProps } from "@mui/material/Drawer";
import Pages from "../Sections/Pages/Pages";
import Box from "@mui/material/Box";
import SocialMedia from "../Sections/SocialMedia/SocialMedia";

export interface INavbarDrawerProps extends DrawerProps {
  isDrawerOpen: boolean;
  closeDrawerFunc: any;
}

export default function NavbarDrawer(props: INavbarDrawerProps) {
  const isDrawerOpen = props.isDrawerOpen;
  const closeDrawerFunc = props.closeDrawerFunc;
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={isDrawerOpen}
      onClose={closeDrawerFunc}
    >
      <Box sx={{ width: "70vw", height: "100vh" }}>
        <div style={{ marginTop: "25%", marginBottom: "15%" }}>
          <SocialMedia
            layout="Grid"
            hideAbove="md"
            xsWidth={6}
            iconSize="32px"
            containerWidth="80%"
            marginLeft="auto"
            marginRight="auto"
          />
        </div>

        <div style={{ textAlign: "center", height: "20%" }}>
          <Pages
            layout="Grid"
            containerWidth="40%"
            containerHeight="100%"
            xsWidth={12}
            marginLeft="auto"
            marginRight="auto"
            linkFontSize="1.8rem"
            linkFontWeight="500"
            hideAbove="sm"
          />
        </div>
      </Box>
    </Drawer>
  );
}
