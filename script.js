// Crear partículas animadas
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                particlesContainer.appendChild(particle);
            }
        }
        
        // Mensaje especial al hacer clic en el botón
        function showLoveMessage() {
            const messages = [
                "💖 Eres mi alma gemela, mi compañera de aventuras, mi todo.",
                "🌟 Contigo he encontrado mi propósito, mi paz, mi felicidad infinita.",
    
                "🔥 Tu amor es el fuego que mantiene viva mi alma.",
                "👑 Eres mi reina, mi princesa, mi diosa, mi razón de ser."
            ];
            
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            
            // Crear elemento de mensaje
            const messageDiv = document.createElement('div');
            messageDiv.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95));
                color: #1a1a2e;
                padding: 2rem 3rem;
                border-radius: 20px;
                font-size: 1.3rem;
                font-weight: 600;
                text-align: center;
                z-index: 1000;
                box-shadow: 0 20px 60px rgba(255, 255, 255, 0.4);
                animation: popIn 0.5s ease-out;
                max-width: 90%;
                font-family: 'Crimson Text', serif;
            `;
            
            messageDiv.innerHTML = `
                <div style="margin-bottom: 1rem;">${randomMessage}</div>
                <button onclick="this.parentElement.remove()" style="
                    background: #1a1a2e;
                    color: #fff;
                    border: none;
                    padding: 0.5rem 1.5rem;
                    border-radius: 15px;
                    cursor: pointer;
                    font-family: 'Cinzel', serif;
                    font-weight: 600;
                    transition: all 0.3s ease;
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    💖 Cerrar
                </button>
            `;
            
            document.body.appendChild(messageDiv);
            
            // Eliminar mensaje después de 5 segundos
            setTimeout(() => {
                if (messageDiv.parentElement) {
                    messageDiv.remove();
                }
            }, 5000);
        }
        
        // Agregar animación de entrada para los mensajes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes popIn {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                100% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Inicializar partículas cuando carga la página
        document.addEventListener('DOMContentLoaded', createParticles);
        
        // Efecto de parallax suave
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const particles = document.querySelectorAll('.particle');
            
            particles.forEach((particle, index) => {
                const speed = (index % 3 + 1) * 0.5;
                particle.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
        
        // Modal para imágenes
        function createImageModal() {
            // Crear el modal si no existe
            if (!document.getElementById('img-modal')) {
                const modal = document.createElement('div');
                modal.id = 'img-modal';
                modal.style.cssText = `
                    position: fixed;
                    top: 0; left: 0; width: 100vw; height: 100vh;
                    background: rgba(30,30,40,0.85);
                    display: flex; align-items: center; justify-content: center;
                    z-index: 2000; visibility: hidden; opacity: 0;
                    transition: opacity 0.3s;
                `;
                modal.innerHTML = `
                    <img id="modal-img-content" src="" alt="Imagen" style="
                        max-width: 90vw; max-height: 80vh; border-radius: 16px; box-shadow: 0 8px 40px #000a;
                        border: 4px solid #3a6ea5; background: #fff;
                    ">
                    <button id="close-modal-btn" style="
                        position: absolute; top: 30px; right: 40px;
                        background: #3a6ea5; color: #fff; border: none; font-size: 2rem;
                        border-radius: 50%; width: 48px; height: 48px; cursor: pointer;
                        box-shadow: 0 2px 10px #0005;
                    ">&times;</button>
                `;
                document.body.appendChild(modal);

                // Cerrar modal al hacer clic en el botón o fuera de la imagen
                modal.querySelector('#close-modal-btn').onclick = () => hideModal();
                modal.onclick = (e) => {
                    if (e.target === modal) hideModal();
                };
            }
        }

        function showModal(src) {
            const modal = document.getElementById('img-modal');
            const img = document.getElementById('modal-img-content');
            img.src = src;
            modal.style.visibility = 'visible';
            modal.style.opacity = '1';
        }

        function hideModal() {
            const modal = document.getElementById('img-modal');
            modal.style.opacity = '0';
            setTimeout(() => { modal.style.visibility = 'hidden'; }, 300);
        }

        // Inicializar modal y eventos al cargar la página
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            createImageModal();
            document.querySelectorAll('.modal-img').forEach(img => {
                img.style.cursor = 'pointer';
                img.onclick = () => showModal(img.src);
            });
        });