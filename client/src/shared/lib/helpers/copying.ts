export const copying = async (value: string | number | undefined) => {
    if (value) {
        const response = await navigator.clipboard.writeText(`${value}`);
        return response;
    }
    throw new Error('Does not exist value for copy');
};
