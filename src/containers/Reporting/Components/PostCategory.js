import React from 'react';
import CanvasJSReact from '../../../library/canvasjs.react';

const PostCategory = (props) => {
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2",
        title:{
            text: "Post Number Per Category ("+props.type+")"
        },
        data: [{
            type: "bar",
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

export default PostCategory;