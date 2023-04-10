// Generate a random password with uppercase letters, lowercase letters, and digits
function generatePassword(length) {
    let chars = '';

    console.log(!includeNumbers.checked && !includeSymbols.checked && !includeUppercase.checked && !includeLowercase.checked);

    if (!includeNumbers.checked && !includeSymbols.checked && !includeUppercase.checked && !includeLowercase.checked) {
        return [false, 'Choose option'];
    }

    if (includeNumbers.checked) {
        chars += '0123456789';
    }
    if (includeSymbols.checked) {
        chars += '!@#$%^&*_+~?><=';
    }
    if (includeUppercase.checked) {
        chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (includeLowercase.checked) {
        chars += 'abcdefghijklmnopqrstuvwxyz';
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * chars.length);
        password += chars.charAt(index);
    }
    return [true, password];
}

let infoTimeout = undefined;

// Generate a new password and display it in the input field
function generateNewPassword() {
    const show = document.getElementById('show');
    const length = passLen.value;

    const [success, password] = generatePassword(length);
    
    show.textContent = password;

    if (!success) {
        return;
    }

    //copy to clipboard
    navigator.clipboard.writeText(password);

    //store last 10 passwords
    const recentPasswords = JSON.parse(localStorage.getItem('recentPasswords')) || [];
    recentPasswords.push(password);
    if (recentPasswords.length > 10) {
        recentPasswords.shift();
    }
    localStorage.setItem('recentPasswords', JSON.stringify(recentPasswords));

    

    //generateButton.style.backgroundColor = 'lime';
    generateButton.textContent = 'Copied!';
    //clear info after 3 seconds
    if (infoTimeout) {
        clearTimeout(infoTimeout);
    }
    infoTimeout = setTimeout(() => {
        //generateButton.style.backgroundColor = 'var(--button-color)';
        generateButton.textContent = 'Generate';
        show.textContent = '----------';
    }, 2000);
}

// Add a click listener to the Generate Password button
const generateButton = document.getElementById('generateButton');
const lenLabel = document.getElementById('lenLabel');
const passLen = document.getElementById('passLen');
const recentBtn = document.getElementById('recentBtn');
const clear = document.getElementById('clear');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');

//find if localstorage has include checkbox values
const includeNumbersValue = localStorage.getItem('includeNumbers');
const includeSymbolsValue = localStorage.getItem('includeSymbols');
const includeUppercaseValue = localStorage.getItem('includeUppercase');
const includeLowercaseValue = localStorage.getItem('includeLowercase');

if (!includeNumbersValue) {
    localStorage.setItem('includeNumbers', true);
    includeNumbers.checked = true;
} else {
    includeNumbers.checked = includeNumbersValue === 'true';
}

if (!includeSymbolsValue) {
    localStorage.setItem('includeSymbols', true);
    includeSymbols.checked = true;
} else {
    includeSymbols.checked = includeSymbolsValue === 'true';
}

if (!includeUppercaseValue) {
    localStorage.setItem('includeUppercase', true);
    includeUppercase.checked = true;

} else {
    includeUppercase.checked = includeUppercaseValue === 'true';
}

if (!includeLowercaseValue) {
    localStorage.setItem('includeLowercase', true);
    includeLowercase.checked = true;
} else {
    includeLowercase.checked = includeLowercaseValue === 'true';
}

//find if localstorage has passLen value
const passLenValue = localStorage.getItem('passLen');
if (!passLenValue) {
    localStorage.setItem('passLen', 10);
    passLen.value = 10;
    lenLabel.textContent = `Password length: ${passLen.value}`;
} else {
    passLen.value = passLenValue;
    lenLabel.textContent = `Password length: ${passLen.value}`;
}

includeNumbers.addEventListener('change', () => {
    localStorage.setItem('includeNumbers', includeNumbers.checked);
});

includeSymbols.addEventListener('change', () => {
    localStorage.setItem('includeSymbols', includeSymbols.checked);
});

includeUppercase.addEventListener('change', () => {
    localStorage.setItem('includeUppercase', includeUppercase.checked);
});

includeLowercase.addEventListener('change', () => {
    localStorage.setItem('includeLowercase', includeLowercase.checked);
});

generateButton.addEventListener('click', generateNewPassword);

passLen.addEventListener('input', () => {
    lenLabel.textContent = `Password length: ${passLen.value}`;
    localStorage.setItem('passLen', passLen.value);
});

recentBtn.addEventListener('click', () => {
    //load recent passwords
    const recentPasswords = JSON.parse(localStorage.getItem('recentPasswords')) || [];
    
    const recentPasswordsContainer = document.getElementById('recentPasswordsContainer');
    recentPasswordsContainer.innerHTML = '';
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

clear.addEventListener('click', () => {
    localStorage.removeItem('recentPasswords');
    document.querySelector('.back').click();
});