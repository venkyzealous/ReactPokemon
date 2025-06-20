import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../features/auth/authSlice'; // Import our logout function


export const HomePage = () => {
      const navigate = useNavigate();
      const dispatch = useDispatch();

     const handleLogout = () => {
    //logout(); // Clear the token from localStorage
    dispatch(logOut()); // Clear the token from Redux
    navigate('/login'); // Redirect to the login page
  };

    return(
        <>
        <h1>Welcome to My React App</h1>
         <button onClick={handleLogout}>Logout</button>
        </>
    );
}


export default HomePage