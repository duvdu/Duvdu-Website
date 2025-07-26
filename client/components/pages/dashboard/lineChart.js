import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Icon from '../../Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next';

const LineChart = ({ initialDatapoints,Months, viewRate, isUp }) => {
    const { t } = useTranslation();

    const chartRef = useRef(null);
    const gradientRef = useRef(null);

    useEffect(() => {
        const body = document.body;
        const isDarkMode = body.classList.contains('dark');
        const color = isDarkMode ? "255":"0"
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
                        labels: Months,
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
                            },
                        },
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                },
                                grid: {
                                    color: `rgba(${color}, ${color}, ${color}, 0)`
                                },
                                ticks: {
                                    color: `rgba(${color}, ${color}, ${color}, 0.4)`
                                }
                             
                            },
                            y: {
                                display: true,
                                title: {
                                    display: false,
                                    text: 'Value',
                                },
                                beginAtZero: true,
                                grid: {
                                    color: function(context) {
                                        if (context.index > 0) {
                                          return `rgba(${color}, ${color}, ${color}, 0.1)`

                                        } else  {
                                            return `rgba(${color}, ${color}, ${color}, 1)`
                                        }
                                    }
                                },
                                ticks: {
                                    color: `rgba(${color}, ${color}, ${color}, 0.4)`
                                }
                            },
                        },

                    },
                });
            }
        };

        createChart();


        const updateGradient = () => {
            try {
                if (gradientRef.current && chartInstance) {
                    const canvas = document.getElementById('chart');

                    const updatedGradientFill = gradientRef.current.createLinearGradient(0, 0, 0, canvas.height * .9);
                    updatedGradientFill.addColorStop(0, '#2074ec');
                    updatedGradientFill.addColorStop(1, '#1c72ea00');

                    chartInstance.data.datasets[0].backgroundColor = updatedGradientFill;
                    chartInstance.update();
                }
            }
            catch (ex) {
                console.error(ex)
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

    }, [Months, initialDatapoints]);
    const isDown = initialDatapoints?.slice(-2)[0]>initialDatapoints?.slice(-2)[1]
    return (
        <div className='relative h-full '>
            <div className='absolute h-24 w-full flex items-center px-10 gap-5'>
                <div className='text-lg opacity-70 capitalize font-semibold'>{t("project views")}</div>
                <div className={`gap-1 rounded-full px-4 flex items-center dashboard_padge`}>

                    <span >
                        {
                            isDown && <FontAwesomeIcon className='text-[#B41D38]' icon="fa-solid fa-arrow-up-long" />
                        }
                        {
                            !isDown && <FontAwesomeIcon className='text-[#289C34] dark:text-[#2DB03A]' icon="fa-solid fa-arrow-up-long" /> 
                        }
 
                    </span>

                    <span className={`${!isDown ? 'text-[#289C34] dark:text-[#2DB03A]' : 'text-[#B41D38]'}`}> {viewRate}%</span>
                </div>
            </div>
            <canvas className='card red-gradient border-2 border-[#CABEC1] dark:border-[#6B5A61]' id="chart" ref={chartRef} style={{ minHeight: '100%', maxWidth: "100%" }} />
        </div>
    );
};

export default LineChart;
