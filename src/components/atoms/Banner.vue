<script>
export default {
  name: 'Banner'
}
</script>

<template>
  <section class="info-banner">
    <div class="info-banner__content">
      <h1 class="info-banner__title">Третья неделя без работающего бэка!</h1>
      
      <div class="info-banner__author">
        <span class="material-symbols-outlined info-banner__icon">person</span>
        <span>Михаил Мохонов, фронт</span>
      </div>

      <p class="info-banner__text">
        Можете писать issues
        <a href="https://github.com/Tor4narek/ItmoNoteApi/issues" class="info-banner__link">сюда</a>,
        пусть он апупеет
      </p>

      <div class="info-banner__social">
        <a href="https://t.me/mohonovproduction" class="info-banner__social-link" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-telegram"></i>
        </a>
        <a href="https://github.com/mohonovproduction" class="info-banner__social-link" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-github"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<style>
.info-banner {
  position: relative;
  padding: var(--spacing-8);
  border-radius: var(--radius-lg);
  color: var(--color-white);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  background-size: 200% 200%;
  animation: gradientAnimation 8s ease infinite;
  transition: transform var(--transition-fast);
}

.info-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  pointer-events: none;
  animation: shine 3s ease-in-out infinite;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.info-banner__content {
  position: relative;
  z-index: 1;
  max-width: 600px;
}

.info-banner__title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-heading);
  margin-bottom: var(--spacing-4);
  color: var(--color-white);
}

.info-banner__author {
  display: inline-flex;
  align-items: center;
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-4);
  color: var(--color-gray-100);
  background: rgba(255, 255, 255, 0.1);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-full);
}

.info-banner__icon {
  font-size: var(--font-size-lg);
  margin-right: var(--spacing-2);
}

.info-banner__text {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-6);
  color: var(--color-gray-100);
}

.info-banner__link {
  color: var(--color-white);
  text-decoration: underline;
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
}

.info-banner__link:hover {
  color: var(--color-gray-100);
  text-decoration: none;
}

.info-banner__social {
  display: flex;
  gap: var(--spacing-4);
}

.info-banner__social-link {
  color: var(--color-white);
  font-size: var(--font-size-2xl);
  transition: transform var(--transition-fast);
}

.info-banner__social-link:hover {
  transform: translateY(-2px);
  color: var(--color-gray-100);
}
</style>