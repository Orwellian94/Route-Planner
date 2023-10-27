import { React, useRef, useState, Fragment } from "react";
import styles from "./RouteForm.module.css";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PlaceIcon from "@mui/icons-material/Place";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const libraries = ["places"];

const RouteForm = (props) => {
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const [stopContainerVisible, setStopContainerVisible] = useState(false);
  const [directionsRes, setDirectionsRes] = useState(null);
  const [routeFormVisible, setRouteFormVisible] = useState(false);
  const [waypointInputList, setWaypointInputList] = useState([
    { waypointInput: "" },
  ]);
  const [searchResult, setSearchResult] = useState("");
  const [selectedAddresses, setSelectedAddresses] = useState([]);

  const handleRouteSubmit = (e) => {
    e.preventDefault();

    const origin = originRef.current ? originRef.current.value : "";
    const destination = destinationRef.current
      ? destinationRef.current.value
      : "";

    console.log(
      `Origin: ${origin}, Destination: ${destination}, Waypoints:`,
      selectedAddresses
    );
  };

  const toggleFormVisibility = () => {
    setRouteFormVisible(!routeFormVisible);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBjizW_mGoQQI6jma6lTEWpaSsoYhKa6y8",
    libraries: libraries,
  });

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged(index) {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const formattedAddress = place.formatted_address;
      console.log(`Formatted Address: ${formattedAddress}`);

      const updatedAddresses = [...selectedAddresses];
      updatedAddresses[index] = formattedAddress;
      setSelectedAddresses(updatedAddresses);
    } else {
      alert("Please enter text");
    }
  }

  const toggleStopVisibility = () => {
    setStopContainerVisible((prevValue) => !prevValue);
  };

  const center = { lat: 42.4414, lng: 19.2624 };

  if (!isLoaded) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
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

  // Create an array of waypoints for the DirectionsService
  const waypointLocations = waypoints.map((address) => ({
    location: address,
    stopover: true,
  }));

  const filteredWaypointLocations = waypointLocations.filter(
    (waypoint) => waypoint.location !== ""
  );

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }

    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: filteredWaypointLocations,
    });

    setDirectionsRes(results);
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
          {directionsRes && <DirectionsRenderer directions={directionsRes} />}
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
              <form onSubmit={handleRouteSubmit}>
                <div className={styles.inputs}>
                  <div className={styles["input1-container"]}>
                    <label>
                      <PlaceIcon />
                    </label>
                    <Autocomplete className={styles.input}>
                      <input
                        type="text"
                        placeholder="Origin"
                        ref={originRef}
                        required
                      />
                    </Autocomplete>
                  </div>
                  <div className={styles["input2-container"]}>
                    <label>
                      <PlaceIcon sx={{ color: "#beff0a" }} />
                    </label>
                    <Autocomplete className={styles.input}>
                      <input
                        type="text"
                        placeholder="Destination"
                        ref={destinationRef}
                        required
                      />
                    </Autocomplete>
                  </div>
                </div>
                <div className={styles.btns}>
                  <button type="submit" onClick={calculateRoute}>
                    Create Route
                  </button>
                  <span
                    className={styles["add-stop"]}
                    onClick={toggleStopVisibility}
                  >
                    Add Stop
                  </span>
                </div>
                {stopContainerVisible && (
                  <ul className={styles["stop-container"]}>
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
                          onPlaceChanged={() => onPlaceChanged(index)}
                          onLoad={onLoad}
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
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RouteForm;
