import { FC } from "react";

import Layout from "./Layout";
import SabiApp from "./SabiApp";
export const App = ({ name }) => {
  return (
    <div className="app-container">
      {/* <Layout /> */}
      <SabiApp />
    </div>
  );
};
