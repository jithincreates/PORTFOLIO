console.log("Portfolio loaded.");

// Project Data
const projects = [
    {
        title: "Vintage Scooter",
        category: "Vespa Replica",
        image: "assets/Vintage Scooter (2).jpeg",
        description: "A high-fidelity digital recreation of the iconic Vespa, developed from the ground up in SolidWorks. This project served as a rigorous exercise in Class-A surfacing and complex curvature continuity. By focusing on the external aesthetic, I meticulously replicated the organic, fluid lines of the chassis and every minute peripheral component—from the ribbed floorboards to the glass ripples—to achieve maximum originality. This model demonstrates a high-level command of complex geometry and professional-grade part detailing."
    },
    { title: "Adventure Scooter", category: "Modified Adventure-Spec", image: "assets/Adventure Scooter.jpeg", description: "Developed as a secondary phase to my high-fidelity Vespa replica, this project demonstrates the transition from aesthetic modeling to functional modification. Using my original scratch-built CAD model as the base platform, I re-engineered the vehicle into an \"Adventure-Spec\" variant. This involved designing a custom suite of off-road hardware—including a lifted suspension geometry, modular luggage carriers, and protective crash guards—all integrated seamlessly into the existing frame. It showcases my ability to manage complex assemblies and execute design iterations for specialized use cases." },
    { title: "Necklace", category: "Jewelry Design", image: "assets/Necklace.PNG", description: "Bridging the gap between rigid engineering and fluid artistry, I designed this necklace entirely from scratch using SolidWorks. While SolidWorks is traditionally the domain of mechanical assemblies and prismatic parts, I chose it specifically to challenge the boundaries of the software. My goal was to master complex surfacing, lofting, and 3D sketching. This piece serves as a testament to the idea that with the right technical foundation, any tool can become a medium for high-level creative expression." },
    { title: "GoKart", category: "Hardware Project", image: "assets/GoKart.png" },
    {
        title: "Solitaire Ring",
        category: "Diamond Ring",
        image: "assets/Solitaire Ring.jpeg",
        description: "A precision CAD exercise in jewelry engineering, this project explores the intersection of geometric elegance and manufacturing constraints. Modeled entirely in SolidWorks, the design focuses on optimal light performance and structural security for the center stone. The assembly includes the multi-prong setting and a comfort-fit band, demonstrating my versatility in applying engineering tools to high-detail consumer products."
    },
    {
        title: "Enduro Helmet",
        category: "Custom Design",
        image: "assets/Enduro Helmet.jpeg",
        description: "This project served as a deep dive into the complexities of non-prismatic geometry within SolidWorks. Modeling a high-fidelity enduro helmet required a strategic approach to advanced lofting and surfacing to ensure seamless transitions between ergonomic form and functional venting. Beyond the geometry, the project focused on mastering high-end rendering workflows—specifically exploring how light interacts with complex, curved surfaces to produce photorealistic material finishes and reflections. This assembly represents a fusion of technical accuracy and industrial design aesthetic."
    },
    {
        title: "Arc Reactor",
        category: "Prop Replica",
        image: "assets/Arc Reactor.jpeg",
        description: "A high-fidelity engineering tribute to one of cinema's most iconic pieces of technology. This project focused on the intricate \"exploded-view\" design of a multi-component energy core, modeled entirely within SolidWorks.<br><br>The challenge lay in managing a complex assembly of over 30 individual parts—including the copper-wound primary coils, the palladium core housing, and the integrated mounting stand. I focused on achieving a realistic \"machined\" aesthetic, utilizing advanced mates and interference detection to ensure every component fit perfectly within the acrylic display housing."
    },
    {
        title: "Controller",
        category: "Product Design",
        image: "assets/Controller.PNG",
        description: "A deep dive into complex organic geometry and ergonomic engineering. This PS5-inspired controller was built from the ground up in SolidWorks, focusing on seamless surface continuity (G2 curvature) and precision assembly.<br><br>The project challenged my ability to translate high-touch tactile surfaces into a digital environment, ensuring every button housing and grip contour met exact mechanical tolerances. The result is a sleek, modern aesthetic that balances professional-grade performance with a custom-spec finish."
    }
];

