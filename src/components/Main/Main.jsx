import "./Main.css";
import Promo from "../Promo/Promo.jsx";
import AboutProject from "../AboutProject/AboutProject.jsx";
import Techs from "../Techs/Techs.jsx";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

function Main(props) {
  const { isLogged } = props;
  return (
    <>
      <Promo isLogged={isLogged} />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </>
  );
}

export default Main;
