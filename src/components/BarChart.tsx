import React, { useEffect, useState } from 'react';
import Chart, { ChartDataset } from 'chart.js/auto'; // Import Chart and ChartDataset

import { JobApplication } from '../App'; // Import JobApplication interface

interface BarChartData {
  labels: string[];
  datasets: ChartDataset[];
}

const BarChart: React.FC<{ jobApplications: JobApplication[] }> = ({ jobApplications }) => {
  const [chartData, setChartData] = useState<BarChartData>({ labels: [], datasets: [] });

  useEffect(() => {
    const processData = () => {
      const applicationsByDateAndCompany: { [date: string]: { [company: string]: number } } = {};

      // Group applications by date and company
      jobApplications.forEach(application => {
        const date = application.submitted_at.split('T')[0]; // Extract date from submitted_at
        const company = application.company_name;

        if (!applicationsByDateAndCompany[date]) {
          applicationsByDateAndCompany[date] = {};
        }

        if (!applicationsByDateAndCompany[date][company]) {
          applicationsByDateAndCompany[date][company] = 0;
        }

        applicationsByDateAndCompany[date][company]++;
      });

      // Prepare data for chart
      const labels = Object.keys(applicationsByDateAndCompany);
      const datasets = Object.keys(jobApplications.reduce((acc, cur) => ({ ...acc, [cur.company_name]: true }), {})).map(company => ({
        label: company,
        data: labels.map(date => applicationsByDateAndCompany[date][company] || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }));

      setChartData({ labels, datasets });
    };

    if (jobApplications.length > 0) {
      processData();
    }
  }, [jobApplications]);

  useEffect(() => {
    if (chartData.labels.length > 0) {
      const ctx = document.getElementById('barChart') as HTMLCanvasElement;
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      return () => newChart.destroy(); // Cleanup previous chart instance
    }
  }, [chartData]);

  return <canvas id="barChart" />;
};

export default BarChart;
