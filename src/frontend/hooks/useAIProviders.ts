/**
 * AI 提供商配置 Hook
 */

import { useState, useEffect } from 'react';
import { AIProvider } from '../../shared/types';
import { AI_PROVIDERS, DEFAULT_CONFIG } from '../../shared/constants';

export interface UseAIProvidersReturn {
  providers: Record<AIProvider, any>;
  selectedProvider: AIProvider;
  setSelectedProvider: (provider: AIProvider) => void;
  loading: boolean;
}

export function useAIProviders(): UseAIProvidersReturn {
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>(
    (DEFAULT_CONFIG.DEFAULT_PROVIDER as any) || 'gemini-1.5-pro'
  );
  const [loading, setLoading] = useState(false);

  return {
    providers: AI_PROVIDERS,
    selectedProvider,
    setSelectedProvider,
    loading,
  };
}
