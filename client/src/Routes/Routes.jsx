import { createBrowserRouter } from 'react-router-dom';
import Root from '../Layouts/Layouts/Root';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import home from '../pages/home/home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import Inquiry from '../pages/Inquiry/Inquiry';
import AllEmployee from '../pages/Dashboard/DashboardSection/AllEmployee';
import Progress from '../pages/Dashboard/DashboardSection/Progress';
import EmployeeList from '../pages/Dashboard/DashboardSection/EmployeeList';
import PaymentHistory from '../pages/Dashboard/DashboardSection/PaymentHistory';
import WorkSheet from '../pages/Dashboard/DashboardSection/WorkSheet';
import EmployeeDetails from '../pages/Dashboard/DashboardSection/EmployeeDetails';
import PrivateRoute from './PrivateRoute';
import Payment from '../Pages/Dashboard/Payment/Payment';

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <home></home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/dashboard",
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children: [
                    {
                        path: "/dashboard",
                        element: <AllEmployee></AllEmployee>
                    },
                    {
                        path: "/dashboard/progress",
                        element: <Progress></Progress>
                    },
                    {
                        path: "/dashboard/all-employee",
                        element : <AllEmployee></AllEmployee>
                    },
                    {
                        path: "/dashboard/employee",
                        element : <EmployeeList></EmployeeList>
                    },
                    {
                        path: "/dashboard/payment-history",
                        element : <PaymentHistory></PaymentHistory>
                    },
                    {
                        path: "/dashboard/work-sheet",
                        element : <WorkSheet></WorkSheet>
                    },
                    {
                        path: "/dashboard/employee/:id",
                        loader: ({ params }) => fetch(`https://employee-server-wine.vercel.app/users/Employee/${params.id}`),
                        element : <EmployeeDetails></EmployeeDetails>
                    },
                    {
                        path: "/dashboard/employee/payment/:id/:months",
                        loader: ({ params }) => fetch(`https://employee-server-wine.vercel.app/users/Employee/${params.id}`),
                        element : <Payment></Payment>
                    }
                ]
            },
            {
                path: "/contact",
                element: <Contact></Contact>
            }
        ]
    },
]);

export default Routes;