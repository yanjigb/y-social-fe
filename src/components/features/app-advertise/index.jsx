/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllAdvertise } from "redux/request/advertiseRequest";
import SponsoredCard from "./components/sponsored-card";

export default function AppAdvertise({ className }) {
  const dispatch = useDispatch();
  const [randomAdvertise, setRandomAdvertise] = useState({});

  const fetchAdvertiseList = async () => {
    try {
      const res = await getAllAdvertise(dispatch);

      if (res.length > 0) {
        const randomIndex = Math.floor(Math.random() * res.length);
        setRandomAdvertise(res[randomIndex]);
      }
    } catch (error) {
      console.error("Error fetching advertiseList:", error);
    }
  };

  useEffect(() => {
    fetchAdvertiseList();
  }, []);

  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      <SponsoredCard
        key={randomAdvertise.id}
        title={randomAdvertise.title}
        description={randomAdvertise.description}
        cta={randomAdvertise.cta}
        media_content={randomAdvertise.media_content}
      />
    </div>
  );
}
