import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import CreateProduct from "./pages/createProducts";
import Home from "./pages/home";
import { useColorModeValue } from "./components/ui/color-mode";
import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateProduct />} />
      </Routes>
    </Box>
  );
}

export default App;
