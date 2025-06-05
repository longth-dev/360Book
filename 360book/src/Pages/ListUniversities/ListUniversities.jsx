import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ListUniversities = () => {
    const [listUniversities, setListUniversities] = useState([]);

    const fetchUniversities = async () => {
        try {
            const response = await axios.get("/api/universities");
            setListUniversities(response.data.data)
            toast.success("fetch successfully")
        } catch (error) {
            toast.error("Error fetching universities");
            console.error("Error fetching universities:", error);
        }
    }
    useEffect(() => {
        fetchUniversities();
    }, []);

    return (
        <div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            <h1>List of Universities</h1>
            <p>This page will display a list of universities</p>
        </div>
    );
}
export default ListUniversities;