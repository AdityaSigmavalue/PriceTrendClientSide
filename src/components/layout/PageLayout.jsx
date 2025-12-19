import React from 'react'

const PageLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10">
      <h1 className="text-2xl font-semibold mb-6">{title}</h1>
      <div className="w-full max-w-3xl">{children}</div>
    </div>
  )
}

export default PageLayout