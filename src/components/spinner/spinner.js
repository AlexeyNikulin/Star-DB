import React from 'react';

import './spinner.css';

const Spinner = () => {
  return (
    <div style={{height: "150px"}} className="lds-css">
      <div className="lds-double-ring">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;