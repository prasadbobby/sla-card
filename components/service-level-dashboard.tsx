"use client"

import type React from "react"

import type { ReactElement } from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Upload = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
)

const Download = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    />
  </svg>
)

const FileSpreadsheet = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

import { MetricCard } from "@/components/metric-card"
import { PerformanceGauge } from "@/components/performance-gauge"
import { TrendChart } from "@/components/trend-chart"

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
        description: "Catalogue Procurement requests approved and delivered within agreed timescales",
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
}

const parseExcelData = async (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const lines = text.split("\n").filter((line) => line.trim())

        if (lines.length === 0) {
          throw new Error("Empty file")
        }

        // Parse header
        const headers = lines[0].split("\t")
        const expectedHeaders = [
          "CSL Type",
          "Revised Number",
          "Performance Category",
          "Description",
          "Frequency",
          "Start Date",
          "Expected",
          "Minimum",
        ]

        // Validate headers
        const hasValidHeaders = expectedHeaders.every((header) => headers.includes(header))
        if (!hasValidHeaders) {
          throw new Error("Invalid Excel format. Please ensure the file has the correct headers.")
        }

        const parsedData: any = {}

        // Parse data rows
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split("\t")
          if (values.length < headers.length) continue

          const row: any = {}
          headers.forEach((header, index) => {
            row[header] = values[index] || ""
          })

          const cslType = row["CSL Type"]
          const performanceCategory = row["Performance Category"]

          if (!parsedData[cslType]) {
            parsedData[cslType] = {}
          }

          if (!parsedData[cslType][performanceCategory]) {
            parsedData[cslType][performanceCategory] = []
          }

          parsedData[cslType][performanceCategory].push(row)
        }

        resolve(parsedData)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsText(file)
  })
}

const exportToExcel = (data: any) => {
  const headers = [
    "CSL Type",
    "Revised Number",
    "Performance Category",
    "Description",
    "Frequency",
    "Start Date",
    "Expected",
    "Minimum",
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
  ]

  // Create CSV content with proper Excel formatting
  let csvContent = headers.join(",") + "\n"

  Object.keys(data).forEach((cslType) => {
    Object.keys(data[cslType]).forEach((category) => {
      data[cslType][category].forEach((item: any) => {
        const row = headers
          .map((header) => {
            let value = ""
            if (header === "CSL Type") {
              value = cslType
            } else if (header === "Performance Category") {
              value = category
            } else {
              value = item[header] || ""
            }
            // Escape commas and quotes for CSV format
            if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
              value = `"${value.replace(/"/g, '""')}"`
            }
            return value
          })
          .join(",")
        csvContent += row + "\n"
      })
    })
  })

  // Create Excel-compatible CSV file
  const BOM = "\uFEFF" // UTF-8 BOM for Excel compatibility
  const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "service-level-dashboard-data.csv"
  link.click()
  URL.revokeObjectURL(url)
}

