import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import p5 from 'p5';

function Canvas(){
    const parameters = useSelector((state) => state.settings)
    useEffect(()=>{
        console.log('Something changed...')
    }, [parameters.m])

    const P5Canvas = () => {
        const canvasRef = useRef();
        useEffect(() => {
            const sketch = (p) => {
                p.setup = () => {
                    p.createCanvas(800, 800);
                    p.background(parameters.background);
                };

                p.draw = () => {
                    p.ellipse(400, 400, 300, 200);
                };
            };
            const p5Instance = new p5(sketch, canvasRef.current);
            return () => p5Instance.remove();
        }, []);
        return <div ref={canvasRef}></div>;
    }

    return(
        <div className="col-md-9">
            <P5Canvas />
        </div>
    );
}

export default Canvas;