export default class ConfirmDialogCancellationError extends Error { }

ConfirmDialogCancellationError.prototype.isConfirmDialogCancellationError = true;

export const isConfirmDialogCancellationError = (error) => {
    return Boolean(error.isConfirmDialogCancellationError)
}