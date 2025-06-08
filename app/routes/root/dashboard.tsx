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

                    <div className="flex items-center justify-center md:justify-end">
                        <button
                            onClick={() => {
                                console.log("New Task")
                            }}
                            type="submit"
                            className="flex items-center gap-2 px-3 py-2 w-32 rounded-lg bg-dark-blue cursor-pointer border border-gray-600"
                        >
                            <img
                                src="/assets/icons/analyse.png"
                                alt="task"
                                className="size-5"
                            />

                            <h1 className="pl-2">Search</h1>
                        </button>
                    </div>
                </section>

                <section className="p-8 gap-2 md:gap-6 w-full flex flex-col border border-gray-100 shadow-400 rounded-xl">
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
                        <div className="gap-4 flex flex-col">
                            <h1 className="text-6xl">
                                22°C
                            </h1>

                            <p className="text-gray-300">
                                Partly Cloudy
                            </p>
                        </div>

                        <div className="pt-2 gap-4 flex flex-col">
                            <img
                                src="/assets/icons/pin.png"
                                alt="search"
                                className="size-15"
                            />

                            <h1 className="flex justify-center text-gray-400">
                                72°F
                            </h1>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-gray-400">
                            Feels like 24°C
                        </h1>
                    </div>
                </section>
            </div>
        </main>
    )
}
export default Dashboard
