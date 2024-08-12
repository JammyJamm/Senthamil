import React from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "./FirbaseConfig";

const AddData = () => {
  const colRef = collection(db, "cricket");
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const addForm = document.querySelector("#addData");
    addDoc(colRef, {
      match: addForm.match.value,
      league: addForm.league.value,
      team1: addForm.team1.value,
      team2: addForm.team2.value,
      percentage: addForm.percentage.value,
      state: addForm.state.value,
      result: addForm.result.value,
    })
      .then((response) => {
        alert("Added");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleClose = () => {
    document.querySelector("#addWapper").setAttribute("class", "ui-addPlayer");
  };
  return (
    <div className="ui-addPlayer open" id="addWapper">
      <div className="cover">
        <h2 className="title">Add Match</h2>
        <div className="close" onClick={handleClose}>
          <img src="https://jammyjamm.github.io/JSON_Data/back.svg" />
        </div>
      </div>
      <div className="content">
        <div className="card">
          <div className="ui-add-data">
            <div className="form-elements">
              <form id="addData" onSubmit={handleAddSubmit} className="row">
                <div className="col-6 col-sm-6 col-md-4">
                  <label className="form-label">Match</label>
                  <input
                    type="text"
                    className="form-control"
                    name="match"
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
                  <label className="form-label">Team2</label>
                  <input
                    type="text"
                    className="form-control"
                    name="team2"
                    required
                  />
                </div>
                <div className="col-6 col-sm-6 col-md-4">
                  <label className="form-label">Team1</label>
                  <input
                    type="text"
                    className="form-control"
                    name="team1"
                    required
                  />
                </div>
                <div className="col-6 col-sm-6 col-md-4">
                  <label className="form-label">Percentage</label>
                  <input
                    type="number"
                    className="form-control"
                    name="percentage"
                  />
                </div>
                <div className="col-6 col-sm-6 col-md-4">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-control"
                    name="state"
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
                <div className="d-grid btn-group justify-content-center col-12 mx-auto">
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
export default AddData;