export function ServiceLevelDashboard() {
  const [selectedMonth, setSelectedMonth] = useState("Jul'25")
  const [dashboardData, setDashboardData] = useState(initialData)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [currentView, setCurrentView] = useState<"dashboard" | "config">("dashboard")
  const fileInputRef = useRef<HTMLInputElement>(null)

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
  ]

  const years = ["2024", "2025"]

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const parsedData = await parseExcelData(file)
        setDashboardData(parsedData)
        setNotification({ type: "success", message: "Excel file imported successfully!" })
        setTimeout(() => setNotification(null), 5000)
      } catch (error) {
        console.error("Error parsing Excel file:", error)
        setNotification({
          type: "error",
          message: `Import failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        })
        setTimeout(() => setNotification(null), 5000)
      }
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const exportData = () => {
    try {
      exportToExcel(dashboardData)
      setNotification({ type: "success", message: "Data exported successfully!" })
      setTimeout(() => setNotification(null), 5000)
    } catch (error) {
      console.error("Error exporting data:", error)
      setNotification({ type: "error", message: "Export failed. Please try again." })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const getSortedCSLTypes = (data: any) => {
    const types = Object.keys(data)
    return types.sort((a, b) => {
      if (a === "Common") return -1
      if (b === "Common") return 1

      const aMatch = a.match(/COA (\d+)/)
      const bMatch = b.match(/COA (\d+)/)

      if (aMatch && bMatch) {
        return Number.parseInt(aMatch[1]) - Number.parseInt(bMatch[1])
      }

      return a.localeCompare(b)
    })
  }

  const cslTypes = getSortedCSLTypes(dashboardData)

  if (currentView === "config") {
    return (
      <ConfigurationPage
        data={dashboardData}
        onDataUpdate={setDashboardData}
        onBack={() => setCurrentView("dashboard")}
        months={months}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6 space-y-6">
        {/* Notification Banner */}
        {notification && (
          <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
              notification.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              {notification.type === "success" ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              {notification.message}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
              Service Level Management Dashboard
            </h1>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-2">
              <Upload className="h-4 w-4" />
              Import Excel
            </Button>

            <Button variant="outline" onClick={exportData} className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export Data
            </Button>

            <Button variant="outline" onClick={() => setCurrentView("config")} className="gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              Configuration
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue={cslTypes[0]} className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 lg:grid-cols-4 h-auto gap-2 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm">
            {cslTypes.map((cslType) => (
              <TabsTrigger
                key={cslType}
                value={cslType}
                className="text-sm font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                {cslType}
              </TabsTrigger>
            ))}
          </TabsList>

          {cslTypes.map((cslType) => (
            <TabsContent key={cslType} value={cslType} className="space-y-6">
              <CSLTypeContent data={dashboardData[cslType]} selectedMonth={selectedMonth} cslType={cslType} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

function CSLTypeContent({
  data,
  selectedMonth,
  cslType,
}: {
  data: any
  selectedMonth: string
  cslType: string
}) {
  const performanceCategories = Object.keys(data)

  return (
    <Tabs defaultValue={performanceCategories[0]} className="space-y-4">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 h-auto gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
        {performanceCategories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className="text-xs font-medium px-3 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
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
  )
}

function PerformanceCategoryContent({
  data,
  selectedMonth,
  category,
  cslType,
}: {
  data: any[]
  selectedMonth: string
  category: string
  cslType: string
}) {
  const getPerformanceLevel = (actual: number, expected: number, minimum: number) => {
    if (actual >= expected) return "excellent"
    if (actual >= minimum) return "good"
    return "poor"
  }

  const calculateCategoryAverage = () => {
    const validMetrics = data.filter(
      (item) => item[selectedMonth] && !isNaN(Number.parseFloat(item[selectedMonth].replace("%", ""))),
    )

    if (validMetrics.length === 0) return 0

    const sum = validMetrics.reduce((acc, item) => {
      const value = Number.parseFloat(item[selectedMonth].replace("%", ""))
      return acc + value
    }, 0)

    return sum / validMetrics.length
  }

  const categoryAverage = calculateCategoryAverage()

  return (
    <div className="space-y-6">
      {/* Category Overview */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle className="text-xl">
            {category} - {cslType}
          </CardTitle>
          <CardDescription className="text-blue-100">Performance overview for {selectedMonth}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{data.length}</div>
              <div className="text-sm text-blue-100">Total Metrics</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{categoryAverage.toFixed(1)}%</div>
              <div className="text-sm text-blue-100">Average Performance</div>
            </div>
            <div className="text-center">
              <PerformanceGauge value={categoryAverage} expected={95} minimum={90} size="small" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((item, index) => {
          const currentValue = Number.parseFloat(item[selectedMonth]?.replace("%", "") || "0") || 0
          const expected = Number.parseFloat(item.expected?.replace("%", "") || "0") || 0
          const minimum = Number.parseFloat(item.minimum?.replace("%", "") || "0") || 0
          const performanceLevel = getPerformanceLevel(currentValue, expected, minimum)

          const monthlyData: any = {}
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
          ]
          months.forEach((month) => {
            if (item[month]) {
              monthlyData[month] = item[month]
            }
          })

          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {item.description}
                </CardTitle>
                <CardDescription className="text-xs">
                  {item.revisedNumber} • {item.frequency}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <PerformanceGauge value={currentValue} expected={expected} minimum={minimum} size="medium" />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">{currentValue.toFixed(2)}%</div>
                    <div className="text-slate-500">Actual</div>
                  </div>
                  <div>
                    <div className="font-semibold text-green-600">{expected.toFixed(2)}%</div>
                    <div className="text-slate-500">Expected</div>
                  </div>
                  <div>
                    <div className="font-semibold text-orange-600">{minimum.toFixed(2)}%</div>
                    <div className="text-slate-500">Minimum</div>
                  </div>
                </div>

                <MetricCard
                  title={item.description}
                  value={currentValue}
                  expected={expected}
                  minimum={minimum}
                  trend={monthlyData}
                  selectedMonth={selectedMonth}
                />
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends - {category}</CardTitle>
          <CardDescription>Monthly performance trends for all metrics in this category</CardDescription>
        </CardHeader>
        <CardContent>
          <TrendChart data={data} selectedMonth={selectedMonth} />
        </CardContent>
      </Card>
    </div>
  )
}

function ConfigurationPage({
  data,
  onDataUpdate,
  onBack,
  months,
}: {
  data: any
  onDataUpdate: (data: any) => void
  onBack: () => void
  months: string[]
}): ReactElement {
  const [selectedCSLType, setSelectedCSLType] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("")
  const [editingData, setEditingData] = useState<any[]>([])

  const getSortedCSLTypes = (data: any) => {
    const types = Object.keys(data)
    return types.sort((a, b) => {
      if (a === "Common") return -1
      if (b === "Common") return 1

      const aMatch = a.match(/COA (\d+)/)
      const bMatch = b.match(/COA (\d+)/)

      if (aMatch && bMatch) {
        return Number.parseInt(aMatch[1]) - Number.parseInt(bMatch[1])
      }

      return a.localeCompare(b)
    })
  }

  const cslTypes = getSortedCSLTypes(data)
  const categories = selectedCSLType ? Object.keys(data[selectedCSLType] || {}) : []

  const loadData = () => {
    if (selectedCSLType && selectedCategory && data[selectedCSLType]?.[selectedCategory]) {
      setEditingData([...data[selectedCSLType][selectedCategory]])
    } else {
      setEditingData([])
    }
  }

  const saveData = () => {
    if (selectedCSLType && selectedCategory) {
      const updatedData = { ...data }
      updatedData[selectedCSLType][selectedCategory] = editingData
      onDataUpdate(updatedData)

      // Show success notification
      alert("Data saved successfully!")
    }
  }

  const updateValue = (index: number, field: string, value: string) => {
    const updated = [...editingData]
    updated[index] = { ...updated[index], [field]: value }
    setEditingData(updated)
  }

useEffect(() => {
    loadData()
  }, [selectedCSLType, selectedCategory])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Configuration</h1>
          <Button onClick={onBack} variant="outline">
            ← Back to Dashboard
          </Button>
        </div>

        {/* Selection Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Select Data to Edit</CardTitle>
            <CardDescription>Choose the CSL Type, Performance Category, Month and Year to edit data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="csl-type">CSL Type</Label>
                <Select value={selectedCSLType} onValueChange={setSelectedCSLType}>
                  <SelectTrigger>
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
                <Label htmlFor="category">Performance Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={!selectedCSLType}>
                  <SelectTrigger>
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
                <Label htmlFor="month">Month</Label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
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
            </div>
          </CardContent>
        </Card>

        {/* Data Editing */}
        {editingData.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    Edit Data - {selectedCSLType} / {selectedCategory}
                  </CardTitle>
                  <CardDescription>Modify the values below and click Save to update</CardDescription>
                </div>
                <Button onClick={saveData} className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {editingData.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <h3 className="font-semibold text-lg">{item.description}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`expected-${index}`}>Expected</Label>
                        <Input
                          id={`expected-${index}`}
                          value={item.expected || ""}
                          onChange={(e) => updateValue(index, "expected", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`minimum-${index}`}>Minimum</Label>
                        <Input
                          id={`minimum-${index}`}
                          value={item.minimum || ""}
                          onChange={(e) => updateValue(index, "minimum", e.target.value)}
                        />
                      </div>
                      {selectedMonth && (
                        <div>
                          <Label htmlFor={`current-${index}`}>{selectedMonth} Value</Label>
                          <Input
                            id={`current-${index}`}
                            value={item[selectedMonth] || ""}
                            onChange={(e) => updateValue(index, selectedMonth, e.target.value)}
                          />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <Label>Revised Number</Label>
                        <div className="text-slate-600">{item.revisedNumber}</div>
                      </div>
                      <div>
                        <Label>Frequency</Label>
                        <div className="text-slate-600">{item.frequency}</div>
                      </div>
                      <div>
                        <Label>Start Date</Label>
                        <div className="text-slate-600">{item.startDate}</div>
                      </div>
                      <div>
                        <Label>CSL Type</Label>
                        <div className="text-slate-600">{item.cslType}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedCSLType && selectedCategory && editingData.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-slate-500">No data found for the selected combination.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
