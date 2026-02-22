
const galleryData = [
    { title: "Beautiful Sunset", category: "nature", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    { title: "Green Forest", category: "nature", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" },
    { title: "Mountain View", category: "nature", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e" },

    { title: "City Lights", category: "city", image: "https://images.unsplash.com/photo-1494526585095-c41746248156" },
    { title: "Modern Street", category: "city", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b" },
    { title: "Night City", category: "city", image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade" },

    { title: "Cute Dog", category: "animals", image: "https://images.unsplash.com/photo-1517849845537-4d257902454a" },
    { title: "Wild Lion", category: "animals", image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d" },
    { title: "Elephant", category: "animals", image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2" },

    { title: "Delicious Pizza", category: "food", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836" },
    { title: "Burger Meal", category: "food", image: "https://images.unsplash.com/photo-1550547660-d9450f859349" },

    { title: "Friends Group", category: "people", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e" },
    { title: "Office Work", category: "people", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d" }
];

let currentFilter = "all";
let currentIndex = 0;

function initGallery() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    galleryData.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "gallery-item";
        div.dataset.category = item.category;

        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="image-overlay">
                <div class="image-title">${item.title}</div>
                <div class="image-category">${item.category}</div>
            </div>
        `;

        div.addEventListener("click", () => openLightbox(index));
        gallery.appendChild(div);
    });
}

function filterGallery(category) {
    currentFilter = category;
    const items = document.querySelectorAll(".gallery-item");

    items.forEach(item => {
        if (category === "all" || item.dataset.category === category) {
            item.classList.remove("hidden");
        } else {
            item.classList.add("hidden");
        }
    });
}

function openLightbox(index) {
    currentIndex = index;
    const item = galleryData[index];

    document.getElementById("lightboxImage").src = item.image;
    document.getElementById("lightboxTitle").textContent = item.title;
    document.getElementById("lightboxCategory").textContent = item.category;

    document.getElementById("lightbox").classList.add("active");
}

function closeLightbox() {
    document.getElementById("lightbox").classList.remove("active");
}

function navigateLightbox(direction) {
    if (direction === "next") {
        currentIndex = (currentIndex + 1) % galleryData.length;
    } else {
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    }
    openLightbox(currentIndex);
}

document.addEventListener("DOMContentLoaded", () => {
    initGallery();

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            filterGallery(btn.dataset.filter);
        });
    });

    document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
    document.getElementById("lightboxPrev").addEventListener("click", () => navigateLightbox("prev"));
    document.getElementById("lightboxNext").addEventListener("click", () => navigateLightbox("next"));
});