/* eslint-disable react/react-in-jsx-scope */
import { memo, useEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { useDispatch } from "react-redux";

import { useCurrentUser, useFollowingList } from "../../../../../hooks";
import TermLinks from "../../../../features/term-link";
import FollowingList from "./components/following-list";

const HomeRight = () => {
  const [user, setUser] = useState([]);
  const currentUser = useCurrentUser();
  const dispatch = useDispatch();
  const { fetchFollowingList } = useFollowingList({
    currentUserID: currentUser?._id,
    dispatch,
    setFollowings: setUser,
  });

  useEffect(() => {
    fetchFollowingList();
  }, [fetchFollowingList]);

  return (
    <div className="right">
      <h3 className="border-bottom pb-3 mb-3 px-0 text-lg">Following</h3>
      <FollowingList user={user} currentUser={currentUser} />
      <TermLinks />
    </div>
  );
};

export default memo(HomeRight, isEqual);
