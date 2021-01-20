export default `

#version 300 es
precision highp float;

out vec4 outColor;

void main() {
    vec2 uv = gl_FragCoord.xy / vec2(800, 800) - vec2(0.5, 0.5);
    vec3 col = vec3(0.8, 0.5, 0.9);

    col *= abs(length(uv) < 0.3 ? uv.x : uv.y);

    outColor = vec4(col, 1.0);
}

`.trim();
