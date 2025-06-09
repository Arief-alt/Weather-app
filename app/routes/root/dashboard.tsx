import React from 'react'

const Dashboard = () => {
    return (
        <main
            className="px-6 py-12 flex flex-col h-screen lg:px-30 xl:px-60 2xl:px-80"
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

                <section className="p-8 gap-2 md:gap-6 w-full flex border border-gray-100 shadow-400 rounded-xl">
                    <div className="w-full">
                        <img
                            src="/assets/icons/pin.png"
                            alt="search"
                            className="absolute pl-3 pt-3 size-8"
                        />

                        <input
                            type="text"
                            maxLength={50}
                            placeholder="Enter city name..."
                            className="w-full p-2 pl-12 rounded-lg  border border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-100 cursor-pointer"
                        />
                    </div>

                    <div className="hover:scale-105 flex items-center justify-center md:justify-end">
                        <button
                            onClick={() => {
                                console.log("Find city")
                            }}
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
                </section>

                <section className="grid w-full lg:grid-cols-2 gap-4">
                    <div className="hover:scale-105 p-8 gap-2 md:gap-6 w-full flex flex-col border border-gray-100 shadow-400 rounded-xl">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <img
                                    src="/assets/icons/pin.png"
                                    alt="search"
                                    className="size-5"
                                />

                                <h1 className="pl-5 text-xl">
                                    New York, United States
                                </h1>
                            </div>

                            <div className="flex items-center">
                                <h1 className="text-gray-400">
                                    Sunday, June 8, 2025
                                </h1>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="pt-4 gap-4 flex flex-col">
                                <h1 className="text-6xl">
                                    22°C
                                </h1>

                                <p className="text-gray-300">
                                    Partly Cloudy
                                </p>
                            </div>

                            <div className="flex flex-col">
                                <img
                                    src="/assets/icons/cloud.png"
                                    alt="search"
                                    className="size-25"
                                />

                                <h1 className="flex justify-center text-gray-400">
                                    72°F
                                </h1>
                            </div>
                        </div>

                        <h1 className="text-gray-400">
                            Feels like 24°C
                        </h1>
                    </div>

                    <div className="w-full flex flex-col gap-4">
                        <h1 className="text-2xl">
                            Weather Details
                        </h1>

                        <div className="hover:scale-105 p-4 gap-2 md:gap-6 justify-between items-center w-full flex border border-gray-100 shadow-400 rounded-xl">
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

                        <div className="hover:scale-105 p-4 gap-2 md:gap-6 justify-between items-center w-full flex border border-gray-100 shadow-400 rounded-xl">
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

                        <div className="hover:scale-105 p-4 gap-2 md:gap-6 justify-between items-center w-full flex border border-gray-100 shadow-400 rounded-xl">
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

                        <div className="hover:scale-105 p-4 gap-2 md:gap-6 justify-between items-center w-full flex border border-gray-100 shadow-400 rounded-xl">
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

                <section className="w-full flex flex-col gap-4 p-6 md:gap-6 border border-gray-100 shadow-400 rounded-xl">
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
export default Dashboard
