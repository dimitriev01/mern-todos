export const openLink = (url: string, newTab = false) => {
    window.open(url, newTab ? '_blank' : '_self');
};
