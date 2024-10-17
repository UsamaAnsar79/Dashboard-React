
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DetailsBoxComponent({ icon, boxHeading1, boxHeading2, footerIcon, footerText }) {
  return (
    <div className="card text-white" style={{ border: "none", maxWidth: '100%' }}>
      <div className="card-body d-flex flex-column" style={{ backgroundColor: "#27293d" }}>
        <div className='d-flex justify-content-between align-items-center' style={{ paddingBottom: 20 }}>
          <div className='chat-icon'>
            <i className={icon}></i>
          </div>
          <div className='box-content text-end'> {/* Align text to the end for better responsiveness */}
            <h4 className='boxHeading1 mb-0'>{boxHeading1}</h4> {/* Remove margin bottom for better spacing */}
            <h3 className='boxHeading2 mb-0'>{boxHeading2}</h3>
          </div>
        </div>
        <div className='box-footer mt-auto d-flex align-items-center'>
          <i className={footerIcon}></i>
          <h6 className='mb-0 ms-2'>{footerText}</h6> {/* Add margin start for spacing */}
        </div>
      </div>
    </div>
  );
}
