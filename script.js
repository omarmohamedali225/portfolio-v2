import * as THREE from "three";
const menu = document.querySelector(".navbar .menu");
const navLinks = document.querySelector(".navbar .nav-links");

menu.addEventListener("click", () => {
  menu.classList.toggle("active");
  navLinks.classList.toggle("active");
});

const circle = document.querySelector(".circle");
let rect = circle.getBoundingClientRect();

document.addEventListener("mousemove", (e) => {
  let mouseX = e.clientX - 20;
  let mouseY = e.clientY - 20;
  circle.style.transform = `translate(${mouseX}px,${mouseY}px)`;
});

// three
const initThree = () => {
  const container = document.querySelector(".canvas-container");
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  container.appendChild(renderer.domElement);

  // جزيئات أكثر نعومة
  const geometry = new THREE.BufferGeometry();
  const count = 2000;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 2000;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x64ffda,
    size: 2,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  camera.position.z = 1000;
  // حركة مع الماوس
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX - window.innerWidth / 2;
    mouseY = e.clientY - window.innerHeight / 2;
  });

  function animate() {
    requestAnimationFrame(animate);

    // دوران تلقائي خفيف
    particles.rotation.y += 0.001;
    particles.rotation.x += 0.0005;

    // استجابة ناعمة لحركة الماوس
    camera.position.x += (mouseX - camera.position.x) * 0.02;
    camera.position.y += (-mouseY - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();

  // التعامل مع تغيير حجم النافذة
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

initThree();
