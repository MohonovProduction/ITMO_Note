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
  background-color: #f5f7fa;
  padding: 2rem 1rem;
  margin-top: 3rem;
  border-top: 1px solid var(--color-border);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: flex-start;
}

.links-column {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 200px;
}

.links-column h4 {
  margin: 0 0 0.5rem 0;
  color: var(--color-text);
  font-size: 1.1rem;
}

.links-column a {
  color: #555;
  text-decoration: none;
  transition: color 0.2s;
  font-size: 0.9rem;
}

.links-column a:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

.footer-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  text-align: center;
}

.university-info {
  font-size: 0.9rem;
  color: #555;
}

.university-info a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

.university-info a:hover {
  text-decoration: underline;
}

.copyright {
  font-size: 0.85rem;
  color: #777;
}

/* Адаптивность */
@media (max-width: 768px) {
  .footer-links {
    flex-direction: column;
    gap: 1.5rem;
  }

  .links-column {
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .site-footer {
    padding: 1.5rem 1rem;
  }

  .footer-content {
    gap: 1.5rem;
  }
}
</style>