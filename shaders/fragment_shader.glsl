uniform float time;
uniform vec2 resolution;
uniform sampler2D texture;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.y = 1.0 - uv.y;

    float freq = 10.0;
    float amp = 0.1;

    vec2 center = vec2(0.5, 0.5);
    float dist = length(uv - center);
    float offset = sin(dist * freq - time) * amp;

    vec4 color = texture2D(texture, uv + vec2(offset, offset));
    gl_FragColor = color;
}
