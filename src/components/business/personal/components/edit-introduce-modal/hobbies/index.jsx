/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import isEqual from "react-fast-compare";
import { HobbiesList } from "../constants";

const Hobbies = ({ hobbies, onChangeHobbies }) => {
    const [selectedBadge, setSelectedBadge] = useState(hobbies);

    const handleBadgeClick = (badge) => {
        setSelectedBadge(badge.label);
        onChangeHobbies("hobbies", badge.label);
    };

    return (
        <div className="flex flex-wrap gap-3 py-2">
            {HobbiesList.map((badge, index) => (
                <Button
                    key={index}
                    variant={selectedBadge === badge.label ? "primary" : "outline-secondary"}
                    onClick={() => handleBadgeClick(badge)}
                >
                    <Badge
                        pill
                        bsPrefix="fs-4 text-white px-4 py-2 my-1 !bg-transparent"
                    >
                        {<FontAwesomeIcon icon={badge.icon} />} {badge.label}
                    </Badge>
                </Button>
            ))}
        </div>
    )
}

export default memo(Hobbies, isEqual);
