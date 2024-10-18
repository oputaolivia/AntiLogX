document.getElementById('toggle-btn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleMonitoring' }, (response) => {
            const statusSpan = document.getElementById('status');
            if (statusSpan.textContent === 'Monitoring') {
                statusSpan.textContent = 'Paused';
            } else {
                statusSpan.textContent = 'Monitoring';
            }
        });
    });
});
