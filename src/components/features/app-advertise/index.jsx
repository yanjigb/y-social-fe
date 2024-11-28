
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
      const activeAds = res.filter((ad) => ad.status === "active" && user.hobbies?.includes(ad.topic));
      const MAX_AD_COUNT = 10;

      if (activeAds.length > 0) {
        // const sortedAds = activeAds.sort((a, b) => b.score - a.score).slice(0, MAX_AD_COUNT);
        const sortedAds = activeAds.sort((a, b) => {
          // Sort by score first, then by budget, and finally by creation date
          if (b.score === a.score) {
            if (b.budget === a.budget) {
              // Sort by creation date if scores and budgets are equal
              return new Date(b.createdAt) - new Date(a.createdAt);
            }
            // Sort by budget
            return b.budget - a.budget;
          }

          // Sort by score
          return b.score - a.score;
        }).slice(0, MAX_AD_COUNT);

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

  if (!randomAdvertise) return null;

  return (
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
  );
}
