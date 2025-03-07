import { create } from 'zustand';

interface AppState {
  bomData: any[];
  complianceData: any[];
  mergedData: any[];
  setBomData: (data: any[]) => void;
  setComplianceData: (data: any[]) => void;
  setMergedData: (data: any[]) => void;
}

export const useStore = create<AppState>((set) => ({
  bomData: [],
  complianceData: [],
  mergedData: [],
  setBomData: (data) => set({ bomData: data }),
  setComplianceData: (data) => set({ complianceData: data }),
  setMergedData: (data) => set({ mergedData: data }),
}));
