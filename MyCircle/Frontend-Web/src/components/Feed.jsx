import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed, removeUserFromFeed } from "../store/feedSlice";
import UserCard from "./UserCard";
import { useState } from "react";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const getFeedData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (err) {}
  };

  const sendRequest = async (userId, status) => {
    //status : ignored or interested
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      setError(err.response?.data + " , " + err.response?.statusText);

      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  useEffect(() => {
    getFeedData();
  }, []);

  if (!feed) return;
  if (feed.length === 0)
    return (
      <h1 className="text-2xl font-bold text-center my-5">
        No new users found
      </h1>
    );

  return (
    <div>
      <UserCard
        key={feed[0]._id}
        user={feed[0]}
        sendRequest={(userId, status) => {
          sendRequest(userId, status);
        }}
      />

      {error.length > 0 && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
