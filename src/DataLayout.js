import React from "react";
import MainPage from "./MainPage";
import UpdataForm from "./UpdataForm";
import AddData from "./AddData";

export default function DataLayout() {
  return (
    <div className="ui-data-layout">
      <MainPage></MainPage>
      <UpdataForm></UpdataForm>
      <AddData></AddData>
    </div>
  );
}
// export default DataLayout;
