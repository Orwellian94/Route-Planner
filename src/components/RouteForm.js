import { React, useState, Fragment, useEffect } from "react";
import styles from "./RouteForm.module.css";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PlaceIcon from "@mui/icons-material/Place";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Loading from "./Loading";
import originPin from "./../assets/images/originPin.png";
import destinationPin from "./../assets/images/destinationPin.png";
import waypointPin from "./../assets/images/waypointPin.png";
import "./google-places-autocomplete.css";

import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";

const libraries = ["places"];

const RouteForm = (props) => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [wpt, setWpt] = useState(null);
  const [stopContainerVisible, setStopContainerVisible] = useState(false);
  const [directionsRes, setDirectionsRes] = useState(null);
  const [routeFormVisible, setRouteFormVisible] = useState(false);
  const [waypointInputList, setWaypointInputList] = useState([
    { waypointInput: "" },
  ]);
  const [originSearchResult, setOriginSearchResult] = useState(null);
  const [destinationSearchResult, setDestinationSearchResult] = useState(null);
  const [waypointSearchResult, setWaypointSearchResult] = useState(null);
  const [selectedAddresses, setSelectedAddresses] = useState([]);
  const [directionsRendererOptions, setDirectionsRendererOptions] = useState();

  useEffect(() => {
    if (!stopContainerVisible) {
      setSelectedAddresses([]);
    }
  }, [stopContainerVisible]);

  const handleRouteSubmit = (e) => {
    e.preventDefault();
  };

  const toggleFormVisibility = () => {
    setRouteFormVisible(!routeFormVisible);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBjizW_mGoQQI6jma6lTEWpaSsoYhKa6y8",
    libraries: libraries,
  });

  function onOriginLoad(autocomplete) {
    setOriginSearchResult(autocomplete);
  }

  function onDestinationLoad(autocomplete) {
    setDestinationSearchResult(autocomplete);
  }

  function onWaypointLoad(autocomplete) {
    setWaypointSearchResult(autocomplete);
  }

  function onOriginChanged() {
    if (originSearchResult != null) {
      const place = originSearchResult.getPlace();
      const location = place.geometry.location;
      setOrigin({ lat: location.lat(), lng: location.lng() });
    }
  }

  function onDestinationChanged() {
    if (destinationSearchResult != null) {
      const place = destinationSearchResult.getPlace();
      const location = place.geometry.location;
      setDestination({ lat: location.lat(), lng: location.lng() });
    }
  }

  function onWaypointChanged(index) {
    if (waypointSearchResult != null) {
      const place = waypointSearchResult.getPlace();
      const location = place.geometry.location;
      const formattedAddress = place.formatted_address;
      console.log(`Formatted Address: ${formattedAddress}`);

      const updatedAddresses = [...selectedAddresses];
      updatedAddresses[index] = formattedAddress;
      setSelectedAddresses(updatedAddresses);

      const updatedWaypoints = [...waypoints];
      updatedWaypoints[index] = { lat: location.lat(), lng: location.lng() };
      setWpt(updatedWaypoints);
    }
  }

  const toggleStopVisibility = () => {
    setStopContainerVisible((prevValue) => !prevValue);
  };

  const center = { lat: 42.4414, lng: 19.2624 };

  if (!isLoaded) {
    return <Loading />;
  }

  const handleWaypointAdd = () => {
    setWaypointInputList([...waypointInputList, { waypoint: "" }]);

    setSelectedAddresses([...selectedAddresses, ""]);
  };

  const handleWaypointRemove = (index) => {
    const list = [...waypointInputList];
    list.splice(index, 1);
    setWaypointInputList(list);

    const addresses = [...selectedAddresses];
    addresses.splice(index, 1);
    setSelectedAddresses(addresses);
  };

  const waypoints = selectedAddresses.filter((address) => address);

  const waypointLocations = waypoints.map((address) => ({
    location: address,
    stopover: true,
  }));

  const filteredWaypointLocations = waypointLocations.filter(
    (waypoint) => waypoint.location !== ""
  );

  const rendererOptions = {
    polylineOptions: {
      strokeColor: "#0a2342",
      strokeOpacity: 0.8,
      strokeWeight: 5,
    },
    suppressMarkers: true,
  };

  async function calculateRoute() {
    if (origin === "" || destination === "") {
      return;
    }

    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: origin,
      destination: destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: filteredWaypointLocations,
      optimizeWaypoints: true,
    });

    setDirectionsRes(results);

    setDirectionsRendererOptions(rendererOptions);
  }

  return (
    <Fragment>
      <div className={styles["form-and-map-container"]}>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {directionsRes && (
            <DirectionsRenderer
              directions={directionsRes}
              options={directionsRendererOptions}
            />
          )}
          {origin && (
            <Marker
              position={origin}
              icon={{
                url: originPin,
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
          )}
          {destination && (
            <Marker
              position={destination}
              icon={{
                url: destinationPin,
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
          )}
          {waypoints.map((waypoint, index) => (
            <Marker
              key={index}
              position={wpt[index]}
              icon={{
                url: waypointPin,
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
          ))}
        </GoogleMap>

        <div className={styles.container}>
          <div className={styles.expand} onClick={toggleFormVisibility}>
            {routeFormVisible ? (
              <CloseRoundedIcon
                fontSize="inherit"
                className={styles["expand-icon"]}
              />
            ) : (
              <KeyboardDoubleArrowDownRoundedIcon
                fontSize="inherit"
                className={styles["expand-icon"]}
              />
            )}
            <span>Create Route</span>
          </div>
          <div className={styles["form-container"]}>
            {routeFormVisible && (
              <form
                onSubmit={handleRouteSubmit}
                className={styles["route-form-container"]}
              >
                <div className={styles.inputs}>
                  <div className={styles["input1-container"]}>
                    <label>
                      <PlaceIcon />
                    </label>
                    <Autocomplete
                      className={styles.input}
                      onLoad={onOriginLoad}
                      onPlaceChanged={onOriginChanged}
                    >
                      <input type="text" placeholder="Origin" required />
                    </Autocomplete>
                  </div>
                  <div className={styles["input2-container"]}>
                    <label>
                      <PlaceIcon sx={{ color: "#beff0a" }} />
                    </label>
                    <Autocomplete
                      className={styles.input}
                      onLoad={onDestinationLoad}
                      onPlaceChanged={onDestinationChanged}
                    >
                      <input type="text" placeholder="Destination" required />
                    </Autocomplete>
                  </div>
                </div>
                {stopContainerVisible && (
                  <div className={styles["stop-container"]}>
                    <ul className={styles.stops}>
                      {waypointInputList.map((singleWaypoint, index) => (
                        <li key={index}>
                          {waypointInputList && index > 0 && (
                            <button
                              className={styles["remove-stop-btn"]}
                              onClick={() => handleWaypointRemove(index)}
                            >
                              <RemoveCircleIcon />
                            </button>
                          )}
                          <Autocomplete
                            className={styles.input}
                            onPlaceChanged={() => onWaypointChanged(index)}
                            onLoad={onWaypointLoad}
                          >
                            <input
                              type="text"
                              placeholder="Stopping place"
                              required
                            />
                          </Autocomplete>
                          {waypointInputList.length - 1 === index &&
                            waypointInputList.length <= 4 && (
                              <button
                                type="submit"
                                className={styles["add-stop-btn"]}
                                onClick={handleWaypointAdd}
                              >
                                <AddCircleIcon />
                              </button>
                            )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className={styles.btns}>
                  <button
                    type="submit"
                    onClick={calculateRoute}
                    className={`${styles["create-route-btn"]} ${
                      stopContainerVisible ? styles["full-width"] : ""
                    }`}
                  >
                    Create Route
                  </button>
                  <span
                    className={styles["add-stop"]}
                    onClick={toggleStopVisibility}
                  >
                    {stopContainerVisible ? "Close" : "Add Stop"}
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RouteForm;
