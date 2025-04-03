import React from "react";

export default function Button({ onClick, text }) {
    return (
        <button
            className="p-2 bg-brand text-white rounded-sm hover:brightness-125"
            onClick={onClick}
        >
            {text}
        </button>
    );
}
