 //
 // 
 // use the <Link> component from React Router to create navigation links to "Home" (/) and "Posts" (/posts).

import { Link } from "react-router-dom";

 export const Navbar = () => {

    return(
      <nav>
         <ul>
         <li>
            {/* 2. Use Link with the "to" prop */}
            <Link to="/">Home</Link>
         </li>
         {/* Example for another page you might add later */}
         <li><Link to="/posts">Posts</Link></li>
         <li><Link to="/pokemon">Pokemon</Link></li>
         </ul>
      </nav>
    );
 }

 export default Navbar