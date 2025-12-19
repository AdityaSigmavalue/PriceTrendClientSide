import React from "react";
import PageLayout from "../../components/layout/PageLayout";
import TrendChart from "../../components/Chart/TrendChart";
import FilterBar from "../../components/Form/FilterBar";

const AnalysisPage = () => {
  return (
    <PageLayout title="Price Trend Analysis">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-9">
          {/* Filters on top */}
          <div className="mb-4">
            <FilterBar />
          </div>

          {/* Chart below */}
          <div>
            <TrendChart />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AnalysisPage;
