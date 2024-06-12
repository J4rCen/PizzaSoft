import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import EmployeeList from './pages/EmployeeList/EmployeeList'
import EditEmployee from './pages/EditEmployee/EditEmployee';
import AddEmployee from './pages/AddEmployee/AddEmployee';

const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<EmployeeList/>}/>
        <Route path="/edit/:id" element={<EditEmployee/>}/>
        <Route path="/add" element={<AddEmployee/>}/>
      </>
    )
);

const App: React.FC = () => {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
