// ========================================
// THREE.JS — FULL PAGE SPACE BACKGROUND
// ========================================

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);

const canvasContainer = document.getElementById('three-canvas');
if (canvasContainer) {
    canvasContainer.appendChild(renderer.domElement);
}

// ===== PARTICLES — SPACE NEBULA =====
const particleCount = 3500;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);
const sizes = new Float32Array(particleCount);

for (let i = 0; i < particleCount; i++) {
    // Posisi spread di 3D
    const radius = 50 + Math.random() * 80;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
    positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius * 0.6;
    positions[i * 3 + 2] = Math.cos(phi) * radius;
    
    // Warna: dominan cyan/blue dengan sedikit variasi
    const colorChoice = Math.random();
    if (colorChoice < 0.4) {
        // Cyan / Teal
        colors[i * 3] = 0.1 + Math.random() * 0.2;
        colors[i * 3 + 1] = 0.6 + Math.random() * 0.4;
        colors[i * 3 + 2] = 0.7 + Math.random() * 0.3;
    } else if (colorChoice < 0.7) {
        // Biru / Purple
        colors[i * 3] = 0.3 + Math.random() * 0.3;
        colors[i * 3 + 1] = 0.1 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.6 + Math.random() * 0.4;
    } else {
        // Putih kebiruan
        colors[i * 3] = 0.7 + Math.random() * 0.3;
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
    }
    
    sizes[i] = 0.05 + Math.random() * 0.2;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

const material = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// ===== ADD SOME GLOWING STARS =====
const starCount = 80;
const starPositions = new Float32Array(starCount * 3);
const starColors = new Float32Array(starCount * 3);

for (let i = 0; i < starCount; i++) {
    const radius = 30 + Math.random() * 60;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    starPositions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
    starPositions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius * 0.5;
    starPositions[i * 3 + 2] = Math.cos(phi) * radius;
    
    // Stars lebih terang
    starColors[i * 3] = 0.8 + Math.random() * 0.2;
    starColors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
    starColors[i * 3 + 2] = 1.0;
}

const starGeo = new THREE.BufferGeometry();
starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

const starMat = new THREE.PointsMaterial({
    size: 0.3,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
});

const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

// ===== DECORATIVE RINGS =====
const ringGeo = new THREE.TorusGeometry(12, 0.03, 16, 100);
const ringMat = new THREE.MeshBasicMaterial({
    color: 0x22d3ee,
    transparent: true,
    opacity: 0.04,
    wireframe: true,
});
const ring = new THREE.Mesh(ringGeo, ringMat);
ring.rotation.x = Math.PI * 0.4;
ring.rotation.z = Math.PI * 0.3;
scene.add(ring);

const ring2 = new THREE.TorusGeometry(18, 0.02, 16, 100);
const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.03,
    wireframe: true,
});
const ring2Mesh = new THREE.Mesh(ring2, ringMat2);
ring2Mesh.rotation.x = Math.PI * 0.6;
ring2Mesh.rotation.y = Math.PI * 0.5;
scene.add(ring2Mesh);

// ===== CAMERA =====
camera.position.set(0, 3, 20);
camera.lookAt(0, 0, 0);

// ===== MOUSE TRACKING =====
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// ===== ANIMATION =====
function animate() {
    requestAnimationFrame(animate);
    
    // Smooth mouse follow
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;
    
    // Rotate particles slowly
    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.0001;
    stars.rotation.y += 0.0005;
    stars.rotation.x += 0.0001;
    
    // Rotate rings
    ring.rotation.y += 0.001;
    ring2Mesh.rotation.y += 0.0007;
    ring2Mesh.rotation.x += 0.0005;
    
    // Camera parallax
    camera.position.x += (targetX * 2 - camera.position.x) * 0.02;
    camera.position.y += (targetY * 1.5 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
    
    renderer.render(scene, camera);
}
animate();

// ===== RESIZE =====
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

console.log('🌌 3D Space Background Loaded!');