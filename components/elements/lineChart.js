import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Icon from '../Icons';

const MyChart = ({ initialDatapoints, viewRate, isUp }) => {
    const DATA_COUNT = 11;
    const labels = [];
    for (let i = 0; i < DATA_COUNT; ++i) {
        labels.push(i.toString());
    }

    const chartRef = useRef(null);
    const gradientRef = useRef(null);

    useEffect(() => {
        let chartInstance = null;

        const createChart = () => {
            const gradient = document.createElement('canvas').getContext('2d');
            gradientRef.current = gradient;

            const gradientFill = gradient.createLinearGradient(0, 0, 0, 0);
            gradientFill.addColorStop(0, '#2074ec');
            gradientFill.addColorStop(1, 'rgba(255, 255, 255, 0)');

            if (chartRef.current) {
                const ctx = chartRef.current.getContext('2d');
                chartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'project views',
                                data: initialDatapoints,
                                borderColor: '#2074ec',
                                fill: true,
                                backgroundColor: gradientFill,
                                tension: 0.4,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: false,
                                text: `${' '.repeat(15)} project views`,
                                font: {
                                    size: 16,
                                    weight: 'bold',
                                    family: 'Urbanist',
                                },
                                padding: {
                                    top: 50,
                                    bottom: 50,
                                    right: 100,
                                },
                                align: 'start',
                                margin: {
                                    left: 50,
                                },
                            },
                            legend: {
                                display: false,
                                position: 'top',
                                align: 'start',
                                title: {
                                    text: 'Project View',
                                },
                                padding: {
                                    top: 10,
                                },
                            },
                        },
                        interaction: {
                            intersect: false,
                        },
                        layout: {
                            padding: {
                                top: 96
                            }
                        },
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                },
                            },
                            y: {
                                display: true,
                                title: {
                                    display: false,
                                    text: 'Value',
                                },
                                beginAtZero: true,
                            },
                        },

                    },
                });
            }
        };

        createChart();


        const updateGradient = () => {
            if (gradientRef.current && chartInstance) {
                const canvas = document.getElementById('chart');

                const updatedGradientFill = gradientRef.current.createLinearGradient(0, 0, 0, canvas.height*.9);
                updatedGradientFill.addColorStop(0, '#2074ec');
                updatedGradientFill.addColorStop(1, 'rgba(255, 255, 255, 0)');

                chartInstance.data.datasets[0].backgroundColor = updatedGradientFill;
                chartInstance.update();
            }
        };

        const delay = 0;
        const timeoutId = setTimeout(updateGradient, delay);

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
            clearTimeout(timeoutId);
        };

    }, [labels, initialDatapoints]);

    return (
        <div className='relative'>
            .
            <div className='absolute h-24 w-full flex items-center mx-10 gap-5'>
                <div className='text-lg opacity-70 capitalize font-semibold'>
                    project views
                </div>
                <div className={`gap-1 rounded-full px-4 flex items-center ${isUp ? 'text-green-700' : 'text-red-700'} dashboard_padge`}>
                    
                    <span >
                        {
                            !isUp && <Icon name={'downArrow'} />
                        }
                        {
                            isUp &&<Icon name={'upArrow'} />
                        }

                    </span>
                    <span> {viewRate}%</span>
                </div>
            </div>
            <canvas className='card red-gradient cardborder-2' id="chart" ref={chartRef} />
        </div>
    );
};

export default MyChart;
