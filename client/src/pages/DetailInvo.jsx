import React, { useState } from "react";
import { Table, Button, Card, Form } from "react-bootstrap";
import satu from "../../src/assets/1.png";
import dua from "../../src/assets/2.png";
import tiga from "../../src/assets/3.png";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";

export default function ReplyReserv() {
    const title = "Detail Reservation";
    document.title = "Hallo Corona | " + title;

    let { id } = useParams();
    let navigate = useNavigate();

    const [consultation, setConsultation] = useState({});
    const [form, setForm] = useState({
        age: "",
        createdAt: "",
        bornDate: "",
        desc: "",
        name: "",
        gender: "",
        height: "",
        weight: "",
        linkLive: "",
        liveConsul: "",
        phone: "",
        reply: "",
        status: "",
        subject: "",
        updatedAt: "",
    });

    // console.log(form);

    let { consultationRefetch } = useQuery("consultationCache", async () => {
        const config = {
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        };
        const response = await API.get("/consultation/" + id, config);
        console.log(response);
        setForm({
            id: response.data.data.id,
            age: response.data.data.age,
            createdAt: response.data.data.createdAt,
            bornDate: response.data.data.bornDate,
            desc: response.data.data.desc,
            name: response.data.data.name,
            gender: response.data.data.gender,
            height: response.data.data.height,
            weight: response.data.data.weight,
            linkLive: response.data.data.linkLive,
            liveConsul: response.data.data.liveConsul,
            phone: response.data.data.phone,
            reply: response.data.data.reply,
            status: response.data.data.status,
            subject: response.data.data.subject,
            updatedAt: response.data.data.updatedAt,
        });
        setConsultation(response.data.data);
    });

    const handleChange = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                age: form.age,
                createdAt: form.createdAt,
                bornDate: form.bornDate,
                desc: form.desc,
                name: form.name,
                gender: form.gender,
                height: form.height,
                weight: form.weight,
                linkLive: form.linkLive,
                liveConsul: form.liveConsul,
                phone: form.phone,
                reply: form.reply,
                status: form.status,
                subject: form.subject,
                updatedAt: form.updatedAt,
            };

            const response = await API.patch("/consultation/" + id, data);
            console.log(response);
            navigate("/doctor");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ marginTop: "10vh" }}>
            <Card>
                <Card.Header>
                    <div className="container mt-4 rsv-modal">
                        <div className="rsv-left mt-4">
                            <h4 style={{ fontWeight: "700" }}>{form?.subject}</h4>
                            <p>{form?.desc}</p>
                        </div>
                        <div className="rsv-right d-flex mt-4">
                            <div className="rsv-icon d-block ms-5">
                                <img src={satu} alt="" />
                                <br />
                                <img src={dua} alt="" className="ms-2 mt-1" />
                                <br />
                                <img src={tiga} alt="" />
                            </div>
                            <div className="rsv-date ms-3">
                                <h5>Date of Complaint</h5>
                                <p className="text-muted">
                                    {moment(form?.createdAt).format("DD MMMM YYYY")}
                                </p>
                                <h5>Live Consultation</h5>
                                <p className="text-muted">
                                    {moment(form?.liveConsul).format("DD MMMM YYYY")}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Table style={{widht:'100'}}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Full Name</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Age</th>
                                <th>Height</th>
                                <th>Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-muted">1</td>
                                <td className="text-muted">{form?.name}</td>
                                <td className="text-muted">{form?.gender}</td>
                                <td className="text-muted">{form?.phone}</td>
                                <td className="text-muted">{form?.age}</td>
                                <td className="text-muted">{form?.height}</td>
                                <td className="text-muted">{form?.weight}</td>
                            </tr>
                        </tbody>
                    </Table>
                    {consultation?.reply === "" ? (
                        <div className="p-5">
                            <h4 style={{ fontWeight: "700", color: "black" }}>
                                Give Response
                            </h4>
                            <Form>
                                <Form.Control name="reply" type="text" as="textarea" style={{ height: "150px" }}
                                    onChange={handleChange} value={form?.reply}
                                />
                                <Form.Group className="mb-3">
                                    <Form.Label className="label m-2">
                                        Link Live Consultation
                                    </Form.Label>
                                    <Form.Control name="linkLive" type="text" value={form?.linkLive} id="linkLive" onChange={handleChange}/>
                                </Form.Group>
                                <div className="btn-rsv d-flex justify-content-end mt-2">
                                    <Button variant="danger" className="me-4"style={{ fontWeight: "700" }}
                                        onClick={() => navigate("/doctor")} >
                                        Cancel
                                    </Button>
                                    <Button variant="success" className="me-2" style={{ fontWeight: "700" }} type="submit"
                                        onClick={handleSubmit} >
                                        Approve
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: "34vh" }} >
                            <h3>
                                Sudah Telah di Konsultasi
                            </h3>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}
