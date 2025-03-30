import '../styles/App.css'
import Catalog from "../features/catalog/Catalog.tsx";
import {AppBar, Container, CssBaseline} from "@mui/material";
import Header from "./Header.tsx";
// import {Product} from "./app/models/product.ts";

function App() {

  return (
    <>
        <CssBaseline></CssBaseline>
        <Header></Header>
        <Container>
            <Catalog></Catalog>
        </Container>
    </>
  )
}

export default App
