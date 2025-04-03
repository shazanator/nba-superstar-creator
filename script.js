document.addEventListener('DOMContentLoaded', function() {
    const allTimeGreats = [
        // ... (keep your existing player database) ...
    ];

    let availablePlayers = [];
    let selectedAttributes = {
        scoring: null,
        defense: null,
        assist: null,
        rebound: null
    };

    // DOM elements
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
    const subtitle = document.getElementById('subtitle');

    // Initialize
    resetGame();

    function resetGame() {
        availablePlayers = [...allTimeGreats];
        selectedAttributes = {
            scoring: null,
            defense: null,
            assist: null,
            rebound: null
        };
        updateDropdowns();
        subtitle.textContent = "First up: Choose your scorer! (No pressure, but this determines if you're MJ or Anthony Bennett)";
    }

    function getRandomPlayers() {
        const shuffled = [...availablePlayers].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 6);
    }

    function updateDropdowns() {
        const currentPlayers = getRandomPlayers();
        
        // Clear all dropdowns first
        scoringSelect.innerHTML = '<option value="">-- Pick a scorer --</option>';
        defenseSelect.innerHTML = '<option value="">-- Pick a defender --</option>';
        assistSelect.innerHTML = '<option value="">-- Pick a passer --</option>';
        reboundSelect.innerHTML = '<option value="">-- Pick a rebounder --</option>';

        // Enable/disable dropdowns based on selection progress
        scoringSelect.disabled = selectedAttributes.scoring !== null;
        defenseSelect.disabled = selectedAttributes.scoring === null;
        assistSelect.disabled = selectedAttributes.defense === null;
        reboundSelect.disabled = selectedAttributes.assist === null;

        // Populate available options
        currentPlayers.forEach(player => {
            if (!Object.values(selectedAttributes).includes(player.name)) {
                if (!selectedAttributes.scoring) {
                    scoringSelect.innerHTML += `<option value="${player.name}">${player.name} (🔥 ${player.scoring})</option>`;
                }
                if (selectedAttributes.scoring && !selectedAttributes.defense) {
                    defenseSelect.innerHTML += `<option value="${player.name}">${player.name} (🛡️ ${player.defense})</option>`;
                }
                if (selectedAttributes.defense && !selectedAttributes.assist) {
                    assistSelect.innerHTML += `<option value="${player.name}">${player.name} (🎯 ${player.assist})</option>`;
                }
                if (selectedAttributes.assist && !selectedAttributes.rebound) {
                    reboundSelect.innerHTML += `<option value="${player.name}">${player.name} (💪 ${player.rebound})</option>`;
                }
            }
        });

        // Update funny subtitle based on progress
        updateSubtitle();
    }

    function updateSubtitle() {
        if (!selectedAttributes.scoring) {
            subtitle.textContent = "First up: Choose your scorer! (No pressure, but this determines if you're MJ or Anthony Bennett)";
        } else if (!selectedAttributes.defense) {
            subtitle.textContent = "Now pick defense! (Unless you're building a modern All-Star who doesn't play any)";
        } else if (!selectedAttributes.assist) {
            subtitle.textContent = "Passing time! Will you be Magic... or Russell Westbrook taking 30 shots?";
        } else if (!selectedAttributes.rebound) {
            subtitle.textContent = "Last one! Rebounding - because someone has to clean up your bricked threes";
        }
    }

    // Event listeners for each dropdown
    scoringSelect.addEventListener('change', function() {
        if (this.value) {
            selectedAttributes.scoring = this.value;
            availablePlayers = availablePlayers.filter(p => p.name !== this.value);
            updateDropdowns();
        }
    });

    defenseSelect.addEventListener('change', function() {
        if (this.value) {
            selectedAttributes.defense = this.value;
            availablePlayers = availablePlayers.filter(p => p.name !== this.value);
            updateDropdowns();
        }
    });

    assistSelect.addEventListener('change', function() {
        if (this.value) {
            selectedAttributes.assist = this.value;
            availablePlayers = availablePlayers.filter(p => p.name !== this.value);
            updateDropdowns();
        }
    });

    reboundSelect.addEventListener('change', function() {
        if (this.value) {
            selectedAttributes.rebound = this.value;
            updateDropdowns();
        }
    });

    createBtn.addEventListener('click', createSuperstar);
    tryAgainBtn.addEventListener('click', resetGame);

    function createSuperstar() {
        // ... (keep your existing createSuperstar function) ...
    }
});
