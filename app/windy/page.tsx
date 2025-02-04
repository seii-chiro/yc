"use client";

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

const WINDY_API_KEY = process.env.NEXT_PUBLIC_WINDY_API_KEY;

const Page = () => {
    const [leafletReady, setLeafletReady] = useState(false);
    const [windyReady, setWindyReady] = useState(false);

    useEffect(() => {
        if (leafletReady && windyReady && window.L && window.windyInit) {
            const options = {
                key: WINDY_API_KEY,  // Make sure to define this in your .env or replace with actual key
                lat: 12.8797,
                lon: 121.774,
                zoom: 5,
            };

            window.windyInit(options, (windyAPI) => {
                const { map } = windyAPI;

                console.log('Map initialized:', map);

                const marker1 = window.L.marker([14.676, 121.0437]).addTo(map);
                marker1.bindPopup('Marker 1');

                const marker2 = window.L.marker([10.3157, 123.8854]).addTo(map);
                marker2.bindPopup('Marker 2');

                const marker3 = window.L.marker([11.8166, 122.0942]).addTo(map);
                marker3.bindPopup('Marker 3');
            });
        }
    }, [leafletReady, windyReady]); // Runs when both scripts are ready

    return (
        <>
            <div>Windy Testing</div>

            {/* Leaflet Script */}
            <Script
                src={"https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"}
                strategy="afterInteractive"
                onLoad={() => setLeafletReady(true)}
            />

            {/* Windy API Script */}
            <Script
                src={"https://api.windy.com/assets/map-forecast/libBoot.js"}
                strategy="afterInteractive"
                onLoad={() => setWindyReady(true)}
            />

            <div id="windy" className="w-[80vw] h-[85vh] rounded mt-10" />
        </>
    );
};

export default Page;
