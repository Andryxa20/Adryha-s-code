document.addEventListener('DOMContentLoaded', function() { // Коли сторінка повністю завантажилась
  const btn = document.getElementById('sayHiBtn'); // Знаходимо кнопку за id
  if (btn) { // Якщо кнопка існує
    btn.addEventListener('click', function() { // Додаємо обробник події "клік"
      alert("Привіт! Я трансформер Бамблбі, у тебе все вийде!"); // Показати повідомлення
    });
  }
});

function changeBackground() {
  // Генеруємо випадковий колір
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

  // Застосовуємо як фон сайту
  document.body.style.backgroundColor = randomColor;

  // Показуємо повідомлення
  alert('✨ Магія спрацювала! Новий фон: ' + randomColor);
}

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

  // Клік — знищення
  button.onclick = () => {
    alert("🥳Ти спіймав трансформера, ти переміг🥳!");
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

