(function () {
    validate.extend(validate.validators.datetime, {
        parse: function (value, options) {
            return +moment.utc(value);
        },
        format: function (value, options) {
            var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
            return moment.utc(value).format(format);
        },
    });
    const constraints = {
        email: {
            presence: true,
            email: {
                message: 'Please enter valid email'
            },
        },
        password: {
            presence: true,
            length: {
                minimum: 8,
            },
        },
        "confirm-password": {
            presence: true,
            equality: {
                attribute: "password",
                message: "^The passwords does not match",
            },
        },
        name: {
            presence: {
                message: "Name is required",
                allowEmpty: false,
            },
            length: {
                minimum: 3,
                maximum: 20,
            },
            exclusion: {
                within: ["nickolas", "ellen"],
                message: "'%{value}' is not allowed"
            }
        },
        phone: {
            presence: true,
            length: {
                minimum: 10,
                maximum: 11,
            },
            format: {
                pattern: "[0-9]+",
                message: "can only contain 0-9",
            },
        },
        birthday: {
            presence: true,
            datetime: {
                dateOnly: true,
                earliest: moment.utc().subtract(20, 'years'),
                latest: moment.utc().subtract(18, 'years'),
                message: "^Your age must be over 18 and less than 20"
            }
        },
        size: {
            exclusion: {
                within: ["nickolas", "ellen"],
                message: "'%{value}' is not allowed"
            },
            inclusion: {
                within: ["small", "medium", "large"],
                message: "^We're currently out of %{value}"
            }
        }
    }

    $('#form').submit((e) => {
        e.preventDefault()
        let errors = validate($('#form'), constraints, {format: "detailed"}) || {}
        console.log(errors)
        $('#error-name').html(errors.name)
        $('#error-size').html(errors.size)
        $('#error-email').html(errors.email)
        $('#error-password').html(errors.password)
        $('#error-confirm-password').html(errors['confirm-password'])
        $('#error-phone').html(errors.phone)
        $('#error-birthday').html(errors.birthday)

    })
    $('#email').blur(() => {
        let error = validate.single($('#email').val(), constraints.email) || [''];
        console.log(error);
        $('#error-email').html(error[0])
    })

    $('#name').blur(() => {
        let error = validate.single($('#name').val(), constraints.name) || [''];
        console.log(error)
        $('#error-name').html(error[0])
    })

    $('#size').blur(() => {
        let error = validate.single($('#size').val(), constraints.size) || [''];
        console.log(error)
        $('#error-size').html(error[0])
    })
    $('#password').blur(() => {
        let error = validate.single($('#password').val(), constraints.password) || [''];
        $('#error-password').html(error[0])
    })
    $('#confirm-password').blur(() => {
        let constraintsConfirm = {
            confirmPassword: {
                presence: true,
                equality: {
                    attribute: "password",
                    message: "^The passwords does not match",
                },
            }
        }
        let confirmPassword = $('#confirm-password').val();
        let password = $('#password').val()
        let confirmMessage = {
            confirmPassword: ''
        }
        let error = validate({confirmPassword, password}, constraintsConfirm) || confirmMessage;
        console.log(error)
        $('#error-confirm-password').html(error.confirmPassword)
    })

    $('#phone').blur(() => {
        let error = validate.single($('#phone').val(), constraints.phone) || [''];
        $('#error-phone').html(error[0])
    })

    $('#birthday').change(() => {
        let error = validate.single($('#birthday').val(), constraints.birthday) || [''];
        $('#error-birthday').html(error[0])
    })
})();