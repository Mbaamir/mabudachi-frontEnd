import Drawer, { DrawerProps } from "@mui/material/Drawer";
// import Pages from "../Sections/Pages/Pages";
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
      <Box sx={{ width: "70vw", height: "90%" }}>
          {/* <Box sx={{ marginTop: "15%", height: "20%" }}> */}
          {/* <Pages
          layout="Box"
          marginLeft="auto"
          marginRight="auto"
          containerWidth="50%"
          containerHeight="20%"
          flexDirection="column"
          linkFontSize="30px"
          hideAbove="sm"
        /> */}
        {/* </Box> */}

        <SocialMedia layout="Box" hideAbove="md"/>

      </Box>
    </Drawer>
  );
}
