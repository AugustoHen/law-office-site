document.addEventListener('DOMContentLoaded', function() {
    const carousel = new bootstrap.Carousel(document.getElementById('carouselExampleControls'), {
        interval: 3000, 
        ride: 'carousel'
    });

    
    document.querySelectorAll('.carousel-control-prev, .carousel-control-next').forEach(button => {
        button.addEventListener('click', function() {
            carousel.pause(); 
            setTimeout(() => {
                carousel.cycle(); 
            }, 100); 
        });
    });
});
