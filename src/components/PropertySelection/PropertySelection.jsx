import { FileText, PieChart, Wrench, MapPin, DollarSign } from 'lucide-react'
import React from 'react'

const PropertySelection = () => {
    return (
        <div className=''>

            <div className="container flex flex-col py-[50px] px-9   bg-neutral-900 align-center justify-center  items-center min-w-full   ">

                <h1 className='text-white font-bold text-3xl'>Our Property Selection Process</h1>

                <div className="process-icons flex justify-around gap-9 px-3">

                    <div className="icons-box flex flex-col gap-3 items-center px-3 mt-4 py-5">
                        <FileText size={50} className='text-emerald-300' />
                        <h1 className='info text-[20px] w'>1. Understanding Your Goals</h1>
                    </div>

                    <div className="icons-box flex flex-col gap-3 items-center   px-3 mt-4 py-5">
                        <PieChart size={50} className='text-emerald-300' />
                        <h1 className='info text-[20px] w'>2. Market Analysiss</h1>
                    </div>

                    <div className="icons-box flex flex-col gap-3 items-center   px-3 mt-4 py-5">
                        <Wrench size={50} className='text-emerald-300' />
                        <h1 className='info text-[20px] w'>3. Property Evaluation
                        </h1>
                    </div>

                    <div className="icons-box flex flex-col gap-3 items-center   px-3 mt-4 py-5">
                        <MapPin size={50} className='text-emerald-300' />
                        <h1 className='info text-[20px] w'>4. Presentation of Options</h1>
                    </div>

                    <div className="icons-box flex flex-col gap-3 items-center   px-3 mt-4 py-5">
                        <DollarSign size={50} className='text-emerald-300' />
                        <h1 className='info text-[20px] w'>5. Support Through Purchase</h1>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default PropertySelection