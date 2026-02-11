import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../store/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requestsRecived = useSelector((state) => state.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.data));
    } catch (err) {}
  };

  const revieweRequest = async (requestId, status) => {
    //status -> accepted or rejected
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(removeRequest(requestId));

    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requestsRecived || requestsRecived.length === 0)
    return (
      <h1 className="text-2xl font-bold text-center my-5">No Requests found</h1>
    );
  return (
    <div className="mx-auto w-4/10 my-5">
      <h1 className="text-2xl font-bold text-center">Requests Recieved</h1>
      <ul className="list bg-base-200 rounded-box shadow-md mt-3">
        {requestsRecived.map((request) => {
          const { firstName, lastName, profilePhotoUrl, about } =
            request?.fromUserId;
          return (
            <li className="list-row" key={request._id}>
              <div>
                <img className="size-10 rounded-box" src={profilePhotoUrl} />
              </div>
              <div className="flex items-center">
                <div className="text-xl font-bold">
                  {firstName + " " + (lastName ? lastName : "")}
                </div>
              </div>
              {about && <p className="list-col-wrap ">{about}</p>}
              <button
                className="btn btn-primary"
                onClick={() => revieweRequest(request?._id,"accepted")}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => revieweRequest(request?._id, "rejected")}
              >
                Reject
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Requests;
