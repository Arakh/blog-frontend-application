import React from 'react';
import CanvasJSReact from '../../../library/canvasjs.react';

const ApprovalMonitoring = (props) => {
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2",
        title:{
            text: "Approval Process ("+props.type+")"
        },
        data: [{
            type: "pie",
            indexLabel: props.type === "Amount" ? "{y}" : "{y}%",
            startAngle: -90,
            dataPoints: props.data
        }]
    }

    return (
        <div>
            <CanvasJSReact.CanvasJSChart options = {options}/>
        </div>
    );
}

export default ApprovalMonitoring;