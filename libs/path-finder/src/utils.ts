const propertyCache = () => {
  return (_: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalGetter = descriptor.get;

    if (!originalGetter) {
      throw new Error("Cache decorator can only be applied to getters");
    }

    const cacheKey = Symbol(`__${propertyKey}_cache`);
    const isCachedKey = Symbol(`__${propertyKey}_isCached`);

    descriptor.get = function () {
      const thisCtx = this as any;
      if (!thisCtx[isCachedKey]) {
        thisCtx[cacheKey] = originalGetter.apply(this);
        thisCtx[isCachedKey] = true;
      }
      return thisCtx[cacheKey];
    };
  };
};

export { propertyCache };
