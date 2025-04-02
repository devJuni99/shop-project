import React from "react";

export default function User({ user: { photoURL, displayName } }) {
    return (
        <div className="flex items-center">
            <img
                src={photoURL}
                alt={displayName}
                className="rounded-full w-10 h-10 mr-2"
            />
            <span className="hidden md:block">{displayName}</span>
        </div>
    );
}
