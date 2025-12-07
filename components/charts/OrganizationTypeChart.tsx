"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useTheme } from "@/components/ThemeProvider";

interface OrganizationTypeChartProps {
  commercial: number;
  educational: number;
}

export default function OrganizationTypeChart({
  commercial,
  educational,
}: OrganizationTypeChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize chart
    chartInstance.current = echarts.init(chartRef.current);

    const isDark = theme === "dark";
    const legendColor = isDark ? "#d1d5db" : "#374151";
    const labelColor = isDark ? "#ffffff" : "#111827";

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderColor: "#333",
        textStyle: {
          color: "#fff",
        },
        formatter: "{b}: {c} ({d}%)",
      },
      legend: {
        top: "5%",
        left: "center",
        textStyle: {
          color: legendColor,
          fontSize: 14,
        },
      },
      series: [
        {
          name: "Organization Type",
          type: "pie",
          radius: ["60%", "85%"],
          center: ["50%", "65%"],
          startAngle: 180,
          endAngle: 360,
          data: [
            {
              value: commercial,
              name: "Commercial",
              itemStyle: { color: "#02a145" },
            },
            {
              value: educational,
              name: "Educational",
              itemStyle: { color: "#020ba9" },
            },
          ],
          label: {
            show: true,
            color: labelColor,
            fontSize: 12,
            fontWeight: "bold",
            formatter: "{b}\n{c}",
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    chartInstance.current.setOption(option);

    // Handle resize
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, [commercial, educational, theme]);

  return <div ref={chartRef} className="w-full h-64" />;
}
