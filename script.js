document.addEventListener('DOMContentLoaded', function() { // Коли сторінка повністю завантажилась
  const btn = document.getElementById('sayHiBtn'); // Знаходимо кнопку за id
  if (btn) { // Якщо кнопка існує
    btn.addEventListener('click', function() { // Додаємо обробник події "клік"
      alert("Привіт! Я Андрій, і я тільки починаю — але у мене все вийде!"); // Показати повідомлення
    });
  }
});
