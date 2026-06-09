
(function () {
    var form = document.getElementById('applyForm');
    if (!form) return;

    var rules = [
        { id: 'fullName', err: 'fullNameErr', test: function (v) { return v.trim().length >= 2; } },
        { id: 'mobile',   err: 'mobileErr',   test: function (v) { return /^[6-9]\d{9}$/.test(v.trim()); } },
        { id: 'email',    err: 'emailErr',     test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } },
        { id: 'pan',      err: 'panErr',       test: function (v) { return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(v.trim().toUpperCase()); } },
        { id: 'dob',      err: 'dobErr',       test: function (v) { return /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(v.trim()); } },
        { id: 'profession', err: 'profErr',    test: function (v) { return v !== ''; } }
    ];

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var valid = true;


        document.querySelectorAll('.field').forEach(function (f) { f.classList.remove('has-error'); });
        document.querySelectorAll('.field-error').forEach(function (err) { err.style.display = 'none'; });

        rules.forEach(function (r) {
            var el = document.getElementById(r.id);
            if (!r.test(el.value)) {
                el.closest('.field').classList.add('has-error');
                document.getElementById(r.err).style.display = 'block';
                valid = false;
            }
        });

        if (!document.getElementById('agreetnc').checked) {
            document.getElementById('tncErr').style.display = 'block';
            valid = false;
        }

        if (valid) {
            alert('Thank you! Your application has been submitted successfully.');
            form.reset();
        }
    });
})();



(function () {
    var track = document.getElementById('carouselTrack');
    var slides = track ? Array.from(track.children) : [];
    if (slides.length === 0) return;

    var dotsWrap = document.getElementById('carouselDots');
    var prevBtn = document.getElementById('carPrev');
    var nextBtn = document.getElementById('carNext');
    var current = 0;


    slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.className = 'c-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(dot);
    });

    var dots = Array.from(dotsWrap.children);

    function goTo(idx) {
        if (idx < 0) idx = slides.length - 1;
        if (idx >= slides.length) idx = 0;
        current = idx;
        
        var prevIdx = current === 0 ? slides.length - 1 : current - 1;
        var nextIdx = current === slides.length - 1 ? 0 : current + 1;

        slides.forEach(function (slide, i) {
            slide.className = 'carousel-slide'; 
            if (i === current) slide.classList.add('active');
            else if (i === prevIdx) slide.classList.add('prev');
            else if (i === nextIdx) slide.classList.add('next');
        });

        dots.forEach(function (d, i) {
            d.classList.toggle('active', i === current);
        });
    }


    goTo(0);

    prevBtn.addEventListener('click', function () { goTo(current - 1); });
    nextBtn.addEventListener('click', function () { goTo(current + 1); });


    setInterval(function () { goTo(current + 1); }, 4000);
})();



(function () {
    var items = document.querySelectorAll('.faq-item');
    items.forEach(function (item) {
        var btn = item.querySelector('.faq-q');
        btn.addEventListener('click', function () {
            var wasActive = item.classList.contains('active');

            items.forEach(function (it) { it.classList.remove('active'); });

            if (!wasActive) item.classList.add('active');
        });
    });
})();
