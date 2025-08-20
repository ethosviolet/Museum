function showSection(sectionId, btnEl) {
    // hide all sections
    document.querySelectorAll('.collection-section').forEach(s => s.style.display = 'none');
    // show target
    const target = document.getElementById(sectionId);
    if (target) target.style.display = 'block';

    // update button active state + aria
    document.querySelectorAll('.subnav-btn').forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-pressed', 'false');
    });
    if (btnEl) {
      btnEl.classList.add('is-active');
      btnEl.setAttribute('aria-pressed', 'true');
    }

    // optional: scroll to top of the section on mobile
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // default view on load
  document.addEventListener('DOMContentLoaded', () => {
    // ensure one is visible even if CSS/HTML changed
    showSection('archeology', document.querySelector('.subnav-btn'));
  });
  (function(){
  const modal      = document.getElementById('modal');
  const modalBody  = document.getElementById('modal-body');
  const closeBtn   = modal.querySelector('.close-modal');
  let lastTrigger  = null;

  function openFrom(selector, trigger){
    const src = document.querySelector(selector);
    if (!src) { console.warn('Missing modal content:', selector); return; }
    modalBody.innerHTML = src.innerHTML;        // inject text HTML
    modal.style.display = 'block';
    lastTrigger = trigger || null;
    closeBtn.focus();
    document.body.style.overflow = 'hidden';    // no scroll under modal
  }

  function closeModal(){
    modal.style.display = 'none';
    modalBody.innerHTML = '';
    document.body.style.overflow = '';
    if (lastTrigger) lastTrigger.focus();
  }

  // open on any element with data-modal-target
  document.addEventListener('click', (e)=>{
    const trigger = e.target.closest('[data-modal-target]');
    if (trigger){
      e.preventDefault();
      openFrom(trigger.getAttribute('data-modal-target'), trigger);
      return;
    }
    if (e.target === modal || e.target.closest('.close-modal')) closeModal();
  });

  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
  });
})();