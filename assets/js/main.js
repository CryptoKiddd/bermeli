let heroCarousel = $("#hero-carousel")
let offersCarousel = $("#offers-carousel")
let servicesCarousel = $("#services-carousel")
let branchesMap = $(".branches-map")
let branchesInnerMap = $(".branches-inner-map")

//main carousel
if (heroCarousel.length) {
  heroCarousel.owlCarousel({
    loop: true,
    margin: 10,
    dots: false,
    nav: false,
    responsive: {
      0: { items: 1 },
    }
  })

  // custom dots for hero carosuel,
  $('.hero-dot').click(function () {
    let index = $(this).data('dot');
    heroCarousel.trigger('to.owl.carousel', [index, 500]); // Navigate to the corresponding slide
  });
  heroCarousel.on('changed.owl.carousel', function (event) {
    let currentIndex = event.item.index;  // 


    currentIndex = currentIndex - event.relatedTarget._clones.length / 2;


    if (currentIndex >= event.item.count) {
      currentIndex = 0;
    }
    if (currentIndex < 0) {
      currentIndex = event.item.count - 1;
    }

    // Remove active class from all dots
    $('.hero-dot').removeClass('active-hero-dot');

    // Add active class to the correct dot based on the currentIndex
    $('.hero-dot[data-dot="' + currentIndex + '"]').addClass('active-hero-dot');
  });

  // Initialize first active dot
  $('.hero-dot[data-dot="0"]').addClass('active-hero-dot');

}


//offers carousel

if (offersCarousel.length) {
  offersCarousel.owlCarousel({
    loop: true,
    margin: 20,
    dots: false,
    nav: false,
    responsive: {
      0: { items: 1 },
      768: { item: 2 },
      1300: { item: 3 }
    },
  });

  $('.offers-left').click(function () {
    offersCarousel.trigger('prev.owl.carousel');
  });

  $('.offers-right').click(function () {
    offersCarousel.trigger('next.owl.carousel');
  });

  offersCarousel.on('changed.owl.carousel', function (event) {
    let totalItems = event.item.count;
    let currentIndex = event.item.index - event.relatedTarget._clones.length / 2;

    if (currentIndex === totalItems) {
      currentIndex = 0;
    } else if (currentIndex < 0) {
      currentIndex = totalItems - 1;
    }

    let progressPercent = ((currentIndex + 1) / totalItems) * 100;
    $('.carousel-progress-bar').css('--progress-width', progressPercent + '%');
  });
}
//services carousel

if (servicesCarousel.length) {
  if ($(window).width() <= 440) {
    let combinedItems = [];

    $(".services-carousel-item a").each(function (index) {

      if (index % 2 === 0) {
        // Start a new pair
        let combinedHTML = $(this).prop('outerHTML');
        if ($(this).next().length) {
          combinedHTML += $(this).next().prop('outerHTML');
        }
        combinedItems.push(`<div class="item services-carousel-item">${combinedHTML}</div>`);
      }

    })


    let $dotsContainer = $(".services-carousel-dots");
    $dotsContainer.empty();
    combinedItems.forEach((_, index) => {
      $dotsContainer.append(`<span class="service-dot" data-dot="${index}"></span>`);
    });

    $("#services-carousel").html(combinedItems.join(''));
    $("#services-carousel").owlCarousel('destroy');
    $("#services-carousel").owlCarousel({
      items: 1, // Show one item (contains two anchors)
      loop: true,
      margin: 10,
      nav: true,
      dots: true,
    });
  }
  servicesCarousel.owlCarousel({
    loop: true,
    margin: 10,
    dots: false,
    nav: false,
    // autoplay: true,
    // autoplayTimeout: 3000,
    // autoplayHoverPause: true,

    responsive: {
      0: { items: 1 },
    }
  })



  // custom dots for service carosuel,
  $('.service-dot').click(function () {
    let index = $(this).data('dot');
    servicesCarousel.trigger('to.owl.carousel', [index, 1200]); // Navigate to the corresponding slide
  });




  servicesCarousel.on('changed.owl.carousel', function (event) {
    let currentIndex = event.item.index;  // 


    currentIndex = currentIndex - event.relatedTarget._clones.length / 2;


    if (currentIndex >= event.item.count) {
      currentIndex = 0;
    }
    if (currentIndex < 0) {
      currentIndex = event.item.count - 1;
    }

    $('.service-dot').removeClass('active-service-dot');

    $('.service-dot[data-dot="' + currentIndex + '"]').addClass('active-service-dot');
  });

  $('.service-dot[data-dot="0"]').addClass('active-service-dot');

}






