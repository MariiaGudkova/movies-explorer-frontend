import "./Main.css";
import Promo from "../Promo/Promo.jsx";
import AboutProject from "../AboutProject/AboutProject.jsx";
import Techs from "../Techs/Techs.jsx";
import AboutMe from "../AboutMe/AboutMe";

function Main(props) {
  const { isLogged } = props;
  return (
    <>
      <Promo isLogged={isLogged} />
      <AboutProject />
      <Techs />
      <AboutMe />
    </>
  );
}

export default Main;
