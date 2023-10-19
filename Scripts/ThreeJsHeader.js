import * as THREE from 'three';


import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';




function Init() {
  var container = document.getElementById('container');

  var innerWidth = container.clientWidth;
  var innerHeight = container.clientHeight;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 10000);

  camera.position.z = 250;

  /*camera.position.z = 1;
    camera.position.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;*/

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);

  scene.background = new THREE.Color("#000000");
  scene.fog = new THREE.Fog(
    "#bfd1e5"
    , 1000, 10000);


  container.innerHTML = '';
  container.appendChild(renderer.domElement);



  const dirLight = new THREE.DirectionalLight("#ffffff", 0.2);
  dirLight.position.set(0, 0, 1).normalize();
  scene.add(dirLight);

  const pointLight = new THREE.PointLight("#ffffff", 0.5, 0, 0);
  //
  pointLight.position.set(0, 100, 90);
  scene.add(pointLight);


  /* spotlight */

  const spotLight = new THREE.SpotLight("#ff0000", 1);

  spotLight.position.set(0, -150, 0);
  spotLight.angle = Math.PI / 4;
  spotLight.castShadow = true;


  scene.add(spotLight);

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

      //color: "#ffffff",
      font: font,

      size: size,
      height: height,
      curveSegments: curveSegments,

      bevelThickness: bevelThickness,
      bevelSize: bevelSize,
      bevelEnabled: bevelEnabled

    });

    textGeo.computeBoundingBox();

    //textGeo.computeVertexNormals();

    const centerOffsetX = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
    const centerOffsetY = -0.5 * (textGeo.boundingBox.max.y - textGeo.boundingBox.min.y);
    const centerOffsetZ = -0.5 * (textGeo.boundingBox.max.z - textGeo.boundingBox.min.z);

    const textMaterial = new THREE.MeshPhongMaterial({
      color: "#000000",
      specular: "#767676",
      emissive: "#000000",
      //shininess: 100,
      //flatShading: true
    });

    const mesh = new THREE.Mesh(textGeo, textMaterial);

    mesh.position.x = centerOffsetX;
    mesh.position.y = -65;
    mesh.position.z = centerOffsetZ;

    console.log(centerOffsetZ);

    scene.add(mesh);

  });

  /* Nebula Cloud Particles */


  let LoaderNebula = new THREE.TextureLoader();
  let cloudGeo = undefined;

  const RandomRange = function (min, max) {
    return Math.random() * (max - min) + min;
  }

  const gapNebula = 1000;
  LoaderNebula.load("smoke.png", function (texture) {
    cloudGeo = new THREE.PlaneGeometry(9000, 9000);


    for (let p = 0; p < 50; p++) {

      let cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
      });

      cloudMaterial.color.setRGB(
        RandomRange(0, 1),
        RandomRange(0, 1),
        RandomRange(0, 1));

      let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);

      cloud.position.set(
        (Math.random() * 2 - 1) * gapNebula,
        (Math.random() * 2 - 1) * gapNebula,
        -800
      );

      //cloud.rotation.x = Math.random() * 360;
      //cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random() * 360;

      /*cloud.material.emissive.setRGB(
        RandomRange(0.1, 0.6),
        RandomRange(0.1, 0.6),
        RandomRange(0.1, 0.6));*/

      scene.add(cloud);
    }
  });




  const clock = new THREE.Clock();
  let timelast = 0;

  const Animate = function () {
    requestAnimationFrame(Animate);
    renderer.render(scene, camera);

    var delta = clock.getDelta();

    stars.rotation.y += 0.1 * delta;

    if (timelast > 0.3) {
      //pointLight.color.setHSL(Math.random(), 1, 0.5);
      timelast = 0;
    }

    timelast += delta;

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