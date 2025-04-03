<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-links">
        <div class="links-column">
          <h4>Исходный код</h4>
          <a href="https://github.com/MohonovProduction/ITMO_Note" target="_blank" rel="noopener">Frontend GitHub</a>
          <a href="https://github.com/tor4narek" target="_blank" rel="noopener">Backend GitHub</a>
        </div>
        <div class="links-column">
          <h4>Разработчики</h4>
          <a href="https://t.me/mohonovschannel" target="_blank" rel="noopener">Frontend Dev Channel</a>
          <a href="https://t.me/torchchanel" target="_blank" rel="noopener">Backend Dev Channel</a>
        </div>
        <div class="links-column">
          <h4>Ссылки</h4>
          <router-link to="/">Главная</router-link>
          <router-link to="/generator">Записать</router-link>
          <router-link to="/about">О проекте</router-link>
        </div>
      </div>

      <div class="footer-info">
        <div class="university-info">
          <span>With love from </span>
          <a href="https://itmo.ru" target="_blank" rel="noopener">ITMO University</a>
          <span> in Saint-Petersburg</span>
        </div>
        <div class="copyright">
          © Разработано Мохонов и Кречетов, 2023
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter'
}
</script>

<style scoped>
.site-footer {
  background-color: var(--color-gray-50);
  padding: var(--spacing-8) var(--spacing-4);
  margin-top: var(--spacing-12);
  border-top: 1px solid var(--color-gray-200);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-8);
  justify-content: flex-start;
}

.links-column {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  min-width: 200px;
}

.links-column h4 {
  margin: 0 0 var(--spacing-2) 0;
  color: var(--color-gray-800);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.links-column a {
  color: var(--color-gray-600);
  text-decoration: none;
  transition: color var(--transition-fast);
  font-size: var(--font-size-sm);
}

.links-column a:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

.footer-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-2);
  text-align: center;
}

.university-info {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.university-info a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
}

.university-info a:hover {
  text-decoration: underline;
}

.copyright {
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
}

/* Адаптивность */
@media (max-width: 768px) {
  .footer-links {
    flex-direction: column;
    gap: var(--spacing-6);
  }

  .links-column {
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .site-footer {
    padding: var(--spacing-6) var(--spacing-4);
  }

  .footer-content {
    gap: var(--spacing-6);
  }
}
</style>