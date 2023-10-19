import * as THREE from 'three';


import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';




function Init() {
  var container = document.getElementById('container');

  var innerWidth = container.clientWidth;
  var innerHeight = container.clientHeight;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);

  scene.background = new THREE.Color("#000000");
  scene.fog = new THREE.Fog(
    "#bfd1e5"
    , 1000, 10000);


  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  camera.position.z = 250;

  const dirLight = new THREE.DirectionalLight("#eae68b", 0.4);
  dirLight.position.set(0, 0, 1).normalize();
  scene.add(dirLight);

  const pointLight = new THREE.PointLight("#e0ee89", 4.5, 0, 0);
  pointLight.color.setHSL(Math.random(), 1, 0.5);
  pointLight.position.set(0, 100, 90);
  scene.add(pointLight);


  /* star particles */

  const starQty = 45000;

  const geometry = new THREE.SphereGeometry(10000, 100, 50);

  const materialOptions = {
    size: 1.0,
    transparency: false,
    opacity: 0.7
  };

  const gap = 1000;

  const starStuff = new THREE.PointsMaterial(materialOptions);


  const positions = new Float32Array(starQty * 3);

  for (let i = 0; i < starQty; i++) {



    positions[i] = (Math.random() * 2 - 1) * gap;
    positions[i + 1] = (Math.random() * 2 - 1) * gap;
    positions[i + 2] = (Math.random() * 2 - 1) * gap;





  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));


  const stars = new THREE.Points(geometry, starStuff);
  scene.add(stars);


  /* text */

  let text = 'JeCodeLeSoir',
    bevelEnabled = true,
    font = undefined,
    fontName = 'optimer', // helvetiker, optimer, gentilis, droid sans, droid serif
    fontWeight = 'bold';

  const height = 20,
    size = 70,
    curveSegments = 4,
    bevelThickness = 2,
    bevelSize = 1.5;


  const loader = new FontLoader();
  loader.load('fonts/' + fontName + '_' + fontWeight + '.typeface.json', function (response) {

    font = response;



    const textGeo = new TextGeometry(text, {

      font: font,

      size: size,
      height: height,
      curveSegments: curveSegments,

      bevelThickness: bevelThickness,
      bevelSize: bevelSize,
      bevelEnabled: bevelEnabled

    });

    textGeo.computeBoundingBox();

    textGeo.computeVertexNormals();

    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

    const textMaterial = new THREE.MeshPhongMaterial({
      color: "#000000",
      specular: "#767676",
    });

    const mesh = new THREE.Mesh(textGeo, textMaterial);

    mesh.position.x = centerOffset;
    mesh.position.y = -65;
    mesh.position.z = 0;
    mesh.rotation.x = 0;

    scene.add(mesh);

  });

  const Animate = function () {
    requestAnimationFrame(Animate);
    renderer.render(scene, camera);

    stars.rotation.y += 0.01;
  };

  Animate();

  const OnWindowResize = function () {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  }

  window.addEventListener('resize', OnWindowResize, false);
}

Init();