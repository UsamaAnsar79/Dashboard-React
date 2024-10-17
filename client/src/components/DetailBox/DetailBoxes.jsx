
import React from "react";
import DetailsBox from "./DetailsBoxComponent";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DetailBoxes() {
  return (
    <div>
      <div className="row justify-content-between">
        <div className="col-sm-12 col-md-6 col-lg-3 ">
          <DetailsBox
            icon={"bi bi-chat icon1"}
            boxHeading1="Number"
            boxHeading2="150GB"
            footerIcon={"bi bi-arrow-clockwise"}
            footerText="Update Now"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
          <DetailsBox
            icon={"bi bi-star icon2"}
            boxHeading1="Followers"
            boxHeading2="+45k"
            footerIcon={"bi bi-activity"}
            footerText="Last Research"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
          <DetailsBox
            icon={"bi bi-person icon3"}
            boxHeading1="Users"
            boxHeading2="150,000"
            footerIcon={"bi bi-trophy"}
            footerText="Customers feedback"
          />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
          <DetailsBox
            icon={"bi bi-hexagon icon4"}
            boxHeading1="Errors"
            boxHeading2="12"
            footerIcon={"bi bi-smartwatch"}
            footerText="In the last hours"
          />
        </div>
      </div>
    </div>
  );
}
