import React from 'react'
import UploadPage from '../pages/UploadPage/UploadPage'
import AnalysisPage from '../pages/AnalysisPage/AnalysisPage'
import { Routes, Route, Navigate } from 'react-router-dom'





const AppRouter = () => {
    return (
        <div>

            <Routes>
                <Route path="/analysis" element={<AnalysisPage />} />
                <Route path="/upload" element={<UploadPage />} />
                {/* <Route path="*" element={<Navigate to="/upload" replace />} /> */}
            </Routes>
        </div>
    )
}
export default AppRouter;