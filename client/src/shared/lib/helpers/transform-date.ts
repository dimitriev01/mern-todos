export const getPreviousWeek = (count = 1) => {
    const now = new Date();

    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7 * count);
};

export const getDayFromNow = (day = 1) => {
    const now = new Date();

    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + day);
};
