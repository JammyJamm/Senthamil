import { doc, updateDoc } from "firebase/firestore";
import db from "./FirbaseConfig";
import React from "react";
import { useEffect, useRef, useState } from "react";

function UpdataForm() {
  // Form upodated - Form to Database
  function handleUpdateFormSubmit(e) {
    e.preventDefault();
    const getSelectedLineValue = document.getElementById("UpdateFormBox").value;
    if (getSelectedLineValue != undefined) {
      // const examcollref = doc(db, "cricket", "4Rq2HGQU2mXq787L3Gfd");
      const examcollref = doc(db, "cricket", getSelectedLineValue);
      const updateForm = document.querySelector("#editDataItem");
      updateDoc(examcollref, {
        match: updateForm.match.value,
        league: updateForm.league.value,
        team1: updateForm.team1.value,
        team2: updateForm.team2.value,
        percentage: updateForm.percentage.value,
        state: updateForm.state.value,
        result: updateForm.result.value,
        selectedLine: updateForm.selectedLine.value,
      })
        .then((response) => {
          handlelClose();
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      alert("Please select some value line item");
    }
  }
  // Form Updated - DataBase to updated form
  // Update form data
  function handlelClose() {
    document.querySelector("#UpdateFormBox").removeAttribute("class", "open");
  }
  return (
    <div className="ui-update-form  form-elements" id="UpdateFormBox">
      <div className="card">
        <div className="cancel" onClick={handlelClose}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <h5>Update Form</h5>
        <form
          id="editDataItem"
          onSubmit={handleUpdateFormSubmit}
          className="row"
          value="jammy"
        >
          <div className="col-6 col-sm-6 col-md-4">
            <label className="form-label">Match</label>
            <input type="text" className="form-control" name="match" />
          </div>
          {/* <div className="col-6 col-sm-6 col-md-4">
            <label className="form-label">Year</label>
            <select name="year" className="form-select" onChange={playerChange}>
              <option value="2024">2024</option>
            </select>
          </div> */}
          <div className="col-6 col-sm-6 col-md-4">
            <label className="form-label">League</label>
            <input type="text" className="form-control" name="league" />
          </div>
          <div className="col-6 col-sm-6 col-md-4">
            <label className="form-label">Team2</label>
            <input type="text" className="form-control" name="team2" />
          </div>
          <div className="col-6 col-sm-6 col-md-4">
            <label className="form-label">Team1</label>
            <input type="text" className="form-control" name="team1" />
          </div>
          <div className="col-6 col-sm-6 col-md-4">
            <label className="form-label">Percentage</label>
            <input type="text" className="form-control" name="percentage" />
          </div>
          <div className="col-6 col-sm-6 col-md-4">
            <label className="form-label">State</label>
            <input type="text" className="form-control" name="state" />
          </div>
          <div className="col-6 col-sm-6 col-md-4">
            <label className="form-label">Result</label>
            <input type="text" className="form-control" name="result" />
          </div>
          <div className="col-6 col-sm-6 col-md-4">
            <input type="hidden" id="selectedLine" value="" />
          </div>
          <div className="d-grid btn-group justify-content-center col-12 mx-auto">
            <button className="btn btn-primary blue-btn">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default UpdataForm;
