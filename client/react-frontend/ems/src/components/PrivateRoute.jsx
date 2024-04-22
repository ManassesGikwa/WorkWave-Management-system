// import { Route, Navigate, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';

// const PrivateRoute = ({ component: Component, isAuthenticated, redirectPath = '/login', ...rest }) => {
//   const location = useLocation(); // Get current location for better redirection handling

//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? <Component /> : <Navigate to={redirectPath} replace state={{ from: location }} />}
//     />
//   );
// };

// PrivateRoute.propTypes = {
//   component: PropTypes.elementType.isRequired,
//   isAuthenticated: PropTypes.bool.isRequired,
//   redirectPath: PropTypes.string, // Optional: Customize redirect path
// };

// export default PrivateRoute;
