import React from "react";
import logo from "../assets/logo.jpg";

function Loading() {
  return (
    <div
      className="loading-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={logo}
        alt="loading"
        style={{
          maxWidth: "200px",
          maxHeight: "200px",
          animation: "pulse 2s infinite",
        }}
      />
      <style>
        {`
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`}
      </style>
    </div>
  );
}

export default Loading;
