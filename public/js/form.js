const form = document.getElementById('insightForm');
const resultsDiv = document.getElementById('results');
const insightsDiv = document.getElementById('insights');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(form);
  const respostas = {};
  
  formData.forEach((value, key) => {
    respostas[key] = value;
  });

  // Show loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  try {
    // Call API
    const response = await fetch('/api/analisar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(respostas)
    });

    if (!response.ok) {
      throw new Error('Erro ao processar a análise');
    }

    const data = await response.json();
    
    // Display results
    displayInsights(data.insights);
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao gerar insights. Por favor, tente novamente.');
  } finally {
    // Reset button state
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});

function displayInsights(insights) {
  // Show results section
  resultsDiv.classList.remove('hidden');
  
  // Parse and format insights
  const formattedInsights = formatInsights(insights);
  insightsDiv.innerHTML = formattedInsights;
}

function formatInsights(text) {
  // Split text into sections
  const sections = text.split('\n\n').filter(section => section.trim());
  
  let html = '';
  
  sections.forEach((section, index) => {
    // Check if section is a heading (starts with number or **text**)
    if (section.match(/^\d+\.|^##|^\*\*/)) {
      const lines = section.split('\n');
      const title = lines[0].replace(/^\d+\.\s*/, '').replace(/^##\s*/, '').replace(/\*\*/g, '');
      const content = lines.slice(1).join('\n');
      
      html += `
        <div class="insight">
          <h3><i class="fas fa-lightbulb"></i> ${title}</h3>
          ${formatContent(content)}
        </div>
      `;
    } else {
      html += `
        <div class="insight">
          ${formatContent(section)}
        </div>
      `;
    }
  });
  
  return html || `<div class="insight"><p>${text}</p></div>`;
}

function formatContent(text) {
  if (!text.trim()) return '';
  
  // Convert markdown-style lists to HTML
  let formatted = text
    .replace(/^\* (.+)/gm, '<li>$1</li>')
    .replace(/^- (.+)/gm, '<li>$1</li>');
  
  // Wrap lists in ul tags
  if (formatted.includes('<li>')) {
    formatted = '<ul>' + formatted + '</ul>';
  } else {
    formatted = `<p>${formatted}</p>`;
  }
  
  // Bold text
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  return formatted;
}

// Copy insights to clipboard
function copyInsights() {
  const text = insightsDiv.innerText;
  
  navigator.clipboard.writeText(text).then(() => {
    alert('Insights copiados para a área de transferência!');
  }).catch(err => {
    console.error('Erro ao copiar:', err);
    alert('Erro ao copiar. Por favor, selecione e copie manualmente.');
  });
}

// Character counter for textareas
document.querySelectorAll('textarea').forEach(textarea => {
  textarea.addEventListener('input', function() {
    const length = this.value.length;
    if (length > 500) {
      this.style.borderColor = 'var(--primary-color)';
    } else {
      this.style.borderColor = 'var(--gray-200)';
    }
  });
});

// Auto-resize textareas
document.querySelectorAll('textarea').forEach(textarea => {
  textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  });
});

// Form validation feedback
form.addEventListener('submit', function(e) {
  let isValid = true;
  
  document.querySelectorAll('textarea[required]').forEach(textarea => {
    if (!textarea.value.trim()) {
      textarea.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      textarea.style.borderColor = 'var(--gray-200)';
    }
  });
  
  if (!isValid) {
    e.preventDefault();
    alert('Por favor, preencha todos os campos obrigatórios.');
  }
});