//map for branches
if (branchesMap.length) {
  $(document).ready(function () {
    let deviceWidth = $(window).width();
    let mapzoom = deviceWidth < 450 ? 6.2 : 7;
    let lng = deviceWidth < 450 ? 40.81 : 41.8271;
    const map = L.map(branchesMap[0]).setView([41.9151, 43.8271], mapzoom);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const markers = {};


    // Define branches with their locations
    const branches = {
      batumi: { coords: [41.6155, 41.6367], name: "ბათუმი" },
      tbilisi: { coords: [41.7167, 44.7833], name: "თბილისი" },
      kutaisi: { coords: [42.2587, 42.7111], name: "ქუთაისი" },
      poti: { coords: [42.1500, 41.6500], name: "ფოთი" },
      guria: { coords: [41.8833, 42.0500], name: "გურია" }
    };


    $.each(branches, function (index, branch) {
      const marker = L.marker(branch.coords).addTo(map);
      const mapUrl = `https://www.google.com/maps?q=${branch.coords[0]},${branch.coords[1]}`;

      marker.bindPopup(`

                <div class=" branchpage-popup " >
                    <div class="icon location" > </div>
                     <b>${branch.name}</b>
                    <div class="gtb-wrapper"> 
                        <a  href="${mapUrl}" target="_blank" >
                           <div class="icon gotoBranch" > </div>
                        </a>
                     </div>
                </div>
                
                `);

      markers[index] = marker;

    });


    // When a branch is selected
    $('#select-branch div').click(function () {
      const selectedBranch = $(this).data('value');
      const branch = branches[selectedBranch];
      const marker = markers[selectedBranch];

      console.log(branch)


      if (branch && marker) {
        marker.openPopup();
        $('#dropdown-input').text(branch.name);
        $('#select-branch').hide();
      } else {
        console.error("Branch or marker not found for:", selectedBranch);
      }
    });

  });




}


if ($('#select-branch div')) {


  // Toggle the visibility of the dropdown on click
  $('#dropdown-input').click(function () {
    $('#select-branch').toggle();
    $(".dropdown-arrow").toggleClass("rotate-arrow");
  });

  // When an option is selected
  $('#select-branch div').click(function () {
    const selectedValue = $(this).text()
    $('#dropdown-input').html(selectedValue + ' <img class="dropdown-arrow" src="assets/images/dropdown-arrow.png" alt="Dropdown Arrow">');
    $('#select-branch').hide();


  });

  // Close the dropdown if clicked outside
  $(document).click(function (e) {
    if (!$(e.target).closest('.custom-select-wrapper').length) {
      $('#select-branch').hide();
    }
  });

}





//branches map seperate page

