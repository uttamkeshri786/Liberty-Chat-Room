import { getTranslations } from './index.js';

test('Get translation', () => {
  expect(getTranslations('en').welcomeHeader).toBe('Welcome to Liberty v2.0');
  expect(getTranslations().welcomeHeader).toBe('Welcome to Liberty v2.0');
  expect(getTranslations('fr').welcomeHeader).toBe('Bienvenue sur Liberty v2.0');
  expect(getTranslations('zh-CN').welcomeHeader).toBe('欢迎来到Liberty v2.0');
  expect(getTranslations('en-US').welcomeHeader).toBe('Welcome to Liberty v2.0');
  expect(getTranslations('ru-CH').welcomeHeader).toBe('Добро пожаловать на Liberty v2.0');
});
