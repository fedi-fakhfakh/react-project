import React, { useEffect, useState } from 'react';


export const BlogPost = ({title, content}) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};