if (branchesInnerMap.length) {
  let deviceWidth = $(window).width();

  $(document).ready(function () {
    // Initialize the map
    let mapzoom = deviceWidth < 1380 ? 6.5 : 8;
    if (deviceWidth < 450) {
      mapzoom = 6
    }
    let lng = deviceWidth < 1380 ? 40.81 : 41.8271;
    const map = L.map(branchesInnerMap[0]).setView([41.9151, lng], mapzoom);
    const markers = {};

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);



    // Define branches with their locations
    const branches = {
      batumi: { coords: [41.6155, 41.6367], name: "ფარნავაზ მეფის ქუჩა №93/99" },
      tbilisi: { coords: [41.7167, 44.7833], name: "ფარნავაზ მეფის ქუჩა №222" },
      kutaisi: { coords: [42.2587, 42.7111], name: "ფარნავაზ მეფის ქუჩა №111" },
      poti: { coords: [42.1500, 41.6500], name: "ფარნავაზ მეფის ქუჩა №333" },
      guria: { coords: [41.8833, 42.0500], name: "ფარნავაზ მეფის ქუჩა 444" }
    };

    $.each(branches, function (index, branch) {
      const marker = L.marker(branch.coords).addTo(map);
      const mapUrl = `https://www.google.com/maps?q=${branch.coords[0]},${branch.coords[1]}`;

      marker.bindPopup(`

                <div class=" branchpage-popup " >
                    <div class="icon location" > </div>
                     <b>${branch.name}</b>
                    <div class="gtb-wrapper"> 
                        <a  href="${mapUrl}" target="_blank" >
                           <div class="icon gotoBranch" > </div>
                        </a>
                     </div>
                </div>
                
                `);

      markers[index] = marker;

    });
    // When a branch is selected
    $('.panel li').click(function () {
      const selectedBranch = $(this).data('value');
      const branch = branches[selectedBranch];
      const marker = markers[selectedBranch];

      console.log(branch)


      if (branch && marker) {
        marker.openPopup();
        $('#dropdown-input').text(branch.name);
        $('#select-branch').hide();
      } else {
        console.error("Branch or marker not found for:", selectedBranch);
      }

      // Update the display text with the selected branch
      $('#dropdown-input').text(branch.name);
      $('#select-branch').hide();
    });

  });




}



//branches accordion
let acc = $(".accordion");
if (acc.length) {
  $(acc).each(function () {
    $(this).on("click", function () {
      // Close all other accordions

      acc.not(this).removeClass("active-acc").next().slideUp();

      // Toggle the current accordion
      $(this).toggleClass("active-acc");
      let panel = $(this).next();
      panel.slideToggle();
    });
  });
}


//menu acordion
if ($(".menu__item > .menu__link").length) {

  $(".menu__item > .menu__link").on("click", function (e) {
    const submenu = $(this).next(".submenu");

    // Check if the link has a submenu
    if (submenu.length) {
      e.preventDefault(); // Prevent default only if submenu exists

      // Toggle the visibility of the submenu
      submenu.slideToggle();

      // Optionally, close other open submenus
      $(".submenu").not(submenu).slideUp();
    }


    $("#main-navigation-toggle").on("click", function () {
      // Slide up all open submenus when the close button or toggle button is clicked
      $(".submenu").slideUp();
    });


  });
}
const toglebtn = $('#main-navigation-toggle')
if (toglebtn) {

  toglebtn.on('change', function () {
    if ($(this).is(':checked')) {
      // Disable scrolling when the checkbox is checked
      $('body').css('overflow', 'hidden');
    } else {
      // Re-enable scrolling when the checkbox is unchecked
      $('body').css('overflow', 'auto');
    }
  });
}

const creditForm = $('.credit-form')
console.log(creditForm)

if (creditForm.length) {


  creditForm.on("submit", function (e) {
    e.preventDefault()


    let agreedToTerms = $("#terms").prop('checked')
    let creditAmount = $('#cr-amount').val()
    console.log(creditAmount)

    if (creditAmount > 3000) {
      $('#warning-message').show()
    } else {
      $('#warning-message').hide()
    }

    let selectedBackup = [];

    $('.backup-type input[type="checkbox"]').each(function () {
      if ($(this).prop('checked')) {
        selectedBackup.push($(this).attr('value')); // Get the value attribute of the checkbox
      }
    });



    console.log("Selected backup options: ", selectedBackup);
    if (!agreedToTerms) {
      $("#term-text").css("color", "red");

    } else {
      $("#term-text").css("color", "black");

    }



  })

}


//  slider on mortgage page
$(document).ready(function() {
  // Initialize the slider
  $("#slider-months").slider({
      min: 0,
      max: 180,
      step: 6,
      value: 0,
      slide: function(event, ui) {
          // Update the value in the input field when the slider is moved
          $("#slider-months-value").val(ui.value);
      }
  });

  // Initialize the input field with the slider's value
  $("#slider-months-value").val($("#slider-months").slider("value"));

  // When the user types a value in the input, update the slider
  $("#slider-months-value").on("input", function() {
      let inputValue = $(this).val();

      // Clamp the input value between the slider's min and max values
      if (inputValue < 6) {
          inputValue = 6;
      } else if (inputValue > 180) {
          inputValue = 180;
      }

      // Set the slider's value to the input value
      $("#slider-months").slider("value", inputValue);
  });

  // Add ticks and marks after the slider is initialized
  addTicksAndMarks("#slider-months");
});




