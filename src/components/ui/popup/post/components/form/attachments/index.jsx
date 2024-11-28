
/* eslint-disable react/react-in-jsx-scope */
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Image, Laugh } from "lucide-react";
import { memo } from "react";
import isEqual from "react-fast-compare";

const Attachments = ({
  onOpenImgFile,
  uploadImgRef,
  active,
  onUploadImage,
  onActive,
  onChooseEmoji,
}) => {
  return (
    <div className="d-flex mt-2">
      <UploadImage
        onOpenImgFile={onOpenImgFile}
        uploadImgRef={uploadImgRef}
        onUploadImage={onUploadImage}
      />
      <AddEmoji
        active={active}
        onActive={onActive}
        onChooseEmoji={onChooseEmoji}
      />
    </div>
  );
};

const UploadImage = ({ onOpenImgFile, uploadImgRef, onUploadImage }) => {
  return (
    <div
      className="form__drag-image"
      style={{
        fontSize: "1.8rem",
        cursor: "pointer",
      }}
      onClick={onOpenImgFile}
    >
      <input
        type="file"
        style={{ display: "none" }}
        ref={uploadImgRef}
        onChange={onUploadImage}
        accept=".jpg, .jpeg, .webp, .png, video/mp4"
      />
      <span>
        <Image size={20} />
      </span>
    </div>
  );
};

const AddEmoji = ({ active, onActive, onChooseEmoji }) => {
  return (
    <span
      style={{ fontSize: "1.8rem" }}
      className="ms-3 position-relative text-white z-10"
    >
      <Laugh
        size={20}
        cursor="pointer"
        onClick={() => {
          active !== "EMOJI" ? onActive("EMOJI") : onActive("");
        }}
      />
      <span className="position-absolute top-10" hidden={active !== "EMOJI"}>
        <Picker
          data={data}
          emojiSize={22}
          emojiButtonSize={29}
          maxFrequentRows={0}
          onEmojiSelect={(e) => onChooseEmoji(e)}
          locale="vi"
          perLine={8}
          previewPosition="none"
        />
      </span>
    </span>
  );
};

Attachments.displayName = "Attachments";
UploadImage.displayName = "UploadImage";
AddEmoji.displayName = "AddEmoji";

export default memo(Attachments, isEqual);
