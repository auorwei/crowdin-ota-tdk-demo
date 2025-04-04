'use client';

import { useState, useEffect } from 'react';
import { setLanguage, getAllStrings } from '../services/crowdinService';
import { crowdinConfig } from '../crowdin-config';

interface Translations {
  [key: string]: string | Translations;
}

export default function TranslationDemo() {
  const [currentLanguage, setCurrentLanguage] = useState(crowdinConfig.sourceLanguage);
  const [translations, setTranslations] = useState<Translations>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 示例翻译键
  const translationKeys = [
    'welcome.message',
    'button.submit',
    'button.cancel',
    'error.notFound'
  ];

  // 初始化并加载所有翻译
  useEffect(() => {
    const initTranslations = async () => {
      try {
        setLoading(true);
        // 加载所有语言的翻译
        const allStrings = await getAllStrings();
        setTranslations(allStrings);
        setLoading(false);
      } catch (err) {
        console.error('翻译加载失败:', err);
        setError('无法加载翻译。请确保您的Crowdin配置正确。');
        setLoading(false);
      }
    };

    initTranslations();
  }, []);

  // 切换语言
  const handleLanguageChange = async (lang: string) => {
    try {
      await setLanguage(lang);
      setCurrentLanguage(lang);
      // 存储在localStorage中以便记忆用户选择
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentLanguage', lang);
      }
    } catch (err) {
      console.error('语言切换失败:', err);
      setError('切换语言失败');
    }
  };

  // 从translations对象中获取翻译值
  const getTranslationForKey = (key: string): string => {
    if (!translations || !translations[currentLanguage]) {
      return key;
    }

    // 处理嵌套键，比如 "welcome.message"
    const keyParts = key.split('.');
    let result: Translations = translations[currentLanguage] as Translations;
    
    for (const part of keyParts) {
      if (!result || typeof result !== 'object' || !(part in result)) {
        return key; // 如果找不到翻译，返回键名
      }
      result = result[part] as Translations;
    }
    
    return typeof result === 'string' ? result : key;
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Crowdin OTA 翻译演示</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">选择语言：</label>
        <select 
          value={currentLanguage}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value={crowdinConfig.sourceLanguage}>{crowdinConfig.sourceLanguage}</option>
          {crowdinConfig.languages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>
      
      {loading ? (
        <div className="text-center">加载翻译中...</div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">翻译示例：</h2>
          <div className="bg-gray-100 p-4 rounded">
            {translationKeys.map(key => (
              <div key={key} className="mb-2">
                <strong>{key}:</strong> {getTranslationForKey(key)}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-500">
        注意：请确保您在 crowdin-config.ts 中配置了正确的 distributionHash 和 projectId。
      </div>
    </div>
  );
} 