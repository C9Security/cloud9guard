/*!
* Start Bootstrap - Agency v7.0.11 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    (function () {
  "use strict";
  /*
   * Form Validation
   */

  // Fetch all the forms we want to apply custom validation styles to
  const forms = document.querySelectorAll(".needs-validation");
  const result = document.getElementById("result");
  console.log("REsult", result)
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();

          form.querySelectorAll(":invalid")[0].focus();
        } else {
          /*
           * Form Submission using fetch()
           */

          const formData = new FormData(form);
          event.preventDefault();
          event.stopPropagation();
          const object = {};
          console.log("FormData", formData);
          formData.forEach((value, key) => {
            object[key] = value;
          });
          const json = JSON.stringify(object);
          result.innerHTML = "Please wait...";
          console.log("JSON", json);
          console.log(result.innerHTML);

          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: json
          })
            .then(async (response) => {
              let json = await response.json();
              if (response.status == 200) {
                result.innerHTML = json.message;
                result.classList.remove("text-red-500");
                result.classList.add("text-green-500");
                console.log("YYYY", json.message)
              } else {
                console.log(response);
                result.innerHTML = json.message;
                result.classList.remove("text-red-500");
                result.classList.add("text-red-500");
                
              }
            })
            .catch((error) => {
              console.log(error);
              result.innerHTML = "Something went wrong!";
            })
            .then(function () {
              form.reset();
              form.classList.remove("was-validated");
              setTimeout(() => {
                result.style.display = "none";
              }, 5000);
            });
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

});

var zChar = new Array(' ', '(', ')', '-', '.');
  var maxphonelength = 13;
  var phonevalue1;
  var phonevalue2;
  var cursorposition;

  //Phone number validation
  function ParseForNumber1(object) {
    phonevalue1 = ParseChar(object.value, zChar);
  }

  function ParseForNumber2(object) {
      phonevalue2 = ParseChar(object.value, zChar);
  }

  function backspacerUP(object, e) {
      if (e) {
          e = e
      } else {
          e = window.event
      }
      if (e.which) {
          var keycode = e.which
      } else {
          var keycode = e.keyCode
      }

      ParseForNumber1(object)

      if (keycode >= 48) {
          ValidatePhone(object)
      }
  }

  function backspacerDOWN(object, e) {
      if (e) {
          e = e
      } else {
          e = window.event
      }
      if (e.which) {
          var keycode = e.which
      } else {
          var keycode = e.keyCode
      }
      ParseForNumber2(object)
  }

  function GetCursorPosition() {

      var t1 = phonevalue1;
      var t2 = phonevalue2;
      var bool = false
      for (i = 0; i < t1.length; i++) {
          if (t1.substring(i, 1) != t2.substring(i, 1)) {
              if (!bool) {
                  cursorposition = i
                  bool = true
              }
          }
      }
  }

  function ValidatePhone(object) {

      var p = phonevalue1

      p = p.replace(/[^\d]*/gi, "")

      if (p.length < 3) {
          object.value = p
      } else if (p.length == 3) {
          pp = p;
          d4 = p.indexOf('(')
          d5 = p.indexOf(')')
          if (d4 == -1) {
              pp = "(" + pp;
          }
          if (d5 == -1) {
              pp = pp + ")";
          }
          object.value = pp;
      } else if (p.length > 3 && p.length < 7) {
          p = "(" + p;
          l30 = p.length;
          p30 = p.substring(0, 4);
          p30 = p30 + ")"

          p31 = p.substring(4, l30);
          pp = p30 + p31;

          object.value = pp;

      } else if (p.length >= 7) {
          p = "(" + p;
          l30 = p.length;
          p30 = p.substring(0, 4);
          p30 = p30 + ")"

          p31 = p.substring(4, l30);
          pp = p30 + p31;

          l40 = pp.length;
          p40 = pp.substring(0, 8);
          p40 = p40 + "-"

          p41 = pp.substring(8, l40);
          ppp = p40 + p41;

          object.value = ppp.substring(0, maxphonelength);
      }

      GetCursorPosition()

      if (cursorposition >= 0) {
          if (cursorposition == 0) {
              cursorposition = 2
          } else if (cursorposition <= 2) {
              cursorposition = cursorposition + 1
          } else if (cursorposition <= 5) {
              cursorposition = cursorposition + 2
          } else if (cursorposition == 6) {
              cursorposition = cursorposition + 2
          } else if (cursorposition == 7) {
              cursorposition = cursorposition + 4
              e1 = object.value.indexOf(')')
              e2 = object.value.indexOf('-')
              if (e1 > -1 && e2 > -1) {
                  if (e2 - e1 == 4) {
                      cursorposition = cursorposition - 1
                  }
              }
          } else if (cursorposition < 11) {
              cursorposition = cursorposition + 3
          } else if (cursorposition == 11) {
              cursorposition = cursorposition + 1
          } else if (cursorposition >= 12) {
              cursorposition = cursorposition
          }

          var txtRange = object.createTextRange();
          txtRange.moveStart("character", cursorposition);
          txtRange.moveEnd("character", cursorposition - object.value.length);
          txtRange.select();
      }

  }

  function ParseChar(sStr, sChar) {
      if (sChar.length == null) {
          zChar = new Array(sChar);
      } else zChar = sChar;

      for (i = 0; i < zChar.length; i++) {
          sNewStr = "";

          var iStart = 0;
          var iEnd = sStr.indexOf(sChar[i]);

          while (iEnd != -1) {
              sNewStr += sStr.substring(iStart, iEnd);
              iStart = iEnd + 1;
              iEnd = sStr.indexOf(sChar[i], iStart);
          }
          sNewStr += sStr.substring(sStr.lastIndexOf(sChar[i]) + 1, sStr.length);

          sStr = sNewStr;
      }

      return sNewStr;
  }
  // var clipboard = new Clipboard('.btn');

  // clipboard.on('success', function(e) {
  //     console.log(e);
  // });

  // clipboard.on('error', function(e) {
  //     console.log(e);
  // });
