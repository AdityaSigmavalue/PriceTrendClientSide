import React, { useState } from "react";
import { data } from "../../services/data";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section className="max-w-3xl mx-auto my-10">
            <h1 className="text-2xl font-semibold mb-6 text-gray-900">
                {data.title}
            </h1>

            <div className="space-y-3">
                {data.items.map((item, index) => {
                    const isActive = activeIndex === index;
                    const contentId = `accordion-panel-${item.id}`;
                    const buttonId = `accordion-button-${item.id}`;

                    return (
                        <div
                            key={item.id}
                            className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
                        >
                            <button
                                type="button"
                                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                onClick={() => handleToggle(index)}
                                aria-expanded={isActive}
                                aria-controls={contentId}
                            >
                                <span className="text-sm md:text-base font-medium text-gray-900"    >
                                    {item.question}
                                </span>
                                <span className="ml-3 text-xl leading-none text-gray-500">
                                    {isActive ? <ArrowBigUp /> : <ArrowBigDown />}
                                </span>
                            </button>

                            {isActive && (
                                <div
                                    id={contentId}
                                    role="region"
                                    aria-labelledby={buttonId}
                                    className="px-4 pb-4 pt-1 text-sm text-gray-700 bg-gray-50 border-t border-gray-100"
                                >
                                    {item.answer.map((line, i) => (
                                        <p key={i} className="mt-2 first:mt-1">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Accordion;
