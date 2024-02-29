const renderAfterDelay = () => {
    try {
        const handleShowModal = (targetId) => {
            const popup = document.getElementById(targetId);
            if (popup) {
                popup.classList.add('show');
                // popup.setAttribute('aria-hidden', 'false');
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
                    // popup.setAttribute('aria-hidden', 'true');
                }
            });
        });
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
