(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 60
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });
    
}


)(jQuery);

(function () {
    "use strict";
    /*
     * Form Validation
     */
  
    // Fetch all the forms we want to apply custom validation styles to
    const forms = document.querySelectorAll(".needs-validation");
    const result = document.getElementById("result");
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    console.log("REsult", result)
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {

            

            const hCaptcha = form.querySelector('textarea[name=h-captcha-response]').value;

            


            // if (!hCaptcha) {
            //     event.preventDefault();
            //     alert("Please fill out captcha field")
            //     return
            // }

            //Alert - For successful submission or not
            const alert = (message, type) => {
                const wrapper = document.createElement('div')
                wrapper.innerHTML = [
                  `<div class="alert alert-${type} alert-dismissible" role="alert">`,
                  `   <div>${message}</div>`,
                  '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                  '</div>'
                ].join('')
              
                alertPlaceholder.append(wrapper)
            }

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
                //   result.classList.remove("text-red-500");
                //   result.classList.add("text-green-500");
                } else {
                  console.log(response);
                  result.innerHTML = json.message;
                //   result.classList.remove("text-red-500");
                //   result.classList.add("text-red-500");
                  
                }
              })
              .catch((error) => {
                const submitErrorMessage = document.getElementById("submitErrorMessage");
                console.log(error);
                // result.innerHTML = "Something went wrong!";
                alert('Something went wrong. Please try again', 'danger');
                
                // submitErrorMessage.innerHTML = "Something went wrong. Please try again!";
              })
              .then(function () {
                alert('Submission successful. We will reach out to you promptly', 'success');
                
                const submitSuccessMessage = document.getElementById("submitSuccessMessage");
                form.reset();
                submitSuccessMessage.innerHTML = "Successfully submitted";
                
                // $('.alert').show();
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