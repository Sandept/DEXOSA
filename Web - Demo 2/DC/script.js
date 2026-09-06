const bVsSConfig = {
  canvas: document.getElementById('b-vs-s-canvas'),
  section: document.getElementById('b-vs-s-section'),
  frameCount: 207,
  path: 'B_vs_S_Frames/ezgif-frame-',
  extension: '.jpg',
  images: [],
  currentFrame: -1
};

const batmanCarConfig = {
  canvas: document.getElementById('batman-car-canvas'),
  section: document.getElementById('batman-car-section'),
  frameCount: 239,
  path: 'Batman_Car/ezgif-frame-',
  extension: '.jpg',
  images: [],
  currentFrame: -1
};

// Preload Images
function preloadImages(config) {
  for (let i = 1; i <= config.frameCount; i++) {
    const img = new Image();
    const frameIndex = String(i).padStart(3, '0');
    img.src = `${config.path}${frameIndex}${config.extension}`;
    config.images.push(img);
  }
}

preloadImages(bVsSConfig);
preloadImages(batmanCarConfig);

// Setup Canvas Dimensions
function resizeCanvas(config) {
  const container = config.section.querySelector('.sticky-container');
  config.canvas.width = container.clientWidth;
  config.canvas.height = container.clientHeight;
  renderFrame(config, Math.max(0, config.currentFrame)); // Re-render current frame
}

function resizeAll() {
  resizeCanvas(bVsSConfig);
  resizeCanvas(batmanCarConfig);
}

window.addEventListener('resize', resizeAll);

// Draw Image to Canvas with "cover" behavior
function drawImageCover(ctx, img, canvasWidth, canvasHeight) {
  const imgRatio = img.width / img.height;
  const canvasRatio = canvasWidth / canvasHeight;
  let renderWidth, renderHeight, x, y;

  if (canvasRatio > imgRatio) {
    // Canvas is wider than image aspect ratio, so image will be cropped vertically.
    renderWidth = canvasWidth;
    renderHeight = canvasWidth / imgRatio;
    x = 0;
    // Align to top instead of center to prevent heads from being cut off
    y = 0; 
  } else {
    // Canvas is taller than image aspect ratio, so image will be cropped horizontally.
    renderWidth = canvasHeight * imgRatio;
    renderHeight = canvasHeight;
    // Center horizontally
    x = (canvasWidth - renderWidth) / 2;
    y = 0;
  }
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(img, x, y, renderWidth, renderHeight);
}

function renderFrame(config, frameIndex) {
  if (frameIndex >= 0 && frameIndex < config.frameCount) {
    const img = config.images[frameIndex];
    if (img && img.complete) {
      const ctx = config.canvas.getContext('2d');
      drawImageCover(ctx, img, config.canvas.width, config.canvas.height);
      config.currentFrame = frameIndex;
    } else if (img) {
      img.onload = () => {
        if (config.currentFrame === frameIndex) {
          const ctx = config.canvas.getContext('2d');
          drawImageCover(ctx, img, config.canvas.width, config.canvas.height);
        }
      };
    }
  }
}

// Scroll Logic
let ticking = false;

function updateScroll() {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  const updateCanvas = (config) => {
    const rect = config.section.getBoundingClientRect();
    // Section top relative to viewport
    const top = rect.top; 
    // Section total scrollable height (total height - viewport height since sticky holds it for 100vh)
    const scrollableHeight = rect.height - windowHeight;
    
    let progress = 0;
    if (top <= 0) {
      progress = Math.min(1, Math.max(0, -top / scrollableHeight));
    }
    
    // Determine frame based on progress
    const targetFrame = Math.floor(progress * (config.frameCount - 1));
    
    // Only render if within viewport bounds (roughly) and frame changed
    if (rect.top <= windowHeight && rect.bottom >= 0) {
       if (config.currentFrame !== targetFrame) {
         renderFrame(config, targetFrame);
       }
       
       // Parallax logic for hero overlays
       if (config.section.id === 'b-vs-s-section') {
         const batmanText = config.section.querySelector('#batman-text');
         const vsText = config.section.querySelector('#vs-text');
         const supermanText = config.section.querySelector('#superman-text');
         
         const frameProgress = progress * (config.frameCount - 1); // Float from 0.0 to 206.0
         
         if (batmanText) {
           const yOffset = -50 + (progress * 40);
           let opacity = 0;
           // Batman visible from frame 1 to 100
           if (frameProgress <= 100) {
              opacity = 1;
              if (frameProgress > 85) {
                 opacity = 1 - ((frameProgress - 85) / 15); // Fade out smoothly at the end
              }
           }
           batmanText.style.transform = `translateY(${yOffset}%)`;
           batmanText.style.opacity = Math.max(0, Math.min(1, opacity));
         }

         if (vsText) {
           const yOffset = -50 + (progress * 40);
           let opacity = 0;
           // Verse visible strictly from frame 103 to 162
           if (frameProgress >= 103 && frameProgress <= 162) {
               if (frameProgress < 115) {
                   opacity = (frameProgress - 103) / 12; // Fade in smoothly
               } else if (frameProgress > 150) {
                   opacity = 1 - ((frameProgress - 150) / 12); // Fade out smoothly
               } else {
                   opacity = 1; // Solid in the middle
               }
           }
           vsText.style.transform = `translateY(${yOffset}%)`;
           vsText.style.opacity = Math.max(0, Math.min(1, opacity));
         }

         if (supermanText) {
           const yOffset = -50 + (progress * 40);
           let opacity = 0;
           // Superman visible from frame 165 to the end
           if (frameProgress >= 165) {
               if (frameProgress < 177) {
                   opacity = (frameProgress - 165) / 12; // Fade in smoothly
               } else {
                   opacity = 1; // Stays solid till end
               }
           }
           supermanText.style.transform = `translateY(${yOffset}%)`;
           supermanText.style.opacity = Math.max(0, Math.min(1, opacity));
         }
       } else {
         const overlay = config.section.querySelector('.hero-overlay');
         if (overlay) {
           const yOffset = -50 + (progress * 40); // Move down slightly
           const opacity = 1 - (progress * 1.5); // Fade out as you scroll deep
           overlay.style.transform = `translateY(${yOffset}%)`;
           overlay.style.opacity = Math.max(0, opacity);
         }
       }
    }
  };

  updateCanvas(bVsSConfig);
  updateCanvas(batmanCarConfig);

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateScroll();
    });
    ticking = true;
  }
}, { passive: true });

// Initial setup
window.addEventListener('load', () => {
  resizeAll();
  updateScroll(); // Initial render
});

// Intersection Observer for Scroll Reveals
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Run once
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal-up').forEach(el => {
  observer.observe(el);
});
