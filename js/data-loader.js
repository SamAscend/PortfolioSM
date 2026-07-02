// ========================================
// DATA LOADER — Load profile.json
// ========================================

async function loadProfileData() {
    try {
        const response = await fetch('data/profile.json');
        if (!response.ok) {
            throw new Error('Profile data not found');
        }
        const data = await response.json();
        console.log('✅ Profile data loaded:', data);
        return data;
    } catch (error) {
        console.warn('⚠️ Using fallback data (profile.json not found)');
        return null;
    }
}

// Load on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProfileData();
});

console.log('📦 data-loader.js loaded');