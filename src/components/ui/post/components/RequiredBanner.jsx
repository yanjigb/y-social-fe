/* eslint-disable react/react-in-jsx-scope */
import { Link } from "react-router-dom";
import { RouteNames } from "../../../../constant/routes";

const requiredBannerStyle = {
  height: "30rem",
  marginTop: "0",
};

export default function RequiredBanner() {
  return (
    <div
      className={
        "post d-flex flex-column justify-content-center align-items-center"
      }
      style={requiredBannerStyle}
    >
      <span className="fs-1 fw-bold overflow-auto opacity-25">
        You need to login for view posts ¯\_(ツ)_/¯
      </span>
      <Link
        to={RouteNames.LOGIN}
        className={"fs-3 fw-bold"}
        style={{
          color: "var(--color-primary)",
        }}
      >
        Login now
      </Link>
    </div>
  );
}
