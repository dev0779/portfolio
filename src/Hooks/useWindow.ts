import {useState, useEffect, } from 'react'

export const useWindow = () =>{

    const hasWindow = typeof window !== 'undefined';
    const [ windowDimensions, setWindowDimensions] = useState(getWindowDimensions)

    function getWindowDimensions(){
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;
        return { width, height};
    }

    function handleResize(){
        setWindowDimensions(getWindowDimensions())
    }


    useEffect(()=>{
        if(hasWindow){
           handleResize()
            window.addEventListener("resize", handleResize);
            return () =>window.removeEventListener("resize", handleResize);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[hasWindow]);
   



    return windowDimensions
}