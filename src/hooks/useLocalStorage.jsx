import { useEffect, useState } from "react";

export default function useLocalStorage(initialData, key) {
    const [value, setValue] = useState(() => {
        const obj = localStorage.getItem(key);
        return obj ? JSON.parse(obj) : initialData;
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}
