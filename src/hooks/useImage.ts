import { useEffect, useState } from 'react';

const useImage = (fileName: string, type: "champion" | "trait") => {
    const folder = type === "champion" ? "champions-tiles" : "traits";
    const [image, setImage] = useState("");

    console.log(`../assets/${folder}/${fileName}`);

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