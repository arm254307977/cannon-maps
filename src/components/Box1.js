import React, { useState } from "react";
import "../style/Box1.css";
import Map1 from "./Map1";
import Swal from "sweetalert2";

const conversToMGRS = (lat, lng) => {
  let Lat = parseFloat(lat);
  let Long = parseFloat(lng);
  if (Lat < -80) return "Too far South";
  if (Lat > 84) return "Too far North";
  let c = 1 + Math.floor((Long + 180) / 6);
  let e = c * 6 - 183;
  let k = (Lat * Math.PI) / 180;
  let l = (Long * Math.PI) / 180;
  let m = (e * Math.PI) / 180;
  let n = Math.cos(k);
  let o = 0.006739496819936062 * Math.pow(n, 2);
  let p = 40680631590769 / (6356752.314 * Math.sqrt(1 + o));
  let q = Math.tan(k);
  let r = q * q;
  let t = l - m;
  let u = 1.0 - r + o;
  let v = 5.0 - r + 9 * o + 4.0 * (o * o);
  let w = 5.0 - 18.0 * r + r * r + 14.0 * o - 58.0 * r * o;
  let x = 61.0 - 58.0 * r + r * r + 270.0 * o - 330.0 * r * o;
  let y = 61.0 - 479.0 * r + 179.0 * (r * r) - r * r * r;
  let z = 1385.0 - 3111.0 * r + 543.0 * (r * r) - r * r * r;
  let aa =
    p * n * t +
    (p / 6.0) * Math.pow(n, 3) * u * Math.pow(t, 3) +
    (p / 120.0) * Math.pow(n, 5) * w * Math.pow(t, 5) +
    (p / 5040.0) * Math.pow(n, 7) * y * Math.pow(t, 7);
  let ab =
    6367449.14570093 *
      (k -
        0.00251882794504 * Math.sin(2 * k) +
        0.00000264354112 * Math.sin(4 * k) -
        0.00000000345262 * Math.sin(6 * k) +
        0.000000000004892 * Math.sin(8 * k)) +
    (q / 2.0) * p * Math.pow(n, 2) * Math.pow(t, 2) +
    (q / 24.0) * p * Math.pow(n, 4) * v * Math.pow(t, 4) +
    (q / 720.0) * p * Math.pow(n, 6) * x * Math.pow(t, 6) +
    (q / 40320.0) * p * Math.pow(n, 8) * z * Math.pow(t, 8);
  aa = aa * 0.9996 + 500000.0;
  ab = ab * 0.9996;
  if (ab < 0.0) ab += 10000000.0;
  let ad = "CDEFGHJKLMNPQRSTUVWXX".charAt(Math.floor(Lat / 8 + 10));
  let ae = Math.floor(aa / 100000);
  let af = ["ABCDEFGH", "JKLMNPQR", "STUVWXYZ"][(c - 1) % 3].charAt(ae - 1);
  let ag = Math.floor(ab / 100000) % 20;
  let ah = ["ABCDEFGHJKLMNPQRSTUV", "FGHJKLMNPQRSTUVABCDE"][(c - 1) % 2].charAt(
    ag
  );
  function pad(val) {
    if (val < 10) {
      val = "0000" + val;
    } else if (val < 100) {
      val = "000" + val;
    } else if (val < 1000) {
      val = "00" + val;
    } else if (val < 10000) {
      val = "0" + val;
    }
    return val;
  }
  aa = Math.floor(aa % 100000);
  aa = pad(aa);
  ab = Math.floor(ab % 100000);
  ab = pad(ab);

  return c + ad + " " + af + ah + " " + aa + " " + ab;
};

