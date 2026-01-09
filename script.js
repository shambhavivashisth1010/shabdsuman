/**
 * शब्दसुमन – हिंदी काव्य मंच
 * JavaScript for Dynamic Content Management
 * Features: Category filtering, Search, Upload functionality, Admin Authentication, Navigation History
 */

// ============================================
// NAVIGATION HISTORY
// ============================================
let navigationHistory = ['home'];
let currentHistoryIndex = 0;

// ============================================
// ADMIN AUTHENTICATION
// ============================================
const ADMIN_PASSWORD = "admin123"; // Change this to a secure password
let isAdminLoggedIn = false;

// Check admin status on page load
document.addEventListener('DOMContentLoaded', function() {
    loadPoemsFromStorage();
    checkAdminStatus();
    displayAllPoems();
    displayCategoryPoems();
    updateNavigationButtons();
});

function checkAdminStatus() {
    const adminStatus = sessionStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
        isAdminLoggedIn = true;
        showAdminButton();
    }
}

function showAdminPanel() {
    if (isAdminLoggedIn) {
        showSection('upload');
    } else {
        document.getElementById('adminModal').style.display = 'flex';
        document.getElementById('adminPassword').focus();
    }
}

function checkAdminPassword() {
    const password = document.getElementById('adminPassword').value;
    const errorMsg = document.getElementById('loginError');
    
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        sessionStorage.setItem('isAdmin', 'true');
        showAdminButton();
        closeAdminModal();
        showSection('upload');
        errorMsg.textContent = '';
    } else {
        errorMsg.textContent = 'गलत पासवर्ड! कृपया पुनः प्रयास करें।';
        document.getElementById('adminPassword').value = '';
    }
}

function closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
    document.getElementById('adminPassword').value = '';
    document.getElementById('loginError').textContent = '';
}

function logoutAdmin() {
    if (confirm('क्या आप लॉगआउट करना चाहते हैं?')) {
        isAdminLoggedIn = false;
        sessionStorage.removeItem('isAdmin');
        
        // Hide admin buttons
        document.getElementById('adminUploadBtn').style.display = 'none';
        document.getElementById('adminLogoutBtn').style.display = 'none';
        
        // Reset login button
        const loginBtn = document.getElementById('adminLoginBtn');
        loginBtn.textContent = '🔐 Admin';
        loginBtn.onclick = showAdminPanel;
        
        // Go to home section
        showSection('home');
        
        // Show logout message
        alert('आप सफलतापूर्वक लॉगआउट हो गए हैं।');
    }
}

function showAdminButton() {
    document.getElementById('adminUploadBtn').style.display = 'inline-block';
    const loginBtn = document.getElementById('adminLoginBtn');
    loginBtn.textContent = '📤 अपलोड';
    loginBtn.onclick = function() { showSection('upload'); };
    
    // Show logout button
    const logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) {
        logoutBtn.style.display = 'inline-flex';
    }
}

// ============================================
// PERSISTENT STORAGE - LocalStorage Integration
// ============================================
function savePoemsToStorage() {
    try {
        localStorage.setItem('shabdSumanPoems', JSON.stringify(poems));
        console.log('Poems saved to storage successfully');
    } catch (error) {
        console.error('Error saving poems to storage:', error);
    }
}

function loadPoemsFromStorage() {
    try {
        const storedPoems = localStorage.getItem('shabdSumanPoems');
        if (storedPoems) {
            const parsedPoems = JSON.parse(storedPoems);
            if (parsedPoems && parsedPoems.length > 0) {
                poems = parsedPoems;
                console.log('Poems loaded from storage:', poems.length, 'poems found');
            }
        }
    } catch (error) {
        console.error('Error loading poems from storage:', error);
    }
}

