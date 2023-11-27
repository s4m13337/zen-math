import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';
import { SliderPicker } from 'react-color';
import { changeM, changeN, changeAngle, changeScalingFactor, changeIterations, changeBackground, changeStroke, toggleAnimation, toggleRotation } from './redux/settings';
import { BlockMath } from 'react-katex';

function Sidebar(){
    
    const parameters = useSelector((state) => state.settings);
    const dispatch = useDispatch();
    return(
        <Col md={3} className="d-none d-md-block bg-dark text-light sidebar vh-100">
            <div className="sidebar-sticky">
                <h1 className="my-4 text-center">Zen Math Art</h1>
                <BlockMath>x(t) = \sin(n t) \sin(m t)</BlockMath>
                <BlockMath>y(t) = \cos(n t) \sin(m t)</BlockMath>
                <h5 className="my-4 text-center">Settings</h5>
                <Form>
                    <Row className="m-2">
                        <Form.Group className="col-md-6">
                            <Form.Label>m</Form.Label>
                            <Form.Control 
                                type="number"
                                value={parameters.m}
                                onChange={(e) => dispatch(changeM(e.target.value))}
                            />
                        </Form.Group>

                        <Form.Group className="col-md-6">
                            <Form.Label>n</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={parameters.n}
                                onChange={(e) => dispatch(changeN(e.target.value))}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="m-2">
                        <Form.Group className="col-md-6">
                            <Form.Label>Angle</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={parameters.angle}
                                onChange={(e) => dispatch(changeAngle(e.target.value))}
                            />
                        </Form.Group>

                        <Form.Group className="col-md-6">
                            <Form.Label>Scale Factor</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={parameters.scalingFactor}
                                onChange={(e) => dispatch(changeScalingFactor(e.target.value))}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="m-2">
                        <Form.Group className="col-md-6">
                            <Form.Label>Iterations</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={parameters.iterations}
                                onChange={(e) => dispatch(changeIterations(e.target.value))}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="m-2">
                    <Form.Group className="col-md-6">
                        <Form.Label>Background</Form.Label>
                        <SliderPicker
                            color={parameters.background}
                            onChange={(e) => dispatch(changeBackground(e.hex))}
                            width="150px"
                        />      
                    </Form.Group>
                    <Form.Group className="col-md-6">
                        <Form.Label>Stroke</Form.Label>
                        <SliderPicker
                            color={parameters.stroke}
                            onChange={(e) => dispatch(changeStroke(e.hex))}
                            width="150px"
                        />      
                    </Form.Group>
                    </Row>

                    <Form.Check
                        className="m-3"
                        type="switch"
                        id="custom-switch"
                        label="Progressive Animation"
                        checked={parameters.animation}
                        onChange={(e) => dispatch(toggleAnimation(e.target.checked))}
                    />

                    <Form.Check
                        className="m-3"
                        type="switch"
                        id="custom-switch"
                        label="Rotation"
                        checked={parameters.rotation}
                        onChange={(e) => dispatch(toggleRotation(e.target.checked))}
                    />

                </Form>

                <div className="fixed-bottom col-md-3 text-center">
                    <p>&copy; s4m13337</p>
                </div>

            </div>
        </Col>
    );
}

export default Sidebar;