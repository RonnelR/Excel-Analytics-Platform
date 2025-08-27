import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

// Color palette
const COLORS = ["#E94F37", "#FF6B6B", "#FF8C42", "#FFC857", "#FFB5A7"];

/* ------------------- PIE 3D ------------------- */
export const Pie3D = ({ data, position = [0, 0, 0] }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let startAngle = 0;

  return (
    <group position={position}>
      {data.map((item, index) => {
        const angle = (item.value / total) * Math.PI * 2;
        const geometry = new THREE.CylinderGeometry(
          5,
          5,
          1,
          64,
          1,
          false,
          startAngle,
          angle
        );

        const midAngle = startAngle + angle / 2;
        const labelPos = [
          Math.cos(midAngle) * 6.5,
          1.5,
          Math.sin(midAngle) * 6.5,
        ];

        const percentage = ((item.value / total) * 100).toFixed(1);
        const labelText = `${item.label} (${percentage}%)`;

        startAngle += angle;
        const color = COLORS[index % COLORS.length];

        return (
          <group key={index}>
            <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color={color} />
            </mesh>
            <Text
              position={labelPos}
              fontSize={0.45}
              color="#393E41"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="white"
            >
              {labelText}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

/* ------------------- DOUGHNUT 3D ------------------- */
export const Doughnut3D = ({ data, position = [0, 0, 0] }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let startAngle = 0;

  return (
    <group position={position}>
      {data.map((item, index) => {
        const angle = (item.value / total) * Math.PI * 2;

        const shape = new THREE.Shape();
        shape.absarc(0, 0, 5, startAngle, startAngle + angle, false);
        const holePath = new THREE.Path();
        holePath.absarc(0, 0, 2.5, 0, Math.PI * 2, true);
        shape.holes.push(holePath);

        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 1,
          bevelEnabled: false,
        });

        const midAngle = startAngle + angle / 2;
        const labelPos = [
          Math.cos(midAngle) * 6.5,
          1.5,
          Math.sin(midAngle) * 6.5,
        ];

        const percentage = ((item.value / total) * 100).toFixed(1);
        const labelText = `${item.label} (${percentage}%)`;

        startAngle += angle;
        const color = COLORS[index % COLORS.length];

        return (
          <group key={index}>
            <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color={color} />
            </mesh>
            <Text
              position={labelPos}
              fontSize={0.45}
              color="#393E41"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="white"
            >
              {labelText}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

/* ------------------- COLUMN 3D ------------------- */
export const Column3D = ({ data, position = [0, 0, 0] }) => {
  const maxVal = Math.max(...data.map((d) => d.value));
  const gap = 2;

  return (
    <group position={position}>
      {data.map((item, index) => {
        const height = (item.value / maxVal) * 8;
        const geometry = new THREE.BoxGeometry(1.5, height, 1.5);

        const posX = index * gap - (data.length * gap) / 2;
        const posY = height / 2;
        const posZ = 0;

        const labelPos = [posX, height + 0.8, posZ];
        const percentage = ((item.value / maxVal) * 100).toFixed(1);
        const labelText = `${item.label} (${percentage}%)`;

        const color = COLORS[index % COLORS.length];

        return (
          <group key={index}>
            <mesh geometry={geometry} position={[posX, posY, posZ]}>
              <meshStandardMaterial color={color} />
            </mesh>
            <Text
              position={labelPos}
              fontSize={0.45}
              color="#393E41"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="white"
            >
              {labelText}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

/* ------------------- MAIN PAGE ------------------- */
export default function ChartsPage() {
  const sampleData = [
    { label: "A", value: 30 },
    { label: "B", value: 20 },
    { label: "C", value: 50 },
    { label: "D", value: 10 },
  ];

  return (
    <Canvas camera={{ position: [0, 10, 20], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />

      {/* Pie */}
      <Pie3D data={sampleData} position={[-12, 0, 0]} />

      {/* Doughnut */}
      <Doughnut3D data={sampleData} position={[0, 0, 0]} />

      {/* Column */}
      <Column3D data={sampleData} position={[12, 0, 0]} />

      <OrbitControls />
    </Canvas>
  );
}
