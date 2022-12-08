import React from "react";
import "./Promo.css";
import Header from "../Header/Header.jsx";
import promoImage from "../../images/promo__image.svg";

function Promo(props) {
  const { isLogged } = props;
  return (
    <>
      <div className="promo">
        <Header isLogged={isLogged} />
        <div className="promo__container">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <img className="promo__image" src={promoImage} alt="Abstract waves" />
        </div>
      </div>
      <p>
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum
      </p>
    </>
  );
}

export default Promo;
