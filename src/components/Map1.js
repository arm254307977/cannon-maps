import React, { useEffect, useState } from "react";
import {
  Circle,
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 14.31,
  lng: 101.53,
};

const markerIcon1 = {
  url: require("../iconMarker/iconM1.png"),
};

const markerIcon2 = {
  url: require("../iconMarker/iconM2.png"),
};

const markerIcon3 = {
  url: require("../iconMarker/iconM3.png"),
}

function Map1({ markersData1, markersData2, markersData3, radius }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && (markersData1 || markersData2)) {
      const bounds = new window.google.maps.LatLngBounds();
      if (markersData1 && !markersData2) {
        bounds.extend(markersData1);
        map.fitBounds(bounds);
        map.setZoom(15);
      } else {
        bounds.extend(markersData1);
        map.fitBounds(bounds);
      }
      if (markersData2) {
        bounds.extend(markersData2);
        map.fitBounds(bounds);
      }
    }
  }, [map, markersData1, markersData2]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markersData1 && <Marker position={markersData1} icon={markerIcon1} />}
      {markersData2 && <Marker position={markersData2} icon={markerIcon2} />}
      {markersData2 !== null ? (
        <Circle
          center={markersData2}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "#FF0000",
            fillOpacity: 0.1,
            radius: radius,
          }}
        />
      ) : (
        <Circle
          center={markersData2}
          options={{
            radius: 0,
          }}
        />
      )}
      {markersData3 && <Marker position={markersData3} icon={markerIcon3} />}
      {markersData1 !== null && markersData3 !== null ? (
        <Polyline
          path={[markersData1, markersData3]}
          options={{
            strokeColor: "blue",
            strokeOpacity: 1,
            strokeWeight: 1,
          }}
        />
      ) : (
        <Polyline
          path={[markersData1, markersData3]}
          options={{
            strokeOpacity: 0,
            strokeWeight: 0,
          }}
        />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map1;
