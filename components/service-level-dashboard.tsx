"use client";

import type React from "react";
import type { ReactElement } from "react";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Upload = () => (
  <svg
    className="h-4 w-4 transition-transform hover:scale-110"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

const Download = () => (
  <svg
    className="h-4 w-4 transition-transform hover:scale-110"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    />
  </svg>
);

const FileSpreadsheet = () => (
  <svg
    className="h-4 w-4 transition-transform hover:scale-110"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const Settings = () => (
  <svg
    className="h-4 w-4 transition-transform hover:rotate-90 duration-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const TrendingUp = () => (
  <svg
    className="h-3 w-3"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

const TrendingDown = () => (
  <svg
    className="h-3 w-3"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
    />
  </svg>
);

const Minus = () => (
  <svg
    className="h-3 w-3"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 12H4"
    />
  </svg>
);

// Performance Gauge Component with centered text
function PerformanceGauge({
  value,
  expected,
  minimum,
  size = "medium",
}: {
  value: number;
  expected: number;
  minimum: number;
  size?: "small" | "medium" | "large";
}) {
  const getColor = () => {
    if (value >= expected) return "#10b981"; // green
    if (value >= minimum) return "#f59e0b"; // amber
    return "#ef4444"; // red
  };

  const getSize = () => {
    switch (size) {
      case "small":
        return { width: 60, height: 60, strokeWidth: 4 };
      case "medium":
        return { width: 80, height: 80, strokeWidth: 6 };
      case "large":
        return { width: 120, height: 120, strokeWidth: 8 };
    }
  };

  const { width, height, strokeWidth } = getSize();
  const radius = (width - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min(Math.max(value, 0), 100);
  const strokeDasharray = `${
    (percentage / 100) * circumference
  } ${circumference}`;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={width} height={height} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-200 dark:text-slate-700"
        />
        {/* Progress circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      {/* Centered percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`font-bold text-slate-900 dark:text-slate-100 ${
            size === "small"
              ? "text-xs"
              : size === "medium"
              ? "text-sm"
              : "text-lg"
          }`}
        >
          {percentage.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}

import { TrendChart } from "@/components/trend-chart";

const initialData = {
  Common: {
    "Timeliness & Responsiveness": [
      {
        cslType: "Common",
        revisedNumber: "CSL-01",
        performanceCategory: "Timeliness & Responsiveness",
        description: "Incident Restoration - P0",
        frequency: "Monthly",
        startDate: "CED",
        expected: "99.80%",
        minimum: "98.00%",
        "Jan'24": "100.00%",
        "Feb'24": "100.00%",
        "Mar'24": "100.00%",
        "Apr'24": "100.00%",
        "May'24": "100.00%",
        "Jun'24": "100.00%",
        "Jul'24": "100.00%",
        "Aug'24": "100.00%",
        "Sep'24": "100.00%",
        "Oct'24": "100.00%",
        "Nov'24": "100.00%",
        "Dec'24": "100.00%",
        "Jan'25": "100.00%",
        "Feb'25": "100.00%",
        "Mar'25": "100.00%",
        "Apr'25": "100.00%",
        "May'25": "100.00%",
        "Jun'25": "100.00%",
        "Jul'25": "0.00%",
      },
      {
        cslType: "Common",
        revisedNumber: "CSL-02",
        performanceCategory: "Timeliness & Responsiveness",
        description: "Incident Restoration - P1",
        frequency: "Monthly",
        startDate: "CED",
        expected: "98.00%",
        minimum: "95.00%",
        "Jan'24": "100.00%",
        "Feb'24": "100.00%",
        "Mar'24": "100.00%",
        "Apr'24": "100.00%",
        "May'24": "100.00%",
        "Jun'24": "100.00%",
        "Jul'24": "100.00%",
        "Aug'24": "100.00%",
        "Sep'24": "100.00%",
        "Oct'24": "100.00%",
        "Nov'24": "100.00%",
        "Dec'24": "100.00%",
        "Jan'25": "100.00%",
        "Feb'25": "100.00%",
        "Mar'25": "100.00%",
        "Apr'25": "100.00%",
        "May'25": "100.00%",
        "Jun'25": "100.00%",
        "Jul'25": "100.00%",
      },
      {
        cslType: "Common",
        revisedNumber: "CSL-03",
        performanceCategory: "Timeliness & Responsiveness",
        description: "Incident Resolution - P2",
        frequency: "Monthly",
        startDate: "CED",
        expected: "98.00%",
        minimum: "95.00%",
        "Jan'24": "98.62%",
        "Feb'24": "98.72%",
        "Mar'24": "99.07%",
        "Apr'24": "98.71%",
        "May'24": "98.35%",
        "Jun'24": "98.62%",
        "Jul'24": "98.60%",
        "Aug'24": "98.67%",
        "Sep'24": "98.76%",
        "Oct'24": "98.63%",
        "Nov'24": "98.08%",
        "Dec'24": "98.59%",
        "Jan'25": "99.14%",
        "Feb'25": "98.33%",
        "Mar'25": "100.00%",
        "Apr'25": "100.00%",
        "May'25": "98.43%",
        "Jun'25": "95.63%",
        "Jul'25": "98.34%",
      },
      {
        cslType: "Common",
        revisedNumber: "CSL-04",
        performanceCategory: "Timeliness & Responsiveness",
        description: "Incident Resolution - P3",
        frequency: "Monthly",
        startDate: "CED",
        expected: "95.00%",
        minimum: "92.00%",
        "Jan'24": "98.28%",
        "Feb'24": "98.67%",
        "Mar'24": "98.43%",
        "Apr'24": "98.53%",
        "May'24": "98.74%",
        "Jun'24": "97.40%",
        "Jul'24": "96.86%",
        "Aug'24": "98.01%",
        "Sep'24": "97.96%",
        "Oct'24": "97.21%",
        "Nov'24": "95.56%",
        "Dec'24": "96.33%",
        "Jan'25": "98.06%",
        "Feb'25": "96.29%",
        "Mar'25": "95.03%",
        "Apr'25": "96.49%",
        "May'25": "96.37%",
        "Jun'25": "96.83%",
        "Jul'25": "96.73%",
      },
      {
        cslType: "Common",
        revisedNumber: "CSL-05",
        performanceCategory: "Timeliness & Responsiveness",
        description: "Incident Resolution - P4",
        frequency: "Monthly",
        startDate: "CED",
        expected: "95.00%",
        minimum: "92.00%",
        "Jan'24": "99.47%",
        "Feb'24": "99.35%",
        "Mar'24": "99.44%",
        "Apr'24": "99.64%",
        "May'24": "99.39%",
        "Jun'24": "99.08%",
        "Jul'24": "98.95%",
        "Aug'24": "99.16%",
        "Sep'24": "99.10%",
        "Oct'24": "98.96%",
        "Nov'24": "98.87%",
        "Dec'24": "99.24%",
        "Jan'25": "99.46%",
        "Feb'25": "99.20%",
        "Mar'25": "99.30%",
        "Apr'25": "99.36%",
        "May'25": "99.42%",
        "Jun'25": "98.93%",
        "Jul'25": "99.11%",
      },
      {
        cslType: "Common",
        revisedNumber: "CSL-06",
        performanceCategory: "Timeliness & Responsiveness",
        description: "Mean Time to Restore (MTTR)",
        frequency: "Monthly",
        startDate: "CED + 3",
        expected: "90.00%",
        minimum: "85.00%",
        "Jan'24": "96.19%",
        "Feb'24": "95.82%",
        "Mar'24": "95.70%",
        "Apr'24": "95.41%",
        "May'24": "95.32%",
        "Jun'24": "95.22%",
        "Jul'24": "95.32%",
        "Aug'24": "95.43%",
        "Sep'24": "95.76%",
        "Oct'24": "95.65%",
        "Nov'24": "95.07%",
        "Dec'24": "94.77%",
        "Jan'25": "94.45%",
        "Feb'25": "95.57%",
        "Mar'25": "95.79%",
        "Apr'25": "95.70%",
        "May'25": "95.63%",
        "Jun'25": "95.43%",
        "Jul'25": "95.60%",
      },
      {
        cslType: "Common",
        revisedNumber: "CSL-07",
        performanceCategory: "Timeliness & Responsiveness",
        description: "Service Request Completion",
        frequency: "Monthly",
        startDate: "CED + 3",
        expected: "95.00%",
        minimum: "90.00%",
        "Jan'24": "99.00%",
        "Feb'24": "99.22%",
        "Mar'24": "99.14%",
        "Apr'24": "99.26%",
        "May'24": "99.00%",
        "Jun'24": "98.33%",
        "Jul'24": "98.03%",
        "Aug'24": "98.66%",
        "Sep'24": "98.76%",
        "Oct'24": "96.82%",
        "Nov'24": "98.69%",
        "Dec'24": "98.65%",
        "Jan'25": "99.08%",
        "Feb'25": "98.60%",
        "Mar'25": "98.72%",
        "Apr'25": "98.55%",
        "May'25": "98.85%",
        "Jun'25": "99.05%",
        "Jul'25": "99.12%",
      },
      {
        cslType: "Common",
        revisedNumber: "KPI-05",
        performanceCategory: "Timeliness & Responsiveness",
        description: "Changes delivered on time with documentation",
        frequency: "Monthly",
        startDate: "CED",
        expected: "95.00%",
        minimum: "90.00%",
        "Jan'24": "98.66%",
        "Feb'24": "99.64%",
        "Mar'24": "97.49%",
        "Apr'24": "99.28%",
        "May'24": "98.87%",
        "Jun'24": "97.98%",
        "Jul'24": "99.45%",
        "Aug'24": "99.08%",
        "Sep'24": "98.51%",
        "Oct'24": "98.35%",
        "Nov'24": "97.47%",
        "Dec'24": "97.35%",
        "Jan'25": "99.17%",
        "Feb'25": "98.80%",
        "Mar'25": "99.01%",
        "Apr'25": "97.88%",
        "May'25": "99.28%",
        "Jun'25": "98.39%",
        "Jul'25": "98.43%",
      },
      {
        cslType: "Common",
        revisedNumber: "KPI-10",
        performanceCategory: "Timeliness & Responsiveness",
        description:
          "Catalogue Procurement requests approved and delivered within agreed timescales",
        frequency: "Monthly",
        startDate: "CED + 3",
        expected: "95.00%",
        minimum: "90.00%",
        "Jan'24": "100.00%",
        "Feb'24": "100.00%",
        "Mar'24": "100.00%",
        "Apr'24": "100.00%",
        "May'24": "100.00%",
        "Jun'24": "100.00%",
        "Jul'24": "100.00%",
        "Aug'24": "100.00%",
        "Sep'24": "100.00%",
        "Oct'24": "100.00%",
        "Nov'24": "NA",
        "Dec'24": "NA",
        "Jan'25": "NA",
        "Feb'25": "NA",
        "Mar'25": "NA",
        "Apr'25": "NA",
        "May'25": "NA",
        "Jun'25": "NA",
        "Jul'25": "NA",
      },
    ],
    Quality: [
      {
        cslType: "Common",
        revisedNumber: "CSL-23",
        performanceCategory: "Quality",
        description: "Problem Resolution Time - Root Cause Identified",
        frequency: "Monthly",
        startDate: "CED",
        expected: "",
        minimum: "",
        "Jan'24": "100.00%",
        "Feb'24": "100.00%",
        "Mar'24": "100.00%",
        "Apr'24": "94.00%",
        "May'24": "100.00%",
        "Jun'24": "100.00%",
        "Jul'24": "100.00%",
        "Aug'24": "100.00%",
        "Sep'24": "100.00%",
        "Oct'24": "",
        "Nov'24": "",
        "Dec'24": "100.00%",
        "Jan'25": "100.00%",
        "Feb'25": "100.00%",
        "Mar'25": "100.00%",
        "Apr'25": "100.00%",
        "May'25": "100.00%",
        "Jun'25": "100.00%",
        "Jul'25": "100.00%",
      },
      {
        cslType: "Common",
        revisedNumber: "CSL-24",
        performanceCategory: "Quality",
        description: "Problem Resolution – Permanent Resolution applied",
        frequency: "Monthly",
        startDate: "CED + 2",
        expected: "95.00%",
        minimum: "90.00%",
        "Jan'24": "100.00%",
        "Feb'24": "100.00%",
        "Mar'24": "100.00%",
        "Apr'24": "100.00%",
        "May'24": "100.00%",
        "Jun'24": "100.00%",
        "Jul'24": "100.00%",
        "Aug'24": "100.00%",
        "Sep'24": "100.00%",
        "Oct'24": "100.00%",
        "Nov'24": "100.00%",
        "Dec'24": "100.00%",
        "Jan'25": "100.00%",
        "Feb'25": "100.00%",
        "Mar'25": "100.00%",
        "Apr'25": "100.00%",
        "May'25": "100.00%",
        "Jun'25": "100.00%",
        "Jul'25": "100.00%",
      },
      {
        cslType: "Common",
        revisedNumber: "CSL-25",
        performanceCategory: "Quality",
        description: "Change causing P0, P1 and P2 Incidents",
        frequency: "Monthly",
        startDate: "CED",
        expected: "0",
        minimum: "1",
        "Jan'24": "0",
        "Feb'24": "0",
        "Mar'24": "0",
        "Apr'24": "0",
        "May'24": "0",
        "Jun'24": "0",
        "Jul'24": "0",
        "Aug'24": "0",
        "Sep'24": "0",
        "Oct'24": "0",
        "Nov'24": "0",
        "Dec'24": "0",
        "Jan'25": "0",
        "Feb'25": "1",
        "Mar'25": "0",
        "Apr'25": "0",
        "May'25": "1",
        "Jun'25": "0",
        "Jul'25": "2",
      },
      {
        cslType: "Common",
        revisedNumber: "CSL-27",
        performanceCategory: "Quality",
        description: "Application Availability for GOLD applications",
        frequency: "Monthly",
        startDate: "CED",
        expected: "99.60%",
        minimum: "99.50%",
        "Jan'24": "100.00%",
        "Feb'24": "100.00%",
        "Mar'24": "100.00%",
        "Apr'24": "100.00%",
        "May'24": "100.00%",
        "Jun'24": "99.90%",
        "Jul'24": "100.00%",
        "Aug'24": "100.00%",
        "Sep'24": "100.00%",
        "Oct'24": "100.00%",
        "Nov'24": "100.00%",
        "Dec'24": "100.00%",
        "Jan'25": "100.00%",
        "Feb'25": "100.00%",
        "Mar'25": "100.00%",
        "Apr'25": "100.00%",
        "May'25": "99.82%",
        "Jun'25": "100.00%",
        "Jul'25": "98.75%",
      },
      {
        cslType: "Common",
        revisedNumber: "CSL-28",
        performanceCategory: "Quality",
        description: "Application Availability for Silver applications",
        frequency: "Monthly",
        startDate: "CED",
        expected: "99.50%",
        minimum: "99.00%",
        "Jan'24": "100.00%",
        "Feb'24": "99.86%",
        "Mar'24": "99.69%",
        "Apr'24": "99.76%",
        "May'24": "100.00%",
        "Jun'24": "99.82%",
        "Jul'24": "99.95%",
        "Aug'24": "100.00%",
        "Sep'24": "100.00%",
        "Oct'24": "100.00%",
        "Nov'24": "100.00%",
        "Dec'24": "100.00%",
        "Jan'25": "100.00%",
        "Feb'25": "100.00%",
        "Mar'25": "99.68%",
        "Apr'25": "100.00%",
        "May'25": "100.00%",
        "Jun'25": "100.00%",
        "Jul'25": "98.75%",
      },
      {
        cslType: "Common",
        revisedNumber: "CSL-59",
        performanceCategory: "Quality",
        description: "IT Deviations",
        frequency: "Monthly",
        startDate: "CED + 3",
        expected: "100.00%",
        minimum: "95.00%",
        "Jan'24": "100.00%",
        "Feb'24": "100.00%",
        "Mar'24": "100.00%",
        "Apr'24": "100.00%",
        "May'24": "100.00%",
        "Jun'24": "100.00%",
        "Jul'24": "100.00%",
        "Aug'24": "100.00%",
        "Sep'24": "100.00%",
        "Oct'24": "100.00%",
        "Nov'24": "100.00%",
        "Dec'24": "100.00%",
        "Jan'25": "100.00%",
        "Feb'25": "100.00%",
        "Mar'25": "100.00%",
        "Apr'25": "100.00%",
        "May'25": "100.00%",
        "Jun'25": "100.00%",
        "Jul'25": "100.00%",
      },
    ],
    "Customer Satisfaction": [
      {
        cslType: "Common",
        revisedNumber: "CSL-48",
        performanceCategory: "Customer Satisfaction",
        description: "Customer Satisfaction – Customer Stakeholders",
        frequency: "Monthly",
        startDate: "CED + 6",
        expected: "78",
        minimum: "75",
        "Jan'24": "82",
        "Feb'24": "81",
        "Mar'24": "84",
        "Apr'24": "82",
        "May'24": "84",
        "Jun'24": "84",
        "Jul'24": "82",
        "Aug'24": "84",
        "Sep'24": "86",
        "Oct'24": "85",
        "Nov'24": "85",
        "Dec'24": "86",
        "Jan'25": "88",
        "Feb'25": "86",
        "Mar'25": "87",
        "Apr'25": "89",
        "May'25": "89",
        "Jun'25": "88",
        "Jul'25": "87",
      },
      {
        cslType: "Common",
        revisedNumber: "CSL-49",
        performanceCategory: "Customer Satisfaction",
        description: "Customer Satisfaction - Transactional (NPS)",
        frequency: "Monthly",
        startDate: "CED + 6",
        expected: "78",
        minimum: "75",
        "Jan'24": "85",
        "Feb'24": "86",
        "Mar'24": "85",
        "Apr'24": "85",
        "May'24": "84",
        "Jun'24": "85",
        "Jul'24": "82",
        "Aug'24": "84",
        "Sep'24": "86",
        "Oct'24": "84",
        "Nov'24": "83",
        "Dec'24": "84",
        "Jan'25": "87",
        "Feb'25": "85",
        "Mar'25": "86",
        "Apr'25": "85",
        "May'25": "84",
        "Jun'25": "84",
        "Jul'25": "82",
      },
      {
        cslType: "Common",
        revisedNumber: "CSL-50",
        performanceCategory: "Customer Satisfaction",
        description: "End User Experience - Portal",
        frequency: "Monthly",
        startDate: "CED + 6",
        expected: "78",
        minimum: "75",
        "Jan'24": "85",
        "Feb'24": "85",
        "Mar'24": "83",
        "Apr'24": "83",
        "May'24": "83",
        "Jun'24": "83",
        "Jul'24": "81",
        "Aug'24": "83",
        "Sep'24": "84",
        "Oct'24": "83",
        "Nov'24": "81",
        "Dec'24": "83",
        "Jan'25": "86",
        "Feb'25": "84",
        "Mar'25": "84",
        "Apr'25": "83",
        "May'25": "83",
        "Jun'25": "84",
        "Jul'25": "80",
      },
    ],
    Compliance: [
      {
        cslType: "Common",
        revisedNumber: "CSL-51",
        performanceCategory: "Compliance",
        description: "License Compliance for EUC Estate",
        frequency: "Quarterly",
        startDate: "CED + 4",
        expected: "30 Days",
        minimum: "60 Days",
        "Jan'24": "Quarterly",
        "Feb'24": "Quarterly",
        "Mar'24": "",
        "Apr'24": "Quarterly",
        "May'24": "Quarterly",
        "Jun'24": "",
        "Jul'24": "Quarterly",
        "Aug'24": "Quarterly",
        "Sep'24": "",
        "Oct'24": "Quarterly",
        "Nov'24": "Quarterly",
        "Dec'24": "Quarterly",
        "Jan'25": "Quarterly",
        "Feb'25": "Quarterly",
        "Mar'25": "",
        "Apr'25": "Quarterly",
        "May'25": "Quarterly",
        "Jun'25": "Quarterly",
        "Jul'25": "Quarterly",
      },
      {
        cslType: "Common",
        revisedNumber: "CSL-80",
        performanceCategory: "Compliance",
        description: "Service Transition Tollgate Compliance",
        frequency: "Monthly",
        startDate: "CED + 3",
        expected: "95.00%",
        minimum: "90.00%",
        "Jan'24": "100.00%",
        "Feb'24": "100.00%",
        "Mar'24": "100.00%",
        "Apr'24": "100.00%",
        "May'24": "100.00%",
        "Jun'24": "100.00%",
        "Jul'24": "100.00%",
        "Aug'24": "100.00%",
        "Sep'24": "100.00%",
        "Oct'24": "100.00%",
        "Nov'24": "100.00%",
        "Dec'24": "100.00%",
        "Jan'25": "100.00%",
        "Feb'25": "100.00%",
        "Mar'25": "100.00%",
        "Apr'25": "100.00%",
        "May'25": "100.00%",
        "Jun'25": "100.00%",
        "Jul'25": "100.00%",
      },
    ],
    "Security & Resilience": [
      {
        cslType: "Common",
        revisedNumber: "CSL-53",
        performanceCategory: "Security & Resilience",
        description: "Disaster Recovery testing for Platinum Applications",
        frequency: "Quarterly",
        startDate: "CED",
        expected: "0",
        minimum: "1",
        "Jan'24": "Quarterly",
        "Feb'24": "Quarterly",
        "Mar'24": "0",
        "Apr'24": "Quarterly",
        "May'24": "Quarterly",
        "Jun'24": "0",
        "Jul'24": "Quarterly",
        "Aug'24": "Quarterly",
        "Sep'24": "1",
        "Oct'24": "Quarterly",
        "Nov'24": "Quarterly",
        "Dec'24": "0",
        "Jan'25": "Quarterly",
        "Feb'25": "Quarterly",
        "Mar'25": "0",
        "Apr'25": "Quarterly",
        "May'25": "Quarterly",
        "Jun'25": "0",
        "Jul'25": "Quarterly",
      },
      {
        cslType: "Common",
        revisedNumber: "CSL-55",
        performanceCategory: "Security & Resilience",
        description: "DR success",
        frequency: "Monthly",
        startDate: "CED",
        expected: "100.00%",
        minimum: "100.00%",
        "Jan'24": "100.00%",
        "Feb'24": "100.00%",
        "Mar'24": "100.00%",
        "Apr'24": "100.00%",
        "May'24": "100.00%",
        "Jun'24": "100.00%",
        "Jul'24": "100.00%",
        "Aug'24": "100.00%",
        "Sep'24": "100.00%",
        "Oct'24": "100.00%",
        "Nov'24": "100.00%",
        "Dec'24": "100.00%",
        "Jan'25": "100.00%",
        "Feb'25": "100.00%",
        "Mar'25": "100.00%",
        "Apr'25": "100.00%",
        "May'25": "100.00%",
        "Jun'25": "100.00%",
        "Jul'25": "100.00%",
      },
    ],
    "Automation & Innovation": [
      {
        cslType: "Common",
        revisedNumber: "CSL-60",
        performanceCategory: "Automation & Innovation",
        description: "Fully automated ticket closures no human intervention",
        frequency: "Monthly",
        startDate: "CED + 6",
        expected: "24.00%",
        minimum: "22.00%",
        "Jan'24": "51.06%",
        "Feb'24": "54.07%",
        "Mar'24": "70.75%",
        "Apr'24": "52.20%",
        "May'24": "49.54%",
        "Jun'24": "51.50%",
        "Jul'24": "52.14%",
        "Aug'24": "52.93%",
        "Sep'24": "52.95%",
        "Oct'24": "52.47%",
        "Nov'24": "52.51%",
        "Dec'24": "49.86%",
        "Jan'25": "49.55%",
        "Feb'25": "54.15%",
        "Mar'25": "53.58%",
        "Apr'25": "51.83%",
        "May'25": "53.93%",
        "Jun'25": "51.37%",
        "Jul'25": "49.23%",
      },
      {
        cslType: "Common",
        revisedNumber: "CSL-63",
        performanceCategory: "Automation & Innovation",
        description: "Innovation Quality",
        frequency: "Quarterly",
        startDate: "CED + 6",
        expected: "90.00%",
        minimum: "80.00%",
        "Jan'24": "Quarterly",
        "Feb'24": "Quarterly",
        "Mar'24": "100.00%",
        "Apr'24": "Quarterly",
        "May'24": "Quarterly",
        "Jun'24": "100.00%",
        "Jul'24": "Quarterly",
        "Aug'24": "Quarterly",
        "Sep'24": "100.00%",
        "Oct'24": "Quarterly",
        "Nov'24": "Quarterly",
        "Dec'24": "100.00%",
        "Jan'25": "Quarterly",
        "Feb'25": "Quarterly",
        "Mar'25": "100.00%",
        "Apr'25": "Quarterly",
        "May'25": "Quarterly",
        "Jun'25": "100.00%",
        "Jul'25": "Quarterly",
      },
    ],
    Governance: [
      {
        cslType: "Common",
        revisedNumber: "CSL-58",
        performanceCategory: "Governance",
        description: "Service Assurance & Quality Framework Compliance",
        frequency: "Monthly",
        startDate: "CED + 6",
        expected: "95.00%",
        minimum: "90.00%",
        "Jan'24": "97.98%",
        "Feb'24": "98.59%",
        "Mar'24": "98.57%",
        "Apr'24": "98.47%",
        "May'24": "96.33%",
        "Jun'24": "97.59%",
        "Jul'24": "97.51%",
        "Aug'24": "97.98%",
        "Sep'24": "97.75%",
        "Oct'24": "97.16%",
        "Nov'24": "97.74%",
        "Dec'24": "97.32%",
        "Jan'25": "97.87%",
        "Feb'25": "97.98%",
        "Mar'25": "96.44%",
        "Apr'25": "96.56%",
        "May'25": "97.63%",
        "Jun'25": "97.52%",
        "Jul'25": "97.51%",
      },
    ],
  },
  "COA 1": {
    "Timeliness & Responsiveness": [
      {
        cslType: "COA 1",
        revisedNumber: "CSL-08",
        performanceCategory: "Timeliness & Responsiveness",
        description: "Maximum Answer Time",
        frequency: "Monthly",
        startDate: "CED",
        expected: ">90%",
        minimum: ">85%",
        "Jan'24": "98.08%",
        "Feb'24": "98.43%",
        "Mar'24": "98.91%",
        "Apr'24": "98.24%",
        "May'24": "98.55%",
        "Jun'24": "96.35%",
        "Jul'24": "97.53%",
        "Aug'24": "98.58%",
        "Sep'24": "96.76%",
        "Oct'24": "97.98%",
        "Nov'24": "98.02%",
        "Dec'24": "97.61%",
        "Jan'25": "98.08%",
        "Feb'25": "97.55%",
        "Mar'25": "95.85%",
        "Apr'25": "97.27%",
        "May'25": "98.38%",
        "Jun'25": "97.67%",
        "Jul'25": "97.74%",
      },
      {
        cslType: "COA 1",
        revisedNumber: "CSL-09",
        performanceCategory: "Timeliness & Responsiveness",
        description: "First Contact Resolution Rate",
        frequency: "Monthly",
        startDate: "CED",
        expected: "0.49",
        minimum: "0.45",
        "Jan'24": "66.43%",
        "Feb'24": "59.33%",
        "Mar'24": "62.24%",
        "Apr'24": "64.94%",
        "May'24": "54.43%",
        "Jun'24": "54.94%",
        "Jul'24": "47.26%",
        "Aug'24": "55.98%",
        "Sep'24": "52.25%",
        "Oct'24": "52.15%",
        "Nov'24": "55.78%",
        "Dec'24": "52.92%",
        "Jan'25": "55.21%",
        "Feb'25": "61.00%",
        "Mar'25": "61.68%",
        "Apr'25": "60.90%",
        "May'25": "51.94%",
        "Jun'25": "53.94%",
        "Jul'25": "45.29%",
      },
    ],
    Quality: [
      {
        cslType: "COA 1",
        revisedNumber: "CSL-10",
        performanceCategory: "Quality",
        description: "Remote Service Desk Availability",
        frequency: "Monthly",
        startDate: "CED",
        expected: "0.999",
        minimum: "0.99",
        "Jan'24": "100.00%",
        "Feb'24": "100.00%",
        "Mar'24": "100.00%",
        "Apr'24": "100.00%",
        "May'24": "100.00%",
        "Jun'24": "100.00%",
        "Jul'24": "100.00%",
        "Aug'24": "100.00%",
        "Sep'24": "100.00%",
        "Oct'24": "100.00%",
        "Nov'24": "100.00%",
        "Dec'24": "100.00%",
        "Jan'25": "100.00%",
        "Feb'25": "100.00%",
        "Mar'25": "100.00%",
        "Apr'25": "100.00%",
        "May'25": "100.00%",
        "Jun'25": "100.00%",
        "Jul'25": "100.00%",
      },
    ],
  },
  "COA 2": {
    "Business Performance": [
      {
        cslType: "COA 2",
        revisedNumber: "CSL-12",
        performanceCategory: "Business Performance",
        description: "Incident Resolution: P3: Month end",
        frequency: "Monthly",
        startDate: "CED + 3",
        expected: "85.00%",
        minimum: "80.00%",
        "Jan'24": "97.22%",
        "Feb'24": "97.22%",
        "Mar'24": "97.22%",
        "Apr'24": "97.22%",
        "May'24": "97.22%",
        "Jun'24": "97.22%",
        "Jul'24": "97.22%",
        "Aug'24": "97.22%",
        "Sep'24": "97.22%",
        "Oct'24": "97.22%",
        "Nov'24": "97.22%",
        "Dec'24": "97.22%",
        "Jan'25": "97.22%",
        "Feb'25": "97.22%",
        "Mar'25": "97.22%",
        "Apr'25": "97.22%",
        "May'25": "97.22%",
        "Jun'25": "97.22%",
        "Jul'25": "97.22%",
      },
      {
        cslType: "COA 2",
        revisedNumber: "CSL-13",
        performanceCategory: "Business Performance",
        description: "Incident Resolution: P4: Month end",
        frequency: "Monthly",
        startDate: "CED + 3",
        expected: "85.00%",
        minimum: "80.00%",
        "Jan'24": "100.00%",
        "Feb'24": "100.00%",
        "Mar'24": "100.00%",
        "Apr'24": "100.00%",
        "May'24": "100.00%",
        "Jun'24": "100.00%",
        "Jul'24": "100.00%",
        "Aug'24": "100.00%",
        "Sep'24": "100.00%",
        "Oct'24": "100.00%",
        "Nov'24": "100.00%",
        "Dec'24": "100.00%",
        "Jan'25": "100.00%",
        "Feb'25": "100.00%",
        "Mar'25": "100.00%",
        "Apr'25": "100.00%",
        "May'25": "100.00%",
        "Jun'25": "100.00%",
        "Jul'25": "100.00%",
      },
    ],
    "Timeliness & Responsiveness": [
      {
        cslType: "COA 2",
        revisedNumber: "CSL-15",
        performanceCategory: "Timeliness & Responsiveness",
        description: "Transaction Response time for Platinum applications",
        frequency: "Monthly",
        startDate: "CED",
        expected: "X >= 95% and Y >= 95%",
        minimum: "X >= 90% and Y >= 90%",
        "Jan'24": "X=100% and Y=100%",
        "Feb'24": "X=100% and Y=100%",
        "Mar'24": "X=100% and Y=100%",
        "Apr'24": "X=100% and Y=100%",
        "May'24": "X=100% and Y=100%",
        "Jun'24": "X=100% and Y=100%",
        "Jul'24": "X=100% and Y=100%",
        "Aug'24": "X=100% and Y=100%",
        "Sep'24": "X=100% and Y=100%",
        "Oct'24": "X=100% and Y=100%",
        "Nov'24": "X=100% and Y=100%",
        "Dec'24": "X=100% and Y=100%",
        "Jan'25": "X=100% and Y=100%",
        "Feb'25": "X=100% and Y=100%",
        "Mar'25": "X=100% and Y=100%",
        "Apr'25": "X=100% and Y=100%",
        "May'25": "X=100% and Y=100%",
        "Jun'25": "X=100% and Y=100%",
        "Jul'25": "X=100% and Y=100%",
      },
    ],
    Quality: [
      {
        cslType: "COA 2",
        revisedNumber: "CSL-26",
        performanceCategory: "Quality",
        description: "Application Availability for Platinum Applications",
        frequency: "Monthly",
        startDate: "CED",
        expected: "99.90%",
        minimum: "99.80%",
        "Jan'24": "98.75%",
        "Feb'24": "98.75%",
        "Mar'24": "98.75%",
        "Apr'24": "98.75%",
        "May'24": "98.75%",
        "Jun'24": "98.75%",
        "Jul'24": "98.75%",
        "Aug'24": "98.75%",
        "Sep'24": "98.75%",
        "Oct'24": "98.75%",
        "Nov'24": "98.75%",
        "Dec'24": "98.75%",
        "Jan'25": "98.75%",
        "Feb'25": "98.75%",
        "Mar'25": "98.75%",
        "Apr'25": "98.75%",
        "May'25": "98.75%",
        "Jun'25": "98.75%",
        "Jul'25": "98.75%",
      },
    ],
  },
  "COA 3": {
    "Timeliness & Responsiveness": [
      {
        cslType: "COA 3",
        revisedNumber: "CSL-17",
        performanceCategory: "Timeliness & Responsiveness",
        description: "Backup Success",
        frequency: "Monthly",
        startDate: "CED",
        expected: "99.90%",
        minimum: "99.0%",
        "Jan'24": "99.94%",
        "Feb'24": "99.91%",
        "Mar'24": "99.94%",
        "Apr'24": "99.91%",
        "May'24": "99.90%",
        "Jun'24": "99.91%",
        "Jul'24": "99.90%",
        "Aug'24": "99.90%",
        "Sep'24": "99.90%",
        "Oct'24": "99.92%",
        "Nov'24": "99.90%",
        "Dec'24": "99.93%",
        "Jan'25": "99.94%",
        "Feb'25": "99.91%",
        "Mar'25": "99.90%",
        "Apr'25": "99.91%",
        "May'25": "99.94%",
        "Jun'25": "99.93%",
        "Jul'25": "99.92%",
      },
      {
        cslType: "COA 3",
        revisedNumber: "CSL-18",
        performanceCategory: "Timeliness & Responsiveness",
        description: "Data Restore Success",
        frequency: "Monthly",
        startDate: "CED",
        expected: "100%",
        minimum: "99%",
        "Jan'24": "100.00%",
        "Feb'24": "100.00%",
        "Mar'24": "100.00%",
        "Apr'24": "100.00%",
        "May'24": "100.00%",
        "Jun'24": "100.00%",
        "Jul'24": "100.00%",
        "Aug'24": "100.00%",
        "Sep'24": "100.00%",
        "Oct'24": "100.00%",
        "Nov'24": "100.00%",
        "Dec'24": "100.00%",
        "Jan'25": "100.00%",
        "Feb'25": "100.00%",
        "Mar'25": "100.00%",
        "Apr'25": "100.00%",
        "May'25": "100.00%",
        "Jun'25": "100.00%",
        "Jul'25": "100.00%",
      },
    ],
    Quality: [
      {
        cslType: "COA 3",
        revisedNumber: "CSL-40",
        performanceCategory: "Quality",
        description: "Overall Server availability",
        frequency: "Monthly",
        startDate: "CED",
        expected: "99.90%",
        minimum: "99.50%",
        "Jan'24": "99.91%",
        "Feb'24": "99.96%",
        "Mar'24": "99.92%",
        "Apr'24": "99.94%",
        "May'24": "99.91%",
        "Jun'24": "99.91%",
        "Jul'24": "99.90%",
        "Aug'24": "99.92%",
        "Sep'24": "99.91%",
        "Oct'24": "99.90%",
        "Nov'24": "99.91%",
        "Dec'24": "99.92%",
        "Jan'25": "99.91%",
        "Feb'25": "99.93%",
        "Mar'25": "99.92%",
        "Apr'25": "99.92%",
        "May'25": "99.93%",
        "Jun'25": "99.92%",
        "Jul'25": "99.91%",
      },
    ],
  },
};

const parseExcelData = async (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split("\n").filter((line) => line.trim());

        if (lines.length === 0) {
          throw new Error("Empty file");
        }

        const headers = lines[0].split("\t");
        const expectedHeaders = [
          "CSL Type",
          "Revised Number",
          "Performance Category",
          "Description",
          "Frequency",
          "Start Date",
          "Expected",
          "Minimum",
        ];

        const hasValidHeaders = expectedHeaders.every((header) =>
          headers.includes(header)
        );
        if (!hasValidHeaders) {
          throw new Error(
            "Invalid Excel format. Please ensure the file has the correct headers."
          );
        }

        const parsedData: any = {};

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split("\t");
          if (values.length < headers.length) continue;

          const row: any = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || "";
          });

          const cslType = row["CSL Type"];
          const performanceCategory = row["Performance Category"];

          if (!parsedData[cslType]) {
            parsedData[cslType] = {};
          }

          if (!parsedData[cslType][performanceCategory]) {
            parsedData[cslType][performanceCategory] = [];
          }

          parsedData[cslType][performanceCategory].push(row);
        }

        resolve(parsedData);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
};

const exportToExcel = (data: any) => {
  // Get all possible month columns from the data
  const allMonths = new Set<string>();

  // Iterate through all data to find all month columns
  Object.keys(data).forEach((cslType) => {
    Object.keys(data[cslType]).forEach((category) => {
      data[cslType][category].forEach((item: any) => {
        Object.keys(item).forEach((key) => {
          if (
            key.match(
              /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)'\d{2}$/
            )
          ) {
            allMonths.add(key);
          }
        });
      });
    });
  });

  // Sort months chronologically
  const sortedMonths = Array.from(allMonths).sort((a, b) => {
    const yearA = parseInt(a.slice(-2));
    const yearB = parseInt(b.slice(-2));
    if (yearA !== yearB) return yearA - yearB;

    const monthOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthA = a.slice(0, 3);
    const monthB = b.slice(0, 3);
    return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
  });

  const headers = [
    "CSL Type",
    "Revised Number",
    "Performance Category",
    "Description",
    "Frequency",
    "Start Date",
    "Expected",
    "Minimum",
    ...sortedMonths,
  ];

  let csvContent = headers.join(",") + "\n";

  Object.keys(data).forEach((cslType) => {
    Object.keys(data[cslType]).forEach((category) => {
      data[cslType][category].forEach((item: any) => {
        const row = headers
          .map((header) => {
            let value = "";
            if (header === "CSL Type") {
              value = item.cslType || cslType;
            } else if (header === "Performance Category") {
              value = item.performanceCategory || category;
            } else {
              value = item[header] || "";
            }
            // Escape commas and quotes in CSV
            if (
              typeof value === "string" &&
              (value.includes(",") || value.includes('"'))
            ) {
              value = `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
          .join(",");
        csvContent += row + "\n";
      });
    });
  });

  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `service-level-dashboard-data-${
    new Date().toISOString().split("T")[0]
  }.csv`;
  link.click();
  URL.revokeObjectURL(url);

  // Show sonner toast message
  toast.success("Data exported successfully!", {
    description: `Downloaded service-level-dashboard-data-${
      new Date().toISOString().split("T")[0]
    }.csv`,
    duration: 3000,
  });
};

export function ServiceLevelDashboard() {
  const [selectedMonth, setSelectedMonth] = useState("Jul'25");
  const [dashboardData, setDashboardData] = useState(initialData);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [currentView, setCurrentView] = useState<"dashboard" | "config">(
    "dashboard"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const months = [
    "Jan'24",
    "Feb'24",
    "Mar'24",
    "Apr'24",
    "May'24",
    "Jun'24",
    "Jul'24",
    "Aug'24",
    "Sep'24",
    "Oct'24",
    "Nov'24",
    "Dec'24",
    "Jan'25",
    "Feb'25",
    "Mar'25",
    "Apr'25",
    "May'25",
    "Jun'25",
    "Jul'25",
  ];

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const parsedData = await parseExcelData(file);
        setDashboardData(parsedData);
        setNotification({
          type: "success",
          message: "Excel file imported successfully!",
        });
        setTimeout(() => setNotification(null), 5000);
      } catch (error) {
        console.error("Error parsing Excel file:", error);
        setNotification({
          type: "error",
          message: `Import failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        });
        setTimeout(() => setNotification(null), 5000);
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const exportData = () => {
    try {
      exportToExcel(dashboardData);
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("Export failed. Please try again.");
    }
  };

  const getSortedCSLTypes = (data: any) => {
    const types = Object.keys(data);
    return types.sort((a, b) => {
      if (a === "Common") return -1;
      if (b === "Common") return 1;

      const aMatch = a.match(/COA (\d+)/);
      const bMatch = b.match(/COA (\d+)/);

      if (aMatch && bMatch) {
        return Number.parseInt(aMatch[1]) - Number.parseInt(bMatch[1]);
      }

      return a.localeCompare(b);
    });
  };

  const cslTypes = getSortedCSLTypes(dashboardData);

  if (currentView === "config") {
    return (
      <ConfigurationPage
        data={dashboardData}
        onDataUpdate={setDashboardData}
        onBack={() => setCurrentView("dashboard")}
        months={months}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6 space-y-6">
        {/* Enhanced Notification Banner */}
        {notification && (
          <div
            className={`fixed top-4 right-4 z-50 p-6 rounded-2xl shadow-2xl border-2 backdrop-blur-md transition-all duration-500 transform ${
              notification.type === "success"
                ? "bg-green-50/90 text-green-800 border-green-200 shadow-green-100"
                : "bg-red-50/90 text-red-800 border-red-200 shadow-red-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${
                  notification.type === "success"
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                {notification.type === "success" ? (
                  <svg
                    className="h-5 w-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>
              <span className="font-semibold">{notification.message}</span>
            </div>
          </div>
        )}

        {/* Enhanced Header with Better Visual Hierarchy */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/10"></div>

          <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 p-8">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold text-white drop-shadow-lg">
                Service Level Management
              </h1>
              <p className="text-xl text-blue-100 font-light">
                Real-time Performance Analytics & Insights
              </p>
              
            </div>

            {/* Enhanced Controls Section */}
            <div className="flex flex-wrap gap-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30"></div>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="relative w-40 h-12 bg-transparent border-white/30 text-white hover:border-white/50 transition-all duration-300 focus:ring-0 focus:ring-offset-0 focus:border-white/70 [&>span]:text-white [&>svg]:text-white/70 hover:[&>svg]:text-white shadow-lg">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <SelectValue placeholder="Select Month" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-md border-gray-200/50 shadow-2xl rounded-xl min-w-[200px]">
                    <div className="p-2">
                      <div className="text-xs font-medium text-gray-500 px-2 pb-2 border-b border-gray-200/50">
                        Select Month & Year
                      </div>
                      <div className="mt-2 space-y-1">
                        {months.map((month) => (
                          <SelectItem
                            key={month}
                            value={month}
                            className="hover:bg-blue-50 focus:bg-blue-100 rounded-lg transition-colors duration-200 cursor-pointer px-3 py-2 text-sm font-medium"
                          >
                            <div className="flex items-center justify-between w-full">
                              <span>{month}</span>
                              {selectedMonth === month && (
                                <svg
                                  className="h-4 w-4 text-blue-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </div>
                    </div>
                  </SelectContent>
                </Select>
              </div>

              <EnhancedButton
                onClick={() => fileInputRef.current?.click()}
                icon={<Upload />}
                variant="secondary"
              >
                Import Excel
              </EnhancedButton>

              <EnhancedButton
                onClick={exportData}
                icon={<Download />}
                variant="secondary"
              >
                Export Data
              </EnhancedButton>

              <EnhancedButton
                onClick={() => setCurrentView("config")}
                icon={<Settings />}
                variant="secondary"
              >
                Configuration
              </EnhancedButton>

              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Main Dashboard with Better Cards */}
        <div className="relative">
          <Tabs defaultValue={cslTypes[0]} className="space-y-6">
            <TabsList className="grid w-full grid-cols-1 lg:grid-cols-4 h-auto gap-3 bg-white/80 dark:bg-slate-800/80 p-2 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200/50">
              {cslTypes.map((cslType) => (
                <TabsTrigger
                  key={cslType}
                  value={cslType}
                  className="relative group text-sm font-semibold py-4 px-6 rounded-xl transition-all duration-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-blue-50 dark:hover:bg-slate-700"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center gap-2">
                    <FileSpreadsheet />
                    {cslType}
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {cslTypes.map((cslType) => (
              <TabsContent key={cslType} value={cslType} className="space-y-6">
                <CSLTypeContent
                  data={dashboardData[cslType]}
                  selectedMonth={selectedMonth}
                  cslType={cslType}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Enhanced Button Component
function EnhancedButton({
  onClick,
  children,
  icon,
  variant = "secondary",
}: {
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const baseClasses =
    "relative group overflow-hidden rounded-xl p-3 px-6 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg";
  const variantClasses =
    variant === "primary"
      ? "bg-white text-blue-600 hover:bg-blue-50 shadow-white/20"
      : "bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur-sm";

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-center gap-2">
        {icon}
        {children}
      </div>
    </button>
  );
}

function CSLTypeContent({
  data,
  selectedMonth,
  cslType,
}: {
  data: any;
  selectedMonth: string;
  cslType: string;
}) {
  if (!data) return <div>No data available</div>;

  const performanceCategories = Object.keys(data);

  return (
    <div className="space-y-6">
      <Tabs defaultValue={performanceCategories[0]} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 h-auto gap-2 bg-white/80 dark:bg-slate-700/80 p-2 rounded-xl shadow-md backdrop-blur-sm">
          {performanceCategories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="text-xs font-medium px-3 py-3 rounded-lg transition-all duration-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-blue-50 dark:hover:bg-slate-600"
            >
              {category.replace("&", "&")}
            </TabsTrigger>
          ))}
        </TabsList>

        {performanceCategories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-6">
            <PerformanceCategoryContent
              data={data[category]}
              selectedMonth={selectedMonth}
              category={category}
              cslType={cslType}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function PerformanceCategoryContent({
  data,
  selectedMonth,
  category,
  cslType,
}: {
  data: any[];
  selectedMonth: string;
  category: string;
  cslType: string;
}) {
  if (!data || data.length === 0)
    return <div>No data available for this category</div>;

  const getPerformanceLevel = (
    actual: number,
    expected: number,
    minimum: number
  ) => {
    if (actual >= expected) return "excellent";
    if (actual >= minimum) return "good";
    return "poor";
  };

  const calculateCategoryAverage = () => {
    const validMetrics = data.filter(
      (item) =>
        item[selectedMonth] &&
        !isNaN(Number.parseFloat(item[selectedMonth].replace("%", "")))
    );

    if (validMetrics.length === 0) return 0;

    const sum = validMetrics.reduce((acc, item) => {
      const value = Number.parseFloat(item[selectedMonth].replace("%", ""));
      return acc + value;
    }, 0);

    return sum / validMetrics.length;
  };

  const categoryAverage = calculateCategoryAverage();

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/10"></div>

        <Card className="relative bg-transparent border-none shadow-none">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-white drop-shadow-lg">
              {category} - {cslType}
            </CardTitle>
            <CardDescription className="text-blue-100">
              Performance overview for {selectedMonth}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              {/* Total Metrics */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white/15 rounded-xl backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20"></div>
                <div className="relative p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {data.length}
                  </div>
                  <div className="text-sm text-blue-100">Total Metrics</div>
                </div>
              </div>

              {/* Average Performance */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white/15 rounded-xl backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20"></div>
                <div className="relative p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {categoryAverage.toFixed(1)}%
                  </div>
                  <div className="text-sm text-blue-100">
                    Average Performance
                  </div>
                </div>
              </div>

              {/* Performance Gauge */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white/15 rounded-xl backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20"></div>
                <div className="relative p-4 flex justify-center items-center">
                  <div style={{ color: 'white' }} className="[&_*]:!text-white">
                    <PerformanceGauge
                      value={categoryAverage}
                      expected={95}
                      minimum={90}
                      size="small"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-blue-100">
                    {
                      data.filter((item) => {
                        const val =
                          Number.parseFloat(
                            item[selectedMonth]?.replace("%", "") || "0"
                          ) || 0;
                        const exp =
                          Number.parseFloat(
                            item.expected?.replace("%", "") || "0"
                          ) || 0;
                        return val >= exp;
                      }).length
                    }{" "}
                    Excellent
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span className="text-blue-100">
                    {
                      data.filter((item) => {
                        const val =
                          Number.parseFloat(
                            item[selectedMonth]?.replace("%", "") || "0"
                          ) || 0;
                        const exp =
                          Number.parseFloat(
                            item.expected?.replace("%", "") || "0"
                          ) || 0;
                        const min =
                          Number.parseFloat(
                            item.minimum?.replace("%", "") || "0"
                          ) || 0;
                        return val >= min && val < exp;
                      }).length
                    }{" "}
                    Good
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-blue-100">
                    {
                      data.filter((item) => {
                        const val =
                          Number.parseFloat(
                            item[selectedMonth]?.replace("%", "") || "0"
                          ) || 0;
                        const min =
                          Number.parseFloat(
                            item.minimum?.replace("%", "") || "0"
                          ) || 0;
                        return val < min;
                      }).length
                    }{" "}
                    Below Target
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Metrics Grid with Updated Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((item, index) => {
          const currentValue =
            Number.parseFloat(item[selectedMonth]?.replace("%", "") || "0") ||
            0;
          const expected =
            Number.parseFloat(item.expected?.replace("%", "") || "0") || 0;
          const minimum =
            Number.parseFloat(item.minimum?.replace("%", "") || "0") || 0;
          const performanceLevel = getPerformanceLevel(
            currentValue,
            expected,
            minimum
          );

          const monthlyData: any = {};
          const months = [
            "Jan'24",
            "Feb'24",
            "Mar'24",
            "Apr'24",
            "May'24",
            "Jun'24",
            "Jul'24",
            "Aug'24",
            "Sep'24",
            "Oct'24",
            "Nov'24",
            "Dec'24",
            "Jan'25",
            "Feb'25",
            "Mar'25",
            "Apr'25",
            "May'25",
            "Jun'25",
            "Jul'25",
          ];
          months.forEach((month) => {
            if (item[month]) {
              monthlyData[month] = item[month];
            }
          });

          // Get performance status
          const getPerformanceStatus = () => {
            if (currentValue >= expected)
              return {
                status: "excellent",
                color: "text-green-600",
                bg: "bg-green-50",
              };
            if (currentValue >= minimum)
              return {
                status: "good",
                color: "text-amber-600",
                bg: "bg-amber-50",
              };
            return {
              status: "needs improvement",
              color: "text-red-600",
              bg: "bg-red-50",
            };
          };

          // Get trend direction
          const getTrendDirection = () => {
            const months = Object.keys(monthlyData);
            const currentIndex = months.indexOf(selectedMonth);
            if (currentIndex <= 0) return null;

            const previousMonth = months[currentIndex - 1];
            const currentValue =
              Number.parseFloat(monthlyData[selectedMonth]) || 0;
            const previousValue =
              Number.parseFloat(monthlyData[previousMonth]) || 0;

            if (currentValue > previousValue) return "up";
            if (currentValue < previousValue) return "down";
            return "stable";
          };

          const { status, color, bg } = getPerformanceStatus();
          const trendDirection = getTrendDirection();

          return (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-700 rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]"></div>

              <Card className="relative bg-transparent border-none shadow-none">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-tight">
                        {item.description}
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {item.revisedNumber}
                        </span>
                        <span>{item.frequency}</span>
                      </CardDescription>
                    </div>

                    {/* Gauge positioned on the right */}
                    <div className="relative ml-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full blur-xl"></div>
                        <PerformanceGauge
                          value={currentValue}
                          expected={expected}
                          minimum={minimum}
                          size="medium"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Performance Status with Trend after it */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${color} ${bg} border border-current border-opacity-20`}
                    >
                      {status.toUpperCase()}
                    </div>
                    {trendDirection && (
                      <div className="flex items-center">
                        {trendDirection === "up" && (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        )}
                        {trendDirection === "down" && (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        {trendDirection === "stable" && (
                          <Minus className="h-3 w-3 text-slate-500" />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center text-xs">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-slate-100 dark:bg-slate-700 rounded-lg transition-all duration-300 group-hover:bg-slate-200 dark:group-hover:bg-slate-600"></div>
                      <div className="relative p-3">
                        <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                          {currentValue.toFixed(2)}%
                        </div>
                        <div className="text-slate-500 dark:text-slate-400 text-xs">
                          Actual
                        </div>
                      </div>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-green-50 dark:bg-green-900/30 rounded-lg transition-all duration-300 group-hover:bg-green-100 dark:group-hover:bg-green-900/50"></div>
                      <div className="relative p-3">
                        <div className="font-bold text-green-700 dark:text-green-300 text-sm">
                          {expected.toFixed(2)}%
                        </div>
                        <div className="text-green-600 dark:text-green-400 text-xs">
                          Expected
                        </div>
                      </div>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-orange-50 dark:bg-orange-900/30 rounded-lg transition-all duration-300 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/50"></div>
                      <div className="relative p-3">
                        <div className="font-bold text-orange-700 dark:text-orange-300 text-sm">
                          {minimum.toFixed(2)}%
                        </div>
                        <div className="text-orange-600 dark:text-orange-400 text-xs">
                          Minimum
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Enhanced Trend Analysis */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700"></div>

        <Card className="relative bg-transparent border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Performance Trends - {category}
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Monthly performance trends for all metrics in this category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute inset-0 bg-white/50 dark:bg-slate-700/50 rounded-2xl"></div>
              <div className="relative p-6">
                <TrendChart data={data} selectedMonth={selectedMonth} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ConfigurationPage({
  data,
  onDataUpdate,
  onBack,
  months,
}: {
  data: any;
  onDataUpdate: (data: any) => void;
  onBack: () => void;
  months: string[];
}): ReactElement {
  const [selectedCSLType, setSelectedCSLType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [editingData, setEditingData] = useState<any[]>([]);

  const getSortedCSLTypes = (data: any) => {
    const types = Object.keys(data);
    return types.sort((a, b) => {
      if (a === "Common") return -1;
      if (b === "Common") return 1;

      const aMatch = a.match(/COA (\d+)/);
      const bMatch = b.match(/COA (\d+)/);

      if (aMatch && bMatch) {
        return Number.parseInt(aMatch[1]) - Number.parseInt(bMatch[1]);
      }

      return a.localeCompare(b);
    });
  };

  const cslTypes = getSortedCSLTypes(data);
  const categories = selectedCSLType
    ? Object.keys(data[selectedCSLType] || {})
    : [];

  const loadData = () => {
    if (
      selectedCSLType &&
      selectedCategory &&
      data[selectedCSLType]?.[selectedCategory]
    ) {
      setEditingData([...data[selectedCSLType][selectedCategory]]);
    } else {
      setEditingData([]);
    }
  };

  const saveData = () => {
    if (selectedCSLType && selectedCategory) {
      const updatedData = { ...data };
      updatedData[selectedCSLType][selectedCategory] = editingData;
      onDataUpdate(updatedData);
      toast.success("Data saved successfully!");
    }
  };

  const updateValue = (index: number, field: string, value: string) => {
    const updated = [...editingData];
    updated[index] = { ...updated[index], [field]: value };
    setEditingData(updated);
  };

  useEffect(() => {
    loadData();
  }, [selectedCSLType, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6 space-y-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/10"></div>

          <div className="relative flex justify-between items-center p-8">
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Configuration
              </h1>
              <p className="text-lg text-blue-100 font-light mt-2">
                Manage your dashboard data settings
              </p>
            </div>
            <EnhancedButton onClick={onBack} variant="secondary">
              ← Back to Dashboard
            </EnhancedButton>
          </div>
        </div>

        {/* Enhanced Selection Controls */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700"></div>

          <Card className="relative bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Select Data to Edit
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Choose the CSL Type, Performance Category, Month and Year to
                edit data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <Label
                    htmlFor="csl-type"
                    className="text-slate-700 dark:text-slate-300 font-medium"
                  >
                    CSL Type
                  </Label>
                  <Select
                    value={selectedCSLType}
                    onValueChange={setSelectedCSLType}
                  >
                    <SelectTrigger className="mt-2 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                      <SelectValue placeholder="Select CSL Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {cslTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="category"
                    className="text-slate-700 dark:text-slate-300 font-medium"
                  >
                    Performance Category
                  </Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                    disabled={!selectedCSLType}
                  >
                    <SelectTrigger className="mt-2 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="month"
                    className="text-slate-700 dark:text-slate-300 font-medium"
                  >
                    Month
                  </Label>
                  <Select
                    value={selectedMonth}
                    onValueChange={setSelectedMonth}
                  >
                    <SelectTrigger className="mt-2 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                      <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    onClick={saveData}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Data Editing */}
        {editingData.length > 0 && (
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700"></div>

            <Card className="relative bg-transparent border-none shadow-none">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Edit Data - {selectedCSLType} / {selectedCategory}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Modify the values below and click Save to update
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {editingData.map((item, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-700 shadow-lg border border-slate-200 dark:border-slate-600"
                    >
                      <div className="p-6 space-y-4">
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">
                          {item.description}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label
                              htmlFor={`expected-${index}`}
                              className="text-slate-700 dark:text-slate-300"
                            >
                              Expected
                            </Label>
                            <Input
                              id={`expected-${index}`}
                              value={item.expected || ""}
                              onChange={(e) =>
                                updateValue(index, "expected", e.target.value)
                              }
                              className="mt-1 bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500"
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor={`minimum-${index}`}
                              className="text-slate-700 dark:text-slate-300"
                            >
                              Minimum
                            </Label>
                            <Input
                              id={`minimum-${index}`}
                              value={item.minimum || ""}
                              onChange={(e) =>
                                updateValue(index, "minimum", e.target.value)
                              }
                              className="mt-1 bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500"
                            />
                          </div>
                          {selectedMonth && (
                            <div>
                              <Label
                                htmlFor={`current-${index}`}
                                className="text-slate-700 dark:text-slate-300"
                              >
                                {selectedMonth} Value
                              </Label>
                              <Input
                                id={`current-${index}`}
                                value={item[selectedMonth] || ""}
                                onChange={(e) =>
                                  updateValue(
                                    index,
                                    selectedMonth,
                                    e.target.value
                                  )
                                }
                                className="mt-1 bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500"
                              />
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <Label className="text-slate-500 dark:text-slate-400">
                              Revised Number
                            </Label>
                            <div className="text-slate-700 dark:text-slate-300 mt-1">
                              {item.revisedNumber}
                            </div>
                          </div>
                          <div>
                            <Label className="text-slate-500 dark:text-slate-400">
                              Frequency
                            </Label>
                            <div className="text-slate-700 dark:text-slate-300 mt-1">
                              {item.frequency}
                            </div>
                          </div>
                          <div>
                            <Label className="text-slate-500 dark:text-slate-400">
                              Start Date
                            </Label>
                            <div className="text-slate-700 dark:text-slate-300 mt-1">
                              {item.startDate}
                            </div>
                          </div>
                          <div>
                            <Label className="text-slate-500 dark:text-slate-400">
                              CSL Type
                            </Label>
                            <div className="text-slate-700 dark:text-slate-300 mt-1">
                              {item.cslType}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedCSLType && selectedCategory && editingData.length === 0 && (
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700"></div>

            <Card className="relative bg-transparent border-none shadow-none">
              <CardContent className="text-center py-12">
                <p className="text-slate-500 dark:text-slate-400 text-lg">
                  No data found for the selected combination.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
