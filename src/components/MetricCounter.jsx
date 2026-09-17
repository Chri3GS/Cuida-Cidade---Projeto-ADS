import React, { useState, useEffect, useRef } from 'react';

export const MetricCounter = ({ targetValue, label }) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef(null);
    const hasAnimatedRef = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !hasAnimatedRef.current) {
                hasAnimatedRef.current = true;
                const duracao = 2000;
                const inicio = performance.now();

                const atualizar = (tempoAtual) => {
                    const tempoDecorrido = tempoAtual - inicio;
                    const progresso = Math.min(tempoDecorrido / duracao, 1);
                    const valorAtual = Math.floor(progresso * targetValue);
                    setCount(valorAtual);

                    if (progresso < 1) {
                        requestAnimationFrame(atualizar);
                    } else {
                        setCount(targetValue);
                    }
                };

                requestAnimationFrame(atualizar);
            }
        }, { threshold: 0.3 });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [targetValue]);

    return (
        <div className="metrica" ref={elementRef}>
            <span className="numero">{count}</span>
            <span className="texto">{label}</span>
        </div>
    );
};
