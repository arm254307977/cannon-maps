import React, { useEffect, useState } from "react";
import {
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
  url: "https://scontent.xx.fbcdn.net/v/t1.15752-9/362137937_5656603701109327_4928987995166075586_n.png?stp=cp0_dst-png&_nc_cat=102&cb=99be929b-59f725be&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeGeXyuWa-kL8nInEiwyTgJxe4n_VKGFL-N7if9UoYUv4xC8gXWtw4r1xenBYT3dq_CCzGVqfFxfk_su4QDJOM5_&_nc_ohc=cfK6qzc1vjAAX8SQYQZ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRfd0WYFeI2MKwK7b1z1UFIDWyck6QLGJoBawq6dc1UaQ&oe=64E36845",
};

const markerIcon2 = {
  url: "https://scontent.xx.fbcdn.net/v/t1.15752-9/362888790_1716994962088621_3952762805277764525_n.png?stp=cp0_dst-png&_nc_cat=110&cb=99be929b-59f725be&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeEu3rPZvP01NON_CrNkRhOt92fs6dN3AWn3Z-zp03cBadP5pgJ4s2LeVIo2L0yHmLh5stpFMFf8BCbRpNn_qiax&_nc_ohc=4J6AP7s7DEEAX90kfZD&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTCUFyUUvjrAmiX3Tt2H22LBvfMOzr9ntQAsph6JW3-7g&oe=64E340FD",
};

function Map2 ({ markersData1, markersData2}) {
  
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
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map2;
