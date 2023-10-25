import { React, useRef, useState, Fragment } from "react";
import styles from "./RouteForm.module.css";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PlaceIcon from "@mui/icons-material/Place";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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
  const stopRef = useRef(null);

  const [stopContainerVisible, setStopContainerVisible] = useState(false);
  const [directionsRes, setDirectionsRes] = useState(null);
  const [routeFormVisible, setRouteFormVisible] = useState(false);

  const handleRouteSubmit = (e) => {
    e.preventDefault();

    const origin = originRef.current ? originRef.current.value : "";
    const destination = destinationRef.current
      ? destinationRef.current.value
      : "";
    const waypoint = stopRef.current ? stopRef.current.value : "";

    console.log(
      `Origin: ${origin}, Destination: ${destination}, Waypoint: ${waypoint}`
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

  const toggleStopVisibility = () => {
    setStopContainerVisible((prevValue) => !prevValue);
    console.log(stopContainerVisible);
  };

  const center = { lat: 42.4414, lng: 19.2624 };

  if (!isLoaded) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }

    if (stopRef.current && stopRef.current.value) {
      // eslint-disable-next-line no-undef
      const directionService = new google.maps.DirectionsService();
      const results = await directionService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: [
          {
            location: stopRef.current.value,
            stopover: true,
          },
        ],
      });

      setDirectionsRes(results);
    } else {
      // eslint-disable-next-line no-undef
      const directionService = new google.maps.DirectionsService();
      const results = await directionService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });

      setDirectionsRes(results);
    }
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
                  <div className={styles["stop-container"]}>
                    <Autocomplete className={styles.input}>
                      <input
                        type="text"
                        placeholder="Stopping place"
                        ref={stopRef}
                        required
                      />
                    </Autocomplete>
                    <button type="submit" className={styles["stop-submit-btn"]}>
                      <AddCircleIcon />
                    </button>
                  </div>
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
