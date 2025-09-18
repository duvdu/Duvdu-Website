// Font Loader for Arabic Fonts
(function() {
    'use strict';

    // Function to check if a font is loaded
    function isFontLoaded(fontFamily) {
        const testString = 'mmmmmmmmmmlli';
        const testSize = '72px';
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        // Get the width of the test string with the font
        context.font = testSize + ' ' + fontFamily;
        const widthWithFont = context.measureText(testString).width;
        
        // Get the width of the test string with a fallback font
        context.font = testSize + ' Arial';
        const widthWithFallback = context.measureText(testString).width;
        
        return widthWithFont !== widthWithFallback;
    }

    // Function to apply Arabic font with fallback
    function applyArabicFont() {
        const arabicElements = document.querySelectorAll('[lang="ar"], [lang="ar-*"], [dir="rtl"]');
        
        arabicElements.forEach(function(element) {
            // Try Google Fonts first, then local font
            if (isFontLoaded('Noto Sans Arabic')) {
                element.style.fontFamily = '"Noto Sans Arabic", "NotoSansArabic", "Noto Sans", sans-serif';
            } else if (isFontLoaded('NotoSansArabic')) {
                element.style.fontFamily = '"NotoSansArabic", "Noto Sans", sans-serif';
            } else {
                // Fallback to system fonts
                element.style.fontFamily = '"Arial", "Tahoma", sans-serif';
            }
        });
    }

    // Function to load Google Fonts with timeout
    function loadGoogleFonts() {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100;200;300;400;500;600;700;800;900&display=swap';
        link.rel = 'stylesheet';
        
        // Add timeout for Google Fonts
        const timeout = setTimeout(function() {
            applyArabicFont();
        }, 3000); // 3 second timeout
        
        link.onload = function() {
            clearTimeout(timeout);
            setTimeout(applyArabicFont, 100); // Small delay to ensure font is loaded
        };
        
        link.onerror = function() {
            clearTimeout(timeout);
            applyArabicFont();
        };
        
        document.head.appendChild(link);
    }

    // Initialize font loading
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadGoogleFonts);
    } else {
        loadGoogleFonts();
    }

    // Also apply fonts when language changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && 
                (mutation.attributeName === 'lang' || mutation.attributeName === 'dir')) {
                setTimeout(applyArabicFont, 100);
            }
        });
    });

    // Start observing
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['lang', 'dir']
    });

})();
