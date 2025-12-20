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

    const isDark = theme === "dark";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) return;

        setSuccessMsg("");

        upload(file, {
            onSuccess: (res) => {
                setSuccessMsg(res.message || "File uploaded successfully!");
                setTimeout(() => navigate("/analysis"), 1000);
            },
        });
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-body">
            <div
                className={`card border-0 shadow-lg ${isDark ? "bg-dark text-light" : "bg-white"}`}
                style={{ width: "420px", borderRadius: "12px" }}
            >
                <div className={`card-header ${isDark ? "bg-dark" : "bg-white"} border-bottom border-secondary text-center py-4`}>
                    <h1 className="h4 mb-1 fw-semibold">Upload Excel File</h1>
                    <p className="small text-muted mb-0">Analyze your data in seconds</p>
                </div>

                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="excelFile" className="form-label fw-medium">
                                Select Excel File
                            </label>
                            <input
                                id="excelFile"
                                type="file"
                                accept=".xlsx,.xls"
                                className={`form-control form-control-lg ${isDark
                                        ? "bg-dark border-secondary text-light"
                                        : "bg-light border-secondary"
                                    }`}
                                onChange={(e) => setFile(e.target.files[0] || null)}
                                required
                            />
                            <div className="form-text small mt-2">
                                Supported formats: .xlsx, .xls
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !file}
                            className={`btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center gap-2 ${isLoading || !file ? "opacity-75" : ""
                                }`}
                            style={{ height: "48px" }}
                        >
                            {isLoading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    Uploading...
                                </>
                            ) : (
                                "Upload & Analyze"
                            )}
                        </button>

                        {/* Error Message */}
                        {isError && (
                            <div className="alert alert-danger mt-4 mb-0 small py-3" role="alert">
                                <strong>Upload failed:</strong>{" "}
                                {error?.response?.data?.message || "Something went wrong. Please try again."}
                            </div>
                        )}

                        {/* Success Message from hook */}
                        {data && !successMsg && !isError && (
                            <div className="alert alert-success mt-4 mb-0 small py-3" role="alert">
                                {data.message}
                            </div>
                        )}

                        {/* Custom Success Message */}
                        {successMsg && (
                            <div className="alert alert-success mt-4 mb-0 py-3" role="alert">
                                <strong>Success!</strong> {successMsg}
                                <div className="small mt-2">Redirecting to analysis...</div>
                            </div>
                        )}
                    </form>
                </div>

                <div className={`card-footer text-center small py-3 ${isDark ? "bg-dark border-top border-secondary" : "bg-light"}`}>
                    Step 1 of 2 • Upload your dataset
                </div>
            </div>
        </div>
    );
};

export default UploadForm;