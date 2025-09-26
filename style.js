  
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    colors: {
                        'brand-charcoal': '#121212',
                        'brand-dark': '#1A1A1A',
                        'brand-accent': '#6366F1', // Indigo 500
                        'brand-accent-hover': '#4F46E5', // Indigo 600
                    },
                    animation: {
                        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                        'glow': 'glow 2.5s ease-in-out infinite alternate',
                    },
                    keyframes: {
                        fadeInUp: {
                            '0%': { opacity: '0', transform: 'translateY(20px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' },
                        },
                        glow: {
                            '0%': { 'box-shadow': '0 0 5px #6366F1, 0 0 10px #6366F1, 0 0 15px #6366F1' },
                            '100%': { 'box-shadow': '0 0 20px #6366F1, 0 0 30px #6366F1, 0 0 40px #6366F1' }
                        }
                    }
                }
            }
        }