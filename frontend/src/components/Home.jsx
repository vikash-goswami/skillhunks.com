import { useEffect, useState } from "react";
import { postData } from "../apis/userApis";
import {TypeAnimation } from 'react-type-animation'

export const Home = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [actionTaken, setActionTaken] = useState(false);

  const submitHandler = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      let data = {
        name: name,
        number: number,
      };
      const response = await postData(`${apiUrl}/putData`, data);
      console.log("Gaurav", response);
      if (response.code === 200) {
        setMessage(response.message);
        setName("");
        setNumber("");
        setActionTaken(true);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } else {
        setMessage(response.message);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ background: "#E5E4E2", height: "100vh" }}>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid" style={{ margin: "auto 2rem" }}>
          <div style={{ display: "flex" }}>
            <img
              src="/logo.png"
              alt="Logo"
              style={{ height: "5rem", marginRight: "1rem" }}
            />
            <h1
              style={{
                fontFamily: "ui-monospace",
                color: "#3eb7fc",
                marginTop: "1rem",
              }}
            >
              SkillHunks
            </h1>
          </div>
          <div>
            <a href="https://www.linkedin.com/company/skill-hunks/">
              <i
                className="fa fa-linkedin-square"
                style={{ fontSize: "36px", color: "#0077B5" }}
              ></i>
            </a>
            <a style={{ margin: "14px" }} href="mailto:team@skillhunks.com">
              <i
                className="fa fa-envelope"
                style={{ fontSize: "36px", color: "#B23121" }}
              ></i>
            </a>
          </div>
        </div>
      </nav>

      <div
        className="card"
        style={{ width: "80%", margin: "2rem auto", background: "#f5eaae" }}
      >
        <div className="card-body">
          Established in 2021 Skillhunks has been a pioneer in providing Jobs to
          professionals in their respected fields. With over 2600+ job
          recommendations Skillhunks stands strong as an intermediary between
          Job seekers and job providers.
        </div>
      </div>

      <div
        className="card"
        style={{ width: "50%", margin: "2rem auto", background: "#e3e1cf" }}
      >
        <div className="card-body">
          Join us to connect with your dreams and get the best recommendations
          from top recruiters. Follow us on our social handles for instant
          updates.{" "}
        </div>
      </div>
      {actionTaken ? (
        <>
          <div
            className="card"
            style={{
              width: "30%",
              margin: "1rem auto",
              height: "5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center", // Optional: Align text center
              background: "#90EE90",
            }}
          >
            <h3>Subscribed Successfully</h3>
          </div>
        </>
      ) : (
        <div className="card" style={{ width: "30%", margin: "1rem auto" }}>
          <div className="card-header">Subscribe</div>
          <div className="card-body">
            <div>
              <input
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                style={{ marginBottom: "1rem", marginTop: "1rem" }}
              ></input>
              <br />
              <input
                placeholder="Phone"
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
                style={{ marginBottom: "1rem" }}
              ></input>
              <br />
              <button
                type="button"
                className="btn btn-success"
                onClick={submitHandler}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
