import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../store/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const getFeedData = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      console.log(res?.data?.data);
      dispatch(addFeed(res?.data?.data));
    } catch (err) {}
  };

  useEffect(() => {
    getFeedData();
  }, []);

  return (
    feed && (
      <div>
        <UserCard user={feed[1]} />
      </div>
    )
  );
};

export default Feed;
