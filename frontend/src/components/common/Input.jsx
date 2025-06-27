import { forwardRef } from "react";

const Input = forwardRef(function Input({
    label,
    type = 'text',
    placeholder = '',
    className = '',
    error = '',
    ...props
}, ref) {
    return (
        <div>
            {label && <label className="bg-white text-sm font-semibold relative left-2 top-2 ">{label}</label>}
            <input
                ref={ref}
                type={type}
                placeholder={placeholder}
                className={`${className} w-full outline-none border border-gray-200 p-1 rounded-sm`}
                {...props}
                autoComplete="true"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
})

export default Input;
