import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import { Navbar, PrivateRoute } from "./components";
import {
  Home,
  Footer,
  Gig,
  Gigs,
  MyGigs,
  Add,
  Orders,
  Message,
  Messages,
  Login,
  Register,
  Pay,
  Success,
  NotFound,
  StartSelling,
  Profile,
} from "./pages";
import "./App.scss";
import { useEffect } from "react";
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';

const paths = [
  { path: "/", element: <Home /> },
  { path: "/gig/:_id", element: <Gig /> },
  { path: "/gigs", element: <Gigs /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/StartSelling", element: <StartSelling /> },
  {
    path: "/orders",
    element: (
      <PrivateRoute>
        <Orders />
      </PrivateRoute>
    ),
  },
  {
    path: "/organize",
    element: (
      <PrivateRoute>
        <Add />
      </PrivateRoute>
    ),
  },
  {
    path: "/my-gigs",
    element: (
      <PrivateRoute>
        <MyGigs />
      </PrivateRoute>
    ),
  },
  {
    path: "/message/:conversationID",
    element: (
      <PrivateRoute>
        <Message />
      </PrivateRoute>
    ),
  },
  {
    path: "/messages",
    element: (
      <PrivateRoute>
        <Messages />
      </PrivateRoute>
    ),
  },
  {
    path: "/pay/:_id",
    element: (
      <PrivateRoute>
        <Pay />
      </PrivateRoute>
    ),
  },
  {
    path: "/success",
    element: (
      <PrivateRoute>
        <Success />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  
  { path: "*", element: <NotFound /> },
];

function App() {
  const queryClient = new QueryClient();
  
  const Layout = () => {
    const { pathname } = useLocation();
    
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return (
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
        <Footer />
      </QueryClientProvider>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: paths.map(({ path, element }) => ({ path, element })),
    },
  ]);

  return (
    <Provider store={store}>
      <RecoilRoot>
        <RouterProvider router={router} />
        <Toaster />
      </RecoilRoot>
    </Provider>
  );
}

export default App;
