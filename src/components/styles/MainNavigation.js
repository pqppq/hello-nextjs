import { useContext } from "react";
import FavoritesContext from "../../store/favorites-context";
import { Link } from "react-router-dom";
import style from "./MainNavigation.module.css";
function MainNavigation() {
  const favoritesContext = useContext(FavoritesContext);
  const favoritesCount = favoritesContext.totalFavorites;
  return (
    <header className={style.header}>
      <div className={style.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link to="/">All Meetups</Link>
          </li>
          <li>
            <Link to="/new-meetup">New Meetup</Link>
          </li>
          <li>
            <Link to="/favorites">My Favorites({favoritesCount})</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