const track = document.getElementById('projectTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const projectTitle = document.getElementById('projectTitle');
const projectCategory = document.getElementById('projectCategory');
const carouselContainer = document.querySelector('.carousel-container');

let activeIndex = 0;
let autoScrollInterval;

function initCarousel() {
    if (!track) return;

    // Clear existing
    track.innerHTML = '';

    projects.forEach((project, index) => {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        if (index === activeIndex) item.classList.add('active');

        // Add click event to make it active if clicked, or navigate if already active
        item.addEventListener('click', () => {
            if (index === activeIndex) {
                // Navigate to detail page
                window.location.href = `project.html?id=${index}`;
            } else {
                updateCarousel(index);
                resetAutoScroll();
            }
        });

        item.innerHTML = `
            <div class="project-card">
                 <img src="${project.image}" alt="${project.title}">
                 <div class="project-overlay">
                 </div>
            </div>
        `;
        track.appendChild(item);
    });

    updateInfo();
}

function updateCarousel(newIndex) {
    if (newIndex < 0) newIndex = projects.length - 1;
    if (newIndex >= projects.length) newIndex = 0;

    activeIndex = newIndex;

    // Update active class
    const items = document.querySelectorAll('.carousel-item');
    items.forEach((item, index) => {
        item.classList.remove('active');
        item.classList.remove('prev');
        item.classList.remove('next');

        // Calculate style transform based on distance from active
        // This is where we create the "character selection" scrolling effect
        // We want the active one centered, and others offset

        const offset = index - activeIndex;
        // Basic class assignment for CSS styling
        if (index === activeIndex) {
            item.classList.add('active');
        } else if (index === activeIndex - 1 || (activeIndex === 0 && index === projects.length - 1)) {
            // item.classList.add('prev');
        } else if (index === activeIndex + 1 || (activeIndex === projects.length - 1 && index === 0)) {
            // item.classList.add('next');
        }
    });

    // Re-render transforms or scroll position
    // For a centered carousel, we can translate the track
    centerActiveItem();
    updateInfo();
}

function centerActiveItem() {
    const items = document.querySelectorAll('.carousel-item');
    if (!items.length) return;

    // Get the active item
    const activeItem = items[activeIndex];

    // Calculate dimensions based on offsetParent (should be the track now)
    // item.offsetLeft is the distance from the left edge of the track to the left edge of the item
    const itemCenter = activeItem.offsetLeft + (activeItem.offsetWidth / 2);

    const containerWidth = track.parentElement.offsetWidth;
    const containerCenter = containerWidth / 2;

    // We want the Item Center to be at Container Center
    // Track Position = ContainerCenter - ItemCenter
    const trackPosition = containerCenter - itemCenter;

    track.style.transform = `translateX(${trackPosition}px)`;

    // Update visual styles (scaling)
    items.forEach((itm, index) => {
        let distance = Math.abs(index - activeIndex);

        if (distance === 0) {
            itm.classList.add('active');
            itm.style.transform = 'scale(1.2)';
            itm.style.opacity = '1';
            itm.style.zIndex = '10';
            itm.style.filter = 'grayscale(0%)';
        } else {
            itm.classList.remove('active');
            itm.style.transform = 'scale(0.8)';
            itm.style.opacity = '0.5';
            itm.style.zIndex = '1';
            itm.style.filter = 'grayscale(100%)';
        }
    });
}

function updateInfo() {
    // Fade out text, update, fade in
    const infoContainer = document.getElementById('activeProjectInfo');
    infoContainer.style.opacity = '0';

    setTimeout(() => {
        projectTitle.textContent = projects[activeIndex].title;
        projectCategory.textContent = projects[activeIndex].category;
        infoContainer.style.opacity = '1';
    }, 300);
}

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        updateCarousel(activeIndex + 1);
    }, 3000);
}

function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    startAutoScroll();
}

prevBtn.addEventListener('click', () => {
    updateCarousel(activeIndex - 1);
    resetAutoScroll();
});

nextBtn.addEventListener('click', () => {
    updateCarousel(activeIndex + 1);
    resetAutoScroll();
});

if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        startAutoScroll();
    });
}
window.addEventListener('resize', centerActiveItem);

document.addEventListener('DOMContentLoaded', () => {
    // Check if returning from a project page
    const urlParams = new URLSearchParams(window.location.search);
    const projectIndex = parseInt(urlParams.get('project'));

    // Set active index if valid
    if (!isNaN(projectIndex) && projectIndex >= 0 && projectIndex < projects.length) {
        activeIndex = projectIndex;
    }

    initCarousel();
    startAutoScroll();

    // Use a timeout to ensure layout is done before centering
    setTimeout(centerActiveItem, 100);

    // Scroll to project section if returning from a detail page
    if (!isNaN(projectIndex)) {
        setTimeout(() => {
            const projectsSection = document.querySelector('.projects-section');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300); // Slightly more delay for stability
    }
});
