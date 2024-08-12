import { useEffect, useState } from "react";
import AddPlayer from "./AddPlayer";
import { collection, getDocs, query } from "@firebase/firestore";
import db from "./FirbaseConfig";
import Spinner from "./Spinner";
import add from "../src/assets/images/add.svg";
import logo from "../src/assets/images/logo_senthamil.png";
import notification from "../src/assets/images/notification.svg";
import back from "../src/assets/images/back.svg";
import google from "../src/assets/images/google.svg";
const PlayerData = () => {
  const [playerData, setPlayerData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [max, setMax] = useState("");
  const [min, setMin] = useState("");
  const [firstMax, setFirstMax] = useState("");
  const [firstMin, setFirstMin] = useState("");
  const [secondMax, setSecondMax] = useState("");
  const [secondMin, setSecondMin] = useState("");
  const [amount, setAmount] = useState(10000);
  const [winningAmount, setWinningAmount] = useState(0);
  const [indianRuppes, setIndianRuppes] = useState(0);
  const [resultTotal, setResultTotal] = useState(0);
  const [resultNo, setResultNo] = useState(0);
  const [resultFirst, setResultFirst] = useState(0);
  const [resultSecond, setResultSecond] = useState(0);
  const [resultLoss, setResultLoss] = useState(0);
  const [resultNote, setResultNote] = useState("");
  const [searchPlayer, setSearchPlayer] = useState("");
  const [filterMatch, setFilterMatch] = useState("T20");
  const [filterGender, setFilterGender] = useState("male");
  const [filterLeague, setFilterLeague] = useState("IPL");
  const [filterOutcome, setFilterOutcome] = useState("1,4");
  const [marquee, setMarquee] = useState([]);
  // Fetching Data Starts //
  const url = "https://jammyjamm.github.io/MatchData/data.json";
  const getData = () => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        // Work with the JSON data
        //console.log(jsonData);
        setDetail(jsonData);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  };
  // Fetching Data Ends //
  const userData = async () => {
    const q = query(collection(db, "Player"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      //
      ...doc.data(),
    }));
    setDetail(data);
    // console.log(data);
  };
  useEffect(() => {
    if (localStorage.getItem("GetData") == "true") {
      userData();
    } else {
      getData();
    }
  }, []);
  useEffect(() => {
    handleFilter(filterMatch, filterGender, filterLeague, filterOutcome);
    //userData();
  }, [detail]);
  /// userData
  const handleFilter = (
    filterMatch,
    filterGender,
    filterLeague,
    filterOutcome
  ) => {
    // console.log(detail);
    const ds = detail.filter(
      ({ match, league, gender, outcome }) =>
        match === filterMatch &&
        league === filterLeague &&
        gender === filterGender &&
        outcome === filterOutcome
    );

    ds.sort((a, b) => {
      return b.year - a.year;
    });

    setPlayerData(ds);
    totalAmount(ds, filterOutcome);
  };
  const [a, setA] = useState([]);
  const handelSearchPlayer = (e) => {
    setSearchPlayer(e.target.value);
    //console.log(playerData);
    const serachStr = "DINESH";
    const ds = playerData.filter((list) => {
      list.player.toUpperCase().includes(serachStr.toUpperCase());
    });
    setA(ds);
  };

  const handleFilterOutcome = (e) => {
    setFilterOutcome(e.target.value);
    handleFilter(filterMatch, filterGender, filterLeague, e.target.value);
  };
  const handleFilterLeague = (e) => {
    setFilterLeague(e.target.value);
    handleFilter(filterMatch, filterGender, e.target.value, filterOutcome);
  };
  // Notifiction Starts //
  const handleNotification = () => {
    document
      .querySelector("#notification")
      .setAttribute("class", "ui-notific open");
    if (localStorage.getItem("GetData") == "true") {
      document.querySelector("#getDataSwitch").checked = true;
    }
  };
  function handleData(e) {
    if (e.target.checked == true) {
      localStorage.setItem("GetData", true);
    } else {
      localStorage.setItem("GetData", false);
    }
  }
  const handleClose = () => {
    document
      .querySelector("#addPlayerWapper")
      .setAttribute("class", "ui-addPlayer");
    document.querySelector("#notification").setAttribute("class", "ui-notific");
  };
  // Notificatio Ends //
  const handleAddPlayer = () => {
    document
      .querySelector("#addPlayerWapper")
      .setAttribute("class", "ui-addPlayer open");
  };
  // Notificatio Ends //
  const handleMatch = () => {
    document
      .querySelector("#matchWapper")
      .setAttribute("class", "ui-match open");
  };
  const handelShowLoss = (e) => {
    if (e.target.checked == true) {
      document
        .querySelector(".ui-player-table")
        .setAttribute("class", "main-card col-12 ui-player-table loss");
    } else {
      document
        .querySelector(".ui-player-table")
        .setAttribute("class", "main-card col-12 ui-player-table");
    }
  };
  const handleNote = () => {
    document
      .querySelector(".ui-player-table")
      .setAttribute("class", "main-card col-12 ui-player-table loss");
  };

  const totalAmount = (ds, outcome) => {
    setWinningAmount(0);
    setResultTotal(0);
    setResultFirst(0);
    setResultSecond(0);
    setResultLoss(0);
    setResultNo(0);
    setResultTotal(ds?.length);
    setResultNote("");
    switch (outcome) {
      case "1,4":
        setFirstMin(0);
        setFirstMax(23);
        setSecondMin(24);
        setSecondMax(43);
        let data14 = [
          {
            first: { state: "loss", min: 0, max: 23 },
            second: { state: "win", min: 24, max: 43 },
          },
        ];
        resultCheck(ds, outcome);
        //getMarquee(37, 100);
        return true;
      case "4,1":
        setFirstMin(0);
        setFirstMax(23);
        setSecondMin(24);
        setSecondMax(43);
        let data41 = [
          {
            first: { state: "loss", min: 0, max: 23 },
            second: { state: "win", min: 24, max: 43 },
          },
        ];
        resultCheck(ds, outcome);
        //getMarquee(26, 70);
        return true;
      case "1,6":
        setFirstMin(0);
        setFirstMax(23);
        setSecondMin(24);
        setSecondMax(43);
        let data16 = [
          {
            first: { state: "loss", min: 0, max: 23 },
            second: { state: "win", min: 24, max: 43 },
          },
        ];
        resultCheck(ds, outcome);
        //getMarquee(27, 55);
        return true;
      case "6,1":
        setFirstMin(0);
        setFirstMax(23);
        setSecondMin(24);
        setSecondMax(43);
        let data61 = [
          {
            first: { state: "loss", min: 0, max: 23 },
            second: { state: "win", min: 24, max: 43 },
          },
        ];
        resultCheck(ds, outcome);
        //getMarquee(27, 44);
        return true;
      case "1,4,4":
        setFirstMin(0);
        setFirstMax(35);
        setSecondMin(0);
        setSecondMax(0);
        let data144 = [
          {
            first: { state: "win", min: 0, max: 35 },
            second: { state: "win", min: null, max: null },
          },
        ];
        resultCheck(ds, outcome);
        //getMarquee(0, 39);
        return true;
      case "4,4,1":
        setFirstMin(0);
        setFirstMax(39);
        setSecondMin(0);
        setSecondMax(0);
        let data441 = [
          {
            first: { state: "win", min: 0, max: 39 },
            second: { state: "win", min: null, max: null },
          },
        ];
        resultCheck(ds, "4,4,1");
        //getMarquee(20, 51);
        return true;
      default:
        resultCheck(ds, outcome);
      // setMin(23);
      // setMax(40);
      //getMarquee(23, 40);
    }
    //});
    //
  };
  function resultCheck(ds, outcome) {
    ds.map((list) => {
      if (list.about == "Wk") {
        setResultNo((count) => count + 1);
        return setWinningAmount((amt) => amt);
      } else if (
        parseInt(list.score) >= firstMin &&
        parseInt(list.score) <= firstMax &&
        (outcome == "1,4" ||
          outcome == "4,1" ||
          outcome == "6,1" ||
          outcome == "1,6") &&
        list.about != "Wk"
      ) {
        setResultFirst((count) => count + 1);
        return setWinningAmount((amt) => amt + amount);
      } else if (
        parseInt(list.score) > secondMax &&
        list.about != "Wk" &&
        (outcome == "1,4" ||
          outcome == "4,1" ||
          outcome == "6,1" ||
          outcome == "1,6")
      ) {
        setResultSecond((count) => count + 1);
        return setWinningAmount((amt) => amt);
      } /* 1,4,4 Starts */ else if (
        parseInt(list.score) > firstMax &&
        list.about != "Wk" &&
        outcome == "1,4,4"
      ) {
        setResultFirst((count) => count + 1);
        return setWinningAmount((amt) => amt + amount);
      } /* 4,4,1 Starts */ else if (
        parseInt(list.score) < firstMax &&
        list.about != "Wk" &&
        outcome == "4,4,1"
      ) {
        setResultFirst((count) => count + 1);
        return setWinningAmount((amt) => amt + amount);
      } else {
        getMarquee(list.player);
        setResultLoss((count) => count + 1);
        return setWinningAmount((amt) => amt - 2 * amount);
      }
    });
  }
  // Marquee text
  function getMarquee(player) {
    const marquees = [];
    // ds.filter((list) => {
    //   if (parseInt(list.score) >= a && parseInt(list.score) <= b) {
    marquees.push(player + ", ");
    //   }
    // });
    setMarquee((player) => [...player, marquees]);
  }
  useEffect(() => {
    // Convert Indian Ruppes
    let formattedAmount = winningAmount.toString();
    let parts = formattedAmount.split(".");
    let rupees = parts[0];
    let paise = parts.length > 1 ? "." + parts[1] : "";
    rupees = rupees.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let amount = "₹" + rupees + paise;
    // Convert Indian Ruppes Ends
    return setIndianRuppes(amount);
  }, [winningAmount]);

  return (
    <div className="ui-player">
      <div className="ui-nav">
        <button
          className={filterOutcome == "1,4" ? "selected" : ""}
          value="1,4"
          onClick={handleFilterOutcome}
        >
          {/* <img src="https://jammyjamm.github.io/JSON_Data/14.png" alt="14" /> */}
          14
        </button>
        <button
          className={filterOutcome == "4,1" ? "selected" : ""}
          value="4,1"
          onClick={handleFilterOutcome}
        >
          41
        </button>
        <button
          className={filterOutcome == "1,6" ? "selected" : ""}
          value="1,6"
          onClick={handleFilterOutcome}
        >
          16
        </button>
        <button
          className={filterOutcome == "6,1" ? "selected" : ""}
          value="6,1"
          onClick={handleFilterOutcome}
        >
          61
        </button>
        <button
          className={filterOutcome == "1,4,4" ? "selected" : ""}
          value="1,4,4"
          onClick={handleFilterOutcome}
        >
          144
        </button>
        <button
          className={filterOutcome == "4,4,1" ? "selected" : ""}
          value="4,4,1"
          onClick={handleFilterOutcome}
        >
          441
        </button>
      </div>
      <div className="ui-topNav">
        <div className="image">
          <div className="profile">
            <img src={logo} alt="logo" />
          </div>
          <div className="more">
            {/* <img
              src="https://jammyjamm.github.io/JSON_Data/add.svg"
              onClick={handleNote}
            /> */}
            <img src={add} onClick={handleAddPlayer} />
            <img src={notification} onClick={handleNotification} />
            {/* <i className="fa-regular fa-bell" onClick={handleNotification}>
              More
            </i> */}
          </div>
          <div className="ui-notific" id="notification">
            <div className="cover">
              <h2 className="title">Get Data </h2>
              <div className="close" onClick={handleClose}>
                <img src={back} />
                {/* <i className="fa-solid fa-arrow-left"></i> */}
              </div>
            </div>
            <div className="content">
              <div className="card">
                <div className="block">
                  <div className="icon">
                    <img src={google} alt="google" />
                    <label>Get Data </label>
                  </div>
                  <div className="btn-switch">
                    <label className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={(e) => handleData(e)}
                        id="getDataSwitch"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gameBlock">
          <div className="game">
            <button
              value="IPL"
              onClick={handleFilterLeague}
              className={filterLeague == "IPL" ? "selected" : ""}
            >
              IPL
            </button>
            <button
              value="IndiaLeague"
              onClick={handleFilterLeague}
              className={filterLeague == "IndiaLeague" ? "selected" : ""}
            >
              Indian
            </button>

            <button
              value="SA20"
              onClick={handleFilterLeague}
              className={filterLeague == "SA20" ? "selected" : ""}
            >
              SA20
            </button>
            <button
              value="InterNational"
              onClick={handleFilterLeague}
              className={filterLeague == "InterNational" ? "selected" : ""}
            >
              International
            </button>

            <button
              value="BBL"
              onClick={handleFilterLeague}
              className={filterLeague == "BBL" ? "selected" : ""}
            >
              BBL
            </button>
            <button
              value="IL"
              onClick={handleFilterLeague}
              className={filterLeague == "IL" ? "selected" : ""}
            >
              IL
            </button>
          </div>
          {/* <div className="show">
            <div className="form-check form-switch">
               <label className="form-check-label text" htmlFor="showOnlyLoss">
              Show Only
            </label> 
              <input
                className="form-check-input"
                type="checkbox"
                id="showOnlyLoss"
                onChange={handelShowLoss}
              />
              <label></label>
            </div>
          </div> */}
        </div>
      </div>
      <div className="card" style={{ display: "none" }}>
        <form id="playerFilter" className="row">
          <div className="col-6 col-sm-6 col-md-4">
            <label className="form-label">Match</label>
            <select
              name="match"
              className="form-select"
              onChange={handleFilter}
            >
              <option value="T20">T20</option>
              <option value="ODI">ODI</option>
            </select>
          </div>
          <div className="col-6 col-sm-6 col-md-4">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              className="form-select"
              onChange={handleFilter}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="col-6 col-sm-6 col-md-4">
            <label className="form-label">League</label>
            <select
              name="league"
              className="form-select"
              onChange={handleFilter}
            >
              <option value="IPL">IPL</option>
              <option value="SA20">SA20 League</option>
              <option value="InterNational">International</option>
              <option value="BPL">Bangladesh League</option>
              <option value="BBL">BBl League</option>
              <option value="IL">International League</option>
            </select>
          </div>

          <div className="col-6 col-sm-6 col-md-4">
            <label className="form-label">Outcome</label>
            <select
              name="outcome"
              className="form-select"
              onChange={handleFilter}
            >
              <option value="1,4">1,4</option>
              <option value="4,1">4,1</option>
              <option value="1,6">1,6</option>
              <option value="6,1">6,1</option>
              <option value="1,4,4">1,4,4</option>
              <option value="4,4,1">4,4,1</option>
            </select>
          </div>
          <div className="col-6 col-sm-6 col-md-4">
            <label className="form-label">Outcome</label>
            <input
              type="text"
              className="form-control"
              placeholder="Player Name"
              onChange={handelSearchPlayer}
              name="searchPlayer"
              value={searchPlayer}
            />
          </div>
        </form>
      </div>
      <div className="card col-12 ui-note" style={{ marginTop: "68px" }}>
        {filterOutcome == "1,4" ? (
          <div className="note">
            <i>
              <b>
                {localStorage.getItem("GetData") == "true" ? (
                  <i>Google </i>
                ) : (
                  <i>GIT </i>
                )}
              </b>
            </i>
            {indianRuppes}
            <span>
              1<sup>No</sup> ({firstMin},{firstMax}) - 2<sup>Yes</sup> (
              {secondMin},{secondMax})
            </span>
          </div>
        ) : (
          <i></i>
        )}
        {filterOutcome == "4,1" ? (
          <div className="note">
            <i>
              <b>
                {localStorage.getItem("GetData") == "true" ? (
                  <i>Google </i>
                ) : (
                  <i>GIT </i>
                )}
              </b>
            </i>
            {indianRuppes}
            <span>
              1<sup>No</sup> ({firstMin},{firstMax}) - 2<sup>Yes</sup> (
              {secondMin},{secondMax})
            </span>
          </div>
        ) : (
          <i></i>
        )}
        {filterOutcome == "1,6" ? (
          <div className="note">
            <i>
              <b>
                {localStorage.getItem("GetData") == "true" ? (
                  <i>Google </i>
                ) : (
                  <i>GIT </i>
                )}
              </b>
            </i>
            {indianRuppes}
            <span>
              1<sup>No</sup> ({firstMin},{firstMax}) - 2<sup>Yes</sup> (
              {secondMin},{secondMax})
            </span>
          </div>
        ) : (
          <i></i>
        )}
        {filterOutcome == "6,1" ? (
          <div className="note">
            <i>
              <b>
                {localStorage.getItem("GetData") == "true" ? (
                  <i>Google </i>
                ) : (
                  <i>GIT </i>
                )}
              </b>
            </i>
            {indianRuppes}
            <span>
              1<sup>No</sup> ({firstMin},{firstMax}) - 2<sup>Yes</sup> (
              {secondMin},{secondMax})
            </span>
          </div>
        ) : (
          <i></i>
        )}
        {filterOutcome == "1,4,4" ? (
          <div className="note">
            <i>
              <b>
                {localStorage.getItem("GetData") == "true" ? (
                  <i>Google </i>
                ) : (
                  <i>GIT </i>
                )}
              </b>
            </i>
            {indianRuppes}
            <span>
              1<sup>No</sup> ({firstMin},{firstMax}) - 2<sup>Yes</sup> (
              {secondMin},{secondMax})
            </span>
          </div>
        ) : (
          <i></i>
        )}
        {filterOutcome == "4,4,1" ? (
          <div className="note">
            <i>
              <b>
                {localStorage.getItem("GetData") == "true" ? (
                  <i>Google </i>
                ) : (
                  <i>GIT </i>
                )}
              </b>
            </i>
            {indianRuppes}
            <span>
              1<sup>No</sup> ({firstMin},{firstMax}) - 2<sup>Yes</sup> (
              {secondMin},{secondMax})
            </span>
          </div>
        ) : (
          <i></i>
        )}
      </div>
      <div className="matchResult">
        <span>
          Total - <b>{resultTotal} </b>
        </span>
        <span className="green">
          First - <b> {resultFirst} </b>
        </span>
        <span className="blue">
          Second - <b> {resultSecond} </b>
        </span>
        <span className="red">
          Loss - <b>{resultLoss} </b>
        </span>
        <span className="yellow">
          No - <b>{resultNo} </b>
        </span>
      </div>
      <div className="main-card col-12 ui-player-table">
        {/* {playerData?.map((list, id) => {
              return (
                <tr
                  key={id}
                  className={
                    (parseInt(list.score) <= max ? 'min' : 'max') +
                    ' ' +
                    (parseInt(list.score) >= min && parseInt(list.score) <= max
                      ? 'loss'
                      : 'win')
                  }
                >
                  <td>{list.year - 1}</td>
                  <td>{list.vs}</td>
                  <td>{list.player}</td>
                  <td>{list.position}</td>
                  <td>{list.about}</td>
                  <td>
                    {list.captain == 'yes' ? (
                      <span className="red">c</span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>{list.score}</td>
                  <td>
                    {parseInt(list.score) >= min &&
                    parseInt(list.score) <= max ? (
                      <span className="red">Loss</span>
                    ) : (
                      <span className="green">Win</span>
                    )}
                   
                  </td>
                  <td>
                    {list.noteOverWideOne ? (
                      <span className="red">Over-Wide-1</span>
                    ) : (
                      ''
                    )}
                    {list.noteOverWideTwo ? (
                      <span className="red">Over-Wide-2</span>
                    ) : (
                      ''
                    )}
                    {list.noteOverWideFour ? (
                      <span className="red">Over-Wide-4</span>
                    ) : (
                      ''
                    )}
                    {list.noteOverLegOne ? (
                      <span className="red">Over-LegBye-1</span>
                    ) : (
                      ''
                    )}
                    {list.noteOverLegTwo ? (
                      <span className="red">Over-LegBye-2</span>
                    ) : (
                      ''
                    )}
                    {list.noteOverLegFour ? (
                      <span className="red">Over-LegBye-4</span>
                    ) : (
                      ''
                    )}
                    {list.noteOverWicket ? (
                      <span className="red">Over-Wicket</span>
                    ) : (
                      ''
                    )}
                    {list.notePlayerWideOne ? (
                      <span className="red">Player-Wide-1</span>
                    ) : (
                      ''
                    )}
                    {list.notePlayerWideTwo ? (
                      <span className="red">Player-Wide-2</span>
                    ) : (
                      ''
                    )}
                    {list.notePlayerWideFour ? (
                      <span className="red">Player-Wide-4</span>
                    ) : (
                      ''
                    )}
                    {list.notePlayerLegOne ? (
                      <span className="red">Player-Leg-1</span>
                    ) : (
                      ''
                    )}
                    {list.notePlayerLegTwo ? (
                      <span className="red">Player-Leg-2</span>
                    ) : (
                      ''
                    )}
                    {list.notePlayerLegFour ? (
                      <span className="red">Player-Leg-4</span>
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
              );
            })} */}

        {/* <marquee behavior="scroll" direction="left">
          
        </marquee> */}
        <div className="marquee">
          <div className="text">{marquee}</div>
        </div>

        {playerData?.map((list, id) => {
          return (
            <div
              className={
                parseInt(list.score) >= min && parseInt(list.score) <= max
                  ? "card Loss"
                  : "card Win"
              }
              key={id}
            >
              {/* <div className="top">
                <label>{list.vs}</label>
                <label>
                  <span>{list.year - 1}</span>
                 
                </label>
              </div> */}
              <div className="middle">
                <label>{list.player} </label>
                <label className="result">
                  {/* 1,4 - 4,1 - 1,6 - 6,1 Starts */}
                  {parseInt(list.score) >= firstMin &&
                  parseInt(list.score) <= firstMax &&
                  (filterOutcome == "1,4" ||
                    filterOutcome == "4,1" ||
                    filterOutcome == "6,1" ||
                    filterOutcome == "1,6") &&
                  list.about != "Wk" ? (
                    <span className="green">First</span>
                  ) : (
                    ""
                  )}
                  {parseInt(list.score) > secondMax &&
                  list.about != "Wk" &&
                  (filterOutcome == "1,4" ||
                    filterOutcome == "4,1" ||
                    filterOutcome == "6,1" ||
                    filterOutcome == "1,6") ? (
                    <span className="blue">Second</span>
                  ) : (
                    ""
                  )}
                  {parseInt(list.score) >= secondMin &&
                  parseInt(list.score) <= secondMax &&
                  (filterOutcome == "1,4" ||
                    filterOutcome == "4,1" ||
                    filterOutcome == "6,1" ||
                    filterOutcome == "1,6") &&
                  list.about != "Wk" ? (
                    <span className="red">Loss</span>
                  ) : (
                    ""
                  )}
                  {/* 1,4 - 4,1 - 1,6 - 6,1 Ends */}
                  {/* 1,4,4 Starts */}

                  {parseInt(list.score) < firstMax &&
                  list.about != "Wk" &&
                  filterOutcome == "1,4,4" ? (
                    <span className="red">Loss</span>
                  ) : (
                    ""
                  )}
                  {parseInt(list.score) >= firstMax &&
                  filterOutcome == "1,4,4" &&
                  list.about != "Wk" ? (
                    <span className="green">First</span>
                  ) : (
                    ""
                  )}
                  {/* 1,4,4 Ends */}
                  {/* 4,4,1 Starts */}
                  {parseInt(list.score) < firstMax &&
                  list.about != "Wk" &&
                  filterOutcome == "4,4,1" ? (
                    <span className="green">First</span>
                  ) : (
                    ""
                  )}
                  {parseInt(list.score) >= firstMax &&
                  filterOutcome == "4,4,1" &&
                  list.about != "Wk" ? (
                    <span className="red">Loss</span>
                  ) : (
                    ""
                  )}
                  {/* 4,4,1 Ends */}
                  {list.about == "Wk" ? (
                    <span className="yellow">No Result</span>
                  ) : (
                    ""
                  )}
                </label>
                <label>{list.score}</label>
              </div>
              <div className="bottom">
                <label className="state">
                  {list.captain == "yes" ? (
                    <i className="note red">
                      {list.about}-{list.position}
                    </i>
                  ) : (
                    <i className="note">
                      {list.about}-{list.position}
                    </i>
                  )}
                </label>
                <label>
                  {list.vs} , {list.year - 1}
                </label>
                <label>
                  {list.noteOverWideOne ? (
                    <span className="red">Over-Wide-1</span>
                  ) : (
                    ""
                  )}
                  {list.noteOverWideTwo ? (
                    <span className="red">Over-Wide-2</span>
                  ) : (
                    ""
                  )}
                  {list.noteOverWideFour ? (
                    <span className="red">Over-Wide-4</span>
                  ) : (
                    ""
                  )}
                  {list.noteOverLegOne ? (
                    <span className="red">Over-LegBye-1</span>
                  ) : (
                    ""
                  )}
                  {list.noteOverLegTwo ? (
                    <span className="red">Over-LegBye-2</span>
                  ) : (
                    ""
                  )}
                  {list.noteOverLegFour ? (
                    <span className="red">Over-LegBye-4</span>
                  ) : (
                    ""
                  )}
                  {list.noteOverWicket ? (
                    <span className="red">Over-Wicket</span>
                  ) : (
                    ""
                  )}
                  {list.notePlayerWideOne ? (
                    <span className="red">Player-Wide-1</span>
                  ) : (
                    ""
                  )}
                  {list.notePlayerWideTwo ? (
                    <span className="red">Player-Wide-2</span>
                  ) : (
                    ""
                  )}
                  {list.notePlayerWideFour ? (
                    <span className="red">Player-Wide-4</span>
                  ) : (
                    ""
                  )}
                  {list.notePlayerLegOne ? (
                    <span className="red">Player-Leg-1</span>
                  ) : (
                    ""
                  )}
                  {list.notePlayerLegTwo ? (
                    <span className="red">Player-Leg-2</span>
                  ) : (
                    ""
                  )}
                  {list.notePlayerLegFour ? (
                    <span className="red">Player-Leg-4</span>
                  ) : (
                    ""
                  )}
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <div className="main-card col-12 ui-playerNote">
        <div className="cover">
          <div className="close">
            <img src={back} />
          </div>
          <div className="content">
            <div className="card col-12">
              <div className="box">
                <div className="ball">
                  <span>1</span>
                  <span>4</span>
                </div>
                <div className="result">
                  <span>Wait 26 & 45</span>
                </div>
              </div>
              <div className="box">
                <div className="ball">
                  <span>4</span>
                  <span>1</span>
                </div>
                <div className="result">
                  <span>Wait 26 & 45</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlayerData;
