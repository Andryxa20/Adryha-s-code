document.addEventListener('DOMContentLoaded', function() { // Коли сторінка повністю завантажилась
  const btn = document.getElementById('sayHiBtn'); // Знаходимо кнопку за id
  if (btn) { // Якщо кнопка існує
    btn.addEventListener('click', function() { // Додаємо обробник події "клік"
      // Показуємо повідомлення
      alert("Привіт! Я трансформер Бамблбі, у тебе все вийде!");
      
      // Додаємо бонуси до гри (якщо гра активна)
      if (typeof gameState !== 'undefined') {
        gameState.energy = Math.min(100, gameState.energy + 5);
        gameState.focus = Math.min(100, gameState.focus + 3);
        
        if (typeof showNotification === 'function') {
          showNotification('🤖 Бамблбі мотивував тебе! +5 енергії, +3 фокусу', 'success');
        }
        
        if (typeof updateUI === 'function') {
          updateUI();
        }
      }
      
      // Показуємо всплывающий текст
      const rect = this.getBoundingClientRect();
      showFloatingText('Бамблбі вірить у тебе! +5 енергії', rect.left + rect.width/2, rect.top);
    });
    
    // Додаємо підказку
    btn.addEventListener('mouseenter', showTooltipForElement);
    btn.addEventListener('mouseleave', hideTooltipForElement);
    btn.addEventListener('mousemove', moveTooltipForElement);
  }
});

function spawnSmartTransformer() {
  const button = document.createElement("button");
  button.className = "transformer-btn";

  const maxX = window.innerWidth - 100;
  const maxY = window.innerHeight - 100;
  let x = Math.random() * maxX;
  let y = Math.random() * maxY;

  let dx = (Math.random() - 0.5) * 2;
  let dy = (Math.random() - 0.5) * 2;
  let speed = 6; // стартова швидкість

  button.style.left = `${x}px`;
  button.style.top = `${y}px`;

  const img = document.createElement("img");
  img.src = "transformes.png"; // заміни на свій файл
  img.style.width = "100%";
  img.style.height = "auto";
  button.appendChild(img);

  // Клік — знищення + интеграция с игрой
  button.onclick = () => {
    alert("🥳Ти спіймав трансформера, ти переміг🥳!");
    
    // Интеграция с игрой
    if (typeof interactWithPageElement === 'function') {
      interactWithPageElement('transformerCatch');
    }
    
    clearInterval(move);
    clearInterval(slowDown);
    button.remove();
  };

  document.getElementById("transformer-buttons").appendChild(button);

  // 👉 Слухаємо мишку
  document.addEventListener("mousemove", (e) => {
    const distX = e.clientX - x;
    const distY = e.clientY - y;
    const distance = Math.sqrt(distX ** 2 + distY ** 2);

    if (distance < 150) {
      // Якщо мишка близько — тікай
      dx = -distX / distance;
      dy = -distY / distance;
      speed = 10; // Різкий ривок
    }
  });

  // 🔁 Рух трансформера
  const move = setInterval(() => {
    x += dx * speed;
    y += dy * speed;

    // Межі — оновлено, щоб не застрягав
if (x <= 0) {
  x = 1;        // Відійди від краю
  dx = Math.abs(dx); // Йди вправо
}
if (x >= maxX) {
  x = maxX - 1;
  dx = -Math.abs(dx); // Йди вліво
}
if (y <= 0) {
  y = 1;
  dy = Math.abs(dy); // Вниз
}
if (y >= maxY) {
  y = maxY - 1;
  dy = -Math.abs(dy); // Вгору
}

    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
  }, 20);

  // 🐢 Повільніше кожну секунду
  const slowDown = setInterval(() => {
    speed = Math.max(1, speed - 0.5); // не нижче 1
  }, 1000);

  // ⌛ Автозникнення через 15 сек
  setTimeout(() => {
    clearInterval(move);
    clearInterval(slowDown);
    button.remove();
  }, 15000);
}

// Запуск кожні 15 сек
setInterval(spawnSmartTransformer, 15000);

document.addEventListener('DOMContentLoaded', () => {
  const toggleLangBtn = document.getElementById('toggle-lang');
  if (!toggleLangBtn) return;

  let isUkrainian = true;

  toggleLangBtn.addEventListener('click', () => {
    const uaTexts = document.querySelectorAll('.lang-ua');
    const enTexts = document.querySelectorAll('.lang-en');

    uaTexts.forEach(el => el.classList.toggle('hidden'));
    enTexts.forEach(el => el.classList.toggle('hidden'));

    toggleLangBtn.textContent = isUkrainian ? '🔁 Translate' : '🔁 Переклад';
    isUkrainian = !isUkrainian;
  });
});

