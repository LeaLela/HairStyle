export enum ServiceTypesMen {
    shave = "Shave",
    hair_cut = "Hair Cut",
    hair_cut_shave = "Hair Cut & Shave",
  }
  export const getServiceOptions = () => {
    return Object.keys(ServiceTypesMen).map((key) => {
      return {
        label: ServiceTypesMen[key as keyof typeof ServiceTypesMen],
        value: key,
      };
    });
  };
  