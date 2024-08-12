import db from "./FirbaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import React from "react";
import $ from "jquery";
// import Edit from 'Edit';
// import Delete from 'Delete';
function MainPage() {
  const [detail, setDetail] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState([]);
  const [selectBall, setSelectBall] = useState([]);
  const [filterOutcome, setFilterOutcome] = useState("");
  const [ascending, setAscending] = useState(true);

  // Fetching Data Starts //
  const url = "https://jammyjamm.github.io/JSON_Data/match_data.json";
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
        console.log(jsonData);
        setDetail(jsonData);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  };
  const userData = async () => {
    const q = query(collection(db, "cricket"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setDetail(data);
    console.log(data);
  };
  useEffect(() => {
    if (localStorage.getItem("GetData") == "true") {
      userData();
    } else {
      getData();
    }
  }, []);
  useEffect(() => {
    handelFilter();
  }, [detail]);
  // Send data from Form to DataBase
  const inputElement = useRef("");
  const getDataLine = async (e) => {
    e.preventDefault();
    console.log(e.target.dataset.value);
    const selectedLineItem = e.target.dataset.value;
    document.getElementById("selectedLine").value = selectedLineItem;

    // Get selected Value data
    const docRef = doc(db, "cricket", selectedLineItem);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    // Update selected line to form
    const updateForm = document.querySelector("#editDataItem");
    updateDoc(docRef, {
      match: (updateForm.match.value = docSnap.data().match),
      league: (updateForm.league.value = docSnap.data().league),
      team1: (updateForm.team1.value = docSnap.data().team1),
      team2: (updateForm.team2.value = docSnap.data().team2),
      percentage: (updateForm.percentage.value = docSnap.data().percentage),
      state: (updateForm.state.value = docSnap.data().state),
      result: (updateForm.result.value = docSnap.data().result),
      selectedLine: (updateForm.selectedLine.value =
        docSnap.data().selectedLine),
    })
      .then((response) => {
        alert("Selected line Updated");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Delete Data line
  const deleteDataLine = async (e) => {
    e.preventDefault();
    // alert("Delete working");
    console.log(e.target.dataset.value);
    const selectedLineItem = e.target.dataset.value;
    document.getElementById("selectedLine").value = selectedLineItem;
    // Get selected Value data
    const docRef = doc(db, "cricket", selectedLineItem);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    // Update selected line to form
    const updateForm = document.querySelector("#editDataItem");
    deleteDoc(docRef)
      .then((response) => {
        alert("Selected line Deleted");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  function handleFilterOutcome(e) {
    setFilterOutcome(e.target.value);
    setSelectBall((list) => [...list, e.target.value + ","]);
  }

  // useEffect(() => {
  //   //setSelectBall((list) => [...list, filterOutcome]);
  // }, [filterOutcome]);
  useEffect(() => {
    handelFilter();
  }, [selectBall]);

  function handelFilter() {
    setFilter(
      detail.filter((list) => {
        var ball = list.team2;
        return selectBall.every((val) => {
          return ball.includes(val);
        });
      })
    );
  }
  // Sorting Starts //
  const customSort = (a, b) => {
    const isANumber = !isNaN(parseFloat(a.team2)) && isFinite(a.team2);
    const isBNumber = !isNaN(parseFloat(b.team2)) && isFinite(b.team2);
    if (ascending === true) {
      if (isANumber && isBNumber) {
        return parseInt(a.team2) - parseInt(b.team2);
      } else if (isANumber) {
        return -1; // Sort numbers before strings
      } else if (isBNumber) {
        return 1; // Sort numbers before strings
      } else {
        // Sort strings alphabetically
        return a.team2.localeCompare(b.team2);
      }
    } else {
      if (!isANumber && !isBNumber) {
        return b.team2.localeCompare(a.team2);
      } else if (isANumber) {
        return 1; // Sort numbers before strings
      } else if (isBNumber) {
        return -1; // Sort numbers before strings
      } else {
        // Sort strings alphabetically
        return parseInt(b.team2) - parseInt(a.team2);
      }
    }
  };
  const sortAsc = filter.sort(customSort);
  // Sorting Ends //
  useEffect(() => {
    setSorting(sortAsc);
  }, [filter]);
  function handleClearFilter() {
    setSelectBall([""]);
  }
  function handleAscending() {
    if (ascending == true) setAscending(false);
    else setAscending(true);
    setSorting(sortAsc);
  }
  // Touch and hold - Update match list starts //
  const [isHolding, setIsHolding] = useState(false);

  let holdTimer;

  const handleTouchStart = async (e) => {
    e.preventDefault();
    console.log(e.target.dataset.value);
    const selectedLineItem = e.target.dataset.value;
    document.getElementById("UpdateFormBox").value = selectedLineItem;

    // Get selected Value data
    const docRef = doc(db, "cricket", selectedLineItem);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    // Update selected line to form
    const updateForm = document.querySelector("#editDataItem");
    updateDoc(docRef, {
      match: (updateForm.match.value = docSnap.data().match),
      league: (updateForm.league.value = docSnap.data().league),
      team1: (updateForm.team1.value = docSnap.data().team1),
      team2: (updateForm.team2.value = docSnap.data().team2),
      percentage: (updateForm.percentage.value = docSnap.data().percentage),
      state: (updateForm.state.value = docSnap.data().state),
      result: (updateForm.result.value = docSnap.data().result),
      selectedLine: (updateForm.selectedLine.value =
        docSnap.data().selectedLine),
    })
      .then((response) => {
        document
          .querySelector("#UpdateFormBox")
          .setAttribute("class", "ui-update-form  form-elements open");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Touch and hold - Update match list Ends //
  return (
    <div className="ui-mainpage ui-player-table">
      <p className="card col-12 ui-note">
        <b>
          {localStorage.getItem("GetData") == "true" ? (
            <i>Google - </i>
          ) : (
            <i>GIT - </i>
          )}
          Above 120 | Below 180
        </b>
      </p>
      <div className="ui-nav">
        <div className="card col-12 ui-select">
          <p>
            {selectBall == "" ? (
              <i>
                <b>No Ball Selected</b>
              </i>
            ) : (
              <b> {selectBall}</b>
            )}
            <div className="btn-switch">
              <label className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onClick={handleAscending}
                />
              </label>
              <button onClick={handleClearFilter}>Clear</button>
            </div>
          </p>
        </div>
        <div className="btn-group">
          <button
            className={filterOutcome == "0" ? "selected" : ""}
            value="0"
            onClick={handleFilterOutcome}
          >
            0
          </button>
          <button
            className={filterOutcome == "1" ? "selected" : ""}
            value="1"
            onClick={handleFilterOutcome}
          >
            1
          </button>
          <button
            className={filterOutcome == "4" ? "selected" : ""}
            value="4"
            onClick={handleFilterOutcome}
          >
            4
          </button>
          <button
            className={filterOutcome == "6" ? "selected" : ""}
            value="6"
            onClick={handleFilterOutcome}
          >
            6
          </button>
          <button
            className={filterOutcome == "W" ? "selected" : ""}
            value="W"
            onClick={handleFilterOutcome}
          >
            W
          </button>
          <button
            className={filterOutcome == "Wd" ? "selected" : ""}
            value="Wd"
            onClick={handleFilterOutcome}
          >
            Wd
          </button>
          <button
            className={filterOutcome == "lb" ? "selected" : ""}
            value="lb"
            onClick={handleFilterOutcome}
          >
            Lb
          </button>
        </div>
      </div>

      <div className="main-card">
        {sorting.map((val, id) => {
          return (
            <div
              className="card"
              key={id}
              onDoubleClick={handleTouchStart}
              data-value={val.id}
            >
              <div className="top">
                <p>{val.team2}</p>
                <p className="result">
                  {val.result == "Win" ? (
                    <label className="green">{val.result}</label>
                  ) : (
                    <label className="red">{val.result}</label>
                  )}
                </p>
                <p>
                  <span>{val.league}</span>
                </p>
              </div>
              <div className="bottom">
                <p className="state">
                  {val.state.trim() ? (
                    <i className="note red">Negative</i>
                  ) : (
                    <i className="note">Positive</i>
                  )}
                </p>
                <p>{val.match}</p>
                <p>
                  {val.percentage.split(",").map((value, i) => {
                    if (!value) return true;
                    return (
                      <label className="green" key={i}>
                        {value}
                      </label>
                    );
                  })}
                </p>
              </div>
            </div>

            // <tr key={id}>
            //   <td className="match">{val.match}</td>
            //   <td className="league">{val.league}</td>
            //   <td className="team">{val.team2}</td>
            //   {/* <td className="">{val.team1}</td> */}
            //   <td className="state">{((val.state).trim()? <label className="red">{val.state}</label>:"")}

            //   </td>
            //   <td className="percentage">
            //     {val.percentage.split(',').map((value, i) => {
            //       if(!value)return true
            //         return (
            //           <label className="green" key={i}>{value}</label>
            //          );
            //     })}
            //   </td>
            //   <td className="result">
            //     {(val.result=="Win"? <label className="green">{val.result}</label>: <label className="red">{val.result}</label>)}

            //   </td>
            //   <td className="icon" id="selectedLine" value={val.id}>
            //     <img
            //       src={}
            //       alt="edit icon"
            //       data-value={val.id}
            //       onClick={getDataLine}
            //     />
            //     <input
            //       type="hidden"
            //       value={val.id}
            //       ref={inputElement}
            //       readOnly
            //     />
            //     <img
            //       src={}
            //       alt="delete icon"
            //       data-value={val.id}
            //       onClick={deleteDataLine}
            //     />
            //   </td>
            // </tr>
          );
        })}
      </div>
    </div>
  );
}
export default MainPage;
