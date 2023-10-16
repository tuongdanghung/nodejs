import React from "react";
interface InputProps {
    keywords: string;
    type: string | boolean;
}
const InputField: React.FC<InputProps> = (props: any) => {
    return (
        <div>
            <label>{props.keywords}</label>
            <input
                className="focus:border-sky-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type={props.type || "text"}
                placeholder={props.keywords}
                value={props.value}
                onChange={(e) =>
                    props.setValue((prev: any) => ({
                        ...prev,
                        [props.keywords]: e.target.value,
                    }))
                }
            />
        </div>
    );
};

export default InputField;
