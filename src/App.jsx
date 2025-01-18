import React, { useCallback, useRef, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
// 地図のデザインを指定することができます。
// デザインは https://snazzymaps.com からインポートすることができます。

const libraries = ["places"];
const mapContainerStyle = {
  height: "60vh",
  width: "100%",
};
// 地図の大きさを指定します。

const options = {
  disableDefaultUI: true,
  // デフォルトUI（衛星写真オプションなど）をキャンセルします。
  zoomControl: true,
};

function InputTask() {
  const[Test, SetTest] = useState("test");

  function setText(){
    SetTest("set");
  }

  return (
    <button onClick={() => setText()}>{Test}</button>
  );
}

export default function GoogleMapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APP_googleMapsApiKey,
    // ここにAPIキーを入力します。今回は.envに保存しています。
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  //API読み込み後に再レンダーを引き起こさないため、useStateを使わず、useRefとuseCallbackを使っています。
 
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <InputTask />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        // デフォルトズーム倍率を指定します。
        center={{
          lat: 43.048225,
          lng: 141.49701,
        }}
        // 札幌周辺にデフォルトのセンターを指定しました。
        options={options}
        onLoad={onMapLoad}
      >
      </GoogleMap>
    </>
  );
}

