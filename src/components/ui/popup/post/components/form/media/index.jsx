/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { X } from "lucide-react";
import { memo } from "react";
import isEqual from "react-fast-compare";
import PreviewImage from "../../../../../../../components/ui/preview/PreviewImage";

const Media = ({ imageSrc, videoSrc, onDeleteImage }) => {
  return (
    <>
      {imageSrc && (
        <div
          className="position-relative mt-4"
          style={{
            maxWidth: "fit-content",
          }}
        >
          <div
            className="overflow-hidden"
            style={{
              maxHeight: "10rem",
              maxWidth: "10rem",
            }}
          >
            <PreviewImage imgSrc={imageSrc} />
          </div>
          <span className="delete-image text-white" onClick={onDeleteImage}>
            <X size={20} />
          </span>
        </div>
      )}

      {videoSrc && (
        <div
          style={{
            height: "30rem",
          }}
          className="w-100"
        >
          <video src={videoSrc} className="w-100" controls></video>
        </div>
      )}
    </>
  );
};

export default memo(Media, isEqual);
