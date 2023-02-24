import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { API } from "../../src/config/api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";

export default function AddArticle() {
    const title = "Add Article";
    document.title = "Hallo Corona | " + title;

    let navigate = useNavigate();

    const [preview, setPreview] = useState(null); 

    const [form, setForm] = useState({
        title: "",
        image: "",
        desc: "",
    });

    // console.log(form);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });
        // Create image url for preview
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Configuration
            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            };

            // Store data with FormData as object
            const formData = new FormData();
            formData.set("title", form.title);
            formData.set("image", form.image[0], form.image[0].name);
            formData.set("desc", form.desc);
            // console.log(formData);

            const response = await API.post("/article", formData);
            // console.log(response);

            navigate("/doctor");
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <div>
            <div className="container d-flex justify-content-center " >
                <h2 style={{ color: "#FF6185", fontWeight: "700" }}>Add Article</h2>
            </div>
            <div className="container d-flex justify-content-center" >
                <Form >
                    <Form.Group className="mb-3">
                        <Form.Label className="label">Title</Form.Label>
                        <Form.Control type="text" name="title" id=""
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        {preview && (
                            <div>
                                <img src={preview} alt={preview}
                                    style={{ width: "1110px", height: "500px",
                                        objectFit: "cover",
                                    }} />
                            </div>
                        )}
                        <Form.Label for="image" type="file" className="label">
                            Upload Image
                        </Form.Label>
                        <Form.Control type="file" id="image" name="image"
                            onChange={handleChange}
                        />
                        <Form.Text>Max size: 2MB</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="label">Description</Form.Label>
                        <Form.Control type="text" as="textarea" name="desc" style={{ height: "200px" }}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-center align-items-center mb-5 mt-4">
                        <Button type="button"
                            style={{ background: "#ff6185", border: "1px solid #ff6185",
                                height: "35px", width: "15rem", fontWeight: "700", }}
                            onClick={(e) => handleSubmit.mutate(e)}  >
                            Post
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
