// Initialize the main map centered on India
var map = L.map('map').setView([20.5937, 78.9629], 5);
var detailMap; // Will be initialized when a place is clicked

// Define tile layers
var osmMaps = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var googleMaps = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

// Base layers
var baseMaps = {
    "OpenStreetMap": osmMaps,
    "Google Maps": googleMaps
};

// Famous places data with links and coordinates for each state (3 monuments per state)
var famousPlaces = {
    // Andhra Pradesh
"Tirupati (Andhra Pradesh)": {
        places: [
            { name: "Tirumala Venkateswara Temple", lat: 13.6833, lng: 79.3470, link: "https://en.wikipedia.org/wiki/Tirumala_Venkateswara_Temple" },
            { name: "Sri Kapileswara Swamy Temple", lat: 13.6288, lng: 79.4192, link: "https://en.wikipedia.org/wiki/Kapila_Theertham" },
            { name: "Chandragiri Fort", lat: 13.5833, lng: 79.3167, link: "https://en.wikipedia.org/wiki/Chandragiri_Fort,_Andhra_Pradesh" }
        ]
    },
    "Visakhapatnam (Andhra Pradesh)": {
        places: [
            { name: "Simhachalam Temple", lat: 17.7667, lng: 83.2500, link: "https://en.wikipedia.org/wiki/Simhachalam_Temple" },
            { name: "Borra Caves", lat: 18.1667, lng: 83.0333, link: "https://en.wikipedia.org/wiki/Borra_Caves" },
            { name: "Kailasagiri", lat: 17.7333, lng: 83.3167, link: "https://en.wikipedia.org/wiki/Kailasagiri" }
        ]
    },
    "Vijayawada (Andhra Pradesh)": {
        places: [
            { name: "Kanaka Durga Temple", lat: 16.5193, lng: 80.6210, link: "https://en.wikipedia.org/wiki/Kanaka_Durga_Temple" },
            { name: "Undavalli Caves", lat: 16.4957, lng: 80.5778, link: "https://en.wikipedia.org/wiki/Undavalli_Caves" },
            { name: "Prakasam Barrage", lat: 16.5062, lng: 80.6050, link: "https://en.wikipedia.org/wiki/Prakasam_Barrage" }
        ]
    },
    // Arunachal Pradesh
    "Itanagar (Arunachal Pradesh)": {
        places: [
            { name: "Tawang Monastery", lat: 27.5860, lng: 91.8590, link: "https://en.wikipedia.org/wiki/Tawang_Monastery" },
            { name: "Namdapha National Park", lat: 27.4833, lng: 96.3833, link: "https://en.wikipedia.org/wiki/Namdapha_National_Park" },
            { name: "Sela Pass", lat: 27.5000, lng: 92.1000, link: "https://en.wikipedia.org/wiki/Sela_Pass" }
        ]
    },
    // Assam
    "Guwahati (Assam)": {
        places: [
            { name: "Kamakhya Temple", lat: 26.1664, lng: 91.7055, link: "https://en.wikipedia.org/wiki/Kamakhya_Temple" },
            { name: "Kaziranga National Park", lat: 26.5775, lng: 93.1711, link: "https://en.wikipedia.org/wiki/Kaziranga_National_Park" },
            { name: "Sivasagar Sivadol", lat: 26.9833, lng: 94.6333, link: "https://en.wikipedia.org/wiki/Sivasagar_Sivadol" }
        ]
    },
    // Bihar
    "Patna (Bihar)": {
        places: [
            { name: "Mahabodhi Temple", lat: 24.6951, lng: 84.9913, link: "https://en.wikipedia.org/wiki/Mahabodhi_Temple" },
            { name: "Nalanda University Ruins", lat: 25.1367, lng: 85.4437, link: "https://en.wikipedia.org/wiki/Nalanda" },
            { name: "Vishnupad Temple", lat: 24.7884, lng: 85.0105, link: "https://en.wikipedia.org/wiki/Vishnupad_Temple,_Gaya" }
        ]
    },
    // Chhattisgarh
    "Raipur (Chhattisgarh)": {
        places: [
            { name: "Chitrakote Falls", lat: 19.2000, lng: 81.7000, link: "https://en.wikipedia.org/wiki/Chitrakote_Falls" },
            { name: "Bhoramdeo Temple", lat: 21.7500, lng: 81.5667, link: "https://en.wikipedia.org/wiki/Bhoramdeo_Temple" },
            { name: "Sirpur Group of Monuments", lat: 21.3333, lng: 82.1833, link: "https://en.wikipedia.org/wiki/Sirpur_Group_of_Monuments" }
        ]
    },
    // Goa
    "Panaji (Goa)": {
        places: [
            { name: "Basilica of Bom Jesus", lat: 15.5008, lng: 73.9116, link: "https://en.wikipedia.org/wiki/Basilica_of_Bom_Jesus" },
            { name: "Se Cathedral", lat: 15.5039, lng: 73.9123, link: "https://en.wikipedia.org/wiki/S%C3%A9_Cathedral" },
            { name: "Fort Aguada", lat: 15.4920, lng: 73.7733, link: "https://en.wikipedia.org/wiki/Fort_Aguada" }
        ]
    },
    // Gujarat
    "Ahmedabad (Gujarat)": {
        places: [
            { name: "Sabarmati Ashram", lat: 23.0600, lng: 72.5800, link: "https://en.wikipedia.org/wiki/Sabarmati_Ashram" },
            { name: "Rani ki Vav", lat: 23.8586, lng: 72.1018, link: "https://en.wikipedia.org/wiki/Rani_ki_Vav" },
            { name: "Dholavira", lat: 23.8859, lng: 70.2100, link: "https://en.wikipedia.org/wiki/Dholavira" }
        ]
    },
    // Haryana
    "Chandigarh (Haryana)": {
        places: [
            { name: "Qila Mubarak", lat: 30.3782, lng: 76.7767, link: "https://en.wikipedia.org/wiki/Qila_Mubarak" },
            { name: "Sheesh Mahal", lat: 29.9667, lng: 76.8167, link: "https://en.wikipedia.org/wiki/Sheesh_Mahal_(Patiala)" },
            { name: "Kurukshetra Panorama", lat: 29.9657, lng: 76.8310, link: "https://en.wikipedia.org/wiki/Kurukshetra_Panorama_and_Science_Centre" }
        ]
    },
    // Himachal Pradesh
    "Shimla (Himachal Pradesh)": {
        places: [
            { name: "Jakhoo Temple", lat: 31.1000, lng: 77.1833, link: "https://en.wikipedia.org/wiki/Jakhoo_Temple" },
            { name: "Rohtang Pass", lat: 32.3720, lng: 77.2470, link: "https://en.wikipedia.org/wiki/Rohtang_Pass" },
            { name: "Hidimba Devi Temple", lat: 32.2432, lng: 77.1882, link: "https://en.wikipedia.org/wiki/Hidimba_Devi_Temple" }
        ]
    },
    // Jharkhand
    "Ranchi (Jharkhand)": {
        places: [
            { name: "Jagannath Temple", lat: 23.3541, lng: 85.3240, link: "https://en.wikipedia.org/wiki/Jagannath_Temple,_Ranchi" },
            { name: "Hundru Falls", lat: 23.4500, lng: 85.6667, link: "https://en.wikipedia.org/wiki/Hundru_Falls" },
            { name: "Baiju Caves", lat: 23.3833, lng: 85.3167, link: "https://en.wikipedia.org/wiki/Baiju_Caves" }
        ]
    },
    // Karnataka
    "Bengaluru (Karnataka)": {
        places: [
            { name: "Hampi Ruins", lat: 15.3350, lng: 76.4600, link: "https://en.wikipedia.org/wiki/Hampi" },
            { name: "Mysore Palace", lat: 12.3050, lng: 76.6550, link: "https://en.wikipedia.org/wiki/Mysore_Palace" },
            { name: "Gol Gumbaz", lat: 16.8300, lng: 75.7350, link: "https://en.wikipedia.org/wiki/Gol_Gumbaz" }
        ]
    },
    // Kerala
    "Thiruvananthapuram (Kerala)": {
        places: [
            { name: "Padmanabhaswamy Temple", lat: 8.4828, lng: 76.9437, link: "https://en.wikipedia.org/wiki/Padmanabhaswamy_Temple" },
            { name: "Mattancherry Palace", lat: 9.9583, lng: 76.2592, link: "https://en.wikipedia.org/wiki/Mattancherry_Palace" },
            { name: "Athirappilly Falls", lat: 10.2850, lng: 76.5730, link: "https://en.wikipedia.org/wiki/Athirappilly_Falls" }
        ]
    },
    // Madhya Pradesh
    "Bhopal (Madhya Pradesh)": {
        places: [
            { name: "Sanchi Stupa", lat: 23.4792, lng: 77.7397, link: "https://en.wikipedia.org/wiki/Sanchi_Stupa" },
            { name: "Khajuraho Temples", lat: 24.8318, lng: 79.9199, link: "https://en.wikipedia.org/wiki/Khajuraho_Group_of_Monuments" },
            { name: "Gwalior Fort", lat: 26.2236, lng: 78.1690, link: "https://en.wikipedia.org/wiki/Gwalior_Fort" }
        ]
    },
    // Maharashtra
    "Mumbai (Maharashtra)": {
        places: [
            { name: "Gateway of India", lat: 18.9218, lng: 72.8347, link: "https://en.wikipedia.org/wiki/Gateway_of_India" },
            { name: "Ajanta Caves", lat: 20.5519, lng: 75.7033, link: "https://en.wikipedia.org/wiki/Ajanta_Caves" },
            { name: "Ellora Caves", lat: 20.0258, lng: 75.1780, link: "https://en.wikipedia.org/wiki/Ellora_Caves" }
        ]
    },
    // Manipur
    "Imphal (Manipur)": {
        places: [
            { name: "Kangla Fort", lat: 24.8074, lng: 93.9493, link: "https://en.wikipedia.org/wiki/Kangla_Fort" },
            { name: "Shree Govindajee Temple", lat: 24.7950, lng: 93.9410, link: "https://en.wikipedia.org/wiki/Shree_Govindajee_Temple" },
            { name: "Ima Keithel", lat: 24.8110, lng: 93.9360, link: "https://en.wikipedia.org/wiki/Ima_Keithel" }
        ]
    },
    // Meghalaya
    "Shillong (Meghalaya)": {
        places: [
            { name: "Living Root Bridges", lat: 25.2500, lng: 91.6667, link: "https://en.wikipedia.org/wiki/Living_root_bridge" },
            { name: "Mawlynnong Village", lat: 25.1833, lng: 91.8833, link: "https://en.wikipedia.org/wiki/Mawlynnong" },
            { name: "Nohkalikai Falls", lat: 25.2760, lng: 91.6860, link: "https://en.wikipedia.org/wiki/Nohkalikai_Falls" }
        ]
    },
    // Mizoram
    "Aizawl (Mizoram)": {
        places: [
            { name: "Solomon's Temple", lat: 23.7270, lng: 92.7170, link: "https://en.wikipedia.org/wiki/Solomon%27s_Temple,_Aizawl" },
            { name: "Durtlang Hills", lat: 23.7667, lng: 92.7333, link: "https://en.wikipedia.org/wiki/Durtlang_Hills" },
            { name: "Vangchhia Megaliths", lat: 23.1333, lng: 93.3167, link: "https://en.wikipedia.org/wiki/Vangchhia" }
        ]
    },
    // Nagaland
    "Kohima (Nagaland)": {
        places: [
            { name: "Kohima War Cemetery", lat: 25.6667, lng: 94.1000, link: "https://en.wikipedia.org/wiki/Kohima_War_Cemetery" },
            { name: "Naga Heritage Village", lat: 25.6667, lng: 94.1167, link: "https://en.wikipedia.org/wiki/Naga_Heritage_Village" },
            { name: "Dzukou Valley", lat: 25.5833, lng: 94.0833, link: "https://en.wikipedia.org/wiki/Dzukou_Valley" }
        ]
    },
    // Odisha
    "Bhubaneswar (Odisha)": {
        places: [
            { name: "Konark Sun Temple", lat: 19.8876, lng: 86.0945, link: "https://en.wikipedia.org/wiki/Konark_Sun_Temple" },
            { name: "Jagannath Temple", lat: 19.8049, lng: 85.8180, link: "https://en.wikipedia.org/wiki/Jagannath_Temple,_Puri" },
            { name: "Lingaraja Temple", lat: 20.2380, lng: 85.8335, link: "https://en.wikipedia.org/wiki/Lingaraja_Temple" }
        ]
    },
    // Punjab
    "Amritsar (Punjab)": {
        places: [
            { name: "Golden Temple", lat: 31.6200, lng: 74.8765, link: "https://en.wikipedia.org/wiki/Golden_Temple" },
            { name: "Jallianwala Bagh", lat: 31.6206, lng: 74.8805, link: "https://en.wikipedia.org/wiki/Jallianwala_Bagh" },
            { name: "Wagah Border", lat: 31.6049, lng: 74.5723, link: "https://en.wikipedia.org/wiki/Wagah" }
        ]
    },
    // Rajasthan
    "Jaipur (Rajasthan)": {
        places: [
            { name: "Hawa Mahal", lat: 26.9239, lng: 75.8267, link: "https://en.wikipedia.org/wiki/Hawa_Mahal" },
            { name: "Amber Fort", lat: 26.9855, lng: 75.8513, link: "https://en.wikipedia.org/wiki/Amber_Fort" },
            { name: "Jantar Mantar", lat: 26.9248, lng: 75.8246, link: "https://en.wikipedia.org/wiki/Jantar_Mantar,_Jaipur" }
        ]
    },
    // Sikkim
    "Gangtok (Sikkim)": {
        places: [
            { name: "Rumtek Monastery", lat: 27.3000, lng: 88.6000, link: "https://en.wikipedia.org/wiki/Rumtek_Monastery" },
            { name: "Nathula Pass", lat: 27.3869, lng: 88.8308, link: "https://en.wikipedia.org/wiki/Nathu_La" },
            { name: "Enchey Monastery", lat: 27.3333, lng: 88.6167, link: "https://en.wikipedia.org/wiki/Enchey_Monastery" }
        ]
    },
    // Tamil Nadu
    "Chennai (Tamil Nadu)": {
        places: [
            { name: "Brihadeeswarar Temple", lat: 10.7828, lng: 79.1315, link: "https://en.wikipedia.org/wiki/Brihadeeswarar_Temple" },
            { name: "Meenakshi Temple", lat: 9.9195, lng: 78.1193, link: "https://en.wikipedia.org/wiki/Meenakshi_Temple" },
            { name: "Shore Temple", lat: 12.6167, lng: 80.1917, link: "https://en.wikipedia.org/wiki/Shore_Temple" }
        ]
    },
    // Telangana
    "Hyderabad (Telangana)": {
        places: [
            { name: "Charminar", lat: 17.3616, lng: 78.4747, link: "https://en.wikipedia.org/wiki/Charminar" },
            { name: "Golconda Fort", lat: 17.3833, lng: 78.4011, link: "https://en.wikipedia.org/wiki/Golconda_Fort" },
            { name: "Qutb Shahi Tombs", lat: 17.3950, lng: 78.3960, link: "https://en.wikipedia.org/wiki/Qutb_Shahi_Tombs" }
        ]
    },
    // Tripura
    "Agartala (Tripura)": {
        places: [
            { name: "Ujjayanta Palace", lat: 23.8380, lng: 91.2820, link: "https://en.wikipedia.org/wiki/Ujjayanta_Palace" },
            { name: "Neermahal", lat: 23.4833, lng: 91.4333, link: "https://en.wikipedia.org/wiki/Neermahal" },
            { name: "Tripura Sundari Temple", lat: 23.5333, lng: 91.4833, link: "https://en.wikipedia.org/wiki/Tripura_Sundari_Temple" }
        ]
    },
    // Uttar Pradesh
    "Lucknow (Uttar Pradesh)": {
        places: [
            { name: "Taj Mahal", lat: 27.1751, lng: 78.0421, link: "https://en.wikipedia.org/wiki/Taj_Mahal" },
            { name: "Agra Fort", lat: 27.1795, lng: 78.0211, link: "https://en.wikipedia.org/wiki/Agra_Fort" },
            { name: "Fatehpur Sikri", lat: 27.0910, lng: 77.6700, link: "https://en.wikipedia.org/wiki/Fatehpur_Sikri" }
        ]
    },
    // Uttarakhand
    "Dehradun (Uttarakhand)": {
        places: [
            { name: "Badrinath Temple", lat: 30.7440, lng: 79.4910, link: "https://en.wikipedia.org/wiki/Badrinath_Temple" },
            { name: "Kedarnath Temple", lat: 30.7352, lng: 79.0669, link: "https://en.wikipedia.org/wiki/Kedarnath_Temple" },
            { name: "Valley of Flowers", lat: 30.7280, lng: 79.6050, link: "https://en.wikipedia.org/wiki/Valley_of_Flowers_National_Park" }
        ]
    },
    // West Bengal
    "Kolkata (West Bengal)": {
        places: [
            { name: "Victoria Memorial", lat: 22.5448, lng: 88.3426, link: "https://en.wikipedia.org/wiki/Victoria_Memorial,_Kolkata" },
            { name: "Howrah Bridge", lat: 22.5850, lng: 88.3469, link: "https://en.wikipedia.org/wiki/Howrah_Bridge" },
            { name: "Dakshineswar Kali Temple", lat: 22.6550, lng: 88.3579, link: "https://en.wikipedia.org/wiki/Dakshineswar_Kali_Temple" }
        ]
    },
    // Union Territories
    "Delhi": {
        places: [
            { name: "Red Fort", lat: 28.6562, lng: 77.2410, link: "https://en.wikipedia.org/wiki/Red_Fort" },
            { name: "India Gate", lat: 28.6129, lng: 77.2295, link: "https://en.wikipedia.org/wiki/India_Gate" },
            { name: "Qutub Minar", lat: 28.5244, lng: 77.1855, link: "https://en.wikipedia.org/wiki/Qutub_Minar" }
        ]
    },
    "Puducherry": {
        places: [
            { name: "Auroville Matrimandir", lat: 12.0070, lng: 79.8106, link: "https://en.wikipedia.org/wiki/Matrimandir" },
            { name: "Basilica of the Sacred Heart", lat: 11.9330, lng: 79.8300, link: "https://en.wikipedia.org/wiki/Basilica_of_the_Sacred_Heart_of_Jesus,_Pondicherry" },
            { name: "Promenade Beach", lat: 11.9320, lng: 79.8350, link: "https://en.wikipedia.org/wiki/Promenade_Beach" }
        ]
    }
};

