/* eslint-disable react/prop-types */
import { useIntersectionObserver } from "@uidotdev/usehooks";
import SponsoredBadge from "components/ui/sponsored-badge";
import { ADVERTISE_STATUS } from "constant/advertise";
import { memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  handleUpdateClicks,
  handleUpdateImpressions,
} from "redux/request/advertiseRequest";
import Lightbox from "yet-another-react-lightbox";
import { Photo } from "../../../../ui";
import Skeleton from "./skeleton";

/* eslint-disable react/react-in-jsx-scope */
const SponsoredCard = ({
  id,
  title,
  description,
  cta,
  media_content,
  link_action,
  status,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const fullDescription = description || "";
  const [openPreviewImage, setOpenPreviewImage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickAdvertise = async () => {
    const result = await handleUpdateClicks(id, dispatch);
    console.log(result);
  };

  const handleRedirectLink = () => {
    handleClickAdvertise();
    if (link_action.includes("http")) {
      window.open(link_action, "_blank");
    } else {
      navigate(link_action);
    }
  };

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const handleImpressions = async () => {
    await handleUpdateImpressions(id, dispatch);
  };

  useEffect(() => {
    if (entry?.isIntersecting) {
      console.log("Ad is in view!");
      handleImpressions();
      // Here you would call your impression tracking function
    }
  }, [entry]);

  const onOpenPreviewImage = () => {
    setOpenPreviewImage(!openPreviewImage);
  };

  if (!title || !description || !cta) return <Skeleton />;

  const truncatedDescription = description.slice(0, 100) + "...";

  if(status === ADVERTISE_STATUS.SUSPENDED 
    || status === ADVERTISE_STATUS.SCHEDULE) {
      return null;
    }

  return (
    <>
      <div
        ref={ref}
        className="post gap-4 w-full mx-auto overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
      >
        <button
          className="-mt-3 w-full object-cover rounded-xl"
          onClick={onOpenPreviewImage}
        >
          <Photo
            imageSrc={media_content}
            link="#"
            label="Product Image"
            className="h-full object-cover w-full"
          />
        </button>

        <div className="flex flex-col justify-between gap-2 mt-1">
          <div>
            <h2 className="font-bold text-4xl">{title}</h2>
            <SponsoredBadge />
            <div className="text-2xl flex items-start flex-col mt-4">
              {description.length < 100 ? (
                <p>{description}</p>
              ) : (
                <>
                  <p>{isExpanded ? fullDescription : truncatedDescription}</p>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-500 hover:text-blue-700 font-medium mt-2 focus:outline-none"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                </>
              )}
            </div>
          </div>

          <button
            onClick={handleRedirectLink}
            className="text-2xl w-full mt-2 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
          >
            {cta}
          </button>
        </div>
      </div>

      <Lightbox
        open={openPreviewImage}
        close={onOpenPreviewImage}
        slides={[
          {
            src: media_content,
          },
        ]}
      />
    </>
  );
};

export default memo(SponsoredCard, isEqual);
