function sigin() {
    event.preventDefault();
    var acount = document.getElementById("account").value;
    var password = document.getElementById("password").value;

    var user = localStorage.getItem(acount);
    var data = JSON.parse(user);
    if(!data){
        alert("Tài khoản không tồn tại")
    } else if (data.email == acount && data.password == password) {
        window.location.href = "../homepage_b/index.html"
    } else if (data.email == acount && data.password != password) {
        alert("Nhập sai mật khẩu")
    } else  {
        alert("Đăng nhập thất bại")
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
    var formElement = document.querySelector('.login-form');

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
                sigin()
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

Validator.isAcount = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            var regex2 = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
            if (regex.test(value) && value.length <= 100) {
                return undefined
            }
            return 'Vui lòng nhập email hoặc số điện thoại'
        }
    }
}


Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            if (value.length >= min  && value.length <= 200) {
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
}