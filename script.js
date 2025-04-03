document.addEventListener('DOMContentLoaded', function() {
    // Database of 30 NBA legends (name, scoring, defense, assist, rebound)
    const allTimeGreats = [
        { name: "Michael Jordan", scoring: 99, defense: 95, assist: 85, rebound: 80 },
        { name: "LeBron James", scoring: 96, defense: 90, assist: 95, rebound: 85 },
        { name: "Kobe Bryant", scoring: 98, defense: 90, assist: 85, rebound: 75 },
        { name: "Shaquille O'Neal", scoring: 95, defense: 85, assist: 50, rebound: 98 },
        { name: "Magic Johnson", scoring: 90, defense: 80, assist: 99, rebound: 75 },
        { name: "Larry Bird", scoring: 97, defense: 85, assist: 88, rebound: 90 },
        { name: "Tim Duncan", scoring: 90, defense: 97, assist: 75, rebound: 95 },
        { name: "Hakeem Olajuwon", scoring: 93, defense: 98, assist: 70, rebound: 97 },
        { name: "Kevin Durant", scoring: 97, defense: 80, assist: 75, rebound: 75 },
        { name: "Stephen Curry", scoring: 96, defense: 75, assist: 90, rebound: 60 },
        { name: "Dirk Nowitzki", scoring: 95, defense: 75, assist: 75, rebound: 85 },
        { name: "Kevin Garnett", scoring: 88, defense: 96, assist: 80, rebound: 97 },
        { name: "Allen Iverson", scoring: 95, defense: 75, assist: 85, rebound: 60 },
        { name: "Dwyane Wade", scoring: 94, defense: 88, assist: 85, rebound: 70 },
        { name: "Charles Barkley", scoring: 90, defense: 85, assist: 75, rebound: 95 },
        { name: "Karl Malone", scoring: 93, defense: 85, assist: 80, rebound: 90 },
        { name: "Scottie Pippen", scoring: 85, defense: 97, assist: 85, rebound: 80 },
        { name: "Steve Nash", scoring: 88, defense: 70, assist: 98, rebound: 60 },
        { name: "Yao Ming", scoring: 88, defense: 85, assist: 65, rebound: 90 },
        { name: "Russell Westbrook", scoring: 90, defense: 80, assist: 90, rebound: 85 }
    ];

    let currentPlayers = [];
    const randomPlayersDiv = document.getElementById('random-players');
    const scoringSelect = document.getElementById('scoring-select');
    const defenseSelect = document.getElementById('defense-select');
    const assistSelect = document.getElementById('assist-select');
    const reboundSelect = document.getElementById('rebound-select');
    const createBtn = document.getElementById('create-player');
    const resultDiv = document.getElementById('result');
    const createdName = document.getElementById('created-name');
    const playerRating = document.getElementById('player-rating');
    const playerComment = document.getElementById('player-comment');
    const tryAgainBtn = document.getElementById('try-again');

    // Shuffle array and pick 6 random players
    function getRandomPlayers() {
        const shuffled = [...allTimeGreats].sort(() => 0.5 - Math.random());
        currentPlayers = shuffled.slice(0, 6);
        displayRandomPlayers();
        updateDropdowns();
    }

    // Display the 6 random players
    function displayRandomPlayers() {
        randomPlayersDiv.innerHTML = '';
        currentPlayers.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.className = 'player-card';
            playerCard.innerHTML = `
                <h3>${player.name}</h3>
                <p>🔥 ${player.scoring} | 🛡️ ${player.defense}</p>
                <p>🎯 ${player.assist} | 💪 ${player.rebound}</p>
            `;
            randomPlayersDiv.appendChild(playerCard);
        });
    }

    // Update dropdowns with current players
    function updateDropdowns() {
        scoringSelect.innerHTML = '<option value="">-- Pick a scorer --</option>';
        defenseSelect.innerHTML = '<option value="">-- Pick a defender --</option>';
        assistSelect.innerHTML = '<option value="">-- Pick a passer --</option>';
        reboundSelect.innerHTML = '<option value="">-- Pick a rebounder --</option>';

        currentPlayers.forEach(player => {
            scoringSelect.innerHTML += `<option value="${player.name}">${player.name} (🔥 ${player.scoring})</option>`;
            defenseSelect.innerHTML += `<option value="${player.name}">${player.name} (🛡️ ${player.defense})</option>`;
            assistSelect.innerHTML += `<option value="${player.name}">${player.name} (🎯 ${player.assist})</option>`;
            reboundSelect.innerHTML += `<option value="${player.name}">${player.name} (💪 ${player.rebound})</option>`;
        });
    }

    // Create the player and display results
    function createSuperstar() {
        const name = document.getElementById('player-name').value.trim();
        if (!name || !scoringSelect.value || !defenseSelect.value || !assistSelect.value || !reboundSelect.value) {
            alert("Bro, you can't leave anything blank! Even Kwame Brown had stats.");
            return;
        }

        // Get selected players' attributes
        const scorer = currentPlayers.find(p => p.name === scoringSelect.value);
        const defender = currentPlayers.find(p => p.name === defenseSelect.value);
        const passer = currentPlayers.find(p => p.name === assistSelect.value);
        const rebounder = currentPlayers.find(p => p.name === reboundSelect.value);

        // Calculate overall rating (average of chosen attributes)
        const overall = Math.round((scorer.scoring + defender.defense + passer.assist + rebounder.rebound) / 4);

        // Display results
        createdName.textContent = name;
        playerRating.textContent = `Overall Rating: ${overall}/100`;
        
        // Fun comments based on rating
        if (overall >= 95) {
            playerComment.textContent = "GOAT ALERT! MJ is shaking in his Hanes right now.";
        } else if (overall >= 85) {
            playerComment.textContent = "All-Star material! Just don't choke in the playoffs.";
        } else if (overall >= 75) {
            playerComment.textContent = "Solid role player. You'll get a max contract from the Knicks.";
        } else {
            playerComment.textContent = "Yikes. Maybe try eSports?";
        }

        resultDiv.classList.remove('hidden');
    }

    // Event listeners
    createBtn.addEventListener('click', createSuperstar);
    tryAgainBtn.addEventListener('click', () => {
        resultDiv.classList.add('hidden');
        getRandomPlayers();
    });

    // Initialize
    getRandomPlayers();
});