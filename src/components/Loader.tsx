import React from "react";

export const Loader: React.FC<{ light?: boolean }> = ({ light = true }) => {
  const color = light ? "#fff" : "#252f3f";
  return (
    <svg
      fillRule="evenodd"
      className="inline mr-3 fill-current"
      width="20"
      height="20"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="audio-loading"
      clipRule="evenodd"
    >
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
          <stop stopColor={color} stopOpacity="0" offset="0%" />
          <stop stopColor={color} stopOpacity=".631" offset="63.146%" />
          <stop stopColor={color} offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke={color}
            strokeWidth="2"
            transform="rotate(329.568 18 18)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle fill="#fff" cx="36" cy="18" r="1" transform="rotate(329.568 18 18)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
};

export const LargeLoader: React.FC<{ light?: boolean }> = ({ light = false }) => {
  const color = light ? "#fff" : "#252f3f";
  return (
    <svg
      style={{ display: "block", margin: "auto", marginTop: "5px" }}
      width="60"
      height="60"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="audio-loading"
    >
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
          <stop stopColor={color} stopOpacity="0" offset="0%" />
          <stop stopColor={color} stopOpacity=".631" offset="63.146%" />
          <stop stopColor={color} offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke={color}
            strokeWidth="2"
            transform="rotate(329.568 18 18)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle fill={color} cx="36" cy="18" r="1" transform="rotate(329.568 18 18)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
};
