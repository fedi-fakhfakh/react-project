import React from 'react'

export const BlogCard = ({title, firstName, lastName}) => {

  return (
    <div style={{height:'100%',width:'100%'}} >
      <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}><h3 className='titlePost'>{title}</h3></div>
      <div style={{width:"100%"}}>
        <div className='authorPost'>
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>
      </div>
    </div>
  )
}
