import { useEffect, useRef, useState } from "react";
const Profile = () => {
  const handleNotification = () => {
    document
      .querySelector("#notification")
      .setAttribute("class", "ui-notific open");
    if (localStorage.getItem("GetData") == "true") {
      document.querySelector("#getDataSwitch").checked = true;
    }
  };
  function handleData(e) {
    //alert(e.target.checked);
    if (e.target.checked == true) {
      localStorage.setItem("GetData", true);
    } else {
      localStorage.setItem("GetData", false);
    }
  }
  const handleClose = () => {
    document.querySelector("#notification").setAttribute("class", "ui-notific");
  };
  const handleMatch = () => {
    document
      .querySelector("#addWapper")
      .setAttribute("class", "ui-addPlayer open");
  };
  // Get Data From Google fire base

  return (
    <div className="ui-topNav ui-match-nav">
      <div className="profile">
        <div className="image">
          <img
            src="https://jammyjamm.github.io/JSON_Data/logo_sabisenthu.png"
            alt="logo"
          />
        </div>
      </div>

      <div className="more">
        <img
          src="https://jammyjamm.github.io/JSON_Data/add.svg"
          onClick={handleMatch}
        />
        <img
          src="https://jammyjamm.github.io/JSON_Data/notification.svg"
          onClick={handleNotification}
        />
      </div>
      <div className="ui-notific" id="notification">
        <div className="cover">
          <h2 class="title">Notification</h2>
          <div className="close" onClick={handleClose}>
            <img src="https://jammyjamm.github.io/JSON_Data/back.svg" />
          </div>
        </div>
        <div className="content">
          <div className="card">
            <div className="block">
              <div className="">
                <i className="fa-brands fa-google"></i>
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
  );
};
export default Profile;
