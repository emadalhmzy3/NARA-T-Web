
const fs = require('fs');
const path = require('path');

const personaPath = path.join(__dirname, '..', 'persona_profiles.json');
const personas = JSON.parse(fs.readFileSync(personaPath, 'utf8'));

// Convert to a smaller JS array for the frontend
const frontendPersonas = Object.entries(personas).map(([id, data]) => {
    // Map genres or attributes to a friendly name if possible
    let category = "Casual";
    if (data.pref_energy > 0.7) category = "High Energy";
    if (data.pref_energy < 0.3) category = "Chill";

    return {
        id: id,
        name: id.replace('user_', '').replace('_', ' ').toUpperCase(),
        task: data.preferred_genres.includes('ambient') ? 'Sleep' :
            (data.preferred_genres.includes('podcast') ? 'Podcast' : 'Music'),
        context: {
            energy: data.pref_energy,
            vocal: data.pref_vocal,
            genres: data.preferred_genres
        },
        category: category
    };
});

// Update translations.js with this data or create a new data file
const output = `const PERSONA_FLEET = ${JSON.stringify(frontendPersonas, null, 2)};`;
fs.writeFileSync(path.join(__dirname, 'persona_data.js'), output);
console.log("Generated persona_data.js with " + frontendPersonas.length + " personas.");
