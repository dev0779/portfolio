import { useMemo } from "react";
import { useFormContext } from "react-hook-form";


interface CheckboxProps{
    name: string;
    label: string;
    required?: string;
    disabled?: boolean;
    readOnly?: boolean;
    hideError?: boolean;
    value?: string;
}



export const Checkbox = ({name, label, value, required, disabled, readOnly, hideError}: CheckboxProps): JSX.Element =>{

    const { register, formState: { errors}}= useFormContext()

    const labelToRender = useMemo(()=>{
        if (label){
            if (typeof label === 'string'){
                return <p>{required? `${label} *` : label}</p>
            } else {
                return required ? <>{label} *</> : label;
            }
        }
    }, [label, required])


    return(
        <div>
            <div>
                <input
                id={name}
                type="checkbox"
                disabled={disabled}
                readOnly={readOnly}
                value={value && value}
                {...register(name, {required: required})}
                />
                <label>
                    {labelToRender}
                </label>
            </div>
            {!hideError && errors[name] && <span>{errors[name]?.message?.toString()}</span>}
        </div>
    )
}