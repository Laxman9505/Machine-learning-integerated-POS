/** @format */

import { Empty } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LazyImage from "../../components/LazyImage/LazyImage";
import ProductCardSkeleton from "../../components/ProductCardSkeleton/ProductCardSkeleton";

const Recomendation = () => {
  const dispatch = useDispatch();

  const { getRecomendedProductsLoading, recomendedProducts } = useSelector(
    (state) => state.commonReducer
  );

  useEffect(() => {
    dispatch({
      type: "GET_RECOMENDED_PRODUCTS_REQUEST",
    });
  }, []);

  console.log("---recomended products", recomendedProducts);
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
              {getRecomendedProductsLoading ? (
                <div className="row ">
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                </div>
              ) : (
                <div className="row " style={{ padding: "10px" }}>
                  {recomendedProducts?.length > 0 ? (
                    recomendedProducts?.map((product, i) => {
                      return (
                        <div
                          className="col-lg-4 col-6 col-sm-4 col-xxl-3"
                          key={i}
                        >
                          <div className="border-gray p-15 mb-4 bg-white text-center">
                            <a
                              href=""
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            >
                              <LazyImage
                                src={`http://localhost:8000/uploads/${product?.ItemImage}`}
                                alt="product-img"
                                placeholder={
                                  "https://via.placeholder.com/300x300.png?text=Loading..."
                                }
                                style={{ width: "200px", height: "150px" }}
                              />
                              <div className=" d-block">
                                <h6 className="mb-0 fw-bold">
                                  {product.ItemName}
                                </h6>{" "}
                                <span className="d-block text-danger fw-bold">
                                  {"Rs "}
                                  {product.UnitPrice}
                                </span>
                              </div>
                            </a>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <Empty description="No Any Recommended Products Now !" />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Recomendation;
