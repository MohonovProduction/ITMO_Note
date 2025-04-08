import api from './axios';

/**
 * Получает файл в формате markdown по указанному пути
 * @param {string} filePath - Путь к файлу относительно корня
 * @returns {Promise<string>} - Содержимое файла в формате markdown
 */
export const filesApi = {
  getMarkdownFile: async (filePath) => {
    try {
      const response = await api.get(`${process.env.VUE_APP_ROOT_URL}${filePath}`, {
        // headers: {
        //   'Accept': 'text/markdown'
        // }
      });
      console.log('response', response)
      return response;
    } catch (error) {
      console.error('Ошибка при получении файла:', error);
      throw error;
    }
  }
}; 