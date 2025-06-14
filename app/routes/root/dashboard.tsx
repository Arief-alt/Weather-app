import React, {useEffect, useState } from 'react';
import {useNavigate, type LoaderFunctionArgs} from "react-router";
import type {Route} from "../../../.react-router/types/app/routes/root/+types/dashboard";
import {usePreventZoom} from "../../../components";

export const loader = async ({request}: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const city = url.searchParams.get('city') || 'London';

    if (!process.env.REACT_APP_WEATHER_KEY) {
        throw new Error("Weather API key is missing.");
    }

    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`)
        ])

        if (!currentResponse.ok || !forecastResponse.ok) {
            const errorData = await currentResponse.json().catch(() => null) || await forecastResponse.json().catch(() => null);

            return {
                error: errorData?.message || 'Failed to fetch weather data',
                city
            }
        }

        const [currentData, forecastData] = await Promise.all([
            currentResponse.json(),
            forecastResponse.json()
        ])

        return {
            currentWeather: currentData,
            forecast: forecastData,
            city
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
        throw error;
    }
}

const Dashboard = ({loaderData}: Route.ComponentProps) => {
    const [searchCity, setSearchCity] = useState(loaderData?.city || '');
    const [error, setError] = useState(loaderData?.error || null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { currentWeather, forecast } = loaderData || {};

    const dailyForecast = forecast?.list?.filter((_: any, index: any) => index % 8 === 0).slice(0, 5) || [];

    useEffect(() => {
        setError(loaderData?.error || null);
        setIsLoading(false);
    }, [loaderData])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (searchCity.trim()) {
            navigate(`?city=${searchCity}`);
        }
    }

    // console.log('Forecast:', forecast);
    // console.log('Current Weather:', currentWeather);
    // console.log('5-Day Forecast:', dailyForecast);

    usePreventZoom()

    return (
        <main
            className="px-6 py-12 flex flex-col min-h-screen lg:px-12 bg-no-repeat bg-cover bg-center bg-fixed"
            style={{
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('/assets/images/bg.webp')"
            }}
        >
            <div className="gap-12 flex flex-col items-center justify-center">
                <section className="items-center justify-center flex flex-col gap-4">
                    <h1 className="text-white font-bold text-4xl">
                        Weather Dashboard
                    </h1>

                    <p className="text-white text-lg">
                        Get real-time weather information for any city
                    </p>
                </section>

                <section className="p-8 gap-2 w-full flex flex-col border border-gray-100 shadow-400 rounded-xl bg-dark">
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
                                className="text-white w-full p-2 pl-12 rounded-lg border border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-100 cursor-pointer"
                            />
                        </div>

                        <div className="hover:scale-105 flex items-center justify-center">
                            <button
                                type="submit"
                                className="flex justify-center items-center gap-4 px-3 py-2 w-32 rounded-lg bg-dark-blue cursor-pointer border border-gray-600"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                <>
                                    <img
                                        src="/assets/icons/analyse.png"
                                        alt="search"
                                        className="size-5"
                                    />
                                    <h1 className="text-white pl-2">Search</h1>
                                </>
                                )}
                            </button>
                        </div>
                    </form>

                    {error && (
                        <div className="flex flex-col mt-2 text-red-400 text-sm animate-fadeIn">
                            ⚠️ {error}
                        </div>
                    )}
                </section>

                <section className="grid w-full lg:grid-cols-[3fr_2fr] gap-4">
                    <div className="hover:scale-105 p-8 gap-2 w-full flex flex-col border border-gray-100 shadow-400 rounded-xl bg-dark">
                        <div className="lg:pb-10 flex justify-between">
                            <div className="flex items-center">
                                <img
                                    src="/assets/icons/pin.png"
                                    alt="search"
                                    className="size-5"
                                />
                                <h1 className="text-white pl-5 text-xl">
                                    {currentWeather?.name}, {currentWeather?.sys?.country}
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
                                <h1 className="text-white text-6xl">
                                    {Math.round(currentWeather?.main?.temp)}°C
                                </h1>
                                <p className="text-gray-300">
                                    {currentWeather?.weather?.[0]?.description}
                                </p>
                            </div>

                            <div className="flex flex-col">
                                <img
                                    src={`/assets/icons/${getWeatherIcon(currentWeather?.weather?.[0]?.main)}.png`}
                                    alt="weather icon"
                                    className="size-25"
                                />
                                <h1 className="flex justify-center text-gray-400">
                                    {Math.round((currentWeather?.main?.temp * 9/5) + 32)}°F
                                </h1>
                            </div>
                        </div>

                        <h1 className="text-gray-400">
                            Feels like {Math.round(currentWeather?.main?.feels_like)}°C
                        </h1>
                    </div>

                    <div className="w-full flex flex-col gap-4">
                        <h1 className="text-white text-2xl">
                            Weather Details
                        </h1>

                        <div className="hover:scale-105 p-4 gap-2 justify-between items-center w-full flex border border-gray-100 shadow-400 rounded-xl bg-dark">
                            <div className="gap-6 items-center justify-center flex">
                                <img
                                    src="/assets/icons/humidity.png"
                                    alt="humidity"
                                    className="size-6"
                                />
                                <h1 className="text-white text-lg">
                                    Humidity
                                </h1>
                            </div>

                            <h1 className="text-white text-lg">
                                {currentWeather?.main?.humidity}%
                            </h1>
                        </div>

                        <div className="hover:scale-105 p-4 gap-2 justify-between items-center w-full flex border border-gray-100 shadow-400 rounded-xl bg-dark">
                            <div className="gap-6 items-center justify-center flex">
                                <img
                                    src="/assets/icons/wind.png"
                                    alt="wind"
                                    className="size-6"
                                />
                                <h1 className="text-white text-lg">
                                    Wind Speed
                                </h1>
                            </div>

                            <h1 className="text-white text-lg">
                                {Math.round(currentWeather?.wind?.speed * 3.6)} km/h
                            </h1>
                        </div>

                        <div className="hover:scale-105 p-4 gap-2 justify-between items-center w-full flex border border-gray-100 shadow-400 rounded-xl bg-dark">
                            <div className="gap-6 items-center justify-center flex">
                                <img
                                    src="/assets/icons/pressure.png"
                                    alt="pressure"
                                    className="size-6"
                                />
                                <h1 className="text-white text-lg">
                                    Pressure
                                </h1>
                            </div>

                            <h1 className="text-white text-lg">
                                {currentWeather?.main?.pressure} mb
                            </h1>
                        </div>

                        <div className="hover:scale-105 p-4 gap-2 justify-between items-center w-full flex border border-gray-100 shadow-400 rounded-xl bg-dark">
                            <div className="gap-6 items-center justify-center flex">
                                <img
                                    src="/assets/icons/sunny.png"
                                    alt="visibility"
                                    className="size-6"
                                />
                                <h1 className="text-white text-lg">
                                    Visibility
                                </h1>
                            </div>

                            <h1 className="text-white text-lg">
                                {(currentWeather?.visibility / 1000).toFixed(1)} km
                            </h1>
                        </div>
                    </div>
                </section>

                <section className="w-full flex flex-col gap-4 p-6 border border-gray-100 shadow-400 rounded-xl bg-dark">
                    <h1 className="text-white text-2xl">5-Day Forecast</h1>

                    <section className="grid md:grid-cols-5 gap-4">
                        {dailyForecast.map((day: any) => {
                            const date = new Date(day.dt * 1000)
                            const weekday = date.toLocaleDateString('en-US', { weekday: 'long' })
                            const weatherCondition = day.weather[0].main
                            const tempC = Math.round(day.main.temp)
                            const tempF = Math.round((day.main.temp * 9/5) + 32)

                            return (
                                <div key={day.dt} className="hover:scale-105 p-4 gap-2 w-full border border-gray-100 shadow-400 rounded-xl flex flex-col">
                                    <div className="gap-2 flex flex-col justify-center items-center">
                                        <h1 className="text-white text-lg">
                                            {weekday}
                                        </h1>

                                        <img
                                            src={`/assets/icons/${getWeatherIcon(weatherCondition)}.png`}
                                            alt={weatherCondition}
                                            className="size-8"
                                        />

                                        <p className="text-gray-400">
                                            {day.weather[0].description}
                                        </p>
                                    </div>

                                    <div className="text-white flex justify-between items-center w-full">
                                        <h1 className="text-white">
                                            {tempC}°C
                                        </h1>

                                        <p className="text-gray-400">
                                            {tempF}°F
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </section>
                </section>
            </div>
        </main>
    )
}

function getWeatherIcon(condition: string, isNight = false) {
    switch (condition?.toLowerCase()) {
        // Thunder
        case 'thunderstorm':
            return 'thunderstorm';

        // Rain
        case 'drizzle':
        case 'light rain':
            return 'light-rain';
        case 'rain':
        case 'heavy rain':
            return 'heavy-rain';

        // Snow
        case 'snow':
        case 'sleet':
        case 'freezing rain':
            return 'snow';

        // Atmosphere
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'fog':
        case 'sand':
        case 'dust':
            return 'fog';

        // Clear
        case 'clear':
            return isNight ? 'clear-night' : 'sunny';

        // Clouds
        case 'few clouds':
            return isNight ? 'partly-cloudy-night' : 'partly-cloudy';
        case 'scattered clouds':
            return 'partly-cloudy';
        case 'broken clouds':
        case 'overcast clouds':
            return 'cloudy';

        // Extreme
        case 'tornado':
            return 'tornado';
        default:
            return 'cloud';
    }
}

export default Dashboard;
