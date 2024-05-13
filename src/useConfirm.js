import { useCallback, useContext, useEffect, useId } from "react";
import ConfirmContext from "./ConfirmContext";

const useConfirm = () => {
  const parentId = useId();
  const { confirmBase, closeOnParentUnmount } = useContext(ConfirmContext);

  const confirm = useCallback(
    (options) => {
      return confirmBase(parentId, options);
    },
    [parentId],
  );

  // When the component calling useConfirm is unmounted, we automatically
  // close the associated confirmation dialog. Note that we use a
  // unique id per each useConfirm usage, so that we don't close the
  // dialog when an unrelated component unmounts
  useEffect(() => {
    return () => {
      closeOnParentUnmount(parentId);
    };
  }, [parentId]);

  return confirm;
};

export default useConfirm;