// ============================================
// DATA STORAGE - Poems Array (Future: Replace with Database)
// ============================================
let poems = [
    {
        id: 1,
        category: 'bhakti',
        categoryName: 'भक्ति काव्य',
        title: 'राम वंदना',
        text: `श्री राम चंद्र कृपालु भजुमन,
हरण भवभय दारुणम्।
नवकंज लोचन कंज मुखकर,
कंज पद कंजारुणम्॥

भजु दीनबंधु दिनेश दानव,
दैत्यवंश निकंदनम्।
रघुनंद आनंदकंद कोशल,
चंद दशरथ नंदनम्॥`
    },
    {
        id: 2,
        category: 'veer',
        categoryName: 'वीर रस',
        title: 'वीर भारत',
        text: `मेरा रंग दे बसंती चोला,
माये रंग दे बसंती चोला।
रंग दे बसंती चोला,
माये रंग दे बसंती चोला॥

शहीदों की चिताओं पर,
लगेंगे हर बरस मेले।
वतन पे मिटने वालों का,
यही बाकी निशां होगा॥`
    },
    {
        id: 3,
        category: 'shringar',
        categoryName: 'श्रृंगार काव्य',
        title: 'प्रेम की परिभाषा',
        text: `प्रेम वह आग है जो जलाती नहीं,
प्रेम वह आग है जो बुझती नहीं।
प्रेम में डूबे जो मन,
वह कभी थकता नहीं॥

मधुर मिलन की वह घड़ी,
जब दो दिल मिल जाते हैं।
सारे जहां की खुशियाँ,
पलकों में सिमट जाते हैं॥`
    },
    {
        id: 4,
        category: 'neeti',
        categoryName: 'नीति काव्य',
        title: 'सत्य का मार्ग',
        text: `सत्य की राह पर चलना सीखो,
कर्म का फल भोगना सीखो।
जीवन में संघर्ष है जरूरी,
हर मुश्किल को जीतना सीखो॥

धर्म की रक्षा सदा करो तुम,
नीति का पालन सदा करो तुम।
जीवन में आए जो भी विघ्न,
सत्य के साथ निभाना सीखो॥`
    },
    {
        id: 5,
        category: 'prerak',
        categoryName: 'प्रेरणादायक काव्य',
        title: 'उठो और चलो',
        text: `गिरकर उठना सीखो साथी,
हारकर जीतना सीखो साथी।
जीवन संघर्ष का नाम है,
मुश्किलों से लड़ना सीखो साथी॥

सपनों को साकार करो तुम,
असंभव को संभव करो तुम।
हिम्मत और हौसले के साथ,
हर मंजिल को पाना सीखो॥`
    },
    {
        id: 6,
        category: 'bal',
        categoryName: 'बाल काव्य',
        title: 'चंदा मामा',
        text: `चंदा मामा दूर के,
पुए पकाएं बूर के।
आप खाएं थाली में,
मुन्ने को दें प्याली में॥

चंदा मामा आओ ना,
अपनी किस्से सुनाओ ना।
तारों की दुनिया दिखाओ,
रात भर हमें जगाओ ना॥`
    },
    {
        id: 7,
        category: 'samajik',
        categoryName: 'सामाजिक काव्य',
        title: 'समाज की आवाज़',
        text: `जागो भारत जागो,
समाज को सुधारो।
अन्याय के विरुद्ध,
आवाज़ उठाओ॥

बेटी बचाओ, बेटी पढ़ाओ,
समानता का पाठ पढ़ाओ।
जाति-धर्म के भेद मिटाओ,
एक नया समाज बनाओ॥`
    }
];

// ============================================
// SECTION NAVIGATION - Show/Hide Sections
// ============================================
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Add to navigation history
    if (navigationHistory[currentHistoryIndex] !== sectionId) {
        // Remove any forward history when navigating to a new section
        navigationHistory = navigationHistory.slice(0, currentHistoryIndex + 1);
        navigationHistory.push(sectionId);
        currentHistoryIndex = navigationHistory.length - 1;
    }

    // Update navigation buttons state
    updateNavigationButtons();
    
    // If showing a category, refresh its content
    if (sectionId !== 'home' && sectionId !== 'upload') {
        displayCategoryPoems();
    }
}

// ============================================
// NAVIGATION HISTORY CONTROLS
// ============================================
function goBack() {
    if (currentHistoryIndex > 0) {
        currentHistoryIndex--;
        const previousSection = navigationHistory[currentHistoryIndex];
        navigateToSection(previousSection);
    }
}

function goForward() {
    if (currentHistoryIndex < navigationHistory.length - 1) {
        currentHistoryIndex++;
        const nextSection = navigationHistory[currentHistoryIndex];
        navigateToSection(nextSection);
    }
}

function goToHome() {
    showSection('home');
}

function navigateToSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Update navigation buttons state
    updateNavigationButtons();
    
    // If showing a category, refresh its content
    if (sectionId !== 'home' && sectionId !== 'upload') {
        displayCategoryPoems();
    }
}

function updateNavigationButtons() {
    // Get all navigation control buttons
    const backBtn = document.querySelector('.nav-controls button:first-child');
    const forwardBtn = document.querySelector('.nav-controls button:nth-child(2)');

    if (!backBtn || !forwardBtn) return;

    // Disable/enable back button
    if (currentHistoryIndex <= 0) {
        backBtn.disabled = true;
    } else {
        backBtn.disabled = false;
    }

    // Disable/enable forward button
    if (currentHistoryIndex >= navigationHistory.length - 1) {
        forwardBtn.disabled = true;
    } else {
        forwardBtn.disabled = false;
    }
}

