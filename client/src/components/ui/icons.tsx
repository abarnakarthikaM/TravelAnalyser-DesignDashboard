import React from 'react';

interface RupeesProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

const Rupees: React.FC<RupeesProps> = ({ 
  className, 
  width = '16px', 
  height = '16px' 
}) => {
  return (
    <span>
      <svg 
        className={className} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="currentColor" 
        width={width}
        height={height}
        viewBox="0 0 256 256" 
        id="Flat"
      >
        <path d="M208,80a8.00039,8.00039,0,0,1-8,8H167.85156c.08789,1.32373.14844,2.65454.14844,4a60.06812,60.06812,0,0,1-60,60H92.69238l72.68946,66.08008a8.0006,8.0006,0,0,1-10.76368,11.83984l-88-80A8.0004,8.0004,0,0,1,72,136h36a44.04978,44.04978,0,0,0,44-44c0-1.34912-.0708-2.68164-.18994-4H72a8,8,0,0,1,0-16h75.17188A44.03678,44.03678,0,0,0,108,48H72a8,8,0,0,1,0-16H200a8,8,0,0,1,0,16H148.73535a60.16006,60.16006,0,0,1,15.82422,24H200A8.00039,8.00039,0,0,1,208,80Z" />
      </svg>
    </span>
  );
};

export { Rupees };