import React from "react";

export default function FormError({ errorMessage }) {
    return (
        <div className="mb-3 alert alert-danger" role="alert">
            { errorMessage }
        </div>
    )
}