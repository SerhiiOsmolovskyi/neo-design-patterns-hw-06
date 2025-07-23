import { IMessageService } from "./IMessageService";

export function createRateLimitProxy(
  service: IMessageService,
  intervalMs: number
): IMessageService {
  let lastCallTime = 0;

  return new Proxy(service, {
    get(target, prop) {
      const original = Reflect.get(target, prop);
      if (typeof original !== "function" || prop !== "send") {
        return original;
      }

      return function (...args: any[]) {
        const now = Date.now();
        if (now - lastCallTime >= intervalMs) {
          lastCallTime = now;
          return original.apply(target, args);
        } else {
          console.log("[RateLimit] skipped");
        }
      };
    }
  });
}
