document.addEventListener('DOMContentLoaded', () => {
    const statusSpan = document.getElementById('status');
    const toggleSwitch = document.getElementById('toggle-switch');

    // Retrieve the stored state
    chrome.storage.sync.get(['monitoringState'], (result) => {
        const isMonitoring = result.monitoringState !== undefined ? result.monitoringState : true;
        statusSpan.textContent = isMonitoring ? 'ON' : 'Paused';
        statusSpan.classList.toggle('paused', !isMonitoring);
        toggleSwitch.checked = isMonitoring;

        // Inform content script about the initial state
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'setMonitoring', state: isMonitoring });
        });
    });

    // Add event listener for the switch
    toggleSwitch.addEventListener('change', (event) => {
        const isMonitoring = event.target.checked;
        statusSpan.textContent = isMonitoring ? 'ON' : 'Paused';
        statusSpan.classList.toggle('paused', !isMonitoring);

        // Store the new state
        chrome.storage.sync.set({ monitoringState: isMonitoring });

        // Inform content script about the new state
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleMonitoring', state: isMonitoring });
        });
    });
});