function openTab(tabId) {
  const contents = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-button');

  contents.forEach(c => c.classList.remove('active'));
  buttons.forEach(b => b.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');
}

// Улучшенные интерактивные элементы с подсказками
document.addEventListener('DOMContentLoaded', function() {
  // Добавление подсказок к трансформерам
  function addTooltipToTransformers() {
    const transformers = document.querySelectorAll('.moving-transformer');
    transformers.forEach(transformer => {
      transformer.setAttribute('data-tooltip', '🤖 Кликни на трансформера! +50 досвіду, +5 знань, +10 фокусу');
      
      // Добавление обработчиков подсказок
      transformer.addEventListener('mouseenter', showTooltipForElement);
      transformer.addEventListener('mouseleave', hideTooltipForElement);
      transformer.addEventListener('mousemove', moveTooltipForElement);
      
      // Улучшенный клик с анимацией
      transformer.addEventListener('click', function(e) {
        // Показать всплывающий текст
        showFloatingText('+50 XP!', e.clientX, e.clientY);
        
        // Визуальный эффект
        this.style.transform = 'scale(1.5) rotate(360deg)';
        this.style.opacity = '0';
        
        // Интеграция с игрой
        if (typeof interactWithPageElement === 'function') {
          interactWithPageElement('transformerCatch');
        }
        
        setTimeout(() => {
          this.remove();
        }, 500);
      });
    });
  }
  
  // Наблюдатель за новыми трансформерами
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1 && node.classList && node.classList.contains('moving-transformer')) {
            // Добавить подсказку к новому трансформеру
            node.setAttribute('data-tooltip', '🤖 Кликни на трансформера! +50 досвіду, +5 знань, +10 фокусу');
            
            node.addEventListener('mouseenter', showTooltipForElement);
            node.addEventListener('mouseleave', hideTooltipForElement);
            node.addEventListener('mousemove', moveTooltipForElement);
            
            // Улучшенный клик
            node.addEventListener('click', function(e) {
              showFloatingText('+50 XP!', e.clientX, e.clientY);
              this.style.transform = 'scale(1.5) rotate(360deg)';
              this.style.opacity = '0';
              
              if (typeof interactWithPageElement === 'function') {
                interactWithPageElement('transformerCatch');
              }
              
              setTimeout(() => {
                this.remove();
              }, 500);
            });
          }
        });
      }
    });
  });
  
  // Начать наблюдение
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Добавить подсказки к существующим трансформерам
  setTimeout(addTooltipToTransformers, 1000);
});

// Функции для подсказок
function showTooltipForElement(e) {
  let tooltip = document.getElementById('game-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'game-tooltip';
    tooltip.className = 'game-tooltip';
    document.body.appendChild(tooltip);
  }
  
  const text = e.target.getAttribute('data-tooltip');
  if (text) {
    tooltip.textContent = text;
    tooltip.style.display = 'block';
    tooltip.style.opacity = '1';
  }
}

function hideTooltipForElement() {
  const tooltip = document.getElementById('game-tooltip');
  if (tooltip) {
    tooltip.style.opacity = '0';
    setTimeout(() => {
      tooltip.style.display = 'none';
    }, 200);
  }
}

function moveTooltipForElement(e) {
  const tooltip = document.getElementById('game-tooltip');
  if (tooltip) {
    tooltip.style.left = (e.pageX + 10) + 'px';
    tooltip.style.top = (e.pageY - 30) + 'px';
  }
}

// Функция для показа всплывающего текста
function showFloatingText(text, x, y) {
  const floatingText = document.createElement('div');
  floatingText.textContent = text;
  floatingText.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    color: #ffd700;
    font-size: 24px;
    font-weight: bold;
    pointer-events: none;
    z-index: 9999;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    animation: floatUp 2s ease-out forwards;
  `;
  
  document.body.appendChild(floatingText);
  
  setTimeout(() => {
    floatingText.remove();
  }, 2000);
}

// Добавить CSS анимацию если её нет
if (!document.querySelector('#floating-text-styles')) {
  const style = document.createElement('style');
  style.id = 'floating-text-styles';
  style.textContent = `
    @keyframes floatUp {
      0% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      50% {
        transform: translateY(-30px) scale(1.2);
      }
      100% {
        opacity: 0;
        transform: translateY(-80px) scale(0.8);
      }
    }
  `;
  document.head.appendChild(style);
}

