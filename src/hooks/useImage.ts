import { useEffect, useState } from 'react';

const useImage = (fileName: string, type: "champion" | "trait" | "champion-icon" | "flag") => {
    const folder = type === "champion" ? "champions-tiles" : type === "champion-icon" ? "champions-icons" : type === "trait" ? "traits" : "locales";
    const [image, setImage] = useState("");

    useEffect(() => {
        const fetchImage = async () => {
            const response = await import(`../assets/${folder}/${type === 'trait' ? fileName.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() : fileName}.${type === 'flag' ? 'svg' : 'png'}`);
            setImage(response.default);
        }

        fetchImage();
    }, [fileName]);

    return image;
}

export default useImage;