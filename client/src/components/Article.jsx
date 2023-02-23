import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import noData from "../../src/assets/No-data.png";
import { useQuery} from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContex";
import { Card } from "react-bootstrap";

export default function Article() {
    const [state] = useContext(UserContext);
    const Navigate = useNavigate();

    let { data: articles} = useQuery("articlessCache", async () => {
        const response = await API.get("/articles");
        return response.data.data;
    });
    
    return (
        <>
            {articles?.length != 0 ? (
                <div >
                    <h1 className="text-center mt-5" style={{ height: "15vh", color: "#FF6185" }} >
                        Artikel Hari ini
                    </h1>
                    <div className="row d-flex justify-content-center warp gap-4 w-100 mb-5">
                        {articles?.map((item, index) => (
                            <Card style={{ width: "23rem", background:'#FFEBEE' }} key={index} className="custom-cursor">
                            {/* <div className="col-md-3" key={index}> */}
                                {/* <div className="card shadow p-2 mb-4" > */}
                                    <Card.Img style={{ height: "200px" }} className="rounded-2 mt-3"
                                        onClick={() => Navigate(`/detailarticle/${item?.id}`)}
                                        src={item.image} />
                                    <div className="card-body bs m-0 p-0 flex-column">
                                        <Link className="text-decoration-none text-dark"
                                            to={ state.user.listAs == "patient" ? `/patient/detailarticle/${item.id}`
                                                    : state.user.listAs == "doctor" ? `/doctor/detailarticle/${item.id}`
                                                    : `/detailarticle/${item.id}`
                                            } > 
                                            <Card.Body>
                                                <div style={{ height: "80%" }}>
                                                    <Card.Title className="fw-bold">
                                                        {item.title}
                                                    </Card.Title>
                                                </div>
                                            </Card.Body>
                                        </Link>
                                            <Card.Body>
                                                <div>
                                                    <Card.Text className="">
                                                        {item.desc}
                                                    </Card.Text>
                                                </div>
                                            </Card.Body>
                                    </div>
                                {/* </div> */}
                            {/* </div> */}
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h1 className="text-center mt-3" style={{ height: "15vh", color: "#FF6185" }} >
                        Artikel Hari ini
                    </h1>
                    <div className="text-center">
                        <img alt="" className="img-fluid" style={{ width: "30%" }}
                            src={noData}/>
                        <div className="mb-5">No data article</div>
                    </div>
                </div>
            )}
        </>
    );
}
