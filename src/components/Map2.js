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
  url: require("../iconMarker/iconM4.png"),
};

const markerIcon3 = {
  url: require("../iconMarker/iconM5.png"),
};

const markerIcon4 = {
  url: require("../iconMarker/iconM2.png"),
};

function Map2({ markersData1, markersData2, markersData3, markersData4 }) {
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
      if (markersData3) {
        bounds.extend(markersData3);
        map.fitBounds(bounds);
      }
      if (markersData4) {
        bounds.extend(markersData4);
        map.fitBounds(bounds);
      }
    }
  }, [map, markersData1, markersData2, markersData3, markersData4]);

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
        <Polyline
          path={[markersData1, markersData2]}
          options={{
            strokeColor: "blue",
            strokeOpacity: 1,
            strokeWeight: 1,
          }}
        />
      ) : (
        <Polyline
          path={[markersData1, markersData2]}
          options={{
            strokeOpacity: 0,
            strokeWeight: 0,
          }}
        />
      )}
      {markersData3 && <Marker position={markersData3} icon={markerIcon3} />}
      {markersData3 !== null ? (
        <Circle
          center={markersData3}
          options={{
            strokeColor: "orange",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "orange",
            fillOpacity: 0.1,
            radius: 50,
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
      {markersData4 && <Marker position={markersData4} icon={markerIcon4} />}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map2;
