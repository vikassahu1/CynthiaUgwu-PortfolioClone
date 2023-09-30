// For smooth scroll in locomotive js 
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


// For first page Animation. 
function firstPageAnim(){
    var t1 = gsap.timeline();

    t1.from("#nav",{
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease:Expo.easeInOut
    })

    .to(".boundingelem",{
        y:0,
        ease: Expo.easeInOut,
        duration:1.5,
        delay:-1,
        stagger:0.2
    })

    .from("#herofooter",{
        y: '10',
        opacity: 0,
        duration: 1.5,
        delay:-3,
        ease:Expo.easeInOut
    })
}

// Mouse move karte samay circle chapta hona chahiye 
var timeout;
function circleChapta(){
    // define default scale value 
    var xscale  = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);

        // scale ki value 0.8 se lekar 1.2 tak kar dega 
        xscale = gsap.utils.clamp(.8,1.2,dets.clientX-xprev);
        yscale = gsap.utils.clamp(.8,1.2,dets.clientX-yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        mouse(xscale,yscale);

        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        },100);
    });

}

// For circle following cursor.  
function mouse(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    });
}



circleChapta()
mouse();
firstPageAnim();


// To make the images move with the cursor.
document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        // duration: 0.5,
        });

        gsap.to(elem.querySelector("h1"),{
            opacity: 1
        });

    });


    elem.addEventListener("mousemove",function(dets){
    // cursor ka element ke top se distance de denge.
    var diff = dets.clientY - elem.getBoundingClientRect().top;

    diffrot = dets.clientX - rotate;
    // jitna rotate ki value hogi image utna hi rotate karega par ham clamp laga denge 20 deg par taki isse jyada rotate na kare 
    rotate = dets.clientX;

    gsap.to(elem.querySelector("img"),{
        opacity:1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });

    gsap.to(elem.querySelector("h1"),{
        opacity: .3,
    });
    

    });
});


// Second page Animation 


