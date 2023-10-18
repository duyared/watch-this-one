import { NavLink } from 'react-router-dom';

export default function  MoviesMenu ({type}){
  return (
    <nav>
      <ul className="menu-bar">
        <li>
          <NavLink to="."  end>
            {type ==='tv' ?"Airing Today":"Now Playing"}
          </NavLink>
        </li>
        <li>
          <NavLink to="top_rated">
            Top Rated
          </NavLink>
        </li>
        <li>
          <NavLink to="popular" >
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink to={type==='tv'?'on_the_air':'upcoming'} >
            {type==='tv'?"On The Air":"Upcoming"}
          </NavLink>
        </li>
        <li>
          <NavLink to="discover" >
            Discover
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};