// ============================================
// DISPLAY POEMS - Show All Poems on Home
// ============================================
function displayAllPoems() {
    const container = document.getElementById('allPoemsContainer');
    if (!container) return;

    container.innerHTML = '';

    if (poems.length === 0) {
        container.innerHTML = '<p class="no-poems">शब्द अभी मौन हैं, पर भाव शीघ्र ही प्रकट होंगे 🙏</p>';
        return;
    }

    poems.forEach(poem => {
        container.innerHTML += createPoemCard(poem);
    });
}

// ============================================
// DISPLAY CATEGORY POEMS - Filter by Category
// ============================================
function displayCategoryPoems() {
    const categories = ['bhakti', 'shringar', 'veer', 'neeti', 'samajik', 'bal', 'prerak'];

    categories.forEach(category => {
        const container = document.querySelector(`[data-category="${category}"]`);
        if (!container) return;

        const categoryPoems = poems.filter(poem => poem.category === category);
        
        container.innerHTML = '';

        if (categoryPoems.length === 0) {
            container.innerHTML = '<p class="no-poems">शब्द अभी मौन हैं, पर भाव शीघ्र ही प्रकट होंगे 🙏</p>';
            return;
        }

        categoryPoems.forEach(poem => {
            container.innerHTML += createPoemCard(poem);
        });
    });
}

// ============================================
// CREATE POEM CARD - HTML Template for Each Poem
// ============================================
function createPoemCard(poem) {
    return `
        <div class="poem-card" data-poem-id="${poem.id}">
            <span class="poem-category">${poem.categoryName}</span>
            <h3 class="poem-title">${poem.title}</h3>
            <div class="poem-text">${poem.text}</div>
        </div>
    `;
}

// ============================================
// TRANSLITERATION MAP - English to Hindi
// ============================================
const englishToHindiMap = {
    // Common words
    'ram': ['राम', 'रामा'],
    'krishna': ['कृष्ण', 'कृष्णा'],
    'shiva': ['शिव', 'शिवा'],
    'devi': ['देवी'],
    'bhakti': ['भक्ति'],
    'prem': ['प्रेम'],
    'pyar': ['प्यार'],
    'veer': ['वीर'],
    'shringar': ['श्रृंगार'],
    'neeti': ['नीति'],
    'samajik': ['सामाजिक'],
    'bal': ['बाल'],
    'prerak': ['प्रेरक', 'प्रेरणा'],
    'kavya': ['काव्य'],
    'kavi': ['कवि'],
    'chanda': ['चंदा', 'चन्दा'],
    'mama': ['मामा'],
    'mata': ['माता'],
    'pita': ['पिता'],
    'desh': ['देश'],
    'bharat': ['भारत'],
    'gyan': ['ज्ञान', 'ग्यान'],
    'dharma': ['धर्म'],
    'karma': ['कर्म'],
    'satya': ['सत्य'],
    'jeevan': ['जीवन'],
    'duniya': ['दुनिया'],
    'sapna': ['सपना'],
    'khushi': ['खुशी'],
    'dukh': ['दुःख', 'दुख'],
    'man': ['मन'],
    'dil': ['दिल'],
    'aag': ['आग'],
    'pani': ['पानी'],
    'sagar': ['सागर'],
    'phool': ['फूल'],
    'chandrama': ['चन्द्रमा', 'चंद्रमा'],
    'surya': ['सूर्य'],
    'tara': ['तारा', 'तारे'],
    'raat': ['रात'],
    'din': ['दिन'],
    'subah': ['सुबह'],
    'sham': ['शाम'],
    'aasman': ['आसमान', 'आकाश'],
    'dharti': ['धरती'],
    'maa': ['माँ', 'मां'],
    'beti': ['बेटी'],
    'beta': ['बेटा']
};

