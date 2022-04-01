import  { useState } from "react";



const useForm = (validate) => {
    const [input,setInput] = useState('');
    const [touched,setTouched] = useState(false);

    const isValid = validate(input);
    const hasError = !isValid && touched;


    const touchHandler = () => {
        setTouched(true);
    }

    const inputHandler = (e) => {
        setInput(e.target.value)
    }

    return {input,touchHandler,inputHandler,isValid,hasError}
}
export default useForm;