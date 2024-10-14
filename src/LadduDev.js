import logo from "../src/assets/images/logo.png";
import { Link } from "react-router-dom";
import background from "../src/assets/images/Background.png";

import { useEffect, useState } from "react";
import batter from "../src/assets/images/batter.svg";
import { collection, getDocs, query } from "@firebase/firestore";
import db from "./FirbaseConfig";
export const LadduDev = () => {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [filterData, setFilterData] = useState(detail);
  const [filterOutcome, setFilterOutcome] = useState("PLAYER");
  const [filterScore, setFilterScore] = useState(0);
  // Get Data
  // Fetching Data Ends //
  const userData = async () => {
    const q = query(collection(db, "Laddu"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      //
      ...doc.data(),
    }));
    setDetail(data);
    console.log(data);
  };
  useEffect(() => {
    userData();
    handleNav(filterOutcome);
  }, [detail]);

  const handleNav = (role) => {
    setFilterOutcome(role);
    if (role == "PLAYER") {
      setFilterScore(27);
      setFilterData(
        detail.filter((list) => {
          return (
            list.player2Role.toUpperCase() == "PLAYER" &&
            list.player1Role.toUpperCase() == "PLAYER"
          );
        })
      );
    }
    if (role == "CAPTAIN") {
      setFilterScore(37);
      setFilterData(
        detail.filter((list) => {
          return (
            list.player2Role.toUpperCase() == "CAPTAIN" ||
            list.player1Role.toUpperCase() == "CAPTAIN"
          );
        })
      );
    }
    if (role == "WK") {
      setFilterScore(37);
      setFilterData(
        detail.filter((list) => {
          return (
            list.player2Role.toUpperCase() == "WK" ||
            list.player1Role.toUpperCase() == "WK"
          );
        })
      );
    }
  };
  useEffect(() => {
    handleNav("PLAYER");
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
          <Link to="/ladduAdd">
            <img src="/Senthamil/static/media/add.587029074ccbecca2d6d44140b51b354.svg" />
          </Link>
        </div>

        <div className="ui-nav">
          <div className="ui-block">
            <button
              className={filterOutcome == "PLAYER" ? "selected" : ""}
              onClick={() => handleNav("PLAYER")}
              style={{ padding: "0px" }}
            >
              <label className="batter"></label>
            </button>
            <button
              className={filterOutcome == "WK" ? "selected" : ""}
              onClick={() => handleNav("WK")}
              style={{ padding: "0px" }}
            >
              <label className="keeper"></label>
            </button>
            <button
              className={filterOutcome == "CAPTAIN" ? "selected" : ""}
              onClick={() => handleNav("CAPTAIN")}
              style={{ padding: "0px" }}
            >
              <label className="captain"></label>
            </button>
          </div>
        </div>
      </div>
      <div className="main">
        <p className="card col-12 ui-note" style={{ marginTop: "38px" }}>
          <b>Note</b>
        </p>
        <div className="main-card">
          {filterData?.map((val, id) => {
            return (
              <div className="card" key={id} data-value={val.id}>
                <div className="top">
                  <label
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {val.league}
                  </label>
                  {/* <label>
                    <span>{val.league}</span>
                  </label> */}
                </div>
                <div className="middle">
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "start",
                    }}
                  >
                    <span>{val.player1Score}</span>
                    <b
                      style={{
                        fontWeight: "500",
                        color: "rgba(65, 65, 65,0.6)",
                      }}
                    >
                      {val.player1Name}{" "}
                    </b>
                  </label>

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
                        return parseInt(score.match(/\d+/g)) <= filterScore ? (
                          parseInt(score.match(/\d+/g)) <= filterScore - 15 ? (
                            <span
                              className="blue"
                              style={{ marginRight: "2px" }}
                            >
                              {score}
                            </span>
                          ) : (
                            <span
                              className="green"
                              style={{ marginRight: "2px" }}
                            >
                              {score}
                            </span>
                          )
                        ) : (
                          <span className="red" style={{ marginRight: "2px" }}>
                            {score}
                          </span>
                        );

                        // <span
                        //   key={score}
                        //   className={num.length > 1 ? "green" : ""}
                        // ></span>
                      })}
                  </label>
                  <label style={{ flexDirection: "column", textAlign: "end" }}>
                    <span>{val.player2Score}</span>
                    <b
                      style={{
                        fontWeight: "500",
                        color: "rgba(65, 65, 65,0.6)",
                      }}
                    >
                      {" "}
                      {val.player2Name}{" "}
                    </b>
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
                      {val.player1Role.toUpperCase() == "PLAYER" ? (
                        <i className="note">{val.player1Role}</i>
                      ) : (
                        <i className="note red">{val.player1Role}</i>
                      )}
                    </p>
                  </label>

                  <label style={{ justifyContent: "end" }}>
                    {/* {val.percentage.split(",").map((value, i) => {
                    if (!value) return true;
                    return (
                      <span className="green" key={i}>
                        {value}
                      </span>
                    );
                  })} */}
                    <p className="state">
                      {val.player2Role.toUpperCase() == "PLAYER" ? (
                        <i className="note">{val.player2Role}</i>
                      ) : (
                        <i className="note red">{val.player2Role}</i>
                      )}
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
