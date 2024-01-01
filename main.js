import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(5, 5, 1);
const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;

  void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      uv.y = 1.0 - uv.y;

      float freq = 30.0; // Increase frequency for wavier effect
      float amp = 0.3;   // Increase amplitude for higher ripples

      vec2 center = vec2(0.5, 0.5);
      float dist = length(uv - center);
      float offset = sin(dist * freq - time) * amp;

      vec3 color = mix(vec3(0.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0), offset + 0.5);
      gl_FragColor = vec4(color, 1.0);
  }

`;

// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const material = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0.0 },
    resolution: { value: new THREE.Vector2() },
  },
  vertexShader: document.getElementById("vertexShader").textContent,
  fragmentShader: fragmentShader,
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  // plane.rotation.x += 0.01;
  // plane.rotation.y += 0.01;

  material.uniforms.time.value += 0.01;
  material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);

  renderer.render(scene, camera);
}

animate();
