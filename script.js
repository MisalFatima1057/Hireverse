let prompts = JSON.parse(localStorage.getItem('prompts')) || [];

const grid = document.getElementById('promptGrid');
const addBtn = document.getElementById('addBtn');
const darkToggle = document.getElementById('darkToggle');

// Load prompts on start
renderPrompts();

// Add new prompt
addBtn.addEventListener('click', () => {
  const title = document.getElementById('promptTitle').value;
  const text = document.getElementById('promptText').value;
  const category = document.getElementById('promptCategory').value;
  
  if(!title || !text) return alert('Please fill all fields');

  prompts.push({id: Date.now(), title, text, category});
  localStorage.setItem('prompts', JSON.stringify(prompts));
  
  document.getElementById('promptTitle').value = '';
  document.getElementById('promptText').value = '';
  renderPrompts();
});

// Render cards
function renderPrompts() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const filter = document.getElementById('filterCategory').value;
  
  let filtered = prompts.filter(p => 
    p.title.toLowerCase().includes(search) && 
    (filter === 'All' || p.category === filter)
  );

  grid.innerHTML = filtered.map(p => `
    <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition">
      <div class="flex justify-between items-center mb-2">
        <span class="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">${p.category}</span>
        <button onclick="deletePrompt(${p.id})" class="text-red-500 text-sm">Delete</button>
      </div>
      <h3 class="font-bold mb-2">${p.title}</h3>
      <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 h-20 overflow-hidden">${p.text}</p>
      <button onclick="copyPrompt(\`${p.text.replace(/`/g, '\\`')}\`)" class="w-full bg-gray-200 dark:bg-gray-700 py-2 rounded hover:bg-gray-300">Copy Prompt</button>
    </div>
  `).join('');
}

// Copy function
function copyPrompt(text) {
  navigator.clipboard.writeText(text);
  alert('Prompt Copied!');
}

// Delete function
function deletePrompt(id) {
  prompts = prompts.filter(p => p.id !== id);
  localStorage.setItem('prompts', JSON.stringify(prompts));
  renderPrompts();
}

// Search + Filter
document.getElementById('searchInput').addEventListener('input', renderPrompts);
document.getElementById('filterCategory').addEventListener('change', renderPrompts);

// Dark Mode
darkToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
});