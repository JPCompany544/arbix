"use client";

import { useEffect, useRef, useState } from "react";
import { createChart, ColorType, ISeriesApi, CandlestickData } from "lightweight-charts";

interface TradingChartProps {
    symbol: string;
}

export default function TradingChart({ symbol }: TradingChartProps) {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<any>(null);
    const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // Initialize Chart
        try {
            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: "#000000" },
                    textColor: "#D1D4DC",
                },
                grid: {
                    vertLines: { color: "rgba(42, 46, 57, 0.5)" },
                    horzLines: { color: "rgba(42, 46, 57, 0.5)" },
                },
                width: chartContainerRef.current.clientWidth || 800,
                height: chartContainerRef.current.clientHeight || 500,
                crosshair: {
                    mode: 0,
                    vertLine: {
                        width: 1,
                        color: "rgba(224, 227, 235, 0.2)",
                        style: 0,
                    },
                    horzLine: {
                        width: 1,
                        color: "rgba(224, 227, 235, 0.2)",
                        style: 0,
                    },
                },
                timeScale: {
                    borderColor: "rgba(42, 46, 57, 0.5)",
                    timeVisible: true,
                    secondsVisible: false,
                },
            });

            const candlestickSeries = chart.addCandlestickSeries({
                upColor: "#16c784",
                downColor: "#ea3943",
                borderVisible: false,
                wickUpColor: "#16c784",
                wickDownColor: "#ea3943",
            });

            seriesRef.current = candlestickSeries;
            chartRef.current = chart;

            // Handle Resize with ResizeObserver for better reliability
            const resizeObserver = new ResizeObserver(entries => {
                if (entries.length === 0 || !chartRef.current) return;
                const { width, height } = entries[0].contentRect;
                if (width > 0 && height > 0) {
                    chartRef.current.applyOptions({ width, height });
                }
            });

            if (chartContainerRef.current) {
                resizeObserver.observe(chartContainerRef.current);
            }

            // Fetch Historical Data
            const fetchHistorical = async () => {
                setIsLoading(true);
                try {
                    const res = await fetch(`/api/historical/${symbol}USDT`);
                    if (!res.ok) throw new Error(`API returned ${res.status}`);

                    const data: CandlestickData[] = await res.json();

                    if (data && Array.isArray(data) && seriesRef.current) {
                        const uniqueData = Array.from(new Map(data.map(item => [item.time, item])).values())
                            .sort((a, b) => (a.time as number) - (b.time as number));
                        seriesRef.current.setData(uniqueData as any);

                        // Fit content after data is set
                        chart.timeScale().fitContent();
                    }
                } catch (error) {
                    console.error("Failed to load historical data:", error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchHistorical();

            // WebSocket for Real-time Updates (Binance)
            const wsSymbol = `${symbol.toLowerCase()}usdt`;
            const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${wsSymbol}@kline_1m`);

            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                const kline = message.k;
                if (kline && seriesRef.current) {
                    seriesRef.current.update({
                        time: kline.t / 1000 as any,
                        open: parseFloat(kline.o),
                        high: parseFloat(kline.h),
                        low: parseFloat(kline.l),
                        close: parseFloat(kline.c),
                    });
                }
            };

            return () => {
                resizeObserver.disconnect();
                chart.remove();
                ws.close();
            };
        } catch (err) {
            console.error("Error creating chart:", err);
        }
    }, [symbol]);

    return (
        <div className="relative w-full h-[45vh] md:h-[500px] bg-black rounded-lg overflow-hidden border border-white/5">
            {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest animate-pulse">Synchronizing Node</span>
                    </div>
                </div>
            )}
            <div ref={chartContainerRef} className="w-full h-full" />
        </div>
    );
}
