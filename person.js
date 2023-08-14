function populateCountryCodes() {
    
    const countryCodes = [
      { code: "+1", flagIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ39H0Cukp718pn2TAGaz8MwE2ClaEaFYyCprkOXuNs5Q-nTtVldtkqD1EP2ke2GgZYq8s&usqp=CAU" }, 
      { code: "+44", flagIcon: "https://static.vecteezy.com/system/resources/previews/011/074/562/original/circle-flag-of-uk-free-vector.jpg" }, 
      { code: "+94", flagIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIvK0QJLES7zWuho6Wsd9c_II3q6fghztMow&usqp=CAU.jpeg" }, 
      { code: "+91", flagIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFaeUNLAKQ_D4nFCudBsp2ke9mTUSyq7dCJA&usqp=CAU" }, 
    ];
  
    const countrySelect = document.getElementById("country-code");
    const dropdownList = document.querySelector(".dropdown-list");
    const mobileNumberInput = document.getElementById("mobile-number");
  
   
    function closeDropdown() {
      dropdownList.classList.remove("show");
    }
  
    
    countryCodes.forEach((country) => {
      const listItem = document.createElement("li");
      listItem.dataset.value = country.code;
      listItem.innerHTML = `<span>${country.code}</span><img src="${country.flagIcon}" alt="Flag Icon">`;
      listItem.addEventListener("click", () => {
        countrySelect.value = country.code;
        closeDropdown();
      });
      dropdownList.appendChild(listItem);
    });
  
   
    countrySelect.addEventListener("click", () => {
      dropdownList.classList.toggle("show");
    });
  
    
    document.addEventListener("click", (event) => {
      if (!countrySelect.contains(event.target) && !dropdownList.contains(event.target)) {
        
        const countryCode = countrySelect.value;
        const mobileNumber = mobileNumberInput.value.trim();
        const mobileNumberRegex = /^\d{8,15}$/; 
  
        
        if (!countryCode || !mobileNumber || !mobileNumber.startsWith(countryCode) || !mobileNumber.match(mobileNumberRegex)) {
          
        }
  
        closeDropdown();
      }
    });
  }
  
  
  
        
  
       
        function closeDropdown() {
          const dropdownList = document.querySelector(".dropdown-list");
          dropdownList.classList.remove("show");
        }
  
  function validateEmail() {
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirm-email").value;
    const emailErrorMessage = document.getElementById("email-error-message");
  
   
  
    if (!emailPattern.test(email)) {
      emailErrorMessage.textContent = "Please enter a valid email address.";
      return false;
    } else if (email !== confirmEmail) {
      emailErrorMessage.textContent = "Email addresses do not match.";
      return false;
    } else {
      emailErrorMessage.textContent = ""; 
    }
  }
  
  
        function validateGender() {
          const genderSelect = document.getElementById("gender");
          const genderErrorMessage = document.getElementById("gender-error-message");
  
          if (genderSelect.value === "") {
            genderErrorMessage.textContent = "Please select a gender.";
            return false;
          } else {
            genderErrorMessage.textContent = ""; 
          }
        }
  
        
        populateCountryCodes();
  
       
        document.getElementById("purchase-button").addEventListener("click", function() {
          
         
          if (!validateGender()) {
          
            return;
          }
  
          if (!validateEmail()) {
          
            return;
          }
  
         
          window.location.href = "payment.html"; 
        });
       
        function fulname(){
          var name=document.getElementById("full-name").value;
          localStorage.setItem("name",name);
        }
           
        function phone(){
          var phone=document.getElementById("mobile-number").value;
          localStorage.setItem("phone",phone);
        }
         
        function email(){
          var email=document.getElementById("email").value;
          localStorage.setItem("email",email);
        }

        function gender(){
          var gender=document.getElementById("gender").value;
          localStorage.setItem("gender",gender)
        }
             

          