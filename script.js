/**
 * Nails by Love | NE Calgary - Vanilla JavaScript
 * Beacons Reference Design Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Toast Notification Helper ---
  const toast = document.getElementById('toast-notice');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // --- Modal Open/Close System ---
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Close modals on click outside or close buttons
  document.querySelectorAll('.modal-overlay').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  document.querySelectorAll('.modal-close-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal.id);
    });
  });

  // --- Header Action Buttons ---
  const subscribeTopBtn = document.getElementById('subscribe-top-btn');
  if (subscribeTopBtn) {
    subscribeTopBtn.addEventListener('click', () => {
      const subCard = document.getElementById('subscribe-section');
      if (subCard) {
        subCard.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('sub-name');
        if (nameInput) setTimeout(() => nameInput.focus(), 600);
      }
    });
  }

  const shareTopBtn = document.getElementById('share-top-btn');
  if (shareTopBtn) {
    shareTopBtn.addEventListener('click', () => {
      openModal('share-modal');
    });
  }

  // Quick Action Badges
  const openLookbookBtn = document.getElementById('open-lookbook-btn');
  if (openLookbookBtn) {
    openLookbookBtn.addEventListener('click', () => openModal('gallery-modal'));
  }

  const openPoliciesBtn = document.getElementById('open-policies-btn');
  if (openPoliciesBtn) {
    openPoliciesBtn.addEventListener('click', () => openModal('policies-modal'));
  }

  const studioStatPill = document.getElementById('studio-stat-pill');
  if (studioStatPill) {
    studioStatPill.addEventListener('click', () => openModal('policies-modal'));
  }

  // Hero Booking Card & Featured Card Book Buttons
  const heroBookingCard = document.getElementById('hero-booking-card');
  if (heroBookingCard) {
    heroBookingCard.addEventListener('click', () => openModal('booking-modal'));
  }

  const featuredBookBtn = document.getElementById('featured-book-btn');
  if (featuredBookBtn) {
    featuredBookBtn.addEventListener('click', () => openModal('booking-modal'));
  }

  const featuredThumb = document.getElementById('featured-thumb');
  if (featuredThumb) {
    featuredThumb.addEventListener('click', () => openModal('gallery-modal'));
  }

  // --- Beetles Accordion Toggle ---
  const beetlesToggleBtn = document.getElementById('beetles-toggle-btn');
  const beetlesAccordion = document.getElementById('beetles-accordion');
  const beetlesArrow = document.getElementById('beetles-arrow');

  if (beetlesToggleBtn && beetlesAccordion) {
    beetlesToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = beetlesAccordion.classList.toggle('open');
      if (beetlesArrow) {
        beetlesArrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  }

  // --- Copy Promo Codes ---
  document.querySelectorAll('.copy-code-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const code = btn.getAttribute('data-code');
      const brand = btn.getAttribute('data-brand') || 'store';
      if (code) {
        navigator.clipboard.writeText(code).then(() => {
          showToast(`Copied code "${code}" for ${brand}!`);
        }).catch(() => {
          showToast(`Promo code: ${code}`);
        });
      }
    });
  });

  // --- Interactive Inspo DM Message Generator ---
  const serviceSelect = document.getElementById('inspo-service');
  const lengthSelect = document.getElementById('inspo-length');
  const shapeSelect = document.getElementById('inspo-shape');
  const artSelect = document.getElementById('inspo-art');
  const removalSelect = document.getElementById('inspo-removal');
  const daysSelect = document.getElementById('inspo-days');
  const messagePreview = document.getElementById('generated-message-preview');

  function updateBookingMessage() {
    if (!messagePreview) return;
    const srv = serviceSelect ? serviceSelect.value : 'GelX Full Set';
    const len = lengthSelect ? lengthSelect.value : 'Medium';
    const shp = shapeSelect ? shapeSelect.value : 'Almond';
    const art = artSelect ? artSelect.value : 'Clean Solid / Minimal Chrome';
    const rem = removalSelect ? removalSelect.value : 'No (Bare Nails)';
    const day = daysSelect ? daysSelect.value : 'Weekends';

    const text = `Hi Love! 💅 I'd love to book an appointment with you in NE Calgary.
Here are my set details:
• Service: ${srv}
• Length: ${len}
• Shape: ${shp}
• Art Level: ${art}
• Removal: ${rem}
• Preferred Days: ${day}

I've attached my inspo photos below! Please let me know your current availability and pricing quote ✨🤍`;

    messagePreview.textContent = text;
  }

  const inspoInputs = [serviceSelect, lengthSelect, shapeSelect, artSelect, removalSelect, daysSelect];
  inspoInputs.forEach((input) => {
    if (input) input.addEventListener('change', updateBookingMessage);
  });
  updateBookingMessage();

  // Copy Message Button
  const copyMessageBtn = document.getElementById('copy-message-btn');
  if (copyMessageBtn) {
    copyMessageBtn.addEventListener('click', () => {
      if (messagePreview) {
        navigator.clipboard.writeText(messagePreview.textContent).then(() => {
          showToast('DM message copied! Paste it directly into Instagram.');
        });
      }
    });
  }

  // Open Instagram DM Button
  const openIgDmBtn = document.getElementById('open-ig-dm-btn');
  if (openIgDmBtn) {
    openIgDmBtn.addEventListener('click', () => {
      if (messagePreview) {
        navigator.clipboard.writeText(messagePreview.textContent);
        showToast('Copied booking details! Opening @nailsbylove_yyc...');
      }
      setTimeout(() => {
        window.open('https://www.instagram.com/nailsbylove_yyc/', '_blank', 'noopener,noreferrer');
      }, 500);
    });
  }

  // Gallery set selection to booking
  document.querySelectorAll('.request-set-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const setName = btn.getAttribute('data-set');
      closeModal('gallery-modal');
      openModal('booking-modal');
      if (artSelect) {
        artSelect.value = 'Full Custom 3D, Pearls, Charms & Art';
        updateBookingMessage();
      }
      showToast(`Selected "${setName}". Ready to DM inspo!`);
    });
  });

  // Modal proceed to booking from policies
  const proceedToDmFromPolicies = document.getElementById('policies-proceed-btn');
  if (proceedToDmFromPolicies) {
    proceedToDmFromPolicies.addEventListener('click', () => {
      closeModal('policies-modal');
      openModal('booking-modal');
    });
  }

  // --- Subscribe Form ---
  const subscribeForm = document.getElementById('subscribe-form');
  const subscribeSuccess = document.getElementById('subscribe-success');

  if (subscribeForm && subscribeSuccess) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sub-name').value.trim();
      const email = document.getElementById('sub-email').value.trim();

      if (name && email) {
        subscribeForm.style.display = 'none';
        subscribeSuccess.classList.add('show');
        const subscriberNameSpan = document.getElementById('subscriber-name-display');
        if (subscriberNameSpan) subscriberNameSpan.textContent = name;
        showToast(`You're subscribed, ${name}! 🤍`);
      }
    });
  }

  // --- Share Modal Copy Link ---
  const copyShareLinkBtn = document.getElementById('copy-share-link-btn');
  const shareUrlInput = document.getElementById('share-url-input');

  if (shareUrlInput) {
    shareUrlInput.value = window.location.href;
  }

  if (copyShareLinkBtn && shareUrlInput) {
    copyShareLinkBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(shareUrlInput.value).then(() => {
        showToast('Link copied to clipboard!');
        copyShareLinkBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyShareLinkBtn.textContent = 'Copy';
        }, 2000);
      });
    });
  }
});
