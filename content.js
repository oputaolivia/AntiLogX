let isMonitoring = true;

function generateKey() {
    return CryptoJS.lib.WordArray.random(128 / 8).toString();
}

let encryptionKey = generateKey();  
let previousKey = encryptionKey; 
const rotationInterval = 60000; 


function rotateKey() {
    previousKey = encryptionKey; 
    encryptionKey = generateKey(); 
}

// Start rotating keys every 60 seconds
setInterval(rotateKey, rotationInterval);

function encrypt(text) {
    return CryptoJS.AES.encrypt(text, encryptionKey).toString();
}

function decrypt(text) {
    try {
        return CryptoJS.AES.decrypt(text, encryptionKey).toString(CryptoJS.enc.Utf8);
    } catch (error) {
        try {
            return CryptoJS.AES.decrypt(text, previousKey).toString(CryptoJS.enc.Utf8);
        } catch (error) {
            return null;
        }
    }
}


const specialKeys = [
    'Backspace', 'Tab', 'Enter', 'Shift', 'Control', 'Alt', 'CapsLock', 'Escape',
    'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'Delete', 'Meta', 'Home', 'End', 
    'PageUp', 'PageDown', 'Insert'
];

function handleKeystrokes(event) {
    if (!isMonitoring) return;

    // Capture the key pressed
    const key = event.key;

    if (specialKeys.includes(key)) {
        return;
    }

    const encryptedKey = encrypt(key);

    // Decrypt the keystroke and simulate it in the input field (for demonstration)
    event.preventDefault();
    const decryptedKey = decrypt(encryptedKey);

    // Insert the decrypted key into the input field
    const inputField = event.target;
    
    // Handle input fields that support selection ranges like text, search, etc.
    if (['text', 'search', 'url', 'tel', 'password'].includes(inputField.type)) {
        const start = inputField.selectionStart;
        const end = inputField.selectionEnd;
        
        inputField.value = inputField.value.substring(0, start) + decryptedKey + inputField.value.substring(end);
        inputField.setSelectionRange(start + 1, start + 1);
    } else {
        inputField.value += decryptedKey;
    }
}

document.addEventListener('keydown', handleKeystrokes);

// Listen for messages from the popup script to toggle monitoring
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'toggleMonitoring') {
        isMonitoring = !isMonitoring;
        alert(`Keylogging detection is now ${isMonitoring ? 'ON' : 'OFF'}`);
    }
});


document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (event) => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach((input) => {
            input.value = decrypt(input.value);
        });
    });
});