let heroCarousel = $("#hero-carousel")
let offersCarousel = $("#offers-carousel")
let servicesCarousel = $("#services-carousel")
let branchesMap = $(".branches-map")
let branchesInnerMap = $(".branches-inner-map")
$('.offers-left').click(function(){
    console.log('clicked')
})
//main carousel
if(heroCarousel.length){
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
    $('.hero-dot').click(function() {
        var index = $(this).data('dot');  
        heroCarousel.trigger('to.owl.carousel', [index, 500]); // Navigate to the corresponding slide
    });
    heroCarousel.on('changed.owl.carousel', function(event) {
        var currentIndex = event.item.index;  // 
    
        
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
            0: { items: 3 },
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

if(servicesCarousel.length){
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
    $('.service-dot').click(function() {
        var index = $(this).data('dot');  
        servicesCarousel.trigger('to.owl.carousel', [index, 1200]); // Navigate to the corresponding slide
    });
    servicesCarousel.on('changed.owl.carousel', function(event) {
        var currentIndex = event.item.index;  // 
    
        
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
if(branchesMap.length){
    $(document).ready(function () {
        // Initialize the map
        const map = L.map(branchesMap[0]).setView([41.9151, 43.8271], 7); 
      
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


      
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
            marker.bindPopup(`<b>${branch.name}</b>`); // Popup on click
          });
        // When a branch is selected
        $('#select-branch div').click(function () {
            const selectedBranch = $(this).data('value'); 
            const branch = branches[selectedBranch]; 
          
            // If a branch is selected, add the marker to the map
            if (branch) {
           
              L.marker(branch.coords).addTo(map)
                .bindPopup(`<b>${branch.name}</b>`)
                .openPopup(); 
            }
          
            // Update the display text with the selected branch
            $('#dropdown-input').text(branch.name); 
            $('#select-branch').hide(); 
          });

      });
      



}
if($('#select-branch div')){

 
        // Toggle the visibility of the dropdown on click
        $('#dropdown-input').click(function () {
          $('#select-branch').toggle(); 
          $(".dropdown-arrow").toggleClass("rotate-arrow");
        });
    
        // When an option is selected
        $('#select-branch div').click(function () {
          const selectedValue = $(this).text()
          console.log(selectedValue)
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





//branches map page

if(branchesInnerMap.length){
    $(document).ready(function () {
        // Initialize the map
        const map = L.map(branchesInnerMap[0]).setView([41.9151, 41.8271], 8); 
      
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
            marker.bindPopup(`

                <div class=" branchpage-popup " >
                 <div class="icon location" > </div>
                <b>${branch.name}</b>
                <div class="gtb-wrapper"> 
                
                  <div class="icon gotoBranch" > </div>
                </div>
             

                </div>
                
                `); // Popup on click
          });
        // When a branch is selected
        $('.panel li').click(function () {
            const selectedBranch = $(this).data('value'); 
            const branch = branches[selectedBranch]; 
          
            // If a branch is selected, add the marker to the map
            if (branch) {
           
              L.marker(branch.coords).addTo(map)
                .bindPopup(`

                     <div class=" branchpage-popup " >
                      <div class="icon location" > </div>
                     <b>${branch.name}</b>
                     <div class="gtb-wrapper"> 
                       <div class="icon gotoBranch" > </div>
                     </div>
                  

                     </div>
                     
                     `)
                .openPopup(); 
            }
          
            // Update the display text with the selected branch
            $('#dropdown-input').text(branch.name); 
            $('#select-branch').hide(); 
          });

      });
      



}




let acc = $(".accordion");

$(acc).each(function() {
    $(this).on("click", function() {
   
      $(this).toggleClass("active-acc");
  
  
      var panel = $(this).next();
      panel.slideToggle();
    });
  });
