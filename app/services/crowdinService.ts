'use client';

import otaClient from '@crowdin/ota-client';
import { crowdinConfig } from '../crowdin-config';

interface TranslationData {
  [key: string]: string | TranslationData;
}

// 创建单例实例
let otaClientInstance: otaClient | null = null;

export const getOtaClient = () => {
  if (!otaClientInstance) {
    otaClientInstance = new otaClient(crowdinConfig.distributionHash);
  }
  return otaClientInstance;
};

// 获取所有字符串
export const getAllStrings = async (): Promise<TranslationData> => {
  const client = getOtaClient();
  return await client.getStrings();
};

// 获取特定语言的翻译
export const getTranslation = (key: string | string[], language?: string): Promise<string> => {
  const client = getOtaClient();
  return client.getStringByKey(
    Array.isArray(key) ? key : [key], 
    language
  );
};

// 设置当前语言
export const setLanguage = async (languageCode: string): Promise<void> => {
  const client = getOtaClient();
  await client.setCurrentLocale(languageCode);
};

// 获取当前语言
export const getCurrentLanguage = (): string => {
  if (typeof window === 'undefined') {
    return crowdinConfig.sourceLanguage;
  }
  return localStorage.getItem('currentLanguage') || crowdinConfig.sourceLanguage;
}; 