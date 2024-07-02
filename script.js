document.addEventListener('DOMContentLoaded', () => {
    const updateTimeAndDay = () => {
        const utcTime = new Date().toUTCString().split(' ')[4];
        const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });
        
        document.getElementById('utc-time').textContent = utcTime;
        document.getElementById('current-day').textContent = currentDay;
    };

    updateTimeAndDay();
    setInterval(updateTimeAndDay, 1000); // Update every second
});