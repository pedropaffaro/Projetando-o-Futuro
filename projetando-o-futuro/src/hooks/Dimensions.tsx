// hook customizado para capturar o valor atual da largura e altura da janela

import { useState, useEffect } from "react";

export default function useDimensions() {
    // pega o valor inicial da largura e da altura
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); 
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    // sempre que algo ocorre chega se as dimensões foram mudadas e mexe na largura e altura
    useEffect(() => {
        const handleResizeWidth = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResizeWidth);
        return () => window.removeEventListener("resize", handleResizeWidth);
    }, []);

    useEffect(() => {
        const handleResizeHeight = () => setWindowHeight(window.innerHeight);
        window.addEventListener("resize", handleResizeHeight);
        return () => window.removeEventListener("resize", handleResizeHeight);
    }, []);

    return { windowWidth, windowHeight} // retorna ambas para um componente que nescessitar
}

