import { FC, useState } from "react";

import Layout from "./Layout";
import SabiApp from "./SabiApp";
export const App = ({ name }) => {
  const [switchs, setSwitchs] = useState(false);
  const handelSwitch = () => {
    setSwitchs(!switchs);
  };
  return (
    <div className="app-container">
      <div class="show">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            onClick={handelSwitch}
          />
          <label></label>
        </div>
      </div>
      {switchs ? <SabiApp /> : <Layout />}
    </div>
  );
};
