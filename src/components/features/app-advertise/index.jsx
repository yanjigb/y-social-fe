/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllAdvertise } from "../../../redux/request/advertiseRequest";
import SponsoredCard from "./components/sponsored-card";
const ITEMS_PER_PAGE = 20;

export default function AppAdvertise() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [advertiseList, setAdvertiseList] = useState([]);

  useEffect(() => {
    const fetchAdvertiseList = async () => {
      try {
        const res = await getAllAdvertise(dispatch);
        setAdvertiseList(res); // Store all fetched ads
      } catch (error) {
        console.error("Error fetching advertiseList:", error);
      }
    };

    fetchAdvertiseList();
  }, [dispatch]);

  const currentItems = advertiseList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="flex flex-col gap-4">
      {currentItems.map((item) => (
        <SponsoredCard
          key={item.id}
          title={item.title}
          description={item.description}
          cta={item.cta}
        />
      ))}
    </div>
  );
}
