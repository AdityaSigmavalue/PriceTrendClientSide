import {
    MapPin,
    TrendingUp,
    PieChart,
    Handshake,
    DollarSign,
    AlertTriangle,
} from "lucide-react";
import React from 'react'

const Criteria = () => {
    return (
            <div className="container flex flex-col py-[50px] px-9  border bg-slate-900 align-center justify-center  items-center min-w-full  ">
                <h1 className='text-white font-bold text-3xl'>Criteria We Use to Select Top Investments</h1>
                {/* GRID */}
                <div className="icons-info grid gap-6
            sm:grid-cols-2
            lg:grid-cols-3 mt-4 pt-3">
                    <div className="box w-27 flex flex-col gap-2 bg-neutral-900 px-2 py-5 rounded-xl items-center">
                        <div className="icons-head flex  flex-col items-center gap-2">
                            <MapPin size={40} className="text-emerald-300"/>
                            <h4>Location</h4>
                        </div>
                        <p className="text-xl text-gray">Proximity to amenities,growth prospects.</p>
                    </div>
                    <div className="box w-27 flex flex-col gap-2 bg-neutral-900 px-4 py-5 rounded-xl items-center">
                        <div className="icons-head flex  flex-col items-center gap-2">
                            <TrendingUp size={40} className="text-emerald-300" />
                            <h4>Return on Investment (ROI)</h4>
                        </div>
                        <p className="text-xl text-gray">Potential profitability</p>
                    </div>
                    <div className="box w-27 flex flex-col gap-2 bg-neutral-900 px-4 py-5 rounded-xl items-center">
                        <div className="icons-head flex  flex-col items-center gap-2">
                            <PieChart size={40} className="text-emerald-300" />
                            <h4>Market Trends</h4>
                        </div>
                        <p className="text-xl text-gray">Current and future market conditions.</p>
                    </div>
                    <div className="box w-27 flex flex-col gap-2 bg-neutral-900 px-4 py-5 rounded-xl items-center">
                        <div className="icons-head flex  flex-col items-center gap-2">
                            <Handshake size={40} className="text-emerald-300" />
                            <h4>Property Liquidity</h4>
                        </div>
                        <p className="text-xl text-gray">Ease of selling and market demand for the property.</p>
                    </div>
                    <div className="box w-27 flex flex-col gap-2 bg-neutral-900 px-4 py-5 rounded-xl items-center">
                        <div className="icons-head flex  flex-col items-center gap-2">
                            <DollarSign size={40} className="text-emerald-300" />
                            <h4>Rental Yield</h4>
                        </div>
                        <p className="text-xl text-gray">Income generation capability.</p>
                    </div>
                    <div className="box w-27 flex flex-col gap-2 bg-neutral-900 px-4 py-5 rounded-xl items-center">
                        <div className="icons-head flex  flex-col items-center gap-2">
                            <AlertTriangle size={40} className="text-emerald-300" />
                            <h4>Risk Assessment</h4>
                        </div>
                        <p className="text-xl text-gray">Evaluation of potential risks.
                        </p>
                    </div>
                </div>
            </div>
    )
}
export default Criteria;