let isMonitoring = true;

function detectKeylogging(event) {
    if (!isMonitoring) return;

    // Capture and log the keystroke for analysis
    const key = event.key;
    console.log(`Key pressed: ${key}`);

    // Simple detection logic for demonstration purposes:
    // If more than 5 keystrokes are logged within 1 second, alert the user.
    const currentTime = Date.now();
    if (!window.keylogData) {
        window.keylogData = {
            lastTime: currentTime,
            keystrokes: 0
        };
    }
    
    const timeDiff = currentTime - window.keylogData.lastTime;
    if (timeDiff < 1000) {
        window.keylogData.keystrokes++;
        if (window.keylogData.keystrokes > 5) {
            alert("Potential keylogger detected! Be cautious.");
        }
    } else {
        window.keylogData.lastTime = currentTime;
        window.keylogData.keystrokes = 1;
    }
}

// Add event listener to monitor keystrokes
document.addEventListener('keydown', detectKeylogging);

// Listen for messages from the popup script to toggle monitoring
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'toggleMonitoring') {
        isMonitoring = !isMonitoring;
        console.log(`Keylogging detection is now ${isMonitoring ? 'ON' : 'OFF'}`);
    }
});
