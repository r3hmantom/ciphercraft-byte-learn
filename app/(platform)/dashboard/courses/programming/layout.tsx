import React from 'react'

function LessonsLayout({ children }: { chidlren: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center" >{children}</div>
  )
}

export default LessonsLayout