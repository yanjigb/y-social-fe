/* eslint-disable react/prop-types */
import { useIntersectionObserver } from "@uidotdev/usehooks";
import SponsoredBadge from "components/ui/sponsored-badge";
import { ADVERTISE_STATUS } from "constant/advertise";
import { CheckCircle2 } from "lucide-react";
import { memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  handleUpdateClicks,
  handleUpdateImpressions,
} from "redux/request/advertiseRequest";
import { getUserByID } from "redux/request/userRequest";
import rehypeRaw from "rehype-raw";
import Lightbox from "yet-another-react-lightbox";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import { Avatar, Photo } from "../../../../ui";
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
  userID,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openPreviewImage, setOpenPreviewImage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    _id: "",
    username: "",
    profilePicture: "",
    isVerify: false,
  });
  const currentUser = useCurrentUser();

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
      handleImpressions();
    }
  }, [entry]);

  const onOpenPreviewImage = () => {
    setOpenPreviewImage(!openPreviewImage);
  };

  if (!title || !description || !cta) return <Skeleton />;

  if (
    status === ADVERTISE_STATUS.SUSPENDED ||
    status === ADVERTISE_STATUS.SCHEDULE
  ) {
    return null;
  }

  useEffect(() => {
    let isCancelled = false;

    getUserByID(userID, dispatch)
      .then((data) => {
        if (!isCancelled) {
          const { _id, username, profilePicture, isVerify } = data?.user || {};

          setUser({
            _id: _id,
            username: username,
            profilePicture: profilePicture,
            isVerify: isVerify,
          });
        }
      })
      .catch((err) => {
        console.error("Failed", err);
      });

    return () => {
      isCancelled = true;
    };
  }, [userID, dispatch]);

  return (
    <>
      <div
        ref={ref}
        className="post gap-4 w-full mx-auto overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
      >
        <div
          className="user"
          title={
            user?._id === currentUser?._id
              ? `Truy cập trang cá nhân`
              : `Truy cập trang cá nhân ${user.username}`
          }
        >
          <Link
            to={`/user/${user?._id}`}
            className="profile-pic bg-black text-white fs-5"
            aria-label="Avatar user"
          >
            <Avatar
              imageSrc={user.profilePicture}
              label={user.username}
              userId={user?._id}
            />
          </Link>
          <Link to={`/user/${user?._id}`} className="info">
            <div className="d-flex align-items-center fs-5">
              <div className="fw-bold d-flex align-items-center">
                {user.username || "loading..."}
                {user.isVerify && (
                  <CheckCircle2 size={14} className="ms-2 text-primary" />
                )}
              </div>
            </div>
            <span>
              <>@{user?.username || "loading..."}</>
            </span>
          </Link>
        </div>

        <button
          className="w-full object-cover rounded-xl"
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
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  className="prose prose-lg"
                >
                  {description}
                </ReactMarkdown>
              ) : (
                <>
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    className="prose prose-lg"
                  >
                    {isExpanded
                      ? description
                      : description.slice(0, 100) + "..."}
                  </ReactMarkdown>
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
            className="text-2xl w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
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
