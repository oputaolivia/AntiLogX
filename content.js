let isMonitoring = true;

// AES encryption key
const encryptionKey = "secret_key_123";

// Encrypt function using CryptoJS AES
function encrypt(text) {
    return CryptoJS.AES.encrypt(text, encryptionKey).toString();
}

// Decrypt function using CryptoJS AES
function decrypt(text) {
    return CryptoJS.AES.decrypt(text, encryptionKey).toString(CryptoJS.enc.Utf8);
}

// List of special keys that should not be processed
const specialKeys = [
    'Backspace', 'Tab', 'Enter', 'Shift', 'Control', 'Alt', 'CapsLock', 'Escape',
    'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'Delete', 'Meta', 'Home', 'End', 
    'PageUp', 'PageDown', 'Insert'
];

// Detect keystrokes, encrypt, and prevent them from being logged
function handleKeystrokes(event) {
    if (!isMonitoring) return;

    // Capture the key pressed
    const key = event.key;

    // Check if the key is a special key
    if (specialKeys.includes(key)) {
        return; // Do nothing for special keys
    }

    // Encrypt the keystroke
    const encryptedKey = encrypt(key);

    // Output the encrypted keystroke in the console (This is where a keylogger would fail)
    console.log(`Encrypted key pressed: ${encryptedKey}`);

    // Decrypt the keystroke and simulate it in the input field (for demonstration)
    event.preventDefault();
    const decryptedKey = decrypt(encryptedKey);
    console.log(`Decrypted key pressed: ${decryptedKey}`);

    // Insert the decrypted key into the input field
    const inputField = event.target;
    
    // Handle input fields that support selection ranges like text, search, etc.
    if (['text', 'search', 'url', 'tel', 'password'].includes(inputField.type)) {
        const start = inputField.selectionStart;
        const end = inputField.selectionEnd;
        
        inputField.value = inputField.value.substring(0, start) + decryptedKey + inputField.value.substring(end);
        inputField.setSelectionRange(start + 1, start + 1);
    } else {
        // For types that don't support setSelectionRange (email, number, etc.), just append the decrypted key
        inputField.value += decryptedKey;
    }
}

// Attach the keystroke handler to all input fields
document.addEventListener('keydown', handleKeystrokes);

// Listen for messages from the popup script to toggle monitoring
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'toggleMonitoring') {
        isMonitoring = !isMonitoring;
        console.log(`Keylogging detection is now ${isMonitoring ? 'ON' : 'OFF'}`);
    }
});


document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (event) => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach((input) => {
            // Decrypt any encrypted input before submitting
            input.value = decrypt(input.value);
        });
    });
});