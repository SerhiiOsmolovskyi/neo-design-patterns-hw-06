// Декоратор для додавання timestamp у повідомлення
export function withTimestamp<This, Args extends [string, ...any[]], Return>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
): (this: This, ...args: Args) => Return {
  return function (this: This, ...args: Args): Return {
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').split('.')[0];

    const newArgs = [`[${timestamp}] ${args[0]}`, ...args.slice(1)] as Args;

    return originalMethod.apply(this, newArgs);
  };
}

// Декоратор для переведення повідомлення у верхній регістр
export function uppercase<This, Args extends [string, ...any[]], Return>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
): (this: This, ...args: Args) => Return {
  return function (this: This, ...args: Args): Return {
    const newArgs = [args[0].toUpperCase(), ...args.slice(1)] as Args;

    return originalMethod.apply(this, newArgs);
  };
}
