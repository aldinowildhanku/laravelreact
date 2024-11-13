import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Welcome() {
    const { auth } = usePage().props;

    // State variables for the typing effect
    const [text, setText] = useState("");
    const [phase, setPhase] = useState(0); // Tracks typing phase (0 for SMKN 12 Malang, 1 for Jagoan Hosting)

    // Typing text configurations
    const messages = [
        "Hello SMKN 12 Malang",
        "Persembahan dari Jagoan Hosting",
    ];
    const typingSpeed = 100; // Speed of typing in milliseconds
    const pauseDuration = 1000; // Pause before switching to the next text

    useEffect(() => {
        let timer;
        const currentMessage = messages[phase];
        const currentText = text;

        // Typing effect
        if (currentText.length < currentMessage.length) {
            // Continue typing the current message
            timer = setTimeout(() => {
                setText(currentMessage.slice(0, currentText.length + 1));
            }, typingSpeed);
        } else {
            // Pause, then switch to the next phase
            timer = setTimeout(() => {
                setPhase((prevPhase) => (prevPhase + 1) % messages.length); // Loop back to start
                setText(""); // Clear text to start typing the next message
            }, pauseDuration);
        }

        return () => clearTimeout(timer);
    }, [text, phase]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0E101C] text-center text-white">
            <div className="mb-4">
                <img
                    src="https://asset.jagoanhosting.com/wp-content/uploads/2024/01/New-JH-Asset-Logo_Logotype_Text-White-1.webp" // Replace with your image URL
                    alt="SMKN 12 Logo"
                    className="w-32 h-32 object-contain" // Adjust the size as needed
                />
            </div>
            <div className="text-5xl font-bold mb-4">
                {text || "\u00A0"}{" "}
                {/* Display text with non-breaking space when empty */}
            </div>
            <div className="text-2xl font-semibold mb-2">
                Hello, {auth.user?.name}
            </div>
            <div className="text-sm mb-8">Pembelajaran Laravel</div>
            <div className="flex gap-4">
                {auth.user ? (
                    <>
                        <Link
                            href="/dashboard"
                            className="bg-green-700 text-white px-4 py-2 rounded flex items-center"
                        >
                            <span className="mr-2">🚀</span> Dashboard
                        </Link>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="bg-transparent border border-white text-white px-4 py-2 rounded flex items-center"
                        >
                            <span className="mr-2">🎇</span> Logout
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            href="/dashboard"
                            className="bg-green-700 text-white px-4 py-2 rounded flex items-center"
                        >
                            <span className="mr-2">🚀</span> Login
                        </Link>
                        <Link
                            href="/register"
                            className="bg-transparent border border-white text-white px-4 py-2 rounded flex items-center "
                        >
                            <span className="mr-2">🔓</span> Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
