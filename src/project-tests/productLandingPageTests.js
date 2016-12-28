export default function createProductLandingPageTests() {
  describe("#Product Landing Page tests", function() {
    
    describe("#Content", function() {
      
      it('1. My product landing page should have a <header> element with corresponding id="header".', function() {
        assert.isNotNull(document.getElementById("header"), '#header is not defined ');
      });
      
      it('2. I can see an image within the #header element with a corresponding id="header-img".', function() {
        const img = document.getElementById("header-img");
        assert.isNotNull(img, '#header-img is not defined ');
        assert.strictEqual(img.nodeName, 'IMG', '#header-img is not an <img> element ')
        assert.strictEqual(document.querySelectorAll('#header #header-img').length, 1, '#header-img is not a child of #header ');
        assert.strictEqual(img.hasAttribute('src'), true, '#header-img must have a src attribute ');
        assert.include(img.src, 'http', "The src attribute\'s value should be a url (http...) ");   
      });
      
      it('3. Within the <header> element I can see a <nav> element with corresponding id="nav-bar".', function() {
        assert.isNotNull(document.getElementById("nav-bar"), '#nav-bar is not defined ');
        assert.strictEqual(document.getElementById("nav-bar").nodeName, 'NAV', 'The #nav-bar element is not a <nav> element ');
        assert.strictEqual(document.querySelectorAll('#header #nav-bar').length, 1, '#nav-bar is not a child of #header ');
      });
      
      it('4. I can see at least three clickable elements inside the nav element, each with the class "nav-link".', function() {
        assert.isAtLeast(document.querySelectorAll('#nav-bar .nav-link').length, 3, 'There are not at least 3 elements with a class of "nav-link" within the #nav-bar element ');
      });
      
      it('5. When I click a .nav-link button in the nav element, I am taken to the corresponding section of the landing page.', function() {
        const navLinks = document.querySelectorAll('#nav-bar .nav-link');
        assert.isAtLeast(document.querySelectorAll('#nav-bar .nav-link').length, 3, 'There are not at least 3 elements with a class of "nav-link" ');
        navLinks.forEach( link => {
          assert.isNotNull(link);
          assert.strictEqual(link.hasAttribute('href'), true, 'Each .nav-link element should have an href attribute ');
          const linkDestination = link.getAttribute('href').slice(1);
          assert.isNotNull(document.getElementById(linkDestination), 'The .nav-link with href="' + link.getAttribute('href') + 
          '" is not linked to a corresponding element ');
        });
      });
      
      it('6. I can watch an embedded product video with id="video".', function() {
        const video = document.getElementById("video");
        assert.isNotNull(video, '#video is not defined ');
        assert(video.nodeName === 'VIDEO' || video.nodeName === 'IFRAME', '#video should be an <iframe> or <video> element ');
        assert.strictEqual(video.hasAttribute('src'), true, '#video should have a scr attribute ');
      });
      
      it('7. My landing page has a <form> element with a corresponding id="form".', function() {
        assert.isNotNull(document.getElementById('form'), '#form is not defined ');
        assert.strictEqual(document.getElementById('form').nodeName, 'FORM', '#form should be a <form> element ');
      });

      it('8. Within the form, there is an <input> field with id="email" where I can enter an email address.', function() {
        assert.isNotNull(document.getElementById("email"), '#email is not defined ');
        assert.strictEqual(document.querySelectorAll('#form #email').length, 1, '#email should be a child of the #form element ');
        assert.strictEqual(document.getElementById("email").nodeName, 'INPUT', '#email should be an <input> element ');
      });
      
      it('9. The #email input field should have placeholder text to let the user know what the field is for.', function() {
        assert.isNotNull(document.getElementById("email"), '#email is not defined ');
        assert.strictEqual(document.getElementById("email").hasAttribute('placeholder'), true, 
        'The input field does not have placehoder text ');
        assert.isAbove(document.getElementById("email").getAttribute('placeholder').length, 0, 
        'The placeholder attribute should have some text ');
      });
      
      it('10. The #email input field uses HTML5 validation to confirm that the entered text is an email address.', function() {
        const emailField = document.getElementById("email");
        assert.isNotNull(document.getElementById("email"), '#email is not defined ');
        assert.strictEqual(emailField.type, "email", "Email field should use HTML5 validation ");
      });
      
      it('11. Within the form, there is a submit <input> with corresponding id="submit".', function() {
        const submitButton = document.getElementById("submit");
        assert.isNotNull(submitButton, '#submit is not defined ');
        assert.strictEqual(document.querySelectorAll('#form #submit').length, 1, '#submit should be a child of the #form element ');
        assert.strictEqual(submitButton.nodeName, 'INPUT', '#email should be an <input> element ');
        assert.strictEqual(submitButton.type, 'submit', 'The input type is incorrect ');
      });

      it('12. When I click the #submit button, the email is submitted to a static page (use this mock URL: https://www.freecodecamp.com/email-submit) that confirms the email address was entered (and that it posted successfully).', function() {
        const emailField = document.getElementById("email");
        const form = document.getElementById('form');
        const submitButton = document.getElementById('submit');
        assert.isNotNull(submitButton, '#submit is not defined ');
        assert.strictEqual(form.hasAttribute('action'), true, 'The #form should have an action attribute ')
        assert.include(form.action, 'http', "The action attribute\'s value should be a url (http...) ");   
        assert.strictEqual(emailField.hasAttribute('name'), true, 'The #email input should have a name attribute ');
        assert.strictEqual(emailField.name, "email", 'The name attribute should have a value of "email" ');   
      });
    }); // END #Content
    
    describe('#Layout', function() {
      it('1. The <header> element with id="header" should always be at the top of the viewport.', function() {
        const header = document.getElementById('header');
                        
        assert.approximately(header.getBoundingClientRect().top, 0, 15, '#header\'s parent should be body and it should be at the top of the viewport ');

        window.scroll(0, 500);        
        assert.approximately(header.getBoundingClientRect().top, 0, 15, '#header should be at the top of the viewport even after scrolling ');
        window.scroll(0, 0); 
      });
      
      it('2. My product landing page should have at least one media query.', function() {
        // loop through all associated stylesheets and look for media query
        for(var i = 0; i < document.styleSheets.length; i++) {  
          if(document.styleSheets[i].cssRules !== null) {
            for(var j = 0; j < document.styleSheets[i].cssRules.length; j++) {
              if(document.styleSheets[i].cssRules[j].type === 4) {
                assert.isOk(true);
                return;
              }
            }
          }
        }
        // if no media query is detected, test fails
        assert.isOk(false, "No media queries detected ");
      });
      
      it('3. My product landing page should utilize CSS flexbox at least once.', function() {
        // loop through all associated stylesheets and look for display of flex
        const flexCount = [];
        for(var i = 0; i < document.styleSheets.length; i++) {  
          if(document.styleSheets[i].cssRules !== null) {
            for(var j = 0; j < document.styleSheets[i].cssRules.length; j++) {
              if(document.styleSheets[i].cssRules[j].style !== undefined && 
                 document.styleSheets[i].cssRules[j].style.display === 'flex' ||
                 document.styleSheets[i].cssRules[j].style !== undefined &&
                 document.styleSheets[i].cssRules[j].style.display === 'inline-flex') {
                flexCount.push(1);
              }
            }
          }
        }
        // our test suite uses a display of flex, so we need to count how many times its used 
        // and confirm that its more than once. If we just detect one instance, its ours. 
        assert.isAbove(flexCount.length, 1, 'We do not detect a display property set to flex or inline-flex anywhere in your CSS ')
      });
      
    }); // END #Layout

  }); // END #ProductLadingPageTests
} // END createProductLandingPageTests() 