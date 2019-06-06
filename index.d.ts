
export function generateWithChillout<T extends object>(funcs: T | null | undefined): {actions: { [P in keyof T]: TResult }, reducer: function};

export function generateWithChillout<T extends object>(funcs: T | null | undefined, initialState: any): {actions: {[P in keyof T]}, reducer: function};
