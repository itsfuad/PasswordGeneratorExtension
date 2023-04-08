// Generate a random password with uppercase letters, lowercase letters, and digits
function generatePassword(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * chars.length);
        password += chars.charAt(index);
    }
    return password;
}

let infoTimeout = undefined;

// Generate a new password and display it in the input field
function generateNewPassword() {
    const show = document.getElementById('show');
    const length = passLen.value;
    const password = generatePassword(length); // Change the length here if desired
    show.textContent = password;
    //copy to clipboard
    navigator.clipboard.writeText(password);

    //store last 10 passwords
    const recentPasswords = JSON.parse(localStorage.getItem('recentPasswords')) || [];
    recentPasswords.push(password);
    if (recentPasswords.length > 10) {
        recentPasswords.shift();
    }
    localStorage.setItem('recentPasswords', JSON.stringify(recentPasswords));

    

    generateButton.style.backgroundColor = 'lime';
    generateButton.textContent = 'Copied!';
    //clear info after 3 seconds
    if (infoTimeout) {
        clearTimeout(infoTimeout);
    }
    infoTimeout = setTimeout(() => {
        generateButton.style.backgroundColor = 'var(--button-color)';
        generateButton.textContent = 'Generate';
        show.textContent = '----------';
    }, 2000);
}

// Add a click listener to the Generate Password button
const generateButton = document.getElementById('generateButton');
const lenLabel = document.getElementById('lenLabel');
const passLen = document.getElementById('passLen');
const recentBtn = document.getElementById('recentBtn');
generateButton.addEventListener('click', generateNewPassword);

passLen.addEventListener('input', () => {
    lenLabel.textContent = `Password length: ${passLen.value}`;
});

recentBtn.addEventListener('click', () => {
    //load recent passwords
    const recentPasswords = JSON.parse(localStorage.getItem('recentPasswords')) || [];
    
    const recentPasswordsContainer = document.getElementById('recentPasswordsContainer');
    if (recentPasswords.length === 0) {
        recentPasswordsContainer.innerHTML = '<p class="empty">No recent passwords</p>';
    }
    recentPasswords.forEach((password) => {
        const recentPassword = document.createElement('div');
        recentPassword.classList.add('recentPassword');
        recentPassword.textContent = password;
        recentPasswordsContainer.append(recentPassword);
    });
    document.querySelector('.generatorContainer').classList.add('hide');
    document.querySelector('.recent').classList.remove('hide');
});

document.querySelector('.back').addEventListener('click', () => {
    document.querySelector('.generatorContainer').classList.remove('hide');
    document.querySelector('.recent').classList.add('hide');
});