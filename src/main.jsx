import { StrictMode } from 'react'
import * as ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
// import { toast } from "sonner"
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateTrip from './create-trip';
import Header from './components/custom/Header';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from "@react-oauth/google";
import viewtrip from './view-trip/[tripId]/index.jsx';
import Viewtrip from './view-trip/[tripId]/index.jsx';
import MyTrips from './my-trips';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path:"/create-trip",
    element:<CreateTrip/>
  },
  {
    path:"/view-trip/:tripId",
    element:<Viewtrip/>
  },

  {
    path: "/my-trips",
    element: <MyTrips/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header/>
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
)
