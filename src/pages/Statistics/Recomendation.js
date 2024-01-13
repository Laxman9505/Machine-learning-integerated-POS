/** @format */

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Recomendation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "",
    });
  }, []);
  return (
    <div className="menu_right">
      <>
        <div className="right_top mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="m-auto text-center">
                Recomendation System Using Collaborative Filtering
              </h5>
              <p className="text-center mt-3">
                Here are the the recomended products based on the other user
                preferences
              </p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Recomendation;
