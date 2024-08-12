import { useState } from "react";
import db from "./FirbaseConfig";
import { addDoc, collection } from "@firebase/firestore";
import Spinner from "./Spinner";

const AddPlayer = () => {
  const [load, setLoad] = useState(false);
  const handlePlayerScore = (e) => {
    e.preventDefault();
    setLoad(true);
    const addForm = document.querySelector("#addPlayer");
    console.log(addForm.noteOverWideOne.checked);
    const colRef = collection(db, "Player");
    addDoc(colRef, {
      year: addForm.year.value,
      vs: addForm.vs.value,
      league: addForm.league.value,
      gender: addForm.gender.value,
      match: addForm.match.value,
      player: addForm.player.value,
      captain: addForm.captain.value,
      position: addForm.position.value,
      about: addForm.about.value,
      score: addForm.score.value,
      result: addForm.result.value,
      outcome: addForm.outcome.value,
      noteOverWideOne: addForm.noteOverWideOne.checked,
      noteOverWideTwo: addForm.noteOverWideTwo.checked,
      noteOverWideFour: addForm.noteOverWideFour.checked,
      noteOverLegOne: addForm.noteOverLegOne.checked,
      noteOverLegTwo: addForm.noteOverLegTwo.checked,
      noteOverLegFour: addForm.noteOverLegFour.checked,
      noteOverWicket: addForm.noteOverWicket.checked,
      notePlayerWideOne: addForm.notePlayerWideOne.checked,
      notePlayerWideTwo: addForm.notePlayerWideTwo.checked,
      notePlayerWideFour: addForm.notePlayerWideFour.checked,
      notePlayerLegOne: addForm.notePlayerLegOne.checked,
      notePlayerLegTwo: addForm.notePlayerLegTwo.checked,
      notePlayerLegFour: addForm.notePlayerLegFour.checked,
    })
      .then((response) => {
        setLoad(false);
      })
      .catch((error) => {
        setLoad(false);
        console.log(error.message);
      });
  };

  const playerChange = (e) => {
    return e.target.value;
  };
  const handleClose = () => {
    document
      .querySelector("#addPlayerWapper")
      .setAttribute("class", "ui-addPlayer");
  };
  return (
    <div className="ui-addPlayer" id="addPlayerWapper">
      <div className="cover">
        <h2 className="title">Add Player</h2>
        <div className="close" onClick={handleClose}>
          <img src="https://jammyjamm.github.io/JSON_Data/back.svg" />
        </div>
      </div>
      <div className="content">
        <div className="card col-12">
          {load ? <Spinner /> : ""}
          <form id="addPlayer" className="row" onSubmit={handlePlayerScore}>
            <div className="col-6 col-sm-6 col-md-4">
              <label className="form-label">Year</label>
              <select
                name="year"
                className="form-select"
                onChange={playerChange}
              >
                <option value="2025">2024</option>
                <option value="2024">2023</option>
                <option value="2023">2022</option>
              </select>
            </div>
            <div className="col-6 col-sm-6 col-md-4">
              <label className="form-label">VS</label>
              <input
                type="text"
                name="vs"
                className="form-control"
                value="Major League"
                onChange={playerChange}
              />
            </div>
            <div className="col-6 col-sm-6 col-md-4">
              <label className="form-label">Match</label>
              <select
                name="match"
                className="form-select"
                onChange={playerChange}
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
                onChange={playerChange}
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
                onChange={playerChange}
              >
                <option value="IL">International League</option>
                <option value="IndiaLeague">India League</option>
                <option value="IPL">IPL</option>
                <option value="InterNational">International</option>
                <option value="SA20">SA20 League</option>
                <option value="BPL">Bangladesh League</option>
                <option value="BBL">BBl League</option>
              </select>
            </div>
            <div className="col-6 col-sm-6 col-md-4">
              <label className="form-label">Player Name</label>
              <input
                type="text"
                name="player"
                className="form-control"
                onChange={playerChange}
              />
            </div>
            <div className="col-6 col-sm-6 col-md-4">
              <label className="form-label">Captain</label>
              <select
                name="captain"
                className="form-select"
                onChange={playerChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div className="col-6 col-sm-6 col-md-4">
              <label className="form-label">Batting position</label>
              <select
                name="position"
                className="form-select"
                onChange={playerChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>
            <div className="col-6 col-sm-6 col-md-4">
              <label className="form-label">About</label>
              <select
                name="about"
                className="form-select"
                onChange={playerChange}
              >
                <option value="Bat">Battter</option>
                <option value="opn">Opener</option>
                <option value="Wk">Wicket Keeper</option>
                <option value="All">All Rounder</option>
              </select>
            </div>
            <div className="col-6 col-sm-6 col-md-4">
              <label className="form-label">Score</label>
              <input
                type="text"
                className="form-control"
                name="score"
                onChange={playerChange}
              />
            </div>
            <div className="col-6 col-sm-6 col-md-4">
              <label className="form-label">Result</label>
              <select
                name="result"
                className="form-select"
                onChange={playerChange}
              >
                <option value="Win">Win</option>
                <option value="Loss">Loss</option>
              </select>
            </div>
            <div className="col-6 col-sm-6 col-md-4">
              <label className="form-label">Outcome</label>
              <select
                name="outcome"
                className="form-select"
                onChange={playerChange}
              >
                <option value="1,4">1,4</option>
                <option value="4,1">4,1</option>
                <option value="1,6">1,6</option>
                <option value="2,4,1">2,4,1</option>
                <option value="6,1">6,1</option>
                <option value="1,4,4">1,4,4</option>
                <option value="4,4,1">4,4,1</option>
              </select>
            </div>
            <div className="col-6 col-md-4" style={{ display: "none" }}>
              <div className="form-check">
                <input type="checkbox" value="Over Wd 1" id="noteOverWideOne" />
                <label className="form-check-label" htmlFor="noteOverWideOne">
                  Over-Wide-1
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" value="Over Wd 2" id="noteOverWideTwo" />
                <label className="form-check-label" htmlFor="noteOverWideTwo">
                  Over-Wide-2
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  value="Over Wd 4"
                  id="noteOverWideFour"
                />
                <label className="form-check-label" htmlFor="noteOverWideFour">
                  Over-Wide-4
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" value="Over Lb 1" id="noteOverLegOne" />
                <label className="form-check-label" htmlFor="noteOverLegOne">
                  Over-Lb-1
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" value="Over Lb 2" id="noteOverLegTwo" />
                <label className="form-check-label" htmlFor="noteOverLegTwo">
                  Over-Lb-2
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" value="Over Lb 4" id="noteOverLegFour" />
                <label className="form-check-label" htmlFor="noteOverLegFour">
                  Over-Lb-4
                </label>
              </div>
            </div>

            <div className="col-6 col-md-4" style={{ display: "none" }}>
              <div className="form-check">
                <input
                  type="checkbox"
                  value="Player Wd 1"
                  id="notePlayerWideOne"
                />
                <label className="form-check-label" htmlFor="notePlayerWideOne">
                  Player-Wide-1
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  value="Player Wd 2"
                  id="notePlayerWideTwo"
                />
                <label className="form-check-label" htmlFor="notePlayerWideTwo">
                  Player-Wide-2
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  value="Player Wd 4"
                  id="notePlayerWideFour"
                />
                <label
                  className="form-check-label"
                  htmlFor="notePlayerWideFour"
                >
                  Player-Wide-4
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  value="Player Lb 1"
                  id="notePlayerLegOne"
                />
                <label className="form-check-label" htmlFor="notePlayerLegOne">
                  Player-Lb-1
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  value="Player Lb 2"
                  id="notePlayerLegTwo"
                />
                <label className="form-check-label" htmlFor="notePlayerLegTwo">
                  Player-Lb-2
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  value="Player Lb 4"
                  id="notePlayerLegFour"
                />
                <label className="form-check-label" htmlFor="notePlayerLegFour">
                  Player-Lb-4
                </label>
              </div>
            </div>
            <div className="form-check" style={{ display: "none" }}>
              <input type="checkbox" value="Wk" id="noteOverWicket" />
              <label className="form-check-label" htmlFor="noteOverWicket">
                Wk
              </label>
            </div>

            <div
              className="d-grid btn-group justify-content-center col-6 mx-auto"
              style={{ margin: "16px" }}
            >
              <button className="btn btn-primary">Add Player</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddPlayer;
