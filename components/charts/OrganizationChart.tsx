"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useTheme } from "@/components/ThemeProvider";

interface OrganizationChartProps {
  total: number;
  verified: number;
  pending: number;
  suspended: number;
}

export default function OrganizationChart({
  total,
  verified,
  pending,
  suspended,
}: OrganizationChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize chart
    chartInstance.current = echarts.init(chartRef.current);

    const isDark = theme === "dark";
    const textColor = isDark ? "#d1d5db" : "#374151";
    const splitLineColor = isDark ? "#374151" : "#e5e7eb";
    const labelColor = isDark ? "#ffffff" : "#111827";

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderColor: "#333",
        textStyle: {
          color: "#fffefeff",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        axisLabel: {
          color: textColor,
        },
        splitLine: {
          lineStyle: {
            color: splitLineColor,
          },
        },
      },
      yAxis: {
        type: "category",
        data: ["Suspended", "Pending", "Verified", "Total"],
        axisLabel: {
          color: textColor,
          fontSize: 14,
        },
        axisLine: {
          lineStyle: {
            color: splitLineColor,
          },
        },
      },
      series: [
        {
          name: "Organizations",
          type: "bar",
          data: [
            {
              value: suspended,
              itemStyle: { color: "#e70000ff" },
            },
            {
              value: pending,
              itemStyle: { color: "#c94a00ff" },
            },
            {
              value: verified,
              itemStyle: { color: "#02a145" },
            },
            {
              value: total,
              itemStyle: { color: "#020ba9" },
            },
          ],
          label: {
            show: true,
            position: "right",
            color: labelColor,
            fontSize: 16,
            fontWeight: "bold",
          },
          barWidth: "70%",
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
  }, [total, verified, pending, suspended, theme]);

  return <div ref={chartRef} className="w-full h-80" />;
}
