import { ConfirmDialogCancellationError, isConfirmDialogCancellationError } from "../src";

describe('ConfirmDialogCancellationError', () => {
    describe('isConfirmDialogCancellationError', () => {
        test('should return true when error is instance of ConfirmDialogCancellationError', () => {
            const error = new ConfirmDialogCancellationError();
            expect(isConfirmDialogCancellationError(error)).toBe(true);
        });

        test('should return false when error is *not* instance of ConfirmDialogCancellationError', () => {
            const error = new Error();
            expect(isConfirmDialogCancellationError(error)).toBe(false);
        });
    });
});