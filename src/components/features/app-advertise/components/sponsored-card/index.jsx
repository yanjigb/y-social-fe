/* eslint-disable react/prop-types */
import SponsoredBadge from "components/ui/sponsored-badge";
import { memo, useState } from "react";
import isEqual from "react-fast-compare";
import Lightbox from "yet-another-react-lightbox";
import { Photo } from "../../../../ui";
import Skeleton from "./skeleton";

/* eslint-disable react/react-in-jsx-scope */
const SponsoredCard = ({ title, description, cta, media_content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const fullDescription = description || "";
  const [openPreviewImage, setOpenPreviewImage] = useState(false);

  const onOpenPreviewImage = () => {
    setOpenPreviewImage(!openPreviewImage);
  };

  if (!title || !description || !cta) return <Skeleton />;

  const truncatedDescription = description.slice(0, 100) + "...";

  return (
    <>
      <div className="post gap-4 w-full mx-auto overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
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

          <button className="text-2xl w-full mt-2 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200">
            {cta}
          </button>
        </div>
      </div>

      <Lightbox
        open={openPreviewImage}
        close={onOpenPreviewImage}
        slides={[
          {
            src: media_content
          },
        ]}
      />
    </>
  );
};

export default memo(SponsoredCard, isEqual);