$(document).ready(function() {
  // Initialize the slider
  $("#slider").slider({
      min: 0,
      max: 30000,
      step: 500,
      value: 0,
      slide: function(event, ui) {
          // Update the value in the input field when the slider is moved
          $("#slider-value").val(ui.value);
      }
  });

  // Initialize the input field with the slider's value

  // When the user types a value in the input, update the slider
  $("#slider-value").on("input", function() {
      let inputValue = $(this).val();

      // Clamp the input value between the slider's min and max values
      if (inputValue < 500) {
          inputValue = 500;
      } else if (inputValue > 30000) {
          inputValue = 30000;
      }

      // Set the slider's value to the input value
      $("#slider").slider("value", inputValue);
  });

  // Add ticks and marks after the slider is initialized
  addTicksAndMarks("#slider");
});

// Function to add ticks and marks
function addTicksAndMarks(sliderSelector) {
  let slider = $(sliderSelector);
  let min = slider.slider("option", "min");
  let max = slider.slider("option", "max");
  let step = slider.slider("option", "step");
  let tickContainer = $("<div>").addClass("tick-container").appendTo(slider);



  // Add marks at every 5000 (5k, 10k, 15k, etc.)
  if(max > 10000){

    let mark = $("<div>").addClass("ui-slider-mark")
    .css("left", (1 + "%"))
    .text(200) 
    .appendTo(tickContainer);
    for (let i = min; i <= max; i += 5000) {
      if(i === 0){
       continue
      }
       let mark = $("<div>").addClass("ui-slider-mark")
                            .css("left", ((i - min) / (max - min)  )  * 98.8 + "%")
                            .text(i) // Display the value (5000, 10000, etc.)
                            .appendTo(tickContainer);
   }
  }else{
    let mark = $("<div>").addClass("ui-slider-mark")
    .css("left", (1 + "%"))
    .text(0) 
    .appendTo(tickContainer);
    for (let i = min; i <= max; i += 30) {
     
       let mark = $("<div>").addClass("ui-slider-mark")
                            .css("left", ((i - min) / (max - min)  )  * 100 + "%")
                            .text(i) // Display the value (5000, 10000, etc.)
                            .appendTo(tickContainer);
   }
  }


}










/// dropdowns
function makeDropdown(dropdownRef, inputRef, closebtnRef) {
  return function () {
    const dropdown = $(dropdownRef);
    const input = $(inputRef);
    const closebtn = $(closebtnRef);

    if (dropdown.length && input.length && closebtn.length) {
      dropdown.hide(); // Initially hide the dropdown

      // When the input is clicked, show the dropdown
      input.on('click', function () {
        dropdown.show();
      });

      // When a radio button is selected, update the input value and hide the dropdown
      dropdown.find('input[type="radio"]').on('change', function () {
        const selectedValue = $(this).val();
        input.val(selectedValue); 
        dropdown.hide();
      });

      // Close the dropdown when the close button is clicked
      closebtn.on('click', function () {
        dropdown.hide();
      });

      // Optional: Close the dropdown when clicking outside it
      $(document).on('click', function (event) {
        if (!$(event.target).closest(`${dropdownRef}, ${inputRef}`).length) {
          dropdown.hide();
        }
      });
    }

  }

}


const cityDropdown = makeDropdown('#city-drop', '#credit-city', '#close-dropdown-city');
const landDropdown = makeDropdown('#land-drop', '#land-type', '#close-dropdown-land');
const manufacturerDropdown = makeDropdown('#manufacturer-drop', '#auto-manufacturer-input', '#close-dropdown-manufacturer');
const steeringDropdown = makeDropdown('#steering-drop', '#steering-input', '#close-dropdown-steering');
const engineDropdown = makeDropdown('#engine-drop', '#engine-input', '#close-dropdown-engine');
const scheduleDropdown = makeDropdown('#schedule-drop', '#schedule-input', '#close-dropdown-schedule');

cityDropdown()
landDropdown()
manufacturerDropdown()
steeringDropdown()
engineDropdown()
scheduleDropdown()