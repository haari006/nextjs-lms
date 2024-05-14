function getProgressColor(progress: number) {
    if (progress < 25) {
        return "#ff4d4d"; // Red for 0-24%
    } else if (progress < 50) {
        return "#ffae42"; // Orange for 25-49%
    } else if (progress < 75) {
        return "#ffd24d"; // Yellow for 50-74%
    } else {
        return "#4dff4d"; // Green for 75-100%
    }
}

export default getProgressColor;
