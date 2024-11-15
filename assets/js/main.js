let heroCarousel = $("#hero-carousel")
let offersCarousel = $("#offers-carousel")
let servicesCarousel = $("#services-carousel")
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


