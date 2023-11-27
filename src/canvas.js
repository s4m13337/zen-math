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

                let points = [];
                let path = [];
                let currentIndex = 0;
                let segmentDuration = 10; 
                let animationStartTime;
                let rotationAngle = 0;
                
                // Function to animate progressively
                function progressiveAnimate(){
                    // If there are still points to draw
                    if(currentIndex < points.length) {
                        if (animationStartTime == null) {
                            animationStartTime = p.millis();    // Start the animation timer
                        }
                
                        // Calculate the interpolation factor (0 to 1) based on time elapsed
                        let elapsed = p.millis() - animationStartTime;
                        let t = p.constrain(elapsed / segmentDuration, 0, 1);
                
                        // Interpolate between start and end points
                        let startX = points[currentIndex].x;
                        let startY = points[currentIndex].y;
                        let endX = (currentIndex === points.length - 1) 
                            ? points[currentIndex].x 
                            : points[currentIndex + 1].x;
                        let endY = (currentIndex === points.length - 1) 
                            ? points[currentIndex].y 
                            : points[currentIndex + 1].y;
                
                        let x = p.lerp(startX, endX, t);
                        let y = p.lerp(startY, endY, t);
                        path.push(p.createVector(x, y));    // Store the intermediate point in the path
                
                        // Check if the line animation is complete
                        if (t === 1) {
                            currentIndex++;
                            animationStartTime = null; // Reset the animation timer for the next line
                        }
                    }
                }

                p.setup = () => {
                    const { width, height } = calculateDimensions();
                    p.createCanvas(width, height);
                    
                    // Equation and parameters setup
                    let m = parameters.m;
                    let n = parameters.n;
                    let angle = parameters.angle;
                    let amplitude = parameters.scalingFactor;
                    let angleRadians = angle * p.PI/180;

                    for(let t=0; t <= 360; t += 1){
                        points.push(p.createVector(
                            amplitude * p.sin(n * t * angleRadians) * p.sin(m * t * angleRadians), 
                            amplitude * p.cos(n * t * angleRadians) * p.sin(m * t * angleRadians)
                        ))
                    }
                };

                p.draw = () => {
                    p.translate(p.width/2, p.height/2);
                    p.background(parameters.background);
                    p.stroke(parameters.fill);
                    p.strokeWeight(2);

                    const drawLines = (fp) => {
                        for (let i = 0; i < fp.length - 1; i++) {
                            p.line(fp[i].x, fp[i].y, fp[i + 1].x, fp[i + 1].y);
                        }
                    }

                    if(parameters.rotation){
                        rotationAngle += 0.1;
                        p.rotate(p.radians(rotationAngle));
                    }

                    if(parameters.animation){
                        progressiveAnimate();
                        drawLines(path);
                    } else {
                        drawLines(points);
                    }
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