const conversToLatLng = (mgrs) => {
  let a = mgrs;
  let b = a.trim();
  b = b.match(/\S+/g);
  if (b == null || b.length !== 4) return [false, null, null];
  let c = b[0].length < 3 ? b[0][0] : b[0].slice(0, 2);
  let d = b[0].length < 3 ? b[0][1] : b[0][2];
  let e = ((c * 6 - 183) * Math.PI) / 180;
  let f =
    ["ABCDEFGH", "JKLMNPQR", "STUVWXYZ"][(c - 1) % 3].indexOf(b[1][0]) + 1;
  let g = "CDEFGHJKLMNPQRSTUVWXX".indexOf(d);
  let h = ["ABCDEFGHJKLMNPQRSTUV", "FGHJKLMNPQRSTUVABCDE"][(c - 1) % 2].indexOf(
    b[1][1]
  );
  let i = [
    1.1, 2.0, 2.8, 3.7, 4.6, 5.5, 6.4, 7.3, 8.2, 9.1, 0, 0.8, 1.7, 2.6, 3.5,
    4.4, 5.3, 6.2, 7.0, 7.9,
  ];
  let j = [0, 2, 2, 2, 4, 4, 6, 6, 8, 8, 0, 0, 0, 2, 2, 4, 4, 6, 6, 6];
  let k = i[g];
  let l = Number(j[g]) + h / 10;
  if (l < k) l += 2;
  let m = f * 100000.0 + Number(b[2]);
  let n = l * 1000000 + Number(b[3]);
  m -= 500000.0;
  if (d < "N") n -= 10000000.0;
  m /= 0.9996;
  n /= 0.9996;
  let o = n / 6367449.14570093;
  let p =
    o +
    0.0025188266133249035 * Math.sin(2.0 * o) +
    0.0000037009491206268 * Math.sin(4.0 * o) +
    0.0000000074477705265 * Math.sin(6.0 * o) +
    0.000000000017035994 * Math.sin(8.0 * o);
  let q = Math.tan(p);
  let r = q * q;
  let s = r * r;
  let t = Math.cos(p);
  let u = 0.006739496819936062 * Math.pow(t, 2);
  let v = 40680631590769 / (6356752.314 * Math.sqrt(1 + u));
  let w = v;
  let x = 1.0 / (w * t);
  w *= v;
  let y = q / (2.0 * w);
  w *= v;
  let z = 1.0 / (6.0 * w * t);
  w *= v;
  let aa = q / (24.0 * w);
  w *= v;
  let ab = 1.0 / (120.0 * w * t);
  w *= v;
  let ac = q / (720.0 * w);
  w *= v;
  let ad = 1.0 / (5040.0 * w * t);
  w *= v;
  let ae = q / (40320.0 * w);
  let af = -1.0 - u;
  let ag = -1.0 - 2 * r - u;
  let ah =
    5.0 + 3.0 * r + 6.0 * u - 6.0 * r * u - 3.0 * (u * u) - 9.0 * r * (u * u);
  let ai = 5.0 + 28.0 * r + 24.0 * s + 6.0 * u + 8.0 * r * u;
  let aj = -61.0 - 90.0 * r - 45.0 * s - 107.0 * u + 162.0 * r * u;
  let ak = -61.0 - 662.0 * r - 1320.0 * s - 720.0 * (s * r);
  let al = 1385.0 + 3633.0 * r + 4095.0 * s + 1575 * (s * r);
  let lat =
    p +
    y * af * (m * m) +
    aa * ah * Math.pow(m, 4) +
    ac * aj * Math.pow(m, 6) +
    ae * al * Math.pow(m, 8);
  let lng =
    e +
    x * m +
    z * ag * Math.pow(m, 3) +
    ab * ai * Math.pow(m, 5) +
    ad * ak * Math.pow(m, 7);
  lat = (lat * 180) / Math.PI;
  lng = (lng * 180) / Math.PI;
  return [lat, lng];
};

