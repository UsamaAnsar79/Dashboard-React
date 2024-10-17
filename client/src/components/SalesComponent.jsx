import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import usaFlag from "../images/flag-icons/united-states.png";
import germanyFlag from "../images/flag-icons/germany.png";
import australiaFlag from "../images/flag-icons/australia.png";
import ukFlag from "../images/flag-icons/united-kingdom.png";
import romaniaFlag from "../images/flag-icons/romania.png";
import brazilFlag from "../images/flag-icons/brazil.png";

// Map of flag images
const flagImages = {
  "united-states": usaFlag,
  germany: germanyFlag,
  australia: australiaFlag,
  "united-kingdom": ukFlag,
  romania: romaniaFlag,
  brazil: brazilFlag,
};

// JSON data embedded directly in the component
const salesData = [
  {
    country: "USA",
    flagURL: "united-states",
    productQuantity: 2.920,
    salesPercentage: "53.23%",
    lat: 37.0902,
    lng: -95.7129,
  },
  {
    country: "Germany",
    flagURL: "germany",
    productQuantity: "1300",
    salesPercentage: "20.43%",
    lat: 51.1657,
    lng: 10.4515,
  },
  {
    country: "Australia",
    flagURL: "australia",
    productQuantity: 760,
    salesPercentage: "10.35%",
    lat: -25.2744,
    lng: 133.7751,
  },
  {
    country: "United Kingdom",
    flagURL: "united-kingdom",
    productQuantity: 690,
    salesPercentage: "7.87%",
    lat: 55.3781,
    lng: -3.4360,
  },
  {
    country: "Romania",
    flagURL: "romania",
    productQuantity: 600,
    salesPercentage: "5.94%",
    lat: 45.9432,
    lng: 24.9668,
  },
  {
    country: "Brazil",
    flagURL: "brazil",
    productQuantity: 550,
    salesPercentage: "4.34%",
    lat: -14.2350,
    lng: -51.9253,
  },
];

export default function SalesComponent() {
  return (
    <div className="container-fluid p-3" style={{ backgroundColor: "#27293d"}}>
      <div className="row flex-wrap">
        <div className="col-md-6 mb-3">
          <div className="text-light mb-3">
            <h4 className="h5">Global Sales By Top Locations</h4>
            <h6 className="h6 ">All Products That Were Shipped</h6>
          </div>
          <div className="list-group">
            {salesData.map((data, index) => {
              return (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center text-light py-2 border-bottom-only"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={flagImages[data.flagURL]}
                      alt={data.country}
                      className="flag-icon me-5"
                      style={{ width: "25px", height: "25px" }}
                    />
                    <h5 className="mb-0" style={{fontSize:"15px"}}>{data.country}</h5>
                  </div>
                  <div className="d-flex gap-4">
                    <p className="mb-0">{data.productQuantity}</p>
                    <p className="mb-0">{data.salesPercentage}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="map-container" style={{ height: "300px" }}>
            <MapContainer center={[20, 0]} zoom={1} className="h-100">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
              />
              {salesData.map((data, index) =>
                data.lat && data.lng ? (
                  <Marker key={index} position={[data.lat, data.lng]} />
                ) : null
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
