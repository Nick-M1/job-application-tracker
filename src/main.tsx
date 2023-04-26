import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import ErrorPage from "./pages/ErrorPage";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Layout from "./layout/Layout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={<ErrorPage/>}>
            <Route path='/signin' lazy={() => import("./routes/SigninRoute")} />

            <Route element={<Layout/>}>
                <Route index lazy={() => import("./routes/HomePageRoute")}/>

                <Route path='/application' lazy={() => import("./routes/ApplicationsListRoute")}/>
                <Route path='/application/:application_id' lazy={() => import("./routes/ApplicationSingleRoute")}/>
                <Route path='/application/:application_id/edit' lazy={() => import("./routes/ApplicationFormEditRoute")}/>

                <Route path='/newapplication' lazy={() => import("./routes/ApplicationFormNewRoute")}/>
                <Route path='/company/:companyname' lazy={() => import("./routes/CompanyRoute")}/>

                <Route path='/templates' lazy={() => import("./routes/TemplatesRoute")}/>
                <Route path='/calender' lazy={() => import("./routes/CalenderRoute")}/>

                <Route path='/todo' lazy={() => import('./layout/TodosLayout')}>
                    <Route path='/todo' lazy={() => import('./components/todo/TodoEmpty')}/>
                    <Route path='/todo/:categoryid' lazy={() => import("./routes/TodoRoute")}/>
                </Route>
            </Route>

        </Route>
    )
)


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