// Add markers for the cities with clickable areas
var cityMarkers = {
    "Tirupati (Andhra Pradesh)": L.marker([13.6288, 79.4192]).addTo(map),
    "Visakhapatnam (Andhra Pradesh)": L.marker([17.6868, 83.2185]).addTo(map),
    "Vijayawada (Andhra Pradesh)": L.marker([16.5062, 80.6480]).addTo(map),
    "Itanagar (Arunachal Pradesh)": L.marker([27.0844, 93.6053]).addTo(map),
    "Guwahati (Assam)": L.marker([26.1445, 91.7362]).addTo(map),
    "Patna (Bihar)": L.marker([25.5941, 85.1376]).addTo(map),
    "Raipur (Chhattisgarh)": L.marker([21.2514, 81.6296]).addTo(map),
    "Panaji (Goa)": L.marker([15.4909, 73.8278]).addTo(map),
    "Ahmedabad (Gujarat)": L.marker([23.0225, 72.5714]).addTo(map),
    "Chandigarh (Haryana)": L.marker([30.7333, 76.7794]).addTo(map),
    "Shimla (Himachal Pradesh)": L.marker([31.1048, 77.1734]).addTo(map),
    "Ranchi (Jharkhand)": L.marker([23.3441, 85.3096]).addTo(map),
    "Bengaluru (Karnataka)": L.marker([12.9716, 77.5946]).addTo(map),
    "Thiruvananthapuram (Kerala)": L.marker([8.5241, 76.9366]).addTo(map),
    "Bhopal (Madhya Pradesh)": L.marker([23.2599, 77.4126]).addTo(map),
    "Mumbai (Maharashtra)": L.marker([19.0760, 72.8777]).addTo(map),
    "Imphal (Manipur)": L.marker([24.8170, 93.9368]).addTo(map),
    "Shillong (Meghalaya)": L.marker([25.5788, 91.8933]).addTo(map),
    "Aizawl (Mizoram)": L.marker([23.7271, 92.7176]).addTo(map),
    "Kohima (Nagaland)": L.marker([25.6747, 94.1100]).addTo(map),
    "Bhubaneswar (Odisha)": L.marker([20.2961, 85.8245]).addTo(map),
    "Amritsar (Punjab)": L.marker([31.6340, 74.8723]).addTo(map),
    "Jaipur (Rajasthan)": L.marker([26.9124, 75.7873]).addTo(map),
    "Gangtok (Sikkim)": L.marker([27.3389, 88.6065]).addTo(map),
    "Chennai (Tamil Nadu)": L.marker([13.0827, 80.2707]).addTo(map),
    "Hyderabad (Telangana)": L.marker([17.3850, 78.4867]).addTo(map),
    "Agartala (Tripura)": L.marker([23.8315, 91.2868]).addTo(map),
    "Lucknow (Uttar Pradesh)": L.marker([26.8467, 80.9462]).addTo(map),
    "Dehradun (Uttarakhand)": L.marker([30.3165, 78.0322]).addTo(map),
    "Kolkata (West Bengal)": L.marker([22.5726, 88.3639]).addTo(map),
    "Delhi": L.marker([28.6139, 77.2090]).addTo(map),
    "Puducherry": L.marker([11.9416, 79.8083]).addTo(map)
};

