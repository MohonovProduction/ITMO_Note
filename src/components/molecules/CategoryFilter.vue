<template>
  <div class="category-filter">
    <SelectField
      id="category-filter"
      label="Категория"
      v-model="selectedCategory"
      :options="categoryOptions"
      placeholder="Все категории"
      @update:modelValue="handleCategoryChange"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SelectField from '@/components/atoms/SelectField.vue';

export default {
  name: 'CategoryFilter',
  components: {
    SelectField
  },
  data() {
    return {
      selectedCategory: ''
    };
  },
  computed: {
    ...mapGetters('notes', ['categories']),
    categoryOptions() {
      return [
        { value: '', label: 'Все категории' },
        ...this.categories.map(category => ({
          value: category.name,
          label: category.name
        }))
      ];
    }
  },
  methods: {
    handleCategoryChange() {
      this.$emit('category-change', this.selectedCategory);
    }
  }
};
</script>

<style scoped>
.category-filter {
  margin-bottom: var(--spacing-4);
}

.category-filter__select {
  width: 100%;
  max-width: 300px;
  padding: var(--spacing-3);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  background-color: white;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.category-filter__select:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

@media (max-width: 768px) {
  .category-filter__select {
    max-width: 100%;
  }
}
</style> 