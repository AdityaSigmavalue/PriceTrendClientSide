import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUploadExcel } from "../../hooks/useUploadExcel";
import { useTheme } from "../../context/ThemeContext";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [successMsg, setSuccessMsg] = useState("");

    const navigate = useNavigate();
    const { upload, isLoading, isError, error, data } = useUploadExcel();
    const { theme } = useTheme();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) return;

        setSuccessMsg("");

        upload(file, {
            onSuccess: (res) => {
                setSuccessMsg(res.message || "File uploaded successfully!");
                console.log("Successfully saved");
                setTimeout(() => navigate("/analysis"), 800);
            },
        });
    };

    return (
        <div className={`card ${theme === "dark" ? "bg-dark" : "bg-light"} border-secondary shadow-sm`}>
            <div className="card-header border-secondary d-flex justify-content-between align-items-center">
                <h2 className="h6 mb-0">Upload Excel</h2>
                {/* <span className="badge bg-secondary">Step 1</span> */}
            </div>

            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label small">Excel file</label>
                        <input
                            type="file"
                            accept=".xlsx,.xls"
                            className={`form-control form-control-sm ${theme === "dark"
                                    ? "bg-dark text-light"
                                    : "bg-light text-dark"
                                } border-secondary`}
                            onChange={(e) => setFile(e.target.files[0] || null)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !file}
                        className={`btn ${theme === "dark" ? "btn-light" : "btn-dark"} w-100`}
                    >
                        {isLoading ? "Uploading..." : "Upload & Analyze"}
                    </button>

                    {isError && (
                        <div className="alert alert-danger mt-3 py-2 mb-0 small">
                            {error?.response?.data?.message || "Upload failed"}
                        </div>
                    )}

                    {successMsg && (
                        <div className="alert alert-success mt-3 py-2 mb-0 small">
                            {successMsg}
                        </div>
                    )}

                    {data && !successMsg && (
                        <div className="alert alert-success mt-3 py-2 mb-0 small">
                            {data.message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UploadForm;