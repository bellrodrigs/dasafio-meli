import React from 'react';
import './Loading.sass'

export const Loading = () => {
  return (
    <div className="lds-ring" data-testid="loading"><div></div><div></div><div></div><div></div></div>
  )
}

