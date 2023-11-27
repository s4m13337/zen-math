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

            // Compute dimensions of canvas area
            const calculateDimensions = () => {
                const canvasArea = document.querySelector('.canvas-area');
                const width = canvasArea ? canvasArea.offsetWidth : window.innerWidth;
                const height = window.innerHeight;
                return { width, height };
            }

            const sketch = (p) => {
                p.setup = () => {
                    const { width, height } = calculateDimensions();
                    p.createCanvas(width, height);
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
        <div className="col-md-9 p-0 canvas-area">
            <P5Canvas />
        </div>
    );
}

export default Canvas;