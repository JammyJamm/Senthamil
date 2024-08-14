import { FC, useState } from "react";

import Layout from "./Layout";
import SabiApp from "./SabiApp";
import fire from "../src/assets/images/fire.png";
import fire1 from "../src/assets/images/fire1.png";
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
          <label
            style={
              switchs == true
                ? { backgroundImage: `url(${fire})` }
                : { backgroundImage: `url(${fire1})` }
            }
          ></label>
        </div>
      </div>
      {switchs ? <SabiApp /> : <Layout />}
    </div>
  );
};
