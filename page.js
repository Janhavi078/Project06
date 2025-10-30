
document.addEventListener('DOMContentLoaded', function () {

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // --- Sticky Header on Scroll ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-brand-dark/80', 'backdrop-blur-md');
        } else {
            header.classList.remove('bg-brand-dark/80', 'backdrop-blur-md');
        }
    });

    // --- On-Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animated-element');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = entry.target.classList.contains('hero-content') ? 'fadeInUp 0.8s ease-out forwards' : 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Three.js Hero Background Animation ---
    let scene, camera, renderer, stars, starGeo;

    function initHeroAnimation() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 1;
        camera.rotation.x = Math.PI / 2;

        renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById("hero-canvas"),
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);

        starGeo = new THREE.BufferGeometry();
        const starCoords = [];
        for (let i = 0; i < 6000; i++) {
            starCoords.push(
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300
            );
        }
        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));

        let sprite = new THREE.TextureLoader().load('https://placehold.co/10x10/ffffff/ffffff.png');
        let starMaterial = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 0.7,
            map: sprite,
            transparent: true
        });

        stars = new THREE.Points(starGeo, starMaterial);
        scene.add(stars);

        window.addEventListener("resize", onWindowResize, false);
        animate();
    }

    function animate() {
        starGeo.attributes.position.array.forEach((_, i) => {
            if (i % 3 === 1) { // y-coordinate
                starGeo.attributes.position.array[i] -= 0.2;
                if (starGeo.attributes.position.array[i] < -200) {
                    starGeo.attributes.position.array[i] = 200;
                }
            }
        });
        starGeo.attributes.position.needsUpdate = true;
        stars.rotation.y += 0.0002;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    initHeroAnimation();


    // --- Course Data and Filtering ---
    const courses = [
        { title: 'Full Stack Web Development', category: 'web-dev', tags: ['React', 'Node.js', 'MongoDB'], image: 'https://placehold.co/600x400/121212/6366F1?text=MERN' },
        { title: 'Python for Data Science', category: 'data-science', tags: ['Python', 'Pandas', 'NumPy'], image: 'https://placehold.co/600x400/121212/6366F1?text=Python' },
        { title: 'Advanced Java Programming', category: 'java', tags: ['Java', 'Spring Boot'], image: 'https://placehold.co/600x400/121212/6366F1?text=Java' },
        { title: 'C++ & Data Structures', category: 'cpp', tags: ['C++', 'DSA'], image: 'https://placehold.co/600x400/121212/6366F1?text=C++' },
        { title: 'React: From Beginner to Pro', category: 'web-dev', tags: ['React', 'JavaScript'], image: 'https://placehold.co/600x400/121212/6366F1?text=React' },
        { title: 'Machine Learning A-Z', category: 'data-science', tags: ['Python', 'AI/ML'], image: 'https://placehold.co/600x400/121212/6366F1?text=ML' },
        { title: 'SQL & Database Design', category: ['web-dev', 'data-science'], tags: ['SQL', 'Database'], image: 'https://placehold.co/600x400/121212/6366F1?text=SQL' },
        { title: 'Django Full-Stack Web Dev', category: ['web-dev', 'python'], tags: ['Python', 'Django'], image: 'https://placehold.co/600x400/121212/6366F1?text=Django' },
    ];

    const courseGrid = document.getElementById('course-grid');
    const filterContainer = document.getElementById('course-filters');

    function renderCourses(filter = 'all') {
        courseGrid.innerHTML = '';
        const filteredCourses = courses.filter(course =>
            filter === 'all' ||
            (Array.isArray(course.category) ? course.category.includes(filter) : course.category === filter)
        );

        filteredCourses.forEach((course, index) => {
            const card = document.createElement('div');
            card.className = 'course-card glass-card rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 animated-element';
            card.style.animationDelay = `${index * 0.1}s`;

            const tagsHtml = course.tags.map(tag => `<span class="bg-brand-accent/20 text-brand-accent text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">${tag}</span>`).join('');

            card.innerHTML = `
                        <img src="${course.image}" alt="${course.title}" class="w-full h-48 object-cover">
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-white mb-3">${course.title}</h3>
                            <div class="flex flex-wrap items-center">
                                ${tagsHtml}
                            </div>
                        </div>
                    `;
            courseGrid.appendChild(card);
            observer.observe(card);
        });
    }

    filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelector('.filter-btn.active').classList.remove('active');
            e.target.classList.add('active');
            const filterValue = e.target.getAttribute('data-filter');
            renderCourses(filterValue);
        }
    });

    // Initial render
    renderCourses();

    // --- Custom Style for Filter Buttons ---
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.toLowerCase().trim();

            courseGrid.innerHTML = '';
            const filteredCourses = courses.filter(course =>
                course.title.toLowerCase().includes(query) ||
                course.tags.some(tag => tag.toLowerCase().includes(query))
            );

            if (filteredCourses.length === 0) {
                courseGrid.innerHTML = `<p class="text-gray-400 text-center col-span-full">No courses found for "${query}"</p>`;
            } else {
                filteredCourses.forEach((course, index) => {
                    const card = document.createElement('div');
                    card.className = 'course-card glass-card rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 animated-element';
                    card.style.animationDelay = `${index * 0.1}s`;

                    const tagsHtml = course.tags.map(tag =>
                        `<span class="bg-brand-accent/20 text-brand-accent text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">${tag}</span>`
                    ).join('');

                    card.innerHTML = `
                    <img src="${course.image}" alt="${course.title}" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-white mb-3">${course.title}</h3>
                        <div class="flex flex-wrap items-center">
                            ${tagsHtml}
                        </div>
                    </div>
                `;
                    courseGrid.appendChild(card);
                    observer.observe(card);
                });
            }
        });
    }

    // --- User Authentication State Management ---
    function updateNavigationState() {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        // Desktop navigation elements
        const notLoggedIn = document.getElementById('notLoggedIn');
        const loggedIn = document.getElementById('loggedIn');
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');
        const dropdownUserName = document.getElementById('dropdownUserName');
        const dropdownUserEmail = document.getElementById('dropdownUserEmail');
        
        // Mobile navigation elements
        const mobileNotLoggedIn = document.getElementById('mobileNotLoggedIn');
        const mobileLoggedIn = document.getElementById('mobileLoggedIn');
        const mobileUserAvatar = document.getElementById('mobileUserAvatar');
        const mobileUserName = document.getElementById('mobileUserName');
        const mobileUserEmail = document.getElementById('mobileUserEmail');

        if (token && userData) {
            try {
                const user = JSON.parse(userData);
                
                // Show logged in state
                if (notLoggedIn) notLoggedIn.classList.add('hidden');
                if (loggedIn) loggedIn.classList.remove('hidden');
                if (mobileNotLoggedIn) mobileNotLoggedIn.classList.add('hidden');
                if (mobileLoggedIn) mobileLoggedIn.classList.remove('hidden');
                
                // Get user initials (first letter of first name and last name)
                const initials = getInitials(user.name);
                
                // Update desktop navigation
                if (userAvatar) userAvatar.textContent = initials;
                if (userName) userName.textContent = user.name;
                if (dropdownUserName) dropdownUserName.textContent = user.name;
                if (dropdownUserEmail) dropdownUserEmail.textContent = user.email;
                
                // Update mobile navigation
                if (mobileUserAvatar) mobileUserAvatar.textContent = initials;
                if (mobileUserName) mobileUserName.textContent = user.name;
                if (mobileUserEmail) mobileUserEmail.textContent = user.email;
                
            } catch (error) {
                console.error('Error parsing user data:', error);
                // Clear invalid data
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                updateNavigationState();
            }
        } else {
            // Show not logged in state
            if (notLoggedIn) notLoggedIn.classList.remove('hidden');
            if (loggedIn) loggedIn.classList.add('hidden');
            if (mobileNotLoggedIn) mobileNotLoggedIn.classList.remove('hidden');
            if (mobileLoggedIn) mobileLoggedIn.classList.add('hidden');
        }
    }

    // Get initials from full name
    function getInitials(name) {
        if (!name) return 'U';
        const names = name.trim().split(' ');
        if (names.length === 1) {
            return names[0].charAt(0).toUpperCase();
        }
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    }

    // Toggle user dropdown
    function toggleUserDropdown() {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const userProfileBtn = document.getElementById('userProfileBtn');
        const userDropdown = document.getElementById('userDropdown');
        
        if (userProfileBtn && userDropdown && !userProfileBtn.contains(event.target)) {
            userDropdown.classList.add('hidden');
        }
    });

    // Logout functionality
    function logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        updateNavigationState();
        
        // Redirect to home page
        window.location.href = '/';
    }

    // Event listeners for dropdown and logout
    const userProfileBtn = document.getElementById('userProfileBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');

    if (userProfileBtn) {
        userProfileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleUserDropdown();
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }

    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }

    // Initialize navigation state on page load
    updateNavigationState();

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', function(e) {
        if (e.key === 'authToken' || e.key === 'userData') {
            updateNavigationState();
        }
    });

    // Smooth scroll for in-page links (Learn section)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            }
        });
    });
})
