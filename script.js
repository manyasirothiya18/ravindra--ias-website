document.addEventListener('DOMContentLoaded', () => {

    // 1. Counter Animation for Results
    const counters = document.querySelectorAll('.counter');
    const startCounter = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / 100;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    };

    // Trigger counter when hero section is visible
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            startCounter();
            observer.disconnect();
        }
    }, { threshold: 0.1 });
    observer.observe(document.querySelector('#results'));


    // 2. Resource Tab Switcher logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI Toggle
            tabBtns.forEach(b => b.classList.remove('active', 'border-orange-600', 'text-blue-900'));
            btn.classList.add('active', 'border-orange-600', 'text-blue-900');

            // Content Toggle
            const target = btn.getAttribute('data-target');
            tabContents.forEach(content => {
                content.id === target ? content.classList.remove('hidden') : content.classList.add('hidden');
            });
        });
    });


    // 3. FAQ Accordion Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('button');
        btn.addEventListener('click', () => {
            // Close others
            faqItems.forEach(i => { if(i !== item) i.classList.remove('active'); });
            // Toggle current
            item.classList.toggle('active');
        });
    });

});