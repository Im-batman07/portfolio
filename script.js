    // Loading Screen
    window.addEventListener('load', () => {
      const loader = document.getElementById('loading-screen');
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }, 1500);

      initThreeJS();
    });

    // Three.js Background
    function initThreeJS() {
      const container = document.getElementById('canvas-container');

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 2000;
      const posArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

      const material = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x00f3ff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const particlesMesh = new THREE.Points(particlesGeometry, material);
      scene.add(particlesMesh);

      const geometry = new THREE.IcosahedronGeometry(1, 0);
      const geomMaterial = new THREE.MeshBasicMaterial({
        color: 0xbc13fe,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const floatingShape = new THREE.Mesh(geometry, geomMaterial);
      floatingShape.position.set(2, 1, -2);
      scene.add(floatingShape);

      camera.position.z = 4;

      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;

      document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
      });

      const clock = new THREE.Clock();

      function animate() {
        requestAnimationFrame(animate);

        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        particlesMesh.rotation.y += 0.002;
        particlesMesh.rotation.x += 0.001;

        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

        const elapsedTime = clock.getElapsedTime();
        floatingShape.rotation.x = elapsedTime * 0.5;
        floatingShape.rotation.y = elapsedTime * 0.3;
        floatingShape.position.y = Math.sin(elapsedTime) * 0.5 + 1;

        renderer.render(scene, camera);
      }

      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }

    // Chatbot Logic
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    chatToggle.addEventListener('click', () => {
      chatWindow.classList.add('active');
      chatToggle.style.display = 'none';
    });

    closeChat.addEventListener('click', () => {
      chatWindow.classList.remove('active');
      chatToggle.style.display = 'flex';
    });

    const knowledgeBase = {
      "hello": "Hi there! I'm Artie. How can I help you?",
      "hi": "Hello! Welcome to the portfolio.",
      "skills": "The developer is skilled in HTML, CSS, JavaScript, Python, C, and C++.",
      "projects": "You can check out the projects section below to see some cool work!",
      "contact": "You can email at the address in the contact section or fill out the form.",
      "default": "I'm not sure about that, but feel free to send a message via the contact form!"
    };

    function addMessage(text, sender) {
      const div = document.createElement('div');
      div.classList.add('message', sender);
      div.innerText = text;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleChat() {
      const userText = chatInput.value.trim().toLowerCase();
      if (!userText) return;

      addMessage(chatInput.value, 'user');
      chatInput.value = '';

      setTimeout(() => {
        let response = knowledgeBase["default"];

        for (const key in knowledgeBase) {
          if (userText.includes(key)) {
            response = knowledgeBase[key];
            break;
          }
        }

        addMessage(response, 'bot');
      }, 600);
    }

    sendBtn.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleChat();
    });

    // Projects Modal
    document.querySelectorAll('.skill-card').forEach(card => {
      card.addEventListener('click', () => {
        const modal = document.getElementById('projectsModal');
        if (modal) modal.classList.add('active');
      });
    });

    function closeModal() {
      const modal = document.getElementById('projectsModal');
      if (modal) modal.classList.remove('active');
    }