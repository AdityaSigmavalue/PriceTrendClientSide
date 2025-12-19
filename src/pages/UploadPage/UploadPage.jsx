import React from 'react'
import PageLayout from '../../components/layout/PageLayout'
import UploadForm from '../../components/Form/UploadForm'


const UploadPage = () => {
  return (
    <PageLayout title="Upload Price Trend Excel">
      <UploadForm />
    </PageLayout>
  )
}

export default UploadPage