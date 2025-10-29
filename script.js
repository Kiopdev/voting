document.addEventListener('DOMContentLoaded', function() {
    const voteForm = document.getElementById('voteForm');
    const nameSelect = document.getElementById('nameSelect');
    const voteList = document.getElementById('voteList');

    // Load existing votes from local storage
    let votes = JSON.parse(localStorage.getItem('votes')) || {};

    // Display current results
    updateResults();

    voteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const selectedName = nameSelect.value;
        if (selectedName) {
            // Increment vote count
            votes[selectedName] = (votes[selectedName] || 0) + 1;
            // Save to local storage
            localStorage.setItem('votes', JSON.stringify(votes));
            // Update display with animation reset
            updateResults();
            // Reset form
            nameSelect.value = '';
            alert('Vote submitted!');
        }
    });

    function updateResults() {
        voteList.innerHTML = '';
        let delay = 0;
        for (const [name, count] of Object.entries(votes)) {
            const li = document.createElement('li');
            li.textContent = `${name}: ${count} vote(s)`;
            li.style.animationDelay = `${delay}s`;
            voteList.appendChild(li);
            delay += 0.1; // Stagger delay for each item
        }
    }
});