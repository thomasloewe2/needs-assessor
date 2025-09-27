document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('internet-needs-form');
    if (!form) return;

    // Define links for the technologies
    const techLinks = {
        '4G': { name: '4G internet', url: 'https://teleguiden.dk/mobilt-bredbaand/' },
        '5G': { name: '5G internet', url: 'https://teleguiden.dk/5g-internet/' },
        'Fibernet': { name: 'Fibernet', url: 'https://teleguiden.dk/fibernet/' },
        'Kabel-TV-net': { name: 'Kabel-TV-net', url: 'https://teleguiden.dk/bredband-via-kabel-tv-stikket/' }
    };

    // Function to calculate and display the result
    function calculateAndDisplayResult() {
        const persons = document.querySelector('input[name="persons"]:checked').value;
        const streaming = document.querySelector('input[name="streaming"]:checked').value;
        const gaming = document.querySelector('input[name="gaming"]:checked').value;
        const workFromHome = document.querySelector('input[name="workfromhome"]:checked').value;

        let minMbit = 0;
        let maxMbit = 0;
        let recommendedTechs = [];

        // 1. Baseline based on number of persons
        if (persons === '1') {
            minMbit = 20; maxMbit = 50;
            recommendedTechs = ['4G', '5G', 'Fibernet', 'Kabel-TV-net'];
        } else if (persons === '2-3') {
            minMbit = 50; maxMbit = 100;
            recommendedTechs = ['4G', '5G', 'Fibernet', 'Kabel-TV-net'];
        } else if (persons === '4+') {
            minMbit = 100; maxMbit = 200;
            recommendedTechs = ['5G', 'Fibernet', 'Kabel-TV-net'];
        }

        // Helper function to find the intersection of two tech arrays
        const findCommonTechs = (arr1, arr2) => arr1.filter(tech => arr2.includes(tech));

        // 2. Adjust for streaming
        if (streaming === 'some') {
            const addition = (persons === '4+') ? 100 : 50;
            minMbit += addition; maxMbit += addition;
            const streamingTechs = (persons === '4+') ? ['5G', 'Fibernet', 'Kabel-TV-net'] : ['4G', '5G', 'Fibernet', 'Kabel-TV-net'];
            recommendedTechs = findCommonTechs(recommendedTechs, streamingTechs);
        } else if (streaming === 'much') {
            const addition = (persons === '4+') ? 200 : 100;
            minMbit += addition; maxMbit += addition;
            recommendedTechs = findCommonTechs(recommendedTechs, ['5G', 'Fibernet', 'Kabel-TV-net']);
        }

        // 3. Adjust for gaming
        if (gaming === 'some') {
            const addition = (persons === '4+') ? 100 : 50;
            minMbit += addition; maxMbit += addition;
            recommendedTechs = findCommonTechs(recommendedTechs, ['5G', 'Fibernet', 'Kabel-TV-net']);
        } else if (gaming === 'much') {
            const addition = (persons === '4+') ? 200 : 100;
            minMbit += addition; maxMbit += addition;
            recommendedTechs = findCommonTechs(recommendedTechs, ['Fibernet', 'Kabel-TV-net']);
        }

        // 4. Adjust for work from home
        if (workFromHome === 'some') {
            const addition = (persons === '4+') ? 100 : 50;
            minMbit += addition; maxMbit += addition;
            recommendedTechs = findCommonTechs(recommendedTechs, ['5G', 'Fibernet', 'Kabel-TV-net']);
        } else if (workFromHome === 'much') {
            const addition = (persons === '4+') ? 400 : 200;
            minMbit += addition; maxMbit += addition;
            recommendedTechs = findCommonTechs(recommendedTechs, ['Fibernet', 'Kabel-TV-net']);
        }

        // Update the User Interface
        updateUI(minMbit, maxMbit, recommendedTechs);
    }

    function updateUI(min, max, techs) {
        // Update Mbit text
        const mbitResult = document.getElementById('mbit-result');
        if (min === max) {
            mbitResult.textContent = `${min}+ Mbit`;
        } else {
            mbitResult.textContent = `${min}-${max} Mbit`;
        }
        
        // Update speedometer
        const progress = document.getElementById('speedometer-progress');
        const maxSpeed = 1000; // Set a max value for the speedometer
        const avgSpeed = (min + max) / 2;
        const progressValue = Math.min(avgSpeed, maxSpeed) / maxSpeed;
        const circumference = 393; // (250 * PI) / 2
        const dashOffset = circumference * (1 - progressValue);
        progress.style.strokeDashoffset = dashOffset;

        // Update list of technologies
        const techList = document.getElementById('tech-recommendations');
        techList.innerHTML = ''; // Clear previous list

        if (techs.length > 0) {
            techs.forEach(techKey => {
                const techInfo = techLinks[techKey];
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = techInfo.url;
                link.textContent = techInfo.name;
                link.target = '_blank'; // Open in a new tab
                listItem.appendChild(link);
                techList.appendChild(listItem);
            });
        } else {
             const listItem = document.createElement('li');
             // *** DENNE LINJE ER OVERSAT ***
             listItem.textContent = 'Ingen teknologier matcher dit høje behov. Overvej en dedikeret fiberforbindelse.';
             techList.appendChild(listItem);
        }
    }

    // Listen for changes in the form
    form.addEventListener('change', calculateAndDisplayResult);

    // Run an initial calculation when the page loads
    calculateAndDisplayResult();
});