import {createBrowserRouter, Navigate} from "react-router-dom";
import App from "../layouts/App.tsx";
import HomePage from "../features/home/HomePage.tsx";
import Catalog from "../features/catalog/Catalog.tsx";
import ProductDetails from "../features/catalog/ProductDetails.tsx";
import ContactPage from "../features/contact/ContactPage.tsx";
import NotFoundError from "../layouts/NotFoundError.tsx";
import ServerError from "../layouts/ServerError.tsx";


export const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {path:'', element:<HomePage/>},
            {path:'store', element:<Catalog/>},
            {path:'store/:id', element:<ProductDetails/>},
            {path:'contact', element:<ContactPage/>},
            {path:'not-found', element:<NotFoundError/>},
            {path:'server-error', element:<ServerError/>},
            {path:'*', element:<Navigate replace to={'/not-found'}/>},
        ]
    }
])