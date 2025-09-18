// Sabrositos SAC - SPA con Vanilla JS
(() => {
  'use strict';

  // Estado
  let products = JSON.parse(localStorage.getItem('sab_products') || '[]');

  // Selectores
  const sections = {
    inicio: document.getElementById('inicio'),
    menu: document.getElementById('menu'),
    admin: document.getElementById('admin'),
  };
  const alertBox = document.getElementById('alertBox');
  const tbody = document.getElementById('tbodyProducts');
  const cardsMenu = document.getElementById('cardsMenu');
  const productForm = document.getElementById('productForm');
  const searchAdmin = document.getElementById('searchAdmin');
  const searchMenu = document.getElementById('searchMenu');
  const filterCat = document.getElementById('filterCat');
  const navLinks = document.querySelectorAll('[data-section]');
  const yearCopy = document.getElementById('yearCopy');
  const howToDeploy = document.getElementById('howToDeploy');

  // Modal edición
  const editModalEl = document.getElementById('editModal');
  const editModal = new bootstrap.Modal(editModalEl);
  const editId = document.getElementById('editId');
  const editName = document.getElementById('editName');
  const editCategory = document.getElementById('editCategory');
  const editPrice = document.getElementById('editPrice');
  const editStatus = document.getElementById('editStatus');
  const editCombo = document.getElementById('editCombo');
  const editImage = document.getElementById('editImage');
  const saveEdit = document.getElementById('saveEdit');
  const editForm = document.getElementById('editForm');

  // Utilidades
  const save = () => localStorage.setItem('sab_products', JSON.stringify(products));
  const money = n => `S/ ${Number(n).toFixed(2)}`;

  function showAlert(type = 'success', msg = '') {
    alertBox.className = `alert alert-${type}`;
    alertBox.innerHTML = msg;
    alertBox.classList.remove('d-none');
    setTimeout(() => alertBox.classList.add('d-none'), 2000);
  }

  function switchRoute(route) {
    Object.values(sections).forEach(s => s.classList.add('d-none'));
    sections[route]?.classList.remove('d-none');
    navLinks.forEach(a => a.classList.remove('active'));
    document.querySelectorAll(`[data-section="${route}"]`).forEach(a => a.classList.add('active'));
  }

  function renderTable(list = products) {
    const q = (searchAdmin.value || '').toLowerCase().trim();
    const filtered = list.filter(p => [p.name, p.category].join(' ').toLowerCase().includes(q));
    tbody.innerHTML = filtered.map((p, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${money(p.price)}</td>
        <td>
          <span class="badge ${p.status === 'Disponible' ? 'text-bg-success' : 'text-bg-secondary'}">${p.status}</span>
        </td>
        <td>${p.combo ? '<i class="bi bi-check2-circle text-success"></i>' : '<i class="bi bi-x-circle text-danger"></i>'}</td>
        <td class="text-nowrap">
          <button class="btn btn-sm btn-outline-primary me-1" data-action="edit" data-id="${p.id}"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-outline-danger" data-action="del" data-id="${p.id}"><i class="bi bi-trash"></i></button>
        </td>
      </tr>
    `).join('');
  }

  function renderMenu(list = products) {
    const q = (searchMenu.value || '').toLowerCase().trim();
    const cat = filterCat.value;
    const filtered = list.filter(p => {
      const matchesQ = [p.name, p.category].join(' ').toLowerCase().includes(q);
      const matchesCat = !cat || p.category === cat;
      return matchesQ && matchesCat && p.status === 'Disponible';
    });
    if (!filtered.length) {
      cardsMenu.innerHTML = `<div class="text-center text-muted py-5">No hay productos que coincidan.</div>`;
      return;
    }
    cardsMenu.innerHTML = filtered.map(p => `
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card h-100">
          ${p.image ? `<img src="${p.image}" class="card-img-top" alt="${p.name}" onerror="this.src='https://picsum.photos/seed/sabrositos/600/400'">` : ''}
          <div class="card-body d-flex flex-column">
            <h5 class="card-title d-flex justify-content-between align-items-center">
              <span>${p.name}</span>
              ${p.combo ? '<span class="badge text-bg-warning">Combo</span>' : ''}
            </h5>
            <p class="card-text small text-muted mb-3">${p.category}</p>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <span class="price">${money(p.price)}</span>
              <button class="btn btn-sm btn-warning"><i class="bi bi-cart-plus"></i> Añadir</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  function addSampleIfEmpty() {
    if (products.length) return;
    products = [
      { id: crypto.randomUUID(), name: 'Hamburguesa Clásica', category: 'Hamburguesas', price: 15.9, status: 'Disponible', combo: true, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop' },
      { id: crypto.randomUUID(), name: 'Pollo Broaster (1/4)', category: 'Pollo', price: 18.5, status: 'Disponible', combo: false, image: 'https://images.unsplash.com/photo-1604909052743-18ef4f2973a0?q=80&w=1200&auto=format&fit=crop' },
      { id: crypto.randomUUID(), name: 'Gaseosa 500ml', category: 'Bebidas', price: 5.0, status: 'Agotado', combo: false, image: '' },
    ];
    save();
  }

  function validate(form) {
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return false;
    }
    return true;
  }

  // Eventos
  navLinks.forEach(a => a.addEventListener('click', (e) => {
    e.preventDefault();
    const section = a.getAttribute('data-section');
    if (section) switchRoute(section);
    if (section === 'menu') renderMenu();
  }));

  productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate(productForm)) return;

    const product = {
      id: crypto.randomUUID(),
      name: document.getElementById('name').value.trim(),
      category: document.getElementById('category').value,
      price: Number(document.getElementById('price').value),
      status: document.getElementById('status').value,
      combo: document.getElementById('combo').checked,
      image: document.getElementById('image').value.trim()
    };
    products.push(product);
    save();
    renderTable();
    renderMenu();
    productForm.reset();
    productForm.classList.remove('was-validated');
    showAlert('success', 'Producto agregado ✅');
  });

  tbody.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return;

    const action = btn.getAttribute('data-action');
    if (action === 'del') {
      if (confirm('¿Eliminar este producto?')) {
        products.splice(idx, 1);
        save();
        renderTable();
        renderMenu();
        showAlert('success', 'Producto eliminado 🗑️');
      }
    } else if (action === 'edit') {
      const p = products[idx];
      editId.value = p.id;
      editName.value = p.name;
      editCategory.value = p.category;
      editPrice.value = p.price;
      editStatus.value = p.status;
      editCombo.checked = p.combo;
      editImage.value = p.image || '';
      editForm.classList.remove('was-validated');
      editModal.show();
    }
  });

  saveEdit.addEventListener('click', () => {
    if (!validate(editForm)) return;
    const id = editId.value;
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return;
    products[idx] = {
      ...products[idx],
      name: editName.value.trim(),
      category: editCategory.value,
      price: Number(editPrice.value),
      status: editStatus.value,
      combo: editCombo.checked,
      image: editImage.value.trim()
    };
    save();
    renderTable();
    renderMenu();
    editModal.hide();
    showAlert('success', 'Cambios guardados 💾');
  });

  searchAdmin.addEventListener('input', () => renderTable());
  searchMenu.addEventListener('input', () => renderMenu());
  filterCat.addEventListener('change', () => renderMenu());

  howToDeploy.addEventListener('click', (e) => {
    e.preventDefault();
    showAlert('info', 'Publica con GitHub Pages: sube el proyecto al repositorio y habilita Pages en Settings → Pages (branch main).');
  });

  // Inicializar
  yearCopy.textContent = new Date().getFullYear();
  addSampleIfEmpty();
  renderTable();
  renderMenu();
  switchRoute('inicio');
})();
