import { NavLink } from 'react-router-dom';

export default function  MoviesMenu (){
  
  return (
    <nav>
      <ul className="menu-bar">
        <li>
          <NavLink to="/"  end>
            Now Playing
          </NavLink>
        </li>
        <li>
          <NavLink to="/top_rated">
            Top Rated
          </NavLink>
        </li>
        <li>
          <NavLink to="/popular" >
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink to="/upcoming" >
            Upcoming
          </NavLink>
        </li>
        <li>
          <NavLink to="/discover" >
            Discover
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};