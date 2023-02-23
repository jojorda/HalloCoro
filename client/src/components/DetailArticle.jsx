import React, { useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function DetailArticle() {
    const title = "Detail Article";
    document.title = "Hallo Corona | " + title;

    let { id } = useParams();
    let { data: article } = useQuery("articleeeeCache", async () => {
        const response = await API.get("/article/" + id);
        // console.log(response);
        return response.data.data;
    });
    // console.log(article);

    return (
        <div>
            <div className="container p-5" style={{ marginTop: "10vh", marginRight: "130px" }} >
                <h2 className="">{article?.title}</h2>
                <small className="text-muted">
                    {moment(article?.createdAt).format("DD MMMM YYYY")}
                </small>
                <p className="mt-1">
                    Author:{" "}
                    <span style={{ color: "#FF6185" }}>Dr. {article?.user.name}</span>
                </p>
                <div className="col-md-12">
                    <div className="card shadow p-2 mb-2" style={{ width: "1150px" }}>
                        <img alt="Project image" className="card-img-top img-size-detail"
                            src={article?.image} />
                        <div className="d-flex p-2" >
                        <p
                            style={{ color: "#BFBFBF", width:"100px" }}
                            className="p-2 border rounded-3 d-flex justify-content-center ml-0"
                            >
                            Testing
                        </p>
                        </div>
                        <div className="card-body mb-0 p-3">
                            <span>{article?.desc}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
