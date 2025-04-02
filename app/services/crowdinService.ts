'use client';

import otaClient from '@crowdin/ota-client';
import { crowdinConfig } from '../crowdin-config';

// 创建单例实例
let otaClientInstance: any = null;

export const getOtaClient = () => {
  if (!otaClientInstance) {
    otaClientInstance = new otaClient(crowdinConfig.distributionHash);
  }
  return otaClientInstance;
};

// 获取所有字符串
export const getAllStrings = async () => {
  const client = getOtaClient();
  return await client.getStrings();
};

// 获取特定语言的翻译
export const getTranslation = (key: string | string[], language?: string) => {
  const client = getOtaClient();
  return client.getStringByKey(
    Array.isArray(key) ? key : [key], 
    language
  );
};

// 设置当前语言
export const setLanguage = (languageCode: string) => {
  const client = getOtaClient();
  return client.setCurrentLocale(languageCode);
};

// 获取当前语言
export const getCurrentLanguage = () => {
  const client = getOtaClient();
  // 这里应该返回当前设置的语言，但API文档未明确提供此方法
  // 我们可以在应用中自己维护当前语言状态
  return localStorage.getItem('currentLanguage') || crowdinConfig.sourceLanguage;
}; 