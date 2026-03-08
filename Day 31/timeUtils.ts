
export function formatDuration(totalSeconds: number): string {
    if (totalSeconds < 0) return "00:00";

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const pad = (num: number) => num.toString().padStart(2, '0');

    if (hours > 0) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
}

export function formatRelativeTime(date: Date | string): string {
    const timeMs = typeof date === "string" ? new Date(date).getTime() : date.getTime();
    const deltaSeconds = Math.round((Date.now() - timeMs) / 1000);

    if (deltaSeconds < 60) return 'Just now';
    if (deltaSeconds < 3600) return `${Math.floor(deltaSeconds / 60)}m ago`;
    if (deltaSeconds < 86400) return `${Math.floor(deltaSeconds / 3600)}h ago`;
    
    return `${Math.floor(deltaSeconds / 86400)}d ago`;
}
