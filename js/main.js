/* Interactive Features for Blade Automotive */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ADAPTIVE HEADER ON SCROLL
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                header.classList.add('bg-slate-950/95', 'shadow-xl', 'py-1', 'border-slate-800');
                header.classList.remove('bg-slate-950/80', 'py-0');
            } else {
                header.classList.remove('bg-slate-950/95', 'shadow-xl', 'py-1');
                header.classList.add('bg-slate-950/80');
            }
        });
    }

    // 2. INTERACTIVE BEFORE / AFTER IMAGE SLIDER
    const slider = document.querySelector('.slider-container');
    const beforeImage = document.querySelector('.image-before');
    const handle = document.querySelector('.slider-handle');

    if (slider && beforeImage && handle) {
        let isDragging = false;

        const updateSliderPosition = (clientX) => {
            const rect = slider.getBoundingClientRect();
            const positionX = clientX - rect.left;
            let percentage = (positionX / rect.width) * 100;

            // Restrict bounds between 0% and 100%
            if (percentage < 0) percentage = 0;
            if (percentage > 100) percentage = 100;

            // Update DOM element positions
            beforeImage.style.width = `${percentage}%`;
            handle.style.left = `${percentage}%`;
        };

        // Mouse Events
        handle.addEventListener('mousedown', () => isDragging = true);
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSliderPosition(e.clientX);
        });

        // Touch Events for Mobile Viewports
        handle.addEventListener('touchstart', () => isDragging = true);
        window.addEventListener('touchend', () => isDragging = false);
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            if (e.touches.length > 0) {
                updateSliderPosition(e.touches[0].clientX);
            }
        });

        // Click-to-move inside container
        slider.addEventListener('click', (e) => {
            if (e.target === handle) return;
            updateSliderPosition(e.clientX);
        });
    }

    // 3. ENQUIRY FORM TOAST NOTIFICATION SUCCESS
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload to showcase beautiful toast experience

            // Extract submitted user data
            const name = document.getElementById('name')?.value || 'Valued Customer';
            const vehicle = document.getElementById('vehicle')?.value || 'your vehicle';

            // Create modern dynamic Toast Element
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 border-2 border-safetyAmber text-white p-5 rounded-xl shadow-2xl flex items-start gap-4 max-w-md w-[90%] z-50 toast-animate-in';
            toast.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-safetyAmber/10 flex items-center justify-center flex-shrink-0 border border-safetyAmber/30 mt-0.5">
                    <svg class="w-5 h-5 text-safetyAmber" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <div>
                    <h5 class="font-oswald text-base font-bold uppercase text-white tracking-wide">Estimate Requested!</h5>
                    <p class="text-xs text-slate-300 mt-1 leading-relaxed">
                        Thank you, <span class="text-safetyAmber font-semibold">${name}</span>. We've received your request for <span class="text-white font-semibold">${vehicle}</span>. A technician will contact you within 60 minutes with your quote!
                    </p>
                </div>
            `;

            document.body.appendChild(toast);

            // Clean up and reset fields
            form.reset();

            // Animate out and remove from document flow
            setTimeout(() => {
                toast.classList.remove('toast-animate-in');
                toast.classList.add('toast-animate-out');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 5000);
        });
    }
});
