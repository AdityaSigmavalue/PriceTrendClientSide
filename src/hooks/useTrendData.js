import { useTrendContext } from "../context/TrendContext";
import { useTrendData as useTrendQuery} from "../api/queries";




import React from 'react'

const useTrendDataHook = () => {
    const {filters}=useTrendContext();
    const {loaction, year, propertyType, percentile, metric}=filters;

    const query=useTrendQuery({

        location,
        year,
        propertyType,
        percentile,
        metric

    })



  return (
    <div>useTrendData</div>
  )
}

export default useTrendData


