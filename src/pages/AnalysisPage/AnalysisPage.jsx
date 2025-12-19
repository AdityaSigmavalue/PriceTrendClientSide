import React from 'react'
import PageLayout from '../../components/layout/PageLayout'
import TrendChart from '../../components/Chart/TrendChart'
import FilterBar from '../../components/Form/FilterBar'


const AnalysisPage = () => {
  return (
    <PageLayout title=" Price Trend Analysis">

      <div className='flex flex-col gap-6'>
        <FilterBar />
        <TrendChart />
      </div>
    </PageLayout>
  )
}

export default AnalysisPage