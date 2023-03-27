import render from './main.js';
var render1 = render;

 function validator(options) {
        // lay form members
        var formMember  = document.querySelector('#form')
        var users = 'http://localhost:3000/users';

    function createCourses(data,callback) {
        var option = {
            method : 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify(data)
        };
        fetch(users,option) 
            .then(function(response){
                return response.json()   
            })
            .then(callback)
    }

        // ham xu ly validate
         function validate(rule, inputElement) {
            var errorInput = inputElement.closest('.form-group').querySelector('.form-message');
            var errorElement = rule.test(inputElement.value)
                  
                    if(errorElement) {
                        errorInput.innerText = errorElement;
                        inputElement.closest('.form-group').classList.add('invalid')
                    }

                    return !!errorElement;
        }

    
    // lap qua rules lay input
    options.rules.forEach(rule => {
        var inputElement = formMember.querySelector(rule.selector)
        var errorInput = inputElement.closest('.form-group').querySelector('.form-message');
            // validate(rule,inputElement)
        
            if(inputElement) {
                inputElement.onblur = () => {
                      validate(rule, inputElement)
                }

                inputElement.oninput = function() { 
                    errorInput.innerText = '';
                    inputElement.closest('.form-group').classList.remove('invalid')
                }
            }

    });

       function create(){
        var createElement = formMember.querySelector('#create')
                if(createElement) {
                    var isflag = false 
                createElement.onclick = function(){
                    options.rules.forEach(rule => {
                var inputElement = formMember.querySelector(rule.selector)
                         var invalid = validate(rule,inputElement) // true(co loi)
                        
                        if(!invalid) {
                            isflag = true
                        }
                    });
                    // check form 
                    if(isflag) {
                       var name = document.querySelector('input[name="name"]').value;
                       var email = document.querySelector('input[name="email"]').value;
                        
                       var formData = {
                            name,email
                       }
                       
                        createCourses(formData, function() {
                            render1()
                        })


                    }
                }
            }
        };
        create()

 


} ;






validator.isRequired = function(selector) {
    return {
        selector,
        test:function(value) {
            return value.trim() ? undefined : 'vui long nhap truong nay'
        }
    }
}


validator.isEmail = function(selector) {
    return {
        selector,
        test:function(value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
             return regex.test(value) ? undefined : 'vui long nhap email'
        }
    }
}




validator({ 
    form: '#form',
    rules:[
        validator.isRequired('#fullname'),
        validator.isEmail('#email')
    ]
})