// ============================================
// SEARCH FUNCTIONALITY - Filter Poems by Keyword (Bilingual, Character-by-Character)
// ============================================
function searchPoems() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();
    const searchTermLower = searchTerm.toLowerCase();

    // If search is empty, show all poems
    if (searchTerm === '') {
        displayAllPoems();
        displayCategoryPoems();
        return;
    }

    // Get Hindi equivalents for English search terms (character-by-character matching)
    const hindiEquivalents = [];
    for (const [english, hindiWords] of Object.entries(englishToHindiMap)) {
        // Match from the start of each character
        if (english.startsWith(searchTermLower) || searchTermLower.startsWith(english.substring(0, searchTermLower.length))) {
            hindiEquivalents.push(...hindiWords);
        }
    }

    // Filter poems based on search term (English + Hindi, character-by-character)
    const filteredPoems = poems.filter(poem => {
        const title = poem.title;
        const text = poem.text;
        const category = poem.categoryName;
        const titleLower = title.toLowerCase();
        const textLower = text.toLowerCase();
        const categoryLower = category.toLowerCase();
        
        // Check if English search term matches (character-by-character)
        const englishMatch = titleLower.includes(searchTermLower) ||
                            textLower.includes(searchTermLower) ||
                            categoryLower.includes(searchTermLower);
        
        // Check if any Hindi equivalent matches (character-by-character)
        const hindiMatch = hindiEquivalents.some(hindiWord => {
            return title.includes(hindiWord) ||
                   text.includes(hindiWord) ||
                   category.includes(hindiWord);
        });
        
        // Also check for partial Hindi character matches
        const partialHindiMatch = title.includes(searchTerm) ||
                                  text.includes(searchTerm) ||
                                  category.includes(searchTerm);
        
        return englishMatch || hindiMatch || partialHindiMatch;
    });

    // Display filtered results on home section
    const container = document.getElementById('allPoemsContainer');
    container.innerHTML = '';

    if (filteredPoems.length === 0) {
        container.innerHTML = '<p class="no-poems">कोई परिणाम नहीं मिला। कृपया अन्य शब्दों से खोजें।</p>';
    } else {
        filteredPoems.forEach(poem => {
            container.innerHTML += createPoemCard(poem);
        });
    }

    // Switch to home section to show results (search term stays visible)
    showSection('home');
}

// ============================================
// CLEAR SEARCH - Reset Search Input (Manual Only)
// ============================================
function clearSearch() {
    document.getElementById('searchInput').value = '';
    displayAllPoems();
    displayCategoryPoems();
}

// ============================================
// UPLOAD POEM - Add New Poem (Frontend Only)
// ============================================
function uploadPoem(event) {
    event.preventDefault();

    // Get form values
    const category = document.getElementById('poemCategory').value;
    const title = document.getElementById('poemTitle').value.trim();
    const text = document.getElementById('poemText').value.trim();

    // Validation
    if (!category || !title || !text) {
        showMessage('कृपया सभी आवश्यक फ़ील्ड भरें।', 'error');
        return;
    }

    // Get category name in Hindi
    const categoryNames = {
        'bhakti': 'भक्ति काव्य',
        'shringar': 'श्रृंगार काव्य',
        'veer': 'वीर रस',
        'neeti': 'नीति काव्य',
        'samajik': 'सामाजिक काव्य',
        'bal': 'बाल काव्य',
        'prerak': 'प्रेरणादायक काव्य'
    };

    // Create new poem object
    const newPoem = {
        id: poems.length + 1,
        category: category,
        categoryName: categoryNames[category],
        title: title,
        text: text
    };

    // Add to poems array
    poems.push(newPoem);

    // Save to persistent storage
    savePoemsToStorage();

    // Refresh displays
    displayAllPoems();
    displayCategoryPoems();

    // Show success message
    showMessage('कविता सफलतापूर्वक अपलोड हो गई है! 🎉 (स्थायी रूप से संग्रहीत)', 'success');

    // Reset form
    resetForm();

    // Switch to home section after 2 seconds
    setTimeout(() => {
        showSection('home');
    }, 2000);
}

// ============================================
// RESET FORM - Clear Upload Form
// ============================================
function resetForm() {
    document.getElementById('uploadForm').reset();
    hideMessage();
}

// ============================================
// SHOW MESSAGE - Display Success/Error Messages
// ============================================
function showMessage(message, type) {
    const messageDiv = document.getElementById('uploadMessage');
    messageDiv.textContent = message;
    messageDiv.className = `upload-message ${type}`;
    messageDiv.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideMessage();
    }, 5000);
}

// ============================================
// HIDE MESSAGE - Hide Upload Messages
// ============================================
function hideMessage() {
    const messageDiv = document.getElementById('uploadMessage');
    messageDiv.style.display = 'none';
    messageDiv.className = 'upload-message';
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('adminModal');
    if (event.target === modal) {
        closeAdminModal();
    }
}

// ============================================
// FUTURE ENHANCEMENTS - Ready for Backend Integration
// ============================================

/**
 * TODO: Backend Integration Points
 * 
 * 1. Replace poems array with API calls:
 *    - GET /api/poems - Fetch all poems
 *    - GET /api/poems/:category - Fetch by category
 *    - POST /api/poems - Upload new poem
 * 
 * 2. Add proper authentication:
 *    - JWT token management
 *    - Secure password hashing (bcrypt)
 *    - Role-based access control
 *    - Session management with database
 * 
 * 3. Database Integration:
 *    - MySQL/PostgreSQL for poem storage
 *    - File upload handling for audio
 *    - Image support for poet photos
 * 
 * 4. Advanced Features:
 *    - Like/Share functionality
 *    - Comments section
 *    - Bookmark/Favorites
 *    - User profiles
 *    - Analytics dashboard
 */
