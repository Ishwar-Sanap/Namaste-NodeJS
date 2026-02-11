import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections, removeConnections } from "../store/connectionsSlice";
const Connections = () => {
  const connectionsData = useSelector((state) => state.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    dispatch(removeConnections());
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      console.log(res?.data?.data);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connectionsData) return;

  if (connectionsData.length === 0)
    return (
      <h1 className="text-2xl font-bold text-center my-5">No connections found</h1>
    );

  return (
    <div className="mx-auto w-4/10 my-5">
      <h1 className="text-2xl font-bold text-center">Connections</h1>
      <ul className="list bg-base-200 rounded-box shadow-md mt-3">
        {connectionsData.map((conn) => {
          const { firstName, lastName, profilePhotoUrl, about } = conn;
          return (
            <li className="list-row" key={conn._id}>
              <div>
                <img className="size-10 rounded-box" src={profilePhotoUrl} />
              </div>
              <div className="flex items-center">
                <div className="text-xl font-bold">
                  {firstName + " " + (lastName ? lastName : "")}
                </div>
              </div>
              {about && <p className="list-col-wrap ">{about}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Connections;
