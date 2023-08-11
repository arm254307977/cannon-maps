import React, { useState } from "react";
import "../style/Box2.css";
import Map2 from "./Map2";
import Swal from "sweetalert2";

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

function Box2({ mgrs1, radius, answerLat, answerLng, markerPositionShot1 }) {
  const [mgrs2, setMgrs2] = useState("");
  const [markerPosition1, setMarkerPosition1] = useState(null);
  const [markerPosition2, setMarkerPosition2] = useState(null);
  const [markerPosition3, setMarkerPosition3] = useState(null);
  const [markerPosition4, setMarkerPosition4] = useState(null);
  const [discrepancy, setDiscrepancy] = useState("ㅤ");

  const inputMgrs2 = async (e) => {
    setMgrs2(e.target.value);
  };

  const setPosition1 = async (e) => {
    e.preventDefault();
    if (mgrs1) {
      const M = conversToLatLng(mgrs1);
      await setMarkerPosition1({
        lat: parseFloat(M[0]),
        lng: parseFloat(M[1]),
      });
      await setMarkerPosition4(markerPositionShot1);
    } else {
      return Swal.fire({
        position: "top",
        icon: "warning",
        title: "กรุณากรอกข้อมูลพิกัดเริ่มต้น\nจาก ครั้งที่ 1 ก่อน",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const shoot = async (e) => {
    e.preventDefault();
    if (!markerPosition1) {
      return Swal.fire({
        position: "top",
        icon: "warning",
        title: "กรุณากดยืนยันพิกัดเริ่มต้น",
        showConfirmButton: false,
        timer: 1500,
      });
    }
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
        title: "กรุณากรอกข้อมูลก่อนยิง",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const clearMarker = (e) => {
    e.preventDefault();
    setMarkerPosition1(null);
    setMarkerPosition2(null);
    setMarkerPosition3(null);
    setMarkerPosition4(null);
    setDiscrepancy("ㅤ");
    setMgrs2("");
  };

  const answerPosition = async (e) => {
    e.preventDefault();
    if (!markerPosition1 || !markerPosition2) {
      return Swal.fire({
        position: "top",
        icon: "warning",
        title: "กรุณากรอกพิกัดและทำการยิงก่อน",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await setMarkerPosition3({
        lat: parseFloat(answerLat),
        lng: parseFloat(answerLng),
      });
      const answerMgrs = await conversToMGRS(
        parseFloat(answerLat),
        parseFloat(answerLng)
      );
      await setDiscrepancy(answerMgrs);
    }
  };

  return (
    <>
      <div className="boxTitle1">
        <h1 className="titleBox1">ครั้งที่ 2</h1>
      </div>
      <div className="containerBox1">
        <div className="boxForm">
          <form>
            <label>พิกัดปืนใหญ่เริ่มต้น</label>
            <input type="text" readOnly value={mgrs1} placeholder="MGRS" />
            <button onClick={setPosition1} className="btnDefault">
              ยืนยัน
            </button>
          </form>
          <form>
            <label>พิกัดปืนใหญ่ครั้งที่ 2</label>
            <input
              type="text"
              placeholder="MGRS"
              onChange={inputMgrs2}
              value={mgrs2}
            />
            <button className="btnShoot btnDefault" onClick={shoot}>
              ยิง
              <img
                src="https://cdn-icons-png.flaticon.com/256/856/856987.png"
                alt="iconShoot"
                width={22}
              />
            </button>
          </form>
          <div className="boxBtnShoot" style={{ paddingBottom: "66px" }}>
            <button className="btnClear btnDefault" onClick={clearMarker}>
              เคลียร์พิกัด
              <img
                src="https://cdn-icons-png.flaticon.com/256/4720/4720266.png"
                alt="iconClear"
                width={22}
              />
            </button>
          </div>
          <div className="resBox">
            <button className="btnAnswer" onClick={answerPosition}>
              <span style={{ marginTop: "1px" }}>เฉลยพิกัด</span>
              <img
                src="https://cdn-icons-png.flaticon.com/256/8196/8196470.png"
                alt="iconError"
                width={22}
              />
            </button>
            <div>{discrepancy ? <span>{discrepancy}</span> : "ㅤ"}</div>
          </div>
        </div>
        <div className="boxMap" style={{ width: "100%" }}>
          <Map2
            markersData1={markerPosition1}
            markersData2={markerPosition2}
            markersData3={markerPosition3}
            markersData4={markerPosition4}
          />
        </div>
        <div
          className="container pt-4 px-4"
          style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#616161" }}
        >
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 mx-0 my-1 p-0 d-flex justify-content-start align-items-center">
              <img
                src="/images/iconM1Default.png"
                alt="icon marker1"
                width={"15%"}
              />
              <span>พิกัดปืนใหญ่เริ่มต้น</span>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 mx-0 my-1 p-0 d-flex justify-content-start align-items-center">
              <img
                src="/images/iconM2Default.png"
                alt="icon marker2"
                width={"13%"}
              />
              <span>พิกัดปืนใหญ่ครั้งที่ 1</span>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 mx-0 my-1 p-0 d-flex justify-content-start align-items-center">
              <img
                src="/images/iconM4Default.png"
                alt="icon marker4"
                width={"12.5%"}
              />
              <span>พิกัดปืนใหญ่ครั้งที่ 2</span>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 mx-0 my-1 p-0 d-flex justify-content-start align-items-center">
              <img
                src="/images/iconM5Default.png"
                alt="icon marker5"
                width={"15%"}
              />
              <span>พิกัดเฉลย</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Box2;
