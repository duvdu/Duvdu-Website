const renderAfterDelay = () => {
    try {
        const handleShowModal = (targetId) => {
            const popup = document.getElementById(targetId);
            if (popup) {
                popup.classList.add('show');
                const body = document.body;
                body.style.overflow = 'hidden';

            }
        };

        const buttons = document.querySelectorAll('[data-popup-toggle="popup"]');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-popup-target');
                handleShowModal(targetId);
            });
        });

        const dismissButtons = document.querySelectorAll('[data-popup-dismiss="popup"]');
        dismissButtons.forEach(dismissButton => {
            dismissButton.addEventListener('click', () => {
                const popup = dismissButton.closest('.popup, .addpost-shadow');
                if (popup) {
                    popup.classList.remove('show');

                    const body = document.body;
                    body.style.overflow = 'visible';

                }
            });
        });

        const dismissPopupOnEsc = (event) => {
            if (event.key === 'Escape') {
                const visiblePopup = document.querySelector('.popup.show, .addpost-shadow.show');
                if (visiblePopup) {
                    visiblePopup.classList.remove('show');
                    // visiblePopup.setAttribute('aria-hidden', 'true');
                }
                const visibledropDown = document.querySelector('.account-dropdown.active');
                if (visibledropDown) {
                    visibledropDown.classList.remove('active');
                }
            }
        };

        document.addEventListener('keydown', dismissPopupOnEsc);
    } catch (error) {

    }
};

setTimeout(() => {
    renderAfterDelay()
}, 100);

const observeDomChanges = () => {
    const observer = new MutationObserver(() => {
        renderAfterDelay();
    });
    observer.observe(document.body, { subtree: true, childList: true });
};

observeDomChanges();
