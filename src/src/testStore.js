import { useStore } from './store';

const TestStore = () => {
  const { bomData } = useStore();
  console.log(bomData);
  return null;
};

export default TestStore;
