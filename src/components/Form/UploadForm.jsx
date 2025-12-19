import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUploadExcel } from '../../hooks/useUploadExcel'




const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [successMsg, setSuccessMsg] = useState("");

    const navigate = useNavigate();

    const { upload, isLoading, isError, error, data } = useUploadExcel();




    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) return;
        setSuccessMsg("");
        upload(file, {
            onSuccess: (res) => {
                setSuccessMsg("File uploaded successfully!");
                console.log("Successfully saved")
                setTimeout(() => navigate("/analysis"), 800);
            },
        });
    };
    return (


        <>
            <div>UploadForm</div>
            <form onSubmit={handleSubmit}
                className="border border-gray-600 rounded-lg p-6 flex flex-col gap-4"
            >

                <label className='flex flex-col gap-2'>

                    <span className='text-sm'> Excel file  </span>

                    <input
                        type="file"
                        accept='.xlsx, .xls' onChange={(e) => setFile(e.target.files[0] || null)}
                        className="file:mr-4 file:py-2 file:px-4
                     file:rounded file:border-0
                     file:bg-gray-800 file:text-white
                     hover:file:bg-gray-700" />
                </label>

                <button
                    type='submit'
                    disabled={isLoading || !file}

                    className="bg-white text-black px-4 py-2 rounded
                   disabled:opacity-50 disabled:cursor-not-allowed hover:transition duration-200    bg-gray-800 text-white"
                >
                    {isLoading ? 'Uploading...' : 'Upload & Analyze'}
                </button>

                {isError && (
                    <p className="text-red-400 text-sm">
                        {error?.response?.data?.message || "Upload failed"}
                    </p>
                )}
                {successMsg && (
                    <p className="text-green-400 text-sm">{successMsg}</p>
                )}

                {data && (
                    <p className="text-green-400 text-sm">{data.message}</p>
                )}
            </form>
        </>


    )
}

export default UploadForm