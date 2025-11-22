// Product Data – updated with price, stock & reviews
const products = {
  'mashallah-wooden-wall-clock': {
    title: 'Mashallah- Wooden Wall Clock',
    description: 'Islamic wooden wall clocks crafted with precision for your home decor.',
    images: ['../assets/images/Mashallah-wall-clock.jpg', '../assets/images/wooden-wall-clock-2.jpg'],
    price: 1000,
    category: 'clock',
    stock: 5,
    reviews: [
      { name: 'Ali Hashmi', city: 'Skardu', img: '../assets/images/r1.jpg', rating: 5 }
    ],
    whatsappLink: 'https://wa.me/+923145987851?text=I want to order Mashallah-Wooden Wall Clock from Hashmi DecorX'
  },
  'islamic-calligraphy': {
    title: 'Islamic Calligraphy',
    description: 'Elegant laser-cut Islamic Ayats to enhance your walls with spiritual beauty.',
    images: ['../assets/images/Islamic-Calligraphy.jpg'],
    price: 700,
    stock: 3,
    reviews: [],
    whatsappLink: 'https://wa.me/+923145987851?text=I want to order Islamic Calligraphy from Hashmi DecorX'
  },
  'Custom-Photo-Engraving': {
    title: 'Custom Photo Engrave',
    description: 'Engrave Your own Photo or a Design on a Wood',
    images: ['../assets/images/engrave photo 1.jpg' , '../assets/images/engrave photo 2.jpg', '../assets/images/engrave photo 3.mp4'],
    price: 550,
    stock: 3,
    reviews: [],
    whatsappLink: 'https://wa.me/+923145987851?text=I want to order Islamic Calligraphy from Hashmi DecorX'
  },
  'gears-wooden-wall-clock': {
    title: 'Gears-Wooden Wall Clock',
    description: 'Elegant laser-cut Gears Design Wall clock – Stylish Design',
    images: ['../assets/images/gears-clock-design.png'],
    price: 900,
    stock: 4,
    reviews: [
      { name: 'Mohsin', city: 'Skardu', img: '../assets/images/r2.jpg', rating: 4 }
    ],
    whatsappLink: 'https://wa.me/+923145987851?text=I want to order Gears-Wooden Wall Clock from Hashmi DecorX'
  },
  'custom-keychain-name': {
    title: 'Custom Keychain with Name',
    description: 'Personalized keychains with laser-cut names, perfect for gifting.',
    images: ['../assets/images/Custom-Keychain-With-Name.png'],
    price: 250,
    stock: 12,
    reviews: [
      { name: 'Sana', city: 'Islamabad', img: '../assets/images/r3.jpg', rating: 5 }
    ],
    whatsappLink: 'https://wa.me/+923145987851?text=I want to order Custom Keychain with Name from Hashmi DecorX'
  }
};

// Product Page Load + Carousel + Touch Swipe
let currentImageIndex = 0;
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  if (productId && products[productId]) {
    const p = products[productId];
    const productTitle = document.getElementById('productTitle');
    const productDescription = document.getElementById('productDescription');
    const productImage = document.getElementById('productImage');
    const prevButton = document.getElementById('prevImage');
    const nextButton = document.getElementById('nextImage');
    const orderNowButton = document.getElementById('orderNowButton');
    const whatsappOrderButton = document.getElementById('whatsappOrderButton');

    if (productTitle) productTitle.textContent = p.title;
    if (productDescription) productDescription.textContent = p.description;
    if (productImage) productImage.src = p.images[0];
    if (orderNowButton) orderNowButton.onclick = () => window.location.href = `order.html?productId=${productId}`;
    if (whatsappOrderButton) whatsappOrderButton.href = p.whatsappLink;

    if (p.images.length > 1 && prevButton && nextButton) {
      prevButton.classList.remove('hidden');
      nextButton.classList.remove('hidden');
      prevButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + p.images.length) % p.images.length;
        productImage.src = p.images[currentImageIndex];
      });
      nextButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % p.images.length;
        productImage.src = p.images[currentImageIndex];
      });
    }

    // Mobile swipe
    if (window.innerWidth <= 640 && document.getElementById('productCarousel')) {
      const carousel = document.getElementById('productCarousel');
      let startX = 0, isDragging = false;
      carousel.addEventListener('touchstart', e => { startX = e.touches[0].clientX; isDragging = true; });
      carousel.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const diffX = startX - e.touches[0].clientX;
        if (Math.abs(diffX) > 50 && p.images.length > 1) {
          currentImageIndex = (currentImageIndex + (diffX > 0 ? 1 : -1) + p.images.length) % p.images.length;
          productImage.src = p.images[currentImageIndex];
          isDragging = false;
        }
      });
      carousel.addEventListener('touchend', () => isDragging = false);
    }
  }

  // Bounce animation
  document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('click', () => {
      el.classList.add('bounce');
      setTimeout(() => el.classList.remove('bounce'), 300);
    });
  });
});
