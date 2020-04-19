import React from 'react';

export const Percent = ({
    percent,
    stokeWidth = 6,
    radius = 52,
    color="blue"
}) => {
    const stokeWidthRad = radius - stokeWidth * 2;
    const circumference = stokeWidthRad * 2 * Math.PI;
    const strokeDashoffset = circumference - percent / 100 * circumference;
    
    return (
        <svg
            className="progress-ring"
            height={radius * 2}
            width={radius * 2}
        >
            <circle
                x="50%" 
                y="50%"
                stroke={color}
                fill="transparent"
                strokeWidth={stokeWidth}
                strokeDashoffset={strokeDashoffset}
                strokeDasharray={`${circumference} ${circumference}`}
                r={stokeWidthRad}
                cx={radius}
                cy={radius}
            >
            </circle>
            
        <text style={{ fontWeight: 300 }} x="50%" y="50%" textAnchor="middle" stroke="#000" strokeWidth="0.5" dx='3px' dy='5px'>
            {percent}%
        </text>

        </svg>
    );
};

export default Percent;