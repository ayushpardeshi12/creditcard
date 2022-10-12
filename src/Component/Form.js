import React, { useState } from "react";
import Chip from "./image/chip.png";
import Visa from "./image/visa.png";
// import "../setupProxy";

export default function Form(props) {
  // Setting User Data in UseState

  const [text, setText] = useState("#######################");
  const [holder, setCardHolder] = useState("FULL NAME");
  const [expmonth, setExpMonth] = useState("MM");
  const [expyear, setExpYear] = useState("YYYY");
  const [cvv, setCVV] = useState("cvv");

  const cardNumber = (e) => {
    e.preventDefault();
    const cardNum = document.querySelector(".card-number").value;
    setText(cardNum);
    setUser(cardNum);
  };

  const cardHolder = (e) => {
    e.preventDefault();
    const cardHold = document.querySelector(".card-holder-input").value;
    setCardHolder(cardHold);
    setUser(cardHold);
  };

  const expMonth = (e) => {
    e.preventDefault();
    const expireMon = document.querySelector(".month-input").value;
    setExpMonth(expireMon);
    setUser(expireMon);
  };
  const expYear = (e) => {
    e.preventDefault();
    const expireYear = document.querySelector(".year-input").value;
    setExpYear(expireYear);
    setUser(expireYear);
  };

  const ChangeCVV = (e) => {
    e.preventDefault();
    const cvvValue = document.querySelector(".cvv-input").value;
    setCVV(cvvValue);
    setUser(cvvValue);
  };

  const changeFront = (e) => {
    e.preventDefault();
    document.querySelector(".cvv-input").onmouseenter = () => {
      document.querySelector(".front").style.transform =
        "perspective(1000px) rotateY(180deg)";
      document.querySelector(".back").style.transform =
        "perspective(1000px) rotateY(0deg)";
    };
  };

  const changeBack = (e) => {
    e.preventDefault();
    document.querySelector(".cvv-input").onmouseleave = () => {
      document.querySelector(".front").style.transform =
        "perspective(1000px) rotateY(0deg)";
      document.querySelector(".back").style.transform =
        "perspective(1000px) rotateY(180deg)";
    };
  };

  const [user, setUser] = useState({
    cardnumber: "",
    cardHolderName: "",
    expmonth: "",
    expyear: "",
    cvv: "",
  });
  // handle Inputs
  //   const handleInputs = (e) => {
  //     console.log(e);
  //   };

  const postData = async (e) => {
    e.preventDefault();
    const { cardnumber, cardHolderName, expmonth, expyear, cvv } = user;

    const res = await fetch("/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardnumber,
        cardHolderName,
        expmonth,
        expyear,
        cvv,
      }),
    });
    const data = await res.json();
    if (data.status === 400) {
      window.alert("Some Error Occured");
      console.log("Invalid Error");
    } else {
      window.alert("Successful Registration");
      console.log("Successful Registration");
    }
  };
  return (
    <div className="container">
      <div className="card-container">
        <div className="front">
          <div className="image">
            <img src={Chip} alt="" className="chip-img" />
            <img src={Visa} alt="" className="visa-img" />
          </div>
          <div className="card-number-box">{text}</div>
          <div className="flexbox">
            <div className="box">
              <span>Card Holder</span>
              <div className="card-holder-name">{holder}</div>
            </div>
            <div className="box">
              <span>expires</span>
              <div className="expiration">
                <span className="exp-month">{expmonth}</span>/
                <span className="exp-year">{expyear}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="back">
          <div className="stripe"></div>
          <div className="box">
            <span>cvv</span>
            <div className="cvv-box">
              <span className="cvv-card">cvv</span>
            </div>
            <img src="image/visa.png" alt="" />
          </div>
        </div>
      </div>
      <form method="POST" className="credit-form">
        <div className="inputBox">
          <span>Card Number</span>
          <input
            type="text"
            value={(text, user.cardnumber)}
            onInput={cardNumber}
            maxLength="19"
            className="card-number"
          />
        </div>
        <div className="inputBox">
          <span>Card Holder</span>
          <input
            type="text"
            value={(holder, user.cardHolderName)}
            onInput={cardHolder}
            className="card-holder-input"
          />
        </div>
        <div className="flexbox">
          <div className="inputBox">
            <span>Expiration mm</span>
            <select
              name=""
              id=""
              className="month-input"
              value={(expmonth, user.expmonth)}
              onInput={expMonth}
            >
              <option value="Month" selected disabled>
                Month
              </option>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
          <div className="inputBox">
            <span>Expiration yy</span>
            <select
              name=""
              id=""
              className="year-input"
              value={(expyear, user.expyear)}
              onInput={expYear}
            >
              <option value="Year" selected disabled>
                Year
              </option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
              <option value="2031">2031</option>
              <option value="2032">2032</option>
            </select>
          </div>
          <div className="inputBox">
            <span>CVV</span>
            <input
              type="text"
              value={(cvv, user.cvv)}
              onInput={ChangeCVV}
              onMouseEnter={changeFront}
              onMouseLeave={changeBack}
              maxlength="3"
              className="cvv-input"
            />
          </div>
        </div>
        <input
          type="submit"
          onClick={postData}
          value="submit"
          className="submit-btn"
        />
      </form>
    </div>
  );
}
