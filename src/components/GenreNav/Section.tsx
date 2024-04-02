import React from 'react'

interface Props {
  genre: string;
}

const Section: React.FC<Props> = ({ genre }) => {
  return (
    <div>
      <h1>{genre}</h1>
      
    </div>
  )
}

export default Section