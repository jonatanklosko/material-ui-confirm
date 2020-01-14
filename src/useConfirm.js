import { useContext } from 'react';
import ConfirmContext from './ConfirmContext';

const useConfirm = () => {
  const confirm = useContext(ConfirmContext);
  return confirm;
};

export default useConfirm;
