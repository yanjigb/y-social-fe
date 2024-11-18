/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllAdvertise } from "redux/request/advertiseRequest";
import { getUserByID } from "redux/request/userRequest";
import SponsoredCard from "./components/sponsored-card";

export default function AppAdvertise({ userID, className }) {
  const dispatch = useDispatch();
  const [randomAdvertise, setRandomAdvertise] = useState({});
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    const res = await getUserByID(userID, dispatch);
    setUser(res.user);
  }

  useEffect(() => {
    fetchUser();
  }, [userID]);

  const fetchAdvertiseList = async () => {
    try {
      const res = await getAllAdvertise(dispatch);
      const activeAds = res.filter((ad) => ad.status === "active" && ad.topic === user.hobbies);

      if (activeAds.length > 0) {
        const sortedAds = activeAds.sort((a, b) => b.score - a.score).slice(0, 10);

        if (sortedAds.length > 0) {
          const randomIndex = Math.floor(Math.random() * sortedAds.length);
          setRandomAdvertise(sortedAds[randomIndex]);
        }
      } else {
        setRandomAdvertise(null);
      }
    } catch (error) {
      console.error("Error fetching advertiseList:", error);
    }
  };

  useEffect(() => {
    fetchAdvertiseList();
  }, [user.hobbies]);

  return randomAdvertise ? (
    <div className={clsx("flex flex-col gap-4", className)}>
      <SponsoredCard
        key={randomAdvertise._id}
        id={randomAdvertise._id}
        title={randomAdvertise.title}
        description={randomAdvertise.description}
        cta={randomAdvertise.cta}
        media_content={randomAdvertise.media_content}
        link_action={randomAdvertise.link_action}
        status={randomAdvertise.status}
        userID={randomAdvertise.userID}
      />
    </div>
  ) : null;
}