// Function to display the list of famous places in the clicked city
function showFamousPlaces(city) {
    let placesList = famousPlaces[city].places.map(place => 
        `<li><a href="#" onclick="showPlaceDetails('${city}', '${place.name}', ${place.lat}, ${place.lng}, '${place.link}'); return false;">${place.name}</a></li>`
    ).join('');
    
    let content = `<div class="custom-popup"><b>Famous places in ${city}:</b><ul>${placesList}</ul></div>`;
    L.popup()
        .setLatLng(cityMarkers[city].getLatLng())
        .setContent(content)
        .openOn(map);
}

// Function to show place details in split view
function showPlaceDetails(city, placeName, lat, lng, wikiLink) {
    // Show the split view
    document.getElementById('split-view').style.display = 'block';
    
    // Set the place details
    document.getElementById('place-details').innerHTML = `
        <h4>${placeName}</h4>
        <p><strong>Location:</strong> ${city}</p>
        <p><strong>Coordinates:</strong> ${lat.toFixed(4)}, ${lng.toFixed(4)}</p>
    `;
    
    // Load Wikipedia content directly in an iframe
    document.getElementById('wikipedia-frame').src = wikiLink;
    
    // Initialize or update the detail map
    if (!detailMap) {
        detailMap = L.map('map-detail').setView([lat, lng], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(detailMap);
    } else {
        detailMap.setView([lat, lng], 15);
    }
    
    // Clear existing markers and add new one
    detailMap.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            detailMap.removeLayer(layer);
        }
    });
    
    L.marker([lat, lng]).addTo(detailMap)
        .bindPopup(`<b>${placeName}</b><br>${city}`)
        .openPopup();
}

// Function to close the split view
function closeSplitView() {
    document.getElementById('split-view').style.display = 'none';
    // Reset the iframe to blank when closing
    document.getElementById('wikipedia-frame').src = 'about:blank';
}

// Add click event to the city markers
for (let city in cityMarkers) {
    cityMarkers[city].on('click', function() {
        showFamousPlaces(city);
    });
}

// Layer control
L.control.layers(baseMaps).addTo(map);