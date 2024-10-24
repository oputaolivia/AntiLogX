# AntiLogX

A Chrome extension that encrypts keystrokes.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Architecture and Design](#architecture-and-design)
- [Contributing](#contributing)
- [License](#license)
- [Contact Information](#contact-information)

## Introduction

AntiLogX is a browser extension that encrypts keystrokes in real time, protecting them from being captured by keyloggers. By leveraging AES encryption and rotating encryption keys every 60 seconds, this project ensures that even if keyloggers intercept the keystrokes, they remain unreadable.

The extension works in the background, encrypting all typed inputs in web forms and decrypting them just before submission, with minimal performance impact and seamless user experience.. Keyloggers are malicious programs that record keystrokes, potentially capturing sensitive information such as passwords and credit card numbers. AntiLogX provides a robust solution to protect users from such threats.

## Installation

### Prerequisites
- Google Chrome.
- Node.js and npm for building the extension if you wish to modify the source code.

### Steps to Install:

1. Clone the repository:
    ```sh
    git clone https://github.com/oputaolivia/AntiLogX.git
    ```
2. Navigate to the project directory:
    ```sh
    cd AntiLogX
    ```
3. Load the extension in Chrome:
    - Open Chrome and go to `chrome://extensions/`.
    - Enable "Developer mode" by clicking the toggle switch in the top right corner.
    - Click the "Load unpacked" button and select the `AntiLogX` directory.
4. The extension should now appear in your browser.
   
## Usage

After installing the extension, it will automatically begin monitoring for keylogging activities. You can access the extension's settings and logs by clicking on the AntiLogX icon in the Chrome toolbar.

## Features

- **AES Encryption**: Keystrokes are encrypted using the Advanced Encryption Standard (AES), providing robust security.
- **Dynamic Key Rotation**: The encryption key changes every 60 seconds, minimizing the attack window for keyloggers.
- **Real-Time Encryption**: Keystrokes are encrypted instantly upon entry and decrypted only when necessary.
- **User Control**: Users can toggle keystroke monitoring on and off via the extension’s interface.
- **Minimal Impact on Usability**: The system handles special keys and input fields without disrupting the user experience.

## How It Works
- **Keystroke Capture**: The extension listens for all keystrokes using a keydown event listener.
- **Encryption**: Each keystroke is encrypted using AES with a 128-bit key, generated dynamically.
- **Decryption**: The system decrypts the keystroke in real time before inserting it into the input field.
- **Key Rotation**: The encryption key is rotated every 60 seconds to enhance security, ensuring that even if a keylogger captures the key, it becomes obsolete after a short time.

## Architecture and Design

### Overview

The architecture of AntiLogX is divided into several components:

- **Content Scripts**: Injected into web pages to monitor keystrokes and detect keylogging activities.
- **Background Scripts**: Handle complex logic and communicate with content scripts.
- **Popup**: Provides the user interface for interacting with the extension.

### Components

1. **Content Scripts**:
    - Monitors keystrokes.
    - Detects suspicious activities.

2. **Background Scripts**:
    - Communicates with content scripts.
    - Manages detected threats and logs.

3. **Popup**:
    - User interface for settings and logs.

### Design Patterns

The project follows modular design principles to ensure maintainability and scalability. Each component is designed to perform specific tasks and can be independently updated or replaced.

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature-name
    ```
3. Make your changes.
4. Commit your changes:
    ```sh
    git commit -m 'Add some feature'
    ```
5. Push to the branch:
    ```sh
    git push origin feature-name
    ```
6. Open a pull request.

Please ensure your code follows our coding guidelines and includes tests for new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact Information

For any inquiries or feedback, please contact Olivia Oputa at [oputaolivia123@gmail.com](oputaolivia123@gmail.com).
