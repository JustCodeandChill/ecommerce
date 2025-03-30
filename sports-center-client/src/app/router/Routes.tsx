import { createBrowserRouter } from "react-router-dom";
import App from "../layouts/App.tsx";
import HomePage from "../features/home/HomePage.tsx";
import Catalog from "../features/catalog/Catalog.tsx";
import ProductDetails from "../features/catalog/ProductDetails.tsx";
import ContactPage from "../features/contact/ContactPage.tsx";


export const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {path:'', element:<HomePage/>},
            {path:'store', element:<Catalog/>},
            {path:'store/:id', element:<ProductDetails/>},
            {path:'contact', element:<ContactPage/>},
        ]
    }
])