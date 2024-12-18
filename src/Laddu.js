import logo from "../src/assets/images/logo.png";
import { Link } from "react-router-dom";
import background from "../src/assets/images/Background.png";
import getdata from "./LadduAddData.json";
import { useEffect, useState } from "react";
import batter from "../src/assets/images/batter.svg";
import { collection, getDocs, query } from "@firebase/firestore";
import db from "./FirbaseConfig";
import getImages from "../src/assets/images/add.svg";
import { ReactComponent as Batter } from "../src/assets/images/batter.svg";
import { ReactComponent as Keeper } from "../src/assets/images/keeper.svg";
import { ReactComponent as Captain } from "../src/assets/images/captain.svg";
import { right } from "@popperjs/core";
import LadduTable from "./LadduTable";
export const Laddu = () => {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [filterData, setFilterData] = useState(detail);
  const [filterOutcome, setFilterOutcome] = useState("PLAYER");
  const [filterScore, setFilterScore] = useState(0);
  const [rangeMin, setRangeMin] = useState(0);
  const [rangeMax, setRangeMax] = useState(0);
  const [filterLeague, setFilterLeague] = useState("BPL_W");
  const [underScore, setUnderScore] = useState(0);
  const [searchVal, setSearchVal] = useState([
    {
      player2Score: "0",
      player1Role: "WK",
      player1Score: "0",
    },
  ]);
  const [match, setMatch] = useState(0);
  const [winning, setWinning] = useState(0);
  const [loosing, setLoosing] = useState(0);
  const [noBet, setNoBet] = useState(0);
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(10000);
  const [priceTotal, setPriceTotal] = useState(0);
  const [priceWin, setPriceWin] = useState(0);
  const [priceLoss, setPriceLoss] = useState(0);
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
  }, []);
  useEffect(() => {
    //console.log(getdata);
    setData(detail);
  }, [detail]);
  useEffect(() => {
    handleNav(filterOutcome, filterLeague);
  }, [data]);
  const handleLeague = (e) => {
    setFilterLeague(e.target.value);
    handleNav(filterOutcome, e.target.value);
  };
  const handleNav = (role, league) => {
    setFilterOutcome(role);
    if (role == "PLAYER") {
      setFilterScore(27);
      setFilterData(
        data.filter((list) => {
          return (
            list.player2Role.toUpperCase() == "PLAYER" &&
            list.player1Role.toUpperCase() == "PLAYER" &&
            list.league.toUpperCase() == league
          );
        })
      );
    }
    if (role == "CAPTAIN") {
      setFilterScore(37);
      setFilterData(
        data.filter((list) => {
          return (
            (list.player2Role.toUpperCase() == "CAPTAIN" &&
              list.league.toUpperCase() == league &&
              list.player1Role.toUpperCase() == "PLAYER") ||
            (list.player1Role.toUpperCase() == "CAPTAIN" &&
              list.league.toUpperCase() == league &&
              list.player2Role.toUpperCase() == "PLAYER")
          );
        })
      );
    }
    if (role == "WK") {
      setFilterScore(37);
      setFilterData(
        data.filter((list) => {
          return (
            (list.player2Role.toUpperCase() == "WK" &&
              list.league.toUpperCase() == league &&
              list.player1Role.toUpperCase() == "PLAYER") ||
            (list.player1Role.toUpperCase() == "WK" &&
              list.league.toUpperCase() == league &&
              list.player2Role.toUpperCase() == "PLAYER")
          );
        })
      );
    }
    if (role == "CAP_WK") {
      setFilterScore(37);
      setFilterData(
        data.filter((list) => {
          return (
            (list.player2Role.toUpperCase() == "WK" &&
              list.league.toUpperCase() == league &&
              list.player1Role.toUpperCase() == "CAPTAIN") ||
            (list.player1Role.toUpperCase() == "WK" &&
              list.league.toUpperCase() == league &&
              list.player2Role.toUpperCase() == "CAPTAIN")
          );
        })
      );
    }
  };
  useEffect(() => {
    handleNav("PLAYER", "IPL");
  }, []);

  useEffect(() => {
    setMatch(0);
    setTotal(0);
    setWinning(0);
    setLoosing(0);
    setNoBet(0);
    setPriceWin(0);
    setPriceLoss(0);
    setPriceTotal(0);
    setMatch(filterData?.length);
    filterData?.map((val) => {
      val.result
        .trim()
        .split(",")
        .map((score) => {
          // Total
          setTotal((val) => val + 1);

          // Winning
          if (
            rangeMaxFun(val) - 15 <= parseInt(score.match(/\d+/g)) &&
            rangeMaxFun(val) >= parseInt(score.match(/\d+/g))
          ) {
            setWinning((val) => val + 1);
            setPriceWin((val) => val + price);
            setPriceTotal((val) => val + price);
          } else {
            setNoBet((val) => val + 1);
          }
          // Lossing
          if (rangeMaxFun(val) < parseInt(score.match(/\d+/g))) {
            setLoosing((val) => val + 1);
            setPriceLoss((val) => val + price);
            setPriceTotal((val) => val - price);
          }
        });
    });
  }, [filterData]);
  const rangeMaxFun = (val) => {
    const player1 = parseInt(val.player1Score.match(/\d+/g));
    const player2 = parseInt(val.player2Score.match(/\d+/g));
    var max = Math.max(player1, player2);
    var min = Math.min(player1, player2);

    switch (filterOutcome) {
      case "PLAYER":
        if (val.player1Score == 0 || val.player2Score == 0) {
          if (val.player1Score >= 27 || val.player2Score >= 27) {
            max = 27 + Number(val.player1Score) + Number(val.player2Score);
          } else {
            max = 49;
            // Not confirmed 42,24,49,30,33
          }
          //max = 37;
        } else {
          if (val.player1Score >= 27 || val.player2Score >= 27) {
            if (val.player1Score >= 27 && val.player2Score >= 27) {
              max = max + 31;
            } else {
              if (
                (val.player1Score >= 27 && val.player2Score <= 27) ||
                (val.player2Score >= 27 && val.player1Score <= 27)
              ) {
                max = max + 13;
              } else {
                max = 27 + max;
              }
            }
          } else {
            if (Number(val.player1Score) + Number(val.player2Score) >= 27) {
              max = 30 + max + min;
            } else max = 27;
          }
        }
        // Max - 50
        if (val.player1Score >= 50 || val.player2Score >= 50) {
          max = 95 - min;
        }
        // Max - 100
        if (val.player1Score >= 100 || val.player2Score >= 100) {
          max = 102 - min;
        }

        return max;
        break;
      case "WK":
        if (val.player1Score == 0 || val.player2Score == 0) {
          if (val.player1Score >= 27 || val.player2Score >= 27) {
            max = 37 + 10;
          } else {
            max = 37 + Number(val.player1Score) + Number(val.player2Score);
          }
        } else {
          // Max 10 to 20
          if (max > 10 && max <= 20) {
            max = 106 - max;
          }
          // Max 20 to 30
          if (max > 20 && max <= 30) {
            max = 106 - max;
          }
          // Max 30 to 40
          if (max > 30 && max <= 40) {
            max = 114 - max;
          }
          // // Max 40 to 50
          if (max > 40 && max <= 50) {
            max = 106 - max;
          }
          // // Max 50 to 60
          if (max > 50 && max <= 60) {
            max = 122 - max;
          }
          // // Max 60 to 70
          // if (max > 60 && max <= 70) {
          //   max = 106 - max;
          // }
          // // Max 70 to 80
          // if (max > 70 && max <= 80) {
          //   max = 106 - max;
          // }
          // // Max 80 to 90
          // if (max > 80 && max <= 90) {
          //   max = 106 - max;
          // }
          // // Max 90 to 100
          // if (max > 90 && max <= 100) {
          //   max = 106 - max;
          // }
          // Max Above 100
          if (max > 100) {
            max = 37;
          }
        }
        return max;
        break;
      case "CAPTAIN":
        if (val.player1Score >= 37 || val.player2Score >= 37) {
          //max = 37 + Number(val.player1Score) + Number(val.player2Score);
          max = 70;
        } else {
          max = 37;
        }

        return max;
      case "CAP_WK":
        if (max >= 70) {
          max = 130 - max;
        } else {
          if (val.player1Score >= 37 || val.player2Score >= 37) {
            //max = 37 + Number(val.player1Score) + Number(val.player2Score);
            max = 70;
          } else {
            max = 37;
          }
        }

        return max;
      default:
        break;
    }
  };
  // Get Detail - const - UNder value
  const rangeMaxFunConst = (val) => {
    var max = Math.max(val.player1Score, val.player2Score);
    var min = Math.min(val.player1Score, val.player2Score);
    var maxDetail = "";

    switch (filterOutcome) {
      case "PLAYER":
        if (val.player1Score == 0 || val.player2Score == 0) {
          if (val.player1Score >= 27 || val.player2Score >= 27) {
            max = 37 + Number(val.player1Score) + Number(val.player2Score);
            maxDetail =
              "Constant 37 + Player1" +
              Number(val.player1Score) +
              Number(val.player2Score);
          } else {
            max = 49;
            maxDetail = "Constant 49";
            // Not confirmed 42,24,49,30,33
          }
          //max = 37;
        } else {
          if (val.player1Score >= 27 || val.player2Score >= 27) {
            if (val.player1Score >= 27 && val.player2Score >= 27) {
              maxDetail = "PlayerMax " + max + " + Constant 10";
              max = max + 13;
            } else {
              if (
                (val.player1Score >= 27 && val.player2Score <= 27) ||
                (val.player2Score >= 27 && val.player1Score <= 27)
              ) {
                maxDetail = "PlayerMax " + max + " + Constant 10";
                max = max + 13;
              } else {
                maxDetail = "Constant 27 +" + "PlayerMax " + max;
                max = 27 + max;
              }
            }
          } else {
            if (Number(val.player1Score) + Number(val.player2Score) >= 27) {
              maxDetail =
                "Constant 27 +" + "PlayerMax " + max + "+ PlayerMin " + min;
              max = 27 + max + min;
            } else {
              maxDetail = "Constant 27";
              max = 27;
            }
          }
        }

        return maxDetail;
        break;
      case "WK":
        if (val.player1Score == 0 || val.player2Score == 0) {
          if (val.player1Score >= 27 || val.player2Score >= 27) {
            maxDetail = "Constant 37";
            max = 37;
          } else {
            maxDetail =
              "Constant 27 + Player1 " +
              Number(val.player1Score) +
              "+ Player2 " +
              Number(val.player2Score);
            max = 27 + Number(val.player1Score) + Number(val.player2Score);
          }
        } else {
          maxDetail = "Constant 27 + Player Min " + min;
          max = 37 + min;
        }
        return maxDetail;
        break;
      case "CAPTAIN":
        if (val.player1Score == 0 || val.player2Score == 0) {
          if (val.player1Score >= 27 || val.player2Score >= 27) {
            maxDetail = "Constant 37";
            max = 37;
          } else {
            maxDetail =
              "Constant 27 + Player1 " +
              Number(val.player1Score) +
              " Player2 " +
              Number(val.player2Score);
            max = 27 + Number(val.player1Score) + Number(val.player2Score);
          }
        } else {
          maxDetail = "Constant 27 + Min " + min;
          max = 37 + min;
        }
        return maxDetail;
      default:
        break;
    }
  };
  const handleChange = (e) => {
    e.target.value;
    // Sending form
    const addForm = document.querySelector("#searchForm");
    setRangeMax(
      rangeMaxFun({
        player1Score: addForm.player1Score.value,
        player2Score: addForm.player2Score.value,
        player1Role: addForm.player1Role.value,
      })
    );
  };

  //const handleWinning = (state) => {
  // if (state == "WIN") setWinning((val) => val + 1);
  // if (state == "LOSE") setLoosing((val) => val - 1);
  // if (state == "NO_BET") setNoBet((val) => val);
  // };

  return (
    <>
      <div
        className="ui-topNav ui-match-nav"
        style={{
          backgroundImage: `url(${background})`,
          flexDirection: "column",
          paddingBottom: "0px",
        }}
      >
        <div className="image">
          <div className="profile">
            <div className="image">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="more">
            <Link to="/ladduAdd">
              <img src="/Senthamil/static/media/add.587029074ccbecca2d6d44140b51b354.svg" />
            </Link>
          </div>
        </div>
        <div className="gameBlock">
          <div className="game">
            <button
              value="IPL"
              className={filterLeague == "IPL" ? "selected" : ""}
              onClick={handleLeague}
            >
              IPL
            </button>
            <button
              value="CPL"
              className={filterLeague == "CPL" ? "selected" : ""}
              onClick={handleLeague}
            >
              CPL
            </button>
          </div>
        </div>
        <div className="ui-nav">
          <div className="ui-block">
            <button
              className={filterOutcome == "PLAYER" ? "selected" : ""}
              onClick={() => handleNav("PLAYER", filterLeague)}
              style={{ padding: "0px" }}
            >
              <Batter />
              {/* <label className="batter"></label> */}
              <span>Player</span>
            </button>
            <button
              className={filterOutcome == "WK" ? "selected" : ""}
              onClick={() => handleNav("WK", filterLeague)}
              style={{ padding: "0px" }}
            >
              <Keeper />
              {/* <label className="keeper"></label> */}
              <span>Keeper</span>
            </button>
            <button
              className={filterOutcome == "CAPTAIN" ? "selected" : ""}
              onClick={() => handleNav("CAPTAIN", filterLeague)}
              style={{ padding: "0px" }}
            >
              <Captain />
              {/* <label className="captain"></label> */}
              <span>Captain</span>
            </button>
            <button
              className={filterOutcome == "CAP_WK" ? "selected" : ""}
              onClick={() => handleNav("CAP_WK", filterLeague)}
              style={{ padding: "0px" }}
            >
              <Captain />
              {/* <label className="captain"></label> */}
              <span>Cap/Wk</span>
            </button>
          </div>
        </div>
      </div>
      <div className="main">
        <form
          className="predictionForm"
          style={{ marginTop: "76px", display: "flex" }}
          id="searchForm"
        >
          <div className="col-3 col-md-3">
            <input
              type="text"
              className="form-control"
              name="player1Score"
              onChange={handleChange}
              required
              placeholder="Player 1"
            />
          </div>
          <div className="col-3 col-md-3">
            <input
              type="text"
              className="form-control"
              name="player2Score"
              onChange={handleChange}
              required
              placeholder="Player 2"
            />
          </div>
          <div className="col-3 col-md-3">
            <select
              type="text"
              className="form-control"
              name="player1Role"
              onChange={handleChange}
              required
            >
              <option value="wk">Wicket Keeper</option>
              <option value="captain">Captain</option>
              <option value="player">Player</option>
            </select>
          </div>
          <div
            className="col-3 col-md-3"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <label style={{ padding: "6px 10px" }}>Under - {rangeMax}</label>
          </div>
        </form>
        <p
          className="card col-12 ui-note"
          style={{ margin: "5px 0px 5px 0px", display: "flex" }}
        >
          <div style={{ display: "flex" }}>
            <p style={{ margin: "0px" }}>
              <b>{priceWin}</b>
              <sub>(Win)</sub>
            </p>
            -
            <p style={{ margin: "0px" }}>
              <b>{priceLoss}</b>
              <sub>(Loss)</sub>
            </p>
            ==
            <p style={{ margin: "0px" }}>
              <b>{priceTotal}</b>
              <sub>(Original)</sub>
            </p>
          </div>
        </p>

        <div className="matchResult">
          <span>
            Match - <b>{match} </b>
          </span>
          <span>
            Total - <b>{total} </b>
          </span>
          <span className="green">
            Win - <b> {winning} </b>
          </span>
          <span className="red">
            Loss - <b>{loosing} </b>
          </span>
          <span className="blue">
            No_Bet - <b> {noBet} </b>
          </span>
        </div>
        <div className="main-card">
          {filterData?.map((val, id) => {
            return (
              <div className="card" key={id} data-value={val.id}>
                <div className="top" style={{ position: "relative" }}>
                  <label
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {val.league}
                    <span style={{ position: "absolute", right: "130px" }}>
                      {rangeMaxFunConst(val)}
                    </span>
                  </label>

                  <label>
                    <span>
                      <b>Under - {rangeMaxFun(val)}</b>
                    </span>
                  </label>
                </div>
                <div className="middle">
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "start",
                    }}
                  >
                    {/* <i></i> */}
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
                        // Winning
                        parseInt(score.match(/\d+/g)) <= rangeMaxFun(val) - 15;
                        return parseInt(score.match(/\d+/g)) <=
                          rangeMaxFun(val) ? (
                          parseInt(score.match(/\d+/g)) <=
                          rangeMaxFun(val) - 15 ? (
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
