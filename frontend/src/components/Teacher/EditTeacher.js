import axios from "axios";
import React, { useEffect, useState } from "react";

function EditTeacher() {
    const [data, setData] = useState({
        name: "",
        email: "",
        address: "",
    });

    const handleSubmit = (event) => { };

    return (
        <div className="d-flex flex-column align-items-center pt-4">
            <h2>Update Teacher</h2>
            <form class="row g-3 w-50" onSubmit={handleSubmit}>
                <div class="col-12">
                    <label for="inputName" class="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="inputName"
                        placeholder="Enter Name"
                        autoComplete="off"
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        value={data.name}
                    />
                </div>
                <div class="col-12">
                    <label for="inputEmail4" class="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        class="form-control"
                        id="inputEmail4"
                        placeholder="Enter Email"
                        autoComplete="off"
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        value={data.email}
                    />
                </div>

                <div class="col-12">
                    <label for="inputAddress" class="form-label">
                        Address
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="inputAddress"
                        placeholder="Enter Address"
                        autoComplete="off"
                        onChange={(e) => setData({ ...data, address: e.target.value })}
                        value={data.address}
                    />
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditTeacher;
