"use strict";

import vertexShaderSource from './vertexShader.js';
import fragmentShaderSource from './fragmentShader.js';
import {createShader, createProgram} from './utility.js';

function main() {
    //step 1: get access to the gl context
    const canvas = document.querySelector("canvas");
    const gl = canvas.getContext("webgl2");
    if (!gl) {
        console.error("Webgl2 is not supported!");
        return;
    }

    //create the shader program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    //the triangle position data
    const positions = [
        -1, 1,
        -1, -1,
        1, 1,
        1, 1,
        -1, -1,
        1, -1
    ];

    //create a geometry and populate with data
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    //configure varying variables
    var positionAttributeLocation = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    //define screen space
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // draw our object
    gl.useProgram(program);
    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

main();