function Box1(props) {
  const [mgrs1, setMgrs1] = useState("");
  const [markerPosition1, setMarkerPosition1] = useState(null);
  const [mgrs2, setMgrs2] = useState("");
  const [markerPosition2, setMarkerPosition2] = useState(null);
  const [markerPosition3, setMarkerPosition3] = useState(null);
  const [positionFallTrue, setPositionFallTrue] = useState(null);
  const [meterR, setMeterR] = useState(500);
  const inputMeterR = (event) => {
    setMeterR(parseFloat(event.target.value));
  };

  const inputMgrs1 = (event) => {
    setMgrs1(event.target.value);
  };

  const saveInput1 = async (event) => {
    event.preventDefault();
    const newData = {
      mgrs1: mgrs1,
      radius: meterR,
    };

    if (mgrs1) {
      const M = conversToLatLng(mgrs1);
      await setMarkerPosition1({
        lat: parseFloat(M[0]),
        lng: parseFloat(M[1]),
      });
      props.addData(newData);
    } else {
      return Swal.fire({
        position: "top",
        icon: "warning",
        title: "กรุณากรอกข้อมูลก่อนยืนยัน",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const inputMgrs2 = (event) => {
    setMgrs2(event.target.value);
  };

  const saveInput2 = async (event) => {
    event.preventDefault();
    if (mgrs1) {
      if (mgrs2) {
        const M = conversToLatLng(mgrs2);
        await setMarkerPosition2({
          lat: parseFloat(M[0]),
          lng: parseFloat(M[1]),
        });
      } else {
        return Swal.fire({
          position: "top",
          icon: "warning",
          title: "กรุณากรอกข้อมูลก่อนยืนยัน",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      return Swal.fire({
        position: "top",
        icon: "warning",
        title: "กรุณากรอกข้อมูลพิกัดเริ่มต้นก่อน",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    // console.log(markerPosition2);
  };

  const shoot = async (e) => {
    e.preventDefault();
    if (
      markerPosition1 &&
      markerPosition2 &&
      meterR !== "" &&
      meterR !== null &&
      meterR !== undefined &&
      !isNaN(meterR)
    ) {
      let x0 = markerPosition2.lng;
      let y0 = markerPosition2.lat;

      let rd = meterR / 111300;

      let u = Math.random();
      let v = Math.random();

      let w = rd * Math.sqrt(u);
      let t = 2 * Math.PI * v;
      let x = w * Math.cos(t);
      let y = w * Math.sin(t);

      let xp = x / Math.cos(y0);
      const dropPoint = { lat: y + y0, lng: xp + x0 };
      await setMarkerPosition3(dropPoint);
      await setPositionFallTrue(conversToMGRS(dropPoint.lat, dropPoint.lng));
      const newData = await {
        mgrs1: mgrs1,
        radius: meterR,
        answerLat: markerPosition2.lat - y,
        answerLng: markerPosition2.lng - xp,
      };
      props.addData(newData);
      // await setDiscrepancy(conversToMGRS(xp, y));
    } else {
      return Swal.fire({
        position: "top",
        icon: "warning",
        title: "กรุณากรอกข้อมูลให้ครบ\nและกดยืนยันพิกัดก่อนยิง",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const clearMarker = (e) => {
    const newData = {
      mgrs1: null,
      radius: 500,
    };
    setMarkerPosition1(null);
    setMarkerPosition2(null);
    setMarkerPosition3(null);
    setPositionFallTrue(null);
    setMgrs1("");
    setMgrs2("");
    props.addData(newData);
  };

  return (
    <>
      <div className="boxTitle1">
        <h1 className="titleBox1">ครั้งที่ 1</h1>
      </div>
      <div className="containerBox1">
        <div className="boxForm">
          <form>
            <label>ความกว้างรัศมีโดยรอบ (เมตร)</label>
            <input
              type="number"
              placeholder="radius"
              value={meterR}
              onChange={inputMeterR}
            />
          </form>
          <form>
            <label>พิกัดปืนใหญ่เริ่มต้น</label>
            <input
              type="text"
              placeholder="MGRS"
              value={mgrs1}
              onChange={inputMgrs1}
            />
            <button onClick={saveInput1} className="btnDefault">
              ยืนยัน
            </button>
          </form>
          <form>
            <label>พิกัดปืนใหญ่ครั้งที่ 1</label>
            <input
              type="text"
              placeholder="MGRS"
              value={mgrs2}
              onChange={inputMgrs2}
            />
            <button onClick={saveInput2} className="btnDefault">
              ยืนยัน
            </button>
          </form>
          <div className="boxBtnShoot">
            <button onClick={clearMarker} className="btnClear btnDefault">
              เคลียร์พิกัด
              <img
                src="https://cdn-icons-png.flaticon.com/256/4720/4720266.png"
                alt="iconClear"
                width={22}
              />
            </button>
            <button onClick={shoot} className="btnShoot btnDefault">
              ยิง
              <img
                src="https://cdn-icons-png.flaticon.com/256/856/856987.png"
                alt="iconShoot"
                width={22}
              />
            </button>
          </div>
          <div className="resBox">
            <strong className="msgError">
              <img
                src="https://cdn-icons-png.flaticon.com/256/5441/5441913.png"
                alt="icon"
                width={22}
              />
              พิกัดตกจริง
              <img
                src="https://cdn-icons-png.flaticon.com/256/5441/5441913.png"
                alt="icon"
                width={22}
              />
            </strong>
            <div>
              {positionFallTrue ? <span>{positionFallTrue}</span> : "ㅤ"}
            </div>
          </div>
        </div>
        <div className="boxMap" style={{ width: "100%" }}>
          <Map1
            markersData1={markerPosition1}
            markersData2={markerPosition2}
            markersData3={markerPosition3}
            radius={meterR}
          />
        </div>
      </div>
    </>
  );
}

export default Box1;
