const form = document.querySelector('#form')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const password2 = document.querySelector('#password2')
const formEntry = document.querySelector('#form__entry')


const getFieldName = input => `${input.id.slice(0,1).toUpperCase()}${input.id.slice(1).toLowerCase()}`

const showError = (input, message) => {
    const formContainer = input.parentElement
    formContainer.className = 'form__entry error'
    const small = formContainer.querySelector('small')
    small.textContent = message
}

const showSuccess = (input) => {
    const formContainer = input.parentElement
    formContainer.className = 'form__entry success'
}

function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function(input) {
      if (input.value.trim() === '') {
        showError(input, `${getFieldName(input)} is required`);
        isRequired = true;
      } else {
        showSuccess(input);
      }
    });
  
    return isRequired;
  }

const isValidEmail = input => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, 'Email is not valid');
    }
}

const checkForLength = (input, min) => {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must contains at least ${min} caracters`)
    } else {
        showSuccess(input)
    }
}

// const checkRegexPassword = input => {
//     const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
//     if(pwdRegex.test(input.value)) {
//         showSuccess(input);
//     } else {
//         showError(input, `${getFieldName(input)} must contain at least 1 digit`);
//     }
// }

const checkPasswordSame = (input, input2) => {
    if(input.value === input2.value) {
        showSuccess(input)
    } else {
        showError(input2, `password must be the same`)
    }
} 

function submitForm(e) {
    e.preventDefault()
    if(!checkRequired([username, email, password, password2])) {
        checkForLength(username, 6)
        checkForLength(password, 8)
        isValidEmail(email)
        //checkRegexPassword(password)
        checkPasswordSame(password, password2)
    }

}

form.addEventListener('submit', submitForm)