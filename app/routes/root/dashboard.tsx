import React, { useState } from 'react'
import {useNavigate, type LoaderFunctionArgs} from "react-router";
import type {Route} from "../../../.react-router/types/app/routes/root/+types/dashboard";

export const loader = async ({params}: LoaderFunctionArgs) => {
    const city = params.city || 'London';

    if (!process.env.REACT_APP_WEATHER_KEY) {
        console.error("REACT_APP_WEATHER_KEY is not defined.");
        throw new Error("Weather API key is missing.");
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
        );

        if (!response.ok) {
            throw new Error(`Error fetching weather: ${response.statusText}`);
        }

        const data = await response.json();
        return { data };
    } catch (error) {
        console.error("Error fetching weather in loader:", error);
        throw error;
    }
};

const Dashboard = ({loaderData}: Route.ComponentProps) => {
    const [searchCity, setSearchCity] = useState('');
    const navigate = useNavigate();
    const weatherData = loaderData?.data;

    console.log('weather data:', weatherData)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchCity.trim()) {
            navigate(`?city=${searchCity}`);
        }
    };

    return (
        <main
            className="px-6 py-12 flex flex-col h-screen lg:px-12"
            style={{backgroundImage: "url('/assets/images/bg.webp')"}}
        >
            <div className="gap-12 flex flex-col items-center justify-center">
                <section className="items-center justify-center flex flex-col gap-4">
                    <h1 className="font-bold text-4xl">
                        Weather Dashboard
                    </h1>

                    <p className="text-lg">
                        Get real-time weather information for any city
                    </p>
                </section>

                <section className="p-8 gap-2 w-full flex border border-gray-100 shadow-400 rounded-xl">
                    <form onSubmit={handleSearch} className="w-full flex gap-2">
                        <div className="w-full">
                            <img
                                src="/assets/icons/pin.png"
                                alt="search"
                                className="absolute pl-3 pt-3 size-8"
                            />

                            <input
                                type="text"
                                value={searchCity}
                                onChange={(e) => setSearchCity(e.target.value)}
                                maxLength={50}
                                placeholder="Enter city name..."
                                className="w-full p-2 pl-12 rounded-lg border border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-100 cursor-pointer"
                            />
                        </div>

                        <div className="hover:scale-105 flex items-center justify-center">
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-3 py-2 w-32 rounded-lg bg-dark-blue cursor-pointer border border-gray-600"
                            >
                                <img
                                    src="/assets/icons/analyse.png"
                                    alt="search"
                                    className="size-5"
                                />
                                <h1 className="pl-2">Search</h1>
                            </button>
                        </div>
                    </form>
                </section>

                <section className="grid w-full lg:grid-cols-[3fr_2fr] gap-4">
                    <div className="hover:scale-105 p-8 gap-2 w-full flex flex-col border border-gray-100 shadow-400 rounded-xl">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <img
                                    src="/assets/icons/pin.png"
                                    alt="search"
                                    className="size-5"
                                />
                                <h1 className="pl-5 text-xl">
                                    {weatherData?.name}, {weatherData?.sys?.country}
                                </h1>
                            </div>

                            <div className="flex items-center">
                                <h1 className="text-gray-400">
                                    {new Date().toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </h1>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="pt-4 gap-4 flex flex-col">
                                <h1 className="text-6xl">
                                    {Math.round(weatherData?.main?.temp)}°C
                                </h1>
                                <p className="text-gray-300">
                                    {weatherData?.weather?.[0]?.description}
                                </p>
                            </div>

                            <div className="flex flex-col">
                                <img
                                    src={`/assets/icons/${getWeatherIcon(weatherData?.weather?.[0]?.main)}.png`}
                                    alt="weather icon"
                                    className="size-25"
                                />
                                <h1 className="flex justify-center text-gray-400">
                                    {Math.round((weatherData?.main?.temp * 9/5) + 32)}°F
                                </h1>
                            </div>
                        </div>

                        <h1 className="text-gray-400">
                            Feels like {Math.round(weatherData?.main?.feels_like)}°C
                        </h1>
                    </div>

                    <div className="w-full flex flex-col gap-4">
                        <h1 className="text-2xl">
                            Weather Details
                        </h1>

                        <div className="hover:scale-105 p-4 gap-2 justify-between items-center w-full flex border border-gray-100 shadow-400 rounded-xl">
                            <div className="gap-6 items-center justify-center flex">
                                <img
                                    src="/assets/icons/humidity.png"
                                    alt="humidity"
                                    className="size-6"
                                />
                                <h1 className="text-lg">
                                    Humidity
                                </h1>
                            </div>

                            <h1 className="text-lg">
                                65%
                            </h1>
                        </div>

                        <div className="hover:scale-105 p-4 gap-2 justify-between items-center w-full flex border border-gray-100 shadow-400 rounded-xl">
                            <div className="gap-6 items-center justify-center flex">
                                <img
                                    src="/assets/icons/wind.png"
                                    alt="wind"
                                    className="size-6"
                                />
                                <h1 className="text-lg">
                                    Wind Speed
                                </h1>
                            </div>

                            <h1 className="text-lg">
                                15 km/h
                            </h1>
                        </div>

                        <div className="hover:scale-105 p-4 gap-2 justify-between items-center w-full flex border border-gray-100 shadow-400 rounded-xl">
                            <div className="gap-6 items-center justify-center flex">
                                <img
                                    src="/assets/icons/pressure.png"
                                    alt="pressure"
                                    className="size-6"
                                />
                                <h1 className="text-lg">
                                    Pressure
                                </h1>
                            </div>

                            <h1 className="text-lg">
                                1013 mb
                            </h1>
                        </div>

                        <div className="hover:scale-105 p-4 gap-2 justify-between items-center w-full flex border border-gray-100 shadow-400 rounded-xl">
                            <div className="gap-6 items-center justify-center flex">
                                <img
                                    src="/assets/icons/brightness.png"
                                    alt="visibility"
                                    className="size-6"
                                />
                                <h1 className="text-lg">
                                    Visibility
                                </h1>
                            </div>

                            <h1 className="text-lg">
                                10 km
                            </h1>
                        </div>
                    </div>
                </section>

                <section className="w-full flex flex-col gap-4 p-6 border border-gray-100 shadow-400 rounded-xl">
                    <h1 className="text-2xl">
                        5-Day Forecast
                    </h1>

                    <section className="grid md:grid-cols-5 gap-4">
                        <div className="hover:scale-105 p-4 gap-2 w-full border border-gray-100 shadow-400 rounded-xl flex flex-col">
                            <div className="gap-2 flex flex-col justify-center items-center">
                                <h1 className="text-lg">
                                    Thursday
                                </h1>

                                <img
                                    src="/assets/icons/cloud.png"
                                    alt="cloud"
                                    className="size-8"
                                />

                                <p className="text-gray-400">
                                    Partly Cloudy
                                </p>
                            </div>

                            <div className="flex justify-between items-center w-full">
                                <h1>
                                    22°C
                                </h1>

                                <p className="text-gray-400">
                                    71°F
                                </p>
                            </div>
                        </div>

                        <div className="hover:scale-105 p-4 gap-2 w-full border border-gray-100 shadow-400 rounded-xl flex flex-col">
                            <div className="gap-2 flex flex-col justify-center items-center">
                                <h1 className="text-lg">
                                    Friday
                                </h1>

                                <img
                                    src="/assets/icons/brightness.png"
                                    alt="brightness"
                                    className="size-8"
                                />

                                <p className="text-gray-400">
                                    Sunny
                                </p>
                            </div>

                            <div className="flex justify-between items-center w-full">
                                <h1>
                                    26°C
                                </h1>

                                <p className="text-gray-400">
                                    78°F
                                </p>
                            </div>
                        </div>

                        <div className="hover:scale-105 p-4 gap-2 w-full border border-gray-100 shadow-400 rounded-xl flex flex-col">
                            <div className="gap-2 flex flex-col justify-center items-center">
                                <h1 className="text-lg">
                                    Saturday
                                </h1>

                                <img
                                    src="/assets/icons/cloud.png"
                                    alt="cloud"
                                    className="size-8"
                                />

                                <p className="text-gray-400">
                                    Cloudy
                                </p>
                            </div>

                            <div className="flex justify-between items-center w-full">
                                <h1>
                                    23°C
                                </h1>

                                <p className="text-gray-400">
                                    73°F
                                </p>
                            </div>
                        </div>

                        <div className="hover:scale-105 p-4 gap-2 w-full border border-gray-100 shadow-400 rounded-xl flex flex-col">
                            <div className="gap-2 flex flex-col justify-center items-center">
                                <h1 className="text-lg">
                                    Sunday
                                </h1>

                                <img
                                    src="/assets/icons/light-rain.png"
                                    alt="light-rain"
                                    className="size-8"
                                />

                                <p className="text-gray-400">
                                    Light Rain
                                </p>
                            </div>

                            <div className="flex justify-between items-center w-full">
                                <h1>
                                    21°C
                                </h1>

                                <p className="text-gray-400">
                                    69°F
                                </p>
                            </div>
                        </div>

                        <div className="hover:scale-105 p-4 gap-2 w-full border border-gray-100 shadow-400 rounded-xl flex flex-col">
                            <div className="gap-2 flex flex-col justify-center items-center">
                                <h1 className="text-lg">
                                    Monday
                                </h1>

                                <img
                                    src="/assets/icons/thunderstorm.png"
                                    alt="thunderstorm"
                                    className="size-8"
                                />

                                <p className="text-gray-400">
                                    Thunderstorm
                                </p>
                            </div>

                            <div className="flex justify-between items-center w-full">
                                <h1>
                                    19°C
                                </h1>

                                <p className="text-gray-400">
                                    66°F
                                </p>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        </main>
    )
}

function getWeatherIcon(condition: string) {
    switch(condition?.toLowerCase()) {
        case 'clear': return 'brightness';
        case 'clouds': return 'cloud';
        case 'rain': return 'light-rain';
        case 'thunderstorm': return 'thunderstorm';
        default: return 'cloud';
    }
}
export default Dashboard
