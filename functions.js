/* ---------- DODANIE KLASY "ACTIVE" DO PRZYCISKU, PO KLIKNIĘCIU GO ---------- */

var btns = document.getElementsByClassName("placeholder-1");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// ---------- WALIDACJA EMAILA I HASEŁ POD KĄTEM BŁĘDÓW W TRAKCIE PISANIA ---------

// Kryteria walidacji pola tekstowego z imieniem

function testText(field, passwordlength) {
  return field.value.length >= passwordlength;
}

// Kryteria walidacji pola tekstowego z adresem email

function testEmail(field) {
  const reg = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/;
  return reg.test(field.value);
};

// Kryteria walidacji pola tekstowego z potwierdzeniem hasła

function testPassword(field) {
  return field.value.length > 0 && field.value === password1.value;
}

// Dodanie klasy field-error do pola, która zmienia kolor pola na czerowny

function markFieldAsError(field, show) {
  if (show) {
      field.classList.add("field-error");
  } else {
      field.classList.remove("field-error");
  }
};

// Stałe

const form = document.querySelector("form");
const inputName = form.querySelector("input[name=name]");
const inputEmail = form.querySelector("input[name=email]");
const inputPassword1 = form.querySelector("input[name=password1]");
const inputPassword2 = form.querySelector("input[name=password2]");
const formMessage = form.querySelector("#errors");

// Nasłuchiwanie podczas wpisywania

inputName.addEventListener("input", e => markFieldAsError(e.target, !testText(e.target, 3)));
inputEmail.addEventListener("input", e => markFieldAsError(e.target, !testEmail(e.target)));
inputPassword1.addEventListener("input", e => markFieldAsError(e.target, !testText(e.target, 8)));
inputPassword2.addEventListener("input", e => markFieldAsError(e.target, !testPassword(e.target)));

// Powstrzymanie natychmiastowego wysłania formularza przed walidacją, po kliknięciu przycisku

form.addEventListener("submit", e => {
    e.preventDefault();

// Pojemnik na błędy

    let formErrors = [];

// Ukrycie błędów przed walidacją

    for (const el of [inputName, inputEmail, inputPassword1, inputPassword2]) {
      markFieldAsError(el, false);
  }

// Testowanie pól pod względem zgodności z kryteriami

  if (!testText(inputName, 3)) {
      markFieldAsError(inputName, true);
      formErrors.push("Imię musi mieć co najmniej 3 znaki");
  }

  if (!testEmail(inputEmail)) {
      markFieldAsError(inputEmail, true);
      formErrors.push("Adres E-mail jest niepoprawny");
  }

  if (!testText(inputPassword1, 8)) {
    markFieldAsError(inputPassword1, true);
    formErrors.push("Hasło musi mieć co najmniej 8 znaków");
  }

  if (!testPassword(inputPassword2)) {
    markFieldAsError(inputPassword2, true);
    formErrors.push("Hasła nie są identyczne");
  }

// Wysłanie formularza, jeśli nie ma błędów

    if (!formErrors.length) {

      adduser();
      // e.target.submit();

    } 
    
// Jeśli są, zostają oznaczone w tekście

    else {
        formMessage.innerHTML =  formErrors.map(el => `<li>${el}</li>`).join("");
        ;
    }
});

/* ---------- ANIMACJA FORMULARZA PO KLIKNIĘCIU PRZYCISKU REJESTRACJI ---------- */

function adduser() {
  var form = document.getElementById("wrapper");
  form.classList.add('hide');
  send();
}

function send() {
  var preloader = document.getElementById("preloader");
  var loader = document.getElementById("loader");
  preloader.classList.add( "show");
  loader.classList.add( "clicked");
  check();
}

function check() {
  setTimeout(function() {
    loader.classList.remove( "clicked");
    loader.classList.add( "confirm");
    reload();
  }, 4000 );
};

function reload() {
  setTimeout(function() {
    location.reload();
  }, 5000 );
};