import logo from "../src/assets/images/logo.png";
import { Link } from "react-router-dom";
import background from "../src/assets/images/Background.png";
import getData from "./LadduAddData.json";
import { useEffect, useState } from "react";
export const Laddu = () => {
  const [data, setData] = useState(getData);
  const [filterData, setFilterData] = useState(getData);
  const [filterOutcome, setFilterOutcome] = useState("player");
  const handleNav = (role) => {
    setFilterOutcome(role);
    setFilterData(
      data.filter((list) => {
        return (
          list.player1Role == role ||
          (list.player2Role == role && list.player1Role == "player")
        );
      })
    );
  };
  useEffect(() => {
    handleNav("player");
  }, []);
  return (
    <>
      <div
        className="ui-topNav ui-match-nav"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="profile">
          <div className="image">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div class="more">
          <Link to="/ladduAddData">
            <img src="/Senthamil/static/media/add.587029074ccbecca2d6d44140b51b354.svg" />
          </Link>
        </div>

        <div className="ui-nav">
          <div className="ui-block">
            <button
              className={filterOutcome == "player" ? "selected" : ""}
              onClick={() => handleNav("player")}
            >
              Players
            </button>
            <button
              className={filterOutcome == "wk" ? "selected" : ""}
              onClick={() => handleNav("wk")}
              style={{ textWrap: "nowrap" }}
            >
              Wicket Keeper
            </button>
            <button
              className={filterOutcome == "c" ? "selected" : ""}
              onClick={() => handleNav("c")}
            >
              Captain
            </button>
          </div>
        </div>
      </div>
      <div className="main">
        <p className="card col-12 ui-note" style={{ marginTop: "38px" }}>
          <b>Note</b>
        </p>
        <div className="main-card">
          {filterData.map((val, id) => {
            return (
              <div className="card" key={id} data-value={val.id}>
                <div className="middle">
                  <label>{val.player1Score}</label>
                  <label className="result" style={{ textWrap: "nowrap" }}>
                    {/* {val.result == "Win" ? (
                    <span className="green">{val.result}</span>
                  ) : (
                    <span className="red">{val.result}</span>
                  )} */}

                    {val.result
                      .trim()
                      .split(",")
                      .map((score) => {
                        return parseInt(score.match(/\d+/g)) <= 27 ? (
                          <span
                            className="green"
                            style={{ marginRight: "2px" }}
                          >
                            {score}
                          </span>
                        ) : (
                          <span className="red" style={{ marginRight: "10px" }}>
                            {score}
                          </span>
                        );

                        // <span
                        //   key={score}
                        //   className={num.length > 1 ? "green" : ""}
                        // ></span>
                      })}
                  </label>
                  <label>
                    <span>{val.player2Score}</span>
                  </label>
                </div>
                <div className="bottom">
                  <label>
                    <p className="state">
                      {/* {val.state.trim() ? (
                      <i className="note red">Negative</i>
                    ) : (
                      <i className="note">Positive</i>
                    )} */}
                      <i className="note "> {val.player1Name} </i>
                      <i className="note red">{val.player1Role}</i>
                    </p>
                  </label>
                  <label>{val.league}</label>
                  <label>
                    {/* {val.percentage.split(",").map((value, i) => {
                    if (!value) return true;
                    return (
                      <span className="green" key={i}>
                        {value}
                      </span>
                    );
                  })} */}
                    <p className="state">
                      {/* {val.state.trim() ? (
                      <i className="note red">Negative</i>
                    ) : (
                      <i className="note">Positive</i>
                    )} */}
                      <i className="note red">{val.player2Role}</i>{" "}
                      <i className="note "> {val.player2Name} </i>
                    </p>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
