import { useCallback, useContext, useEffect, useId } from "react";
import ConfirmContext from "./ConfirmContext";

const useConfirm = () => {
  const parentId = useId();
  const { confirmBase, closeBase } = useContext(ConfirmContext);

  const confirm = useCallback((options) => {
    return confirmBase(parentId, options)
  }, [parentId]);

  // When the component calling useConfirm is unmounted, we automatically
  // close the confirmation dialog that it opened. Note that we use a
  // unique id per each useConfirm usage, so that we don't close the
  // dialog when unrelated components unmount
  useEffect(() => {
    return () => {
      closeBase(parentId);
    };
  }, [parentId]);

  return confirm;
};

export default useConfirm;
