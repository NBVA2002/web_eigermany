function sigup() {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var password = document.getElementById("password").value;

    var user = {
        username: username,
        phone: phone,
        email: email,
        address: address,
        password: password
    }

    var hasuser = localStorage.getItem(username);
    if (hasuser) {
        alert("Email đã tồn tại")
        return;
    } else {
        alert("Đăng ký thành công")
        var json = JSON.stringify(user);
        localStorage.setItem(email, json);
    }

}


function validate(inputElement, rule) {
    var errorMessage = rule.test(inputElement.value);
    if (errorMessage) {
        var string = inputElement.placeholder;
        inputElement.setAttribute("placeholder", errorMessage);
        inputElement.parentElement.classList.add('invalid');

        setTimeout(function () {
            inputElement.setAttribute("placeholder", string);
            inputElement.parentElement.classList.remove('invalid');
        }, 1000);
    }
    return !errorMessage;
}

function Validator(option) {
    var formElement = document.querySelector('.register-form');

    if (formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            option.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            })

            if (isFormValid) {
                sigup()
            }
        }

        option.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }
            }
        });
    }
}

Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            if (value.trim()) {
                return undefined
            }
            return 'Vui lòng nhập trường này'
        }
    }
}

Validator.isPhone = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
            if (regex.test(value)) {
                return undefined
            }
            return 'Trường này phải là số điện thoại'
        }
    }
}

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (regex.test(value)) {
                return undefined
            }
            return 'Trường này phải là email'
        }
    }
}

Validator.isAddress = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            if (value.trim()) {
                return undefined
            }
            return 'Vui lòng nhập trường này'
        }
    }
}
Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            if (value.length >= min) {
                return undefined
            }
            return `Vui lòng nhập tối thiểu ${min} kí tự`
        }
    }
}

function showPassword() {
    var eye = document.getElementById('eye');
    eye.classList.toggle('logo-showpass')
    if(eye.classList.contains('logo-showpass')){
        document.getElementById("password").setAttribute("type", "password")
    } else {
        document.getElementById("password").setAttribute("type", "text")
    }
    console.log(eye.classList)
}