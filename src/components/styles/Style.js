import classes from "./Style.module.css";
import MainNavigation from "./MainNavigation";

function style(props) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default style;
