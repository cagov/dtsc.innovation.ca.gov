var map = L.map('map').setView([34.1123495573206, -117.31944347283586], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([34.1123495573206, -117.31944347283586]).addTo(map);


/* display different address options: email vs post - based on radio toggles */
document.querySelector('#contact-method-email').addEventListener('click',function(e) {
  if(document.querySelector('#contact-method-post').checked) {
    document.querySelector('.postal-mail-field').classList.add('d-none');
    document.querySelector('#contact-method-post').checked = false;
  }
  document.querySelector('.email-field').classList.remove('d-none');
})

document.querySelector('#contact-method-post').addEventListener('click',function(e) {
  if(document.querySelector('#contact-method-email').checked) {
    document.querySelector('.email-field').classList.add('d-none');
    document.querySelector('#contact-method-email').checked = false;
  }
  document.querySelector('.postal-mail-field').classList.remove('d-none');
})

/* form validation */
let commentForm = document.getElementById('comment-form');
document.getElementById('comment-form').addEventListener('submit', function(event) {
  event.preventDefault();

  runFormValidationLogic();

})


function runFormValidationLogic() {
  // reset all errors to disp none
  commentForm.querySelectorAll('.form-error').forEach(el => {
    el.style.display = 'none';
  })
  let formValid = true;

  // name can't be blank, comment can't be blank
  let fieldsThatCannotBeBlank = ['commentor-name','comments']

  // a rating must be chosen
  if(!document.querySelector('#sat-yes').checked && !document.querySelector('#sat-no').checked && !document.querySelector('#sat-not-sure').checked) {
    commentForm.querySelector(`.form-error.satisfaction-field`).style.display = 'block';
  }

  // if email radio selected email must match regex
  if(document.querySelector('#contact-method-email').checked) {
    fieldsThatCannotBeBlank.push('email-address');
    let emailAddressField = document.getElementById('email-address');
    if(emailAddressField.value.indexOf('@') < 0 || emailAddressField.value.indexOf('.') < emailAddressField.value.indexOf('@')) {
      commentForm.querySelector(`.form-error.email-address-field`).style.display = 'block';
      emailAddressField.setAttribute('aria-invalid','true');
      formValid = false;
    }
  }
  // if post radio selected address can't be blank
  if(document.querySelector('#contact-method-post').checked) {
    fieldsThatCannotBeBlank.push('post-address');
  }

  fieldsThatCannotBeBlank.forEach(fieldName => {
    if(document.getElementById(fieldName) && document.getElementById(fieldName).value === '') {
      commentForm.querySelector(`.form-error.${fieldName}-field`).style.display = 'block';
      document.getElementById(fieldName).setAttribute('aria-invalid','true');
      formValid = false;
    }
  })

  // a contact method must be chosen
  if(!document.querySelector('#contact-method-email').checked && !document.querySelector('#contact-method-post').checked) {
    commentForm.querySelector(`.form-error.contact-method-field`).style.display = 'block';
  }

  // if any of those fail display general error under submit button
  if(!formValid) {
    commentForm.querySelector('.form-error.full-form-field').style.display = 'block';
  }
}

// revalidate on field changes
let fieldsToWatchForChange = ['commentor-name','comments','email-address','post-address','contact-method-email', 'contact-method-post'];
fieldsToWatchForChange.forEach(fieldToValidate => {
  document.getElementById(fieldToValidate).addEventListener('change',runFormValidationLogic);
})