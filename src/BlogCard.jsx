import React from 'react'

export const BlogCard = ({title, firstName, lastName}) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{firstName}</p>
      <p>{lastName}</p>
    </div>
  )
}
