import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../Comonents/Layouts/Layout";
import DataPreviewTable from "../Comonents/DataPreviewTable.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import jsPDF from "jspdf";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Pie3D, Doughnut3D, Column3D } from "./charts/threeDviewer.js";
import { DiamondPlus, FileText, ImageDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Data_Insight } from "../Services/api.js";
import toast from "react-hot-toast";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const VisualizationPage = () => {
  const [visualizationButton, setVisualizationButton] = useState(true);
  const [DataPreviewButton, setDataPreviewButton] = useState(false);
  const { selectedX, selectedY } = useSelector((state) => state.chart);
  const excelData = useSelector((state) => state.excelData);
  const [chartType, setChartType] = useState("bar");
  const [insight, setInsight] = useState([]); // array of strings after normalization

  const chartRef = useRef(null);
  const threeCanvasRef = useRef(null);

  const types = [
    "bar",
    "line",
    "pie",
    "doughnut",
    "3D pie",
    "3D column",
    "3D donut",
  ];

  const labels = excelData?.excelData.map((row) => row[selectedX]);
  const dataset = excelData?.excelData.map((row) => row[selectedY]);

  const navigate = useNavigate();

  const chartData = {
    labels,
    datasets: [
      {
        label: `${selectedY} by ${selectedX}`,
        data: dataset,
        backgroundColor: ["#E94F37", "#393E41", "#F6F7EB", "#6C63FF", "#FFCE56"],
        borderColor: "#393E41",
        borderWidth: 1,
      },
    ],
  };

  const data3D = excelData?.excelData?.map((row) => ({
    label: row[selectedX],
    value: Number(row[selectedY]) || 0,
  }));

  const downloadPNG = () => {
    let canvas;
    if (chartType.includes("3D")) {
      canvas = threeCanvasRef.current?.gl?.domElement || threeCanvasRef.current;
    } else {
      canvas = chartRef.current?.canvas || chartRef.current?.canvasEl;
    }
    if (!canvas) return console.log("No canvas found!");
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${chartType}.png`;
    link.click();
  };

  const downloadPDF = () => {
    let canvas;
    if (chartType.includes("3D")) {
      canvas = threeCanvasRef.current?.gl?.domElement || threeCanvasRef.current;
    } else {
      canvas = chartRef.current?.canvas;
    }
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 120);
    pdf.save(`${chartType}.pdf`);
  };

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <Bar ref={chartRef} data={chartData} />;
      case "line":
        return <Line ref={chartRef} data={chartData} />;
      case "pie":
        return <Pie ref={chartRef} data={chartData} />;
      case "doughnut":
        return <Doughnut ref={chartRef} data={chartData} />;
      case "3D column":
        return (
          <Canvas
            ref={threeCanvasRef}
            style={{ height: "400px" }}
            gl={{ preserveDrawingBuffer: true }}
          >
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls />
            <Column3D data={data3D} />
          </Canvas>
        );
      case "3D pie":
        return (
          <Canvas
            ref={threeCanvasRef}
            style={{ height: "400px" }}
            gl={{ preserveDrawingBuffer: true }}
          >
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls />
            <Pie3D data={data3D} />
          </Canvas>
        );
      case "3D donut":
        return (
          <Canvas
            ref={threeCanvasRef}
            style={{ height: "400px" }}
            gl={{ preserveDrawingBuffer: true }}
          >
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls />
            <Doughnut3D data={data3D} />
          </Canvas>
        );
      default:
        return null;
    }
  };

  // --------- INSIGHT NORMALIZER (the key fix) ----------
  const normalizeInsights = (raw) => {
    if (raw == null) return [];

    // If we get a string, try to turn it into an object/array first
    if (typeof raw === "string") {
      let text = raw.trim();

      // Strip markdown code fences if present
      text = text.replace(/```(?:json)?/gi, "").trim();


      // If it looks like JSON (array or object), parse it
      if (text.startsWith("[") || text.startsWith("{")) {
        text = text.replace(/```(?:json)?/gi, "").trim();
        //--------------//

        try {
       
          const parsed = JSON.parse(text);
          return normalizeInsights(parsed);
        } catch (_) {
          // If JSON.parse fails, try to pick out "insight": "..." pieces
          const matches = [];
          const re = /["']insight["']\s*:\s*["']([^"']*?)["']/g;
          let m;
          while ((m = re.exec(text)) !== null) matches.push(m[1]);
          if (matches.length) return matches;
          // Fallback: treat whole string as one insight
          return [text];
        }
      }

      // Plain, non-JSON text (maybe multiple sentences)
      // Split gently on line breaks or semicolons if present; otherwise keep as one
      if (text.includes("\n") || text.includes(";")) {
        return text
          .split(/\n+|;\s*/g)
          .map((t) => t.trim())
          .filter(Boolean);
      }
      return [text];
    }

    // If we get an array, flatten and normalize items
    if (Array.isArray(raw)) {
      const out = [];
      raw.forEach((item) => {
        if (!item) return;
        if (typeof item === "string") {
          out.push(...normalizeInsights(item));
        } else if (typeof item === "object") {
          if ("insight" in item && item.insight != null) {
            out.push(String(item.insight));
          } else if ("insights" in item && item.insights != null) {
            out.push(...normalizeInsights(item.insights));
          } else {
            // Unknown object; stringify to avoid losing data
            out.push(JSON.stringify(item));
          }
        }
      });
      return out;
    }

    // If we get an object with { insights } or { insight }
    if (typeof raw === "object") {
      if ("insights" in raw) return normalizeInsights(raw.insights);
      if ("insight" in raw) return [String(raw.insight)];
    }

    return [];
  };

  // Clear file
  const handleClearFile = () => {
    localStorage?.removeItem("excel");
    localStorage?.removeItem("selectedX");
    localStorage?.removeItem("selectedY");
    navigate("/dashboard/user/Upload-file");
  };

  // Generate insights
  const handleGenerateInsight = async () => {
    try {
      const res = await Data_Insight(excelData?.excelData);
      const raw = res?.data?.insights ?? res?.data ?? null;
      const normalized = normalizeInsights(raw);
      setInsight(normalized);
    } catch (error) {
      console.error(error);
      toast.error("Some issue generating insights.");
    }
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => {
              setDataPreviewButton(false);
              setVisualizationButton(true);
            }}
            className={`px-6 py-2 rounded-2xl text-white shadow-md transition ${
              visualizationButton ? "bg-red-600" : "bg-gray-400 hover:bg-red-500"
            }`}
          >
            Visualization
          </button>
          <button
            onClick={() => {
              setVisualizationButton(false);
              setDataPreviewButton(true);
            }}
            className={`px-6 py-2 rounded-2xl text-white shadow-md transition ${
              DataPreviewButton ? "bg-red-600" : "bg-gray-400 hover:bg-red-500"
            }`}
          >
            Data Preview
          </button>
        </div>

        {/* Visualization */}
        {visualizationButton && (
          <div className="space-y-6">
            <h2 className="text-center text-xl font-bold text-gray-800">
              Chart for <span className="text-red-600">{selectedX}</span> vs{" "}
              <span className="text-red-600">{selectedY}</span>
            </h2>

            {/* Chart Type Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`px-4 py-2 rounded-xl shadow-md text-sm font-semibold transition ${
                    chartType === type
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-red-500 hover:text-white"
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Chart Display */}
            <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200">
              <div className="w-full h-[400px] flex justify-center items-center">
                {renderChart()}
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={downloadPDF}
                className="flex gap-2 px-5 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
              >
                <FileText />
                Download PDF
              </button>
              <button
                onClick={downloadPNG}
                className="flex gap-2 px-5 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
              >
                <ImageDown />
                Download PNG
              </button>
            </div>

            {/* Insights Section */}
            <div className="mt-8 border-2 border-dashed border-gray-400 rounded-xl p-6 text-center">
              <p className="text-lg font-bold text-red-600">Data Insights</p>

              {insight.length > 0 ? (
                <ul className="list-disc text-left mt-4 space-y-2 px-6">
                  {insight.map((text, idx) => (
                    <li key={idx}>{text}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No insights yet. Click generate 🚀</p>
              )}

              <button
                onClick={handleGenerateInsight}
                className="mt-4 flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
              >
                <DiamondPlus />
                Generate
              </button>
            </div>

            {/* Upload New File */}
            <div className="text-center">
              <button
                onClick={handleClearFile}
                className="px-6 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
              >
                Upload New File
              </button>
            </div>
          </div>
        )}

        {/* Data Preview */}
        {DataPreviewButton && (
          <div className="space-y-6">
            <DataPreviewTable data={excelData?.excelData} />
            <div className="text-center">
              <button
                onClick={handleClearFile}
                className="px-6 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
              >
                Upload New File
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VisualizationPage;
