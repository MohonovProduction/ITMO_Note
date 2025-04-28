<script>

</script>

<template>
  <section class="info-banner">
    <h1 class="info-banner__title">Третья неделя без работающего бэка!</h1>
    <i class="info-banner__author">
      <span class="material-symbols-outlined info-banner__icon">person</span>
      Михаил Мохонов, фронт
    </i>

    <p class="info-banner__text">
      Можете писать issues
      <a href="https://github.com/Tor4narek/ItmoNoteApi/issues" class="info-banner__link">сюда</a>,
      пусть он апупеет
    </p>
  </section>
</template>

<style>
.info-banner {
  position: relative;
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  color: var(--color-white);
  overflow: hidden;
  box-shadow: var(--shadow-lg);

  /* Анимированный градиентный фон */
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark), #6d28d9);
  background-size: 300% 300%;
  animation: gradientAnimation 8s ease infinite;
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
      rgba(255, 255, 255, 0.1) 100%
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

.info-banner__title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-heading);
  margin-bottom: var(--spacing-3);
  position: relative;
  z-index: 1;
  color: var(--color-white);
}

.info-banner__author {
  display: inline-flex;
  align-items: center;
  font-style: normal;
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-4);
  color: var(--color-gray-200);
  position: relative;
  z-index: 1;
}

.info-banner__icon {
  font-size: var(--font-size-base);
  margin-right: var(--spacing-2);
}

.info-banner__text {
  font-size: var(--font-size-base);
  margin-bottom: 0;
  position: relative;
  z-index: 1;
}

.info-banner__link {
  color: var(--color-white);
  text-decoration: underline;
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast);
}

.info-banner__link:hover {
  color: var(--color-gray-100);
  text-decoration: none;
}
</style>