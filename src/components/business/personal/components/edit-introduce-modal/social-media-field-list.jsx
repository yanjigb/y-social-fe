/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { memo } from "react";
import isEqual from "react-fast-compare";
import SocialMediaInput from "../../../../ui/input/social-media";
import { SocialMediaPlatformList } from "./constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialMediaFieldList = ({ userInfo, onChangeSocialLink }) => {
    return (
        <div
            className="text-white overflow-auto pe-3 w-100"
            style={{
                maxHeight: "40rem",
            }}
        >
            {SocialMediaPlatformList.map(({ icon, label }) => (
                <SocialMediaInput
                    key={label}
                    icon={<FontAwesomeIcon icon={icon} className="me-2" />}
                    label={label}
                    value={userInfo[label]}
                    onChange={onChangeSocialLink}
                />
            ))}
        </div>
    );
};

export default memo(SocialMediaFieldList, isEqual);
