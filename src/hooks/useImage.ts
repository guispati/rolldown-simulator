import { useEffect, useState } from 'react';

const useImage = (fileName: string, type: "champion" | "trait" | "champion-icon") => {
    const folder = type === "champion" ? "champions-tiles" : type === "champion-icon" ? "champions-icons" : "traits";
    const [image, setImage] = useState("");

    useEffect(() => {
        const fetchImage = async () => {
            const response = await import(`../assets/${folder}/${fileName.toLowerCase()}.png`);
            setImage(response.default);
        }

        fetchImage();
    }, [fileName]);

    return image;
}

export default useImage;