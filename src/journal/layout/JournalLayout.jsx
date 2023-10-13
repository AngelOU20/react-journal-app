import PropTypes from "prop-types";
import { Box, Toolbar } from "@mui/material";
import { Navbar, SideBar } from "../components";

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      {/* Nabvar drawerWidth */}
      <Navbar drawerWidth={drawerWidth} />

      {/* Sidebar drawerWidth */}
      <SideBar drawerWidth={drawerWidth} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Toolbar */}
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};

JournalLayout.propTypes = {
  children: PropTypes.node,
};