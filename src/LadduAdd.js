import React from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "./FirbaseConfig";
import back from "../src/assets/images/back.svg";
import background from "../src/assets/images/Background.png";
import { Link } from "react-router-dom";
export const LadduAdd = () => {
  // const colRef = collection(db, "player");
  const handleLadduAddMatch = (e) => {
    e.preventDefault();
    const addForm = document.querySelector("#addLadduData");

    const colRef = collection(db, "jammy");
    addDoc(colRef, {
      //   player1Name: addForm.player1Name.value,
      //   player1Role: addForm.player1Role.value,
      //   player1Score: addForm.player1Score.value,
      //   player2Name: addForm.player2Name.value,
      //   player2Role: addForm.player2Role.value,
      //   player2Score: addForm.player2Score.value,
      league: addForm.league.value,
      result: addForm.result.value,,nbvc 
    })
      .then((response) => {
        alert("Added");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="ui-addLadduMatch" id="addWapper">
      <div className="cover" style={{ backgroundImage: `url(${background})` }}>
        <h2 className="title">Add Laddu Match</h2>
        <div className="close">
          <Link to="laddu">
            <img src={back} />
          </Link>
        </div>
      </div>
      <div className="content">
        <div className="card">
          <div className="ui-add-data">
            <div className="form-elements">
              <form
                id="addLadduData"
                onSubmit={handleLadduAddMatch}
                className="row"
              >
                <div className="col-6 col-sm-6 col-md-4">
                  <label className="form-label">Player1 Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="player1Name"
                    required
                  />
                </div>
                <div className="col-6 col-sm-6 col-md-4">
                  <label className="form-label">Player1 Role</label>
                  <select
                    type="text"
                    className="form-control"
                    name="player1Role"
                    required
                  >
                    <option value="wk">Wicket Keeper</option>
                    <option value="captain">Captain</option>
                    <option value="player">Player</option>
                  </select>
                </div>
                <div className="col-6 col-sm-6 col-md-4">
                  <label className="form-label">Player1 Score</label>
                  <input
                    type="text"
                    className="form-control"
                    name="player1Score"
                    required
                  />
                </div>
                <div className="col-6 col-sm-6 col-md-4">
                  <label className="form-label">Player2 Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="player2Name"
                    required
                  />
                </div>
                <div className="col-6 col-sm-6 col-md-4">
                  <label className="form-label">Player2 Role</label>
                  <select
                    type="text"
                    className="form-control"
                    name="player2Role"
                    required
                  >
                    <option value="wk">Wicket Keeper</option>
                    <option value="captain">Captain</option>
                    <option value="player">Player</option>
                  </select>
                </div>
                <div className="col-6 col-sm-6 col-md-4">
                  <label className="form-label">Player2 Score</label>
                  <input
                    type="text"
                    className="form-control"
                    name="player2Score"
                    required
                  />
                </div>
                <div className="col-6 col-sm-6 col-md-4">
                  <label className="form-label">League</label>
                  <input
                    type="text"
                    className="form-control"
                    name="league"
                    required
                  />
                </div>
                <div className="col-6 col-sm-6 col-md-4">
                  <label className="form-label">Result</label>
                  <input
                    type="text"
                    className="form-control"
                    name="result"
                    required
                  />
                </div>

                <div
                  className="d-grid btn-group justify-content-center col-12 mx-auto"
                  style={{ margin: "16px" }}
                >
                  <button className="btn btn-primary blue-btn">Add Data</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
