export async function generateImage(imageCaption: string): Promise<string> {
    const response = await fetch('/api/gen/imageGeneration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: imageCaption }),
    });
    const data = await response.json();
    return data.result.data[0].